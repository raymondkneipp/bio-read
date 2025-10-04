import { useSettings } from "@/contexts/settings-context";
import { toBionicReading } from "@/lib/to-bionic-reading";
import { cn } from "@/lib/utils";
import type { Reading } from "@/mock/readings";
import { Progress } from "./ui/progress";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "./ui/button";
import { PlayIcon, RedoIcon, UndoIcon } from "lucide-react";

export function RSVP(props: Reading) {
	const {
		readingFont,
		readingSize,
		readingLineHeight,
		readingLetterSpacing,
		dyslexicReadingFont,
		bionicReading,
	} = useSettings();

	const content = bionicReading
		? toBionicReading(props.content.split(" ")[props.progress])
		: props.content.split(" ")[props.progress];

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

						"text-muted-foreground": bionicReading,
						"text-foreground": !bionicReading,
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
					dangerouslySetInnerHTML={{ __html: content }}
				/>
			</div>

			<div className="fixed bottom-2 left-0 right-0 flex gap-4 items-center justify-center bg-gradient-to-t from-background via-background/80 to-transparent px-12 pt-4 pb-2">
				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							size="icon"
							variant="outline"
							onClick={() =>
								alert(
									"TODO: Implement RSVP go back sentence (left arrow should trigger this)",
								)
							}
							className="rounded-full shadow-md"
						>
							<UndoIcon />
						</Button>
					</TooltipTrigger>
					<TooltipContent>
						<p>Rewind</p>
					</TooltipContent>
				</Tooltip>

				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							size="icon"
							variant="secondary" // when activiated change to default
							onClick={() =>
								alert("TODO: Implement RSVP (space should trigger this)")
							}
							className="size-12 rounded-full shadow-md"
						>
							<PlayIcon className="size-5" />
						</Button>
					</TooltipTrigger>
					<TooltipContent>
						<p>RSVP</p>
					</TooltipContent>
				</Tooltip>

				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							size="icon"
							variant="outline"
							onClick={() =>
								alert(
									"TODO: Implement RSVP go forward sentence (right arrow should trigger this)",
								)
							}
							className="rounded-full shadow-md"
						>
							<RedoIcon />
						</Button>
					</TooltipTrigger>
					<TooltipContent>
						<p>Skip</p>
					</TooltipContent>
				</Tooltip>
			</div>

			<Progress
				value={(props.progress * 100) / props.content.split(" ").length}
				className="fixed bottom-0 left-0 right-0 rounded-none"
			/>
		</div>
	);
}
