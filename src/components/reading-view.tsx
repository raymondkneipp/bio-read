import { Progress } from "@/components/ui/progress";
import { useSettings } from "@/contexts/settings-context";
import { cn } from "@/lib/utils";
import { toBionicReading } from "@/lib/to-bionic-reading";
import { toParagraphsHTML } from "@/lib/to-paragraph";
import { toBionicParagraphsHTML } from "@/lib/to-bionic-paragraphs";
import { Button } from "./ui/button";
import { MegaphoneIcon, RedoIcon, UndoIcon } from "lucide-react";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Reading } from "@/db";

export function ReadingView(props: Reading) {
	const {
		readingFont,
		readingSize,
		readingLineHeight,
		readingLetterSpacing,
		dyslexicReadingFont,
		bionicReading,
	} = useSettings();

	const title = bionicReading ? toBionicReading(props.title) : props.title;
	const content = bionicReading
		? toBionicParagraphsHTML(props.content)
		: toParagraphsHTML(props.content);

	// TODO: As user scrolls update progress as sentence leaves viewport.
	// TODO: If reading aloud, update progress once sentence is read. Scroll to current sentence being read and highlight sentence.
	// TODO: When component enters view scroll to current progress and hightlight sentence.

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
					dangerouslySetInnerHTML={{ __html: content }}
				/>

				<div className="min-h-dvh text-3xl text-center flex items-center justify-center">
					The End
				</div>
			</div>

			<div className="fixed bottom-2 left-0 right-0 flex gap-4 items-center justify-center bg-gradient-to-t from-background via-background/80 to-transparent px-12 pt-4 pb-2">
				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							size="icon"
							variant="outline"
							onClick={() =>
								alert(
									"TODO: Implement Read Aloud go back sentence (left arrow should trigger this)",
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
								alert("TODO: Implement Read Aloud (space should trigger this)")
							}
							className="size-12 rounded-full shadow-md"
						>
							<MegaphoneIcon className="size-5" />
						</Button>
					</TooltipTrigger>
					<TooltipContent>
						<p>Read Aloud</p>
					</TooltipContent>
				</Tooltip>

				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							size="icon"
							variant="outline"
							onClick={() =>
								alert(
									"TODO: Implement Read Aloud go forward sentence (right arrow should trigger this)",
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
