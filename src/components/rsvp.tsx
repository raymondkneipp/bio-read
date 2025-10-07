import { useSettings } from "@/contexts/settings-context";
import { toBionicReading } from "@/lib/to-bionic-reading";
import { cn } from "@/lib/utils";
import { Progress } from "./ui/progress";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "./ui/button";
import { PlayIcon, RedoIcon, UndoIcon, PauseIcon } from "lucide-react";
import type { Reading } from "@/db";
import { db } from "@/db";
import { Kbd } from "./ui/kbd";
import { useState, useEffect, useCallback } from "react";

export function RSVP(props: Reading) {
	const {
		readingFont,
		readingSize,
		readingLineHeight,
		readingLetterSpacing,
		dyslexicReadingFont,
		bionicReading,
		rsvpSpeed,
	} = useSettings();

	const [isPlaying, setIsPlaying] = useState(false);
	// Convert progress (word count) to word index (0-based)
	const [currentWordIndex, setCurrentWordIndex] = useState(Math.max(0, props.progress - 1));

	// Sync with progress changes when switching between modes
	useEffect(() => {
		setCurrentWordIndex(Math.max(0, props.progress - 1));
	}, [props.progress]);
	
	// Split content by words
	const words = props.content.split(/\s+/).filter(word => word.length > 0);

	const content = bionicReading
		? toBionicReading(words[currentWordIndex] || "")
		: words[currentWordIndex] || "";

	// Create safe HTML content for dangerouslySetInnerHTML
	const htmlContent = { __html: content };

	// Update progress in database
	const updateProgress = useCallback(
		async (wordIndex: number) => {
			// Store progress as word count up to and including the current word
			await db.readings.update(props.id, { progress: wordIndex + 1 });
		},
		[props.id],
	);

	// RSVP functionality
	const startRSVP = useCallback(() => {
		setIsPlaying(true);
	}, []);

	const stopRSVP = useCallback(() => {
		setIsPlaying(false);
	}, []);

	const goToPreviousWord = useCallback(() => {
		// Pause RSVP when manually navigating
		setIsPlaying(false);
		setCurrentWordIndex((prev) => {
			const newIndex = Math.max(0, prev - 1);
			updateProgress(newIndex);
			return newIndex;
		});
	}, [updateProgress]);

	const goToNextWord = useCallback(() => {
		// Pause RSVP when manually navigating
		setIsPlaying(false);
		setCurrentWordIndex((prev) => {
			const newIndex = Math.min(words.length - 1, prev + 1);
			updateProgress(newIndex);
			return newIndex;
		});
	}, [words.length, updateProgress]);

	// Auto-advance words when playing
	useEffect(() => {
		if (!isPlaying) return;

		const interval = setInterval(() => {
			setCurrentWordIndex((prev) => {
				if (prev >= words.length - 1) {
					setIsPlaying(false);
					return prev;
				}
				const newIndex = prev + 1;
				updateProgress(newIndex);
				return newIndex;
			});
		}, rsvpSpeed);

		return () => clearInterval(interval);
	}, [isPlaying, rsvpSpeed, words.length, updateProgress]);

	// Keyboard controls
	useEffect(() => {
		const handleKeyPress = (event: KeyboardEvent) => {
			if (event.code === "Space") {
				event.preventDefault();
				if (isPlaying) {
					stopRSVP();
				} else {
					startRSVP();
				}
			} else if (event.code === "ArrowLeft") {
				event.preventDefault();
				goToPreviousWord();
			} else if (event.code === "ArrowRight") {
				event.preventDefault();
				goToNextWord();
			}
		};

		window.addEventListener("keydown", handleKeyPress);
		return () => window.removeEventListener("keydown", handleKeyPress);
	}, [isPlaying, startRSVP, stopRSVP, goToPreviousWord, goToNextWord]);

	return (
		<div className="px-4 sm:px-8 min-h-[calc(100svh-117px)] flex items-center justify-center">
			<div
				className={cn(
					"mx-auto space-y-4 sm:space-y-8 mt-8 sm:mt-16 text-center",
					{
						"font-montserrat": readingFont === "Montserrat",
						"font-geist": readingFont === "Geist",
						"font-inter": readingFont === "Inter",
						"font-playfair": readingFont === "Playfair",

						"font-dyslexic": dyslexicReadingFont,
					},
				)}
			>
				<span
					className={cn("bg-muted mx-auto p-4 rounded-lg", {
						"text-md": readingSize === "sm",
						"text-xl": readingSize === "md",
						"text-3xl": readingSize === "lg",
						"text-5xl": readingSize === "xl",

						"leading-snug": readingLineHeight === "sm",
						"leading-normal": readingLineHeight === "md",
						"leading-relaxed": readingLineHeight === "lg",
						"leading-loose": readingLineHeight === "xl",

						"tracking-normal": readingLetterSpacing === "sm",
						"tracking-wide": readingLetterSpacing === "md",
						"tracking-wider": readingLetterSpacing === "lg",
						"tracking-widest": readingLetterSpacing === "xl",
					})}
					dangerouslySetInnerHTML={htmlContent}
				/>
			</div>

			<div className="fixed bottom-0 left-0 right-0 flex gap-4 items-center justify-center bg-gradient-to-t from-background via-background/80 to-transparent px-12 pt-4 pb-4">
				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							size="icon"
							variant="outline"
							onClick={goToPreviousWord}
							disabled={currentWordIndex === 0}
							className="rounded-full shadow-md"
						>
							<UndoIcon />
						</Button>
					</TooltipTrigger>
					<TooltipContent className="flex gap-2 items-center">
						<p>Rewind</p>
						<Kbd>←</Kbd>
					</TooltipContent>
				</Tooltip>

				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							size="icon"
							variant={isPlaying ? "default" : "secondary"}
							onClick={isPlaying ? stopRSVP : startRSVP}
							className="size-12 rounded-full shadow-md"
						>
							{isPlaying ? (
								<PauseIcon className="size-5" />
							) : (
								<PlayIcon className="size-5" />
							)}
						</Button>
					</TooltipTrigger>
					<TooltipContent className="flex gap-2 items-center">
						<p>{isPlaying ? "Pause" : "Play"}</p>
						<Kbd>␣</Kbd>
					</TooltipContent>
				</Tooltip>

				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							size="icon"
							variant="outline"
							onClick={goToNextWord}
							disabled={currentWordIndex === words.length - 1}
							className="rounded-full shadow-md"
						>
							<RedoIcon />
						</Button>
					</TooltipTrigger>
					<TooltipContent className="flex gap-2 items-center">
						<p>Skip</p>
						<Kbd>→</Kbd>
					</TooltipContent>
				</Tooltip>
			</div>

			<Progress
				value={(currentWordIndex * 100) / words.length}
				className="fixed bottom-0 left-0 right-0 rounded-none"
			/>
		</div>
	);
}
