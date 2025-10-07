import { Progress } from "@/components/ui/progress";
import { useSettings } from "@/contexts/settings-context";
import { cn } from "@/lib/utils";
import { toBionicReading } from "@/lib/to-bionic-reading";
import { Button } from "./ui/button";
import { MegaphoneIcon, RedoIcon, UndoIcon } from "lucide-react";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Reading } from "@/db";
import { db } from "@/db";
import { Kbd } from "./ui/kbd";
import { useState, useEffect, useCallback, useRef } from "react";
import { PauseIcon } from "lucide-react";
import type { SpeechSpeed } from "@/contexts/settings-context";

function splitParagraphs(text: string): string[] {
	return text
		.trim()
		.split(/\n+/)
		.map((p) => p.trim())
		.filter(Boolean);
}

function splitSentences(paragraph: string): string[] {
	return (
		paragraph
			.match(/[^.!?]+[.!?]*/g) // only split on ., !, or ?
			?.map((s) => s.trim())
			.filter(Boolean) ?? []
	);
}

function toBionicWord(word: string): string {
	const len = word.length;
	const boldCount = Math.ceil(len * 0.4);
	const boldPart = word.slice(0, boldCount);
	const rest = word.slice(boldCount);
	return `<b>${boldPart}</b>${rest}`;
}

function applyBionicReading(sentence: string): string {
	return sentence
		.split(/\s+/)
		.map((w) => toBionicWord(w))
		.join(" ");
}

function processText(text: string) {
	const paragraphs = splitParagraphs(text);

	const structure = paragraphs.map((p, pIndex) => {
		const sentences = splitSentences(p).map((s, sIndex) => ({
			id: `${pIndex}-${sIndex}`,
			text: s,
			bionicHTML: applyBionicReading(s),
		}));

		return { id: pIndex, sentences };
	});

	return structure;
}

function Sentence({
	sentence,
	active,
	bionicReading,
}: {
	sentence: any;
	active: boolean;
	bionicReading: boolean;
}) {
	return (
		<>
			<span
				data-sentence-id={sentence.id}
				className={active ? "bg-yellow-200" : ""}
				dangerouslySetInnerHTML={{
					__html: bionicReading ? sentence.bionicHTML : sentence.text,
				}}
			/>{" "}
		</>
	);
}

export function ReadingView(props: Reading) {
	const {
		readingFont,
		readingSize,
		readingLineHeight,
		readingLetterSpacing,
		dyslexicReadingFont,
		bionicReading,
		selectedVoice,
		speechSpeed,
	} = useSettings();

	const title = bionicReading ? toBionicReading(props.title) : props.title;

	const data = processText(props.content);
	console.log(data);

	// Flatten sentences with their IDs for easy navigation
	const flatSentences = data.flatMap((p, pIndex) =>
		p.sentences.map((s, sIndex) => s.id ?? `${pIndex}-${sIndex}`),
	);

	// Calculate word count up to current sentence
	const calculateWordCountUpToSentence = useCallback(
		(sentenceId: string) => {
			// Find the sentence in the processed data
			const [paragraphIndex, sentenceIndex] = sentenceId.split("-").map(Number);
			const targetSentence = data[paragraphIndex]?.sentences[sentenceIndex];
			
			if (!targetSentence) return 0;
			
			// Find the position of this sentence in the original text
			const sentenceText = targetSentence.text;
			const sentenceStartIndex = props.content.indexOf(sentenceText);
			
			if (sentenceStartIndex === -1) return 0;
			
			// Count words up to the end of this sentence
			const textUpToSentence = props.content.substring(0, sentenceStartIndex + sentenceText.length);
			const wordsUpToSentence = textUpToSentence.split(/\s+/).filter(word => word.length > 0);
			
			return wordsUpToSentence.length;
		},
		[data, props.content],
	);

	// Find sentence ID based on progress (word index)
	const findSentenceIdByProgress = useCallback(
		(targetProgress: number) => {
			// Use the same word splitting method as RSVP for consistency
			const allWords = props.content.split(/\s+/).filter(word => word.length > 0);
			
			// If target progress is beyond all words, return last sentence
			if (targetProgress >= allWords.length) {
				const lastParagraph = data[data.length - 1];
				if (lastParagraph && lastParagraph.sentences.length > 0) {
					const lastSentence = lastParagraph.sentences[lastParagraph.sentences.length - 1];
					return lastSentence.id ?? `${data.length - 1}-${lastParagraph.sentences.length - 1}`;
				}
				return "0-0";
			}

			// Find which sentence contains the word at targetProgress
			for (let p = 0; p < data.length; p++) {
				const paragraph = data[p];
				if (!paragraph) continue;

				for (let s = 0; s < paragraph.sentences.length; s++) {
					const sentence = paragraph.sentences[s];
					if (!sentence) continue;

					// Find the position of this sentence in the original text
					const sentenceText = sentence.text;
					const sentenceStartIndex = props.content.indexOf(sentenceText);
					
					if (sentenceStartIndex === -1) continue;
					
					// Count words up to the end of this sentence
					const textUpToSentence = props.content.substring(0, sentenceStartIndex + sentenceText.length);
					const wordsUpToSentence = textUpToSentence.split(/\s+/).filter(word => word.length > 0);
					
					// If we've reached or exceeded the target progress, return this sentence
					if (wordsUpToSentence.length >= targetProgress) {
						return sentence.id ?? `${p}-${s}`;
					}
				}
			}

			// Fallback to first sentence
			return "0-0";
		},
		[data, props.content],
	);

	const [activeSentenceId, setActiveSentenceId] = useState("0-0");
	const hasInitialized = useRef(false);

	// Speech synthesis state
	const [isReadingAloud, setIsReadingAloud] = useState(false);
	const [isAutoAdvancing, setIsAutoAdvancing] = useState(false);
	const speechSynthesis = useRef<SpeechSynthesisUtterance | null>(null);
	const isPaused = useRef(false);

	// Set initial active sentence based on progress when component mounts
	useEffect(() => {
		if (!hasInitialized.current) {
			if (props.progress > 0) {
				const sentenceId = findSentenceIdByProgress(props.progress);
				setActiveSentenceId(sentenceId);
			}
			// If progress is 0, keep default "0-0" (first sentence)
			hasInitialized.current = true;
		}
	}, [props.progress, findSentenceIdByProgress]);

	// Sync with progress changes when switching between modes
	// Use a ref to track if we're in the middle of manual navigation or reading aloud
	const isManualNavigation = useRef(false);
	
	useEffect(() => {
		if (hasInitialized.current && !isManualNavigation.current && !isReadingAloud && !isAutoAdvancing) {
			const sentenceId = findSentenceIdByProgress(props.progress);
			setActiveSentenceId(sentenceId);
		}
		// Reset the flag after processing
		isManualNavigation.current = false;
	}, [props.progress, findSentenceIdByProgress, isReadingAloud, isAutoAdvancing]);

	// Scroll to active sentence when activeSentenceId changes
	useEffect(() => {
		const activeSentenceElement = document.querySelector(
			`[data-sentence-id="${activeSentenceId}"]`,
		);
		if (activeSentenceElement) {
			activeSentenceElement.scrollIntoView({
				behavior: "smooth",
				block: "center",
			});
		}
	}, [activeSentenceId]);

	// Update progress in database
	const updateProgress = useCallback(
		async (sentenceId: string) => {
			const wordCount = calculateWordCountUpToSentence(sentenceId);
			await db.readings.update(props.id, { progress: wordCount });
		},
		[calculateWordCountUpToSentence, props.id],
	);

	// Pause reading function
	const pauseReading = useCallback(() => {
		if (isReadingAloud || isAutoAdvancing) {
			window.speechSynthesis.cancel();
			setIsReadingAloud(false);
			setIsAutoAdvancing(false);
			isPaused.current = true;
		}
	}, [isReadingAloud, isAutoAdvancing]);

	// Next sentence
	const nextSentence = useCallback(() => {
		// Pause reading when manually navigating
		pauseReading();
		
		// Set flag to prevent sync useEffect from interfering
		isManualNavigation.current = true;
		
		const currentIndex = flatSentences.findIndex(
			(id) => id === activeSentenceId,
		);
		if (currentIndex < flatSentences.length - 1) {
			const newSentenceId = flatSentences[currentIndex + 1];
			setActiveSentenceId(newSentenceId);
			updateProgress(newSentenceId);
		}
	}, [activeSentenceId, flatSentences, updateProgress, pauseReading]);

	// Previous sentence
	const prevSentence = useCallback(() => {
		// Pause reading when manually navigating
		pauseReading();
		
		// Set flag to prevent sync useEffect from interfering
		isManualNavigation.current = true;
		
		const currentIndex = flatSentences.findIndex(
			(id) => id === activeSentenceId,
		);
		if (currentIndex > 0) {
			const newSentenceId = flatSentences[currentIndex - 1];
			setActiveSentenceId(newSentenceId);
			updateProgress(newSentenceId);
		}
	}, [activeSentenceId, flatSentences, updateProgress, pauseReading]);

	// Calculate current progress based on active sentence
	const currentProgress = calculateWordCountUpToSentence(activeSentenceId);
	const totalWordCount = props.content.split(/\s+/).length;
	const progressPercentage = (currentProgress / totalWordCount) * 100;

	// Speech synthesis functions
	const getSpeedValue = useCallback((speed: SpeechSpeed): number => {
		switch (speed) {
			case "0.5x": return 0.5;
			case "0.75x": return 0.75;
			case "normal": return 1;
			case "1.25x": return 1.25;
			case "1.5x": return 1.5;
			case "2x": return 2;
			default: return 1;
		}
	}, []);

	const speakSentence = useCallback((sentenceId: string) => {
		// Check if paused
		if (isPaused.current) {
			return;
		}

		// Find the sentence text
		const [paragraphIndex, sentenceIndex] = sentenceId.split("-").map(Number);
		const sentence = data[paragraphIndex]?.sentences[sentenceIndex];
		if (!sentence) return;

		// Stop any current speech
		if (speechSynthesis.current) {
			window.speechSynthesis.cancel();
		}

		// Create new speech synthesis
		const utterance = new SpeechSynthesisUtterance(sentence.text);
		
		// Set voice
		if (selectedVoice && selectedVoice !== "default") {
			const voices = window.speechSynthesis.getVoices();
			const voice = voices.find(v => v.name === selectedVoice);
			if (voice) utterance.voice = voice;
		}

		// Set speed
		utterance.rate = getSpeedValue(speechSpeed);

		// Set up event handlers
		utterance.onend = () => {
			// Auto-advance to next sentence only if not paused
			if (!isPaused.current) {
				const currentIndex = flatSentences.findIndex((id) => id === sentenceId);
				if (currentIndex < flatSentences.length - 1) {
					setIsAutoAdvancing(true);
					const nextSentenceId = flatSentences[currentIndex + 1];
					setActiveSentenceId(nextSentenceId);
					updateProgress(nextSentenceId);
					// Continue reading the next sentence
					setTimeout(() => {
						speakSentence(nextSentenceId);
						setIsAutoAdvancing(false);
					}, 100);
				} else {
					setIsReadingAloud(false);
				}
			} else {
				setIsReadingAloud(false);
			}
		};

		utterance.onerror = () => {
			setIsReadingAloud(false);
		};

		// Start speaking
		window.speechSynthesis.speak(utterance);
		speechSynthesis.current = utterance;
		setIsReadingAloud(true);
	}, [selectedVoice, speechSpeed, data, flatSentences, updateProgress, getSpeedValue]);

	const toggleReadingAloud = useCallback(() => {
		if (isReadingAloud) {
			// Pause/stop reading
			window.speechSynthesis.cancel();
			setIsReadingAloud(false);
			isPaused.current = true;
		} else {
			// Start reading current sentence
			isPaused.current = false;
			// Scroll to current sentence before starting to read
			const activeSentenceElement = document.querySelector(
				`[data-sentence-id="${activeSentenceId}"]`,
			);
			if (activeSentenceElement) {
				activeSentenceElement.scrollIntoView({
					behavior: "smooth",
					block: "center",
				});
			}
			speakSentence(activeSentenceId);
		}
	}, [isReadingAloud, speakSentence, activeSentenceId]);

	// Keyboard navigation
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "ArrowLeft") {
				event.preventDefault();
				prevSentence();
			} else if (event.key === "ArrowRight") {
				event.preventDefault();
				nextSentence();
			} else if (event.key === " ") {
				event.preventDefault();
				toggleReadingAloud();
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [nextSentence, prevSentence, toggleReadingAloud]);

	return (
		<div className="px-4 sm:px-8">
			<div
				className={cn(
					"max-w-prose mx-auto space-y-4 sm:space-y-8 mt-8 sm:mt-16",
					{
						"font-montserrat": readingFont === "Montserrat",
						"font-geist": readingFont === "Geist",
						"font-inter": readingFont === "Inter",
						"font-playfair": readingFont === "Playfair",

						"font-dyslexic": dyslexicReadingFont,
					},
				)}
			>
				<h1
					className={cn("font-bold", {
						"text-2xl": readingSize === "sm",
						"text-3xl": readingSize === "md",
						"text-4xl": readingSize === "lg",
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
					dangerouslySetInnerHTML={{ __html: title }}
				/>

				<div
					className={cn("space-y-4 sm:space-y-8", {
						"text-base": readingSize === "sm",
						"text-lg": readingSize === "md",
						"text-xl": readingSize === "lg",
						"text-2xl": readingSize === "xl",

						"leading-snug": readingLineHeight === "sm",
						"leading-normal": readingLineHeight === "md",
						"leading-relaxed": readingLineHeight === "lg",
						"leading-loose": readingLineHeight === "xl",

						"tracking-normal": readingLetterSpacing === "sm",
						"tracking-wide": readingLetterSpacing === "md",
						"tracking-wider": readingLetterSpacing === "lg",
						"tracking-widest": readingLetterSpacing === "xl",
					})}
				>
					{data.map((paragraph) => (
						<p key={paragraph.id} className="mb-4">
							{paragraph.sentences.map((sentence) => (
								<Sentence
									key={sentence.id}
									sentence={sentence}
									active={sentence.id === activeSentenceId} // highlight condition
									bionicReading={bionicReading}
								/>
							))}
						</p>
					))}
				</div>

				<div className="min-h-dvh text-3xl text-center flex items-center justify-center">
					The End
				</div>
			</div>

			<div className="fixed bottom-0 left-0 right-0 flex gap-4 items-center justify-center bg-gradient-to-t from-background via-background/80 to-transparent px-12 pt-4 pb-4">
				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							size="icon"
							variant="outline"
							onClick={() => prevSentence()}
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
							variant={isReadingAloud || isAutoAdvancing ? "default" : "secondary"}
							onClick={toggleReadingAloud}
							className="size-12 rounded-full shadow-md"
						>
							{isReadingAloud || isAutoAdvancing ? (
								<PauseIcon className="size-5" />
							) : (
								<MegaphoneIcon className="size-5" />
							)}
						</Button>
					</TooltipTrigger>
					<TooltipContent className="flex gap-2 items-center">
						<p>{isReadingAloud || isAutoAdvancing ? "Pause" : "Read Aloud"}</p>
						<Kbd>␣</Kbd>
					</TooltipContent>
				</Tooltip>

				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							size="icon"
							variant="outline"
							onClick={() => nextSentence()}
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
				value={progressPercentage}
				className="fixed bottom-0 left-0 right-0 rounded-none"
			/>
		</div>
	);
}
