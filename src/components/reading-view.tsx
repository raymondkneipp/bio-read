import type { Reading } from "@/mock/readings";
import { Progress } from "@/components/ui/progress";
import { useSettings } from "@/contexts/settings-context";
import { cn } from "@/lib/utils";
import { toBionicReading } from "@/lib/to-bionic-reading";
import { toParagraphsHTML } from "@/lib/to-paragraph";
import { toBionicParagraphsHTML } from "@/lib/to-bionic-paragraphs";

export function ReadingView(props: Reading) {
	const {
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

	return (
		<div>
			<div
				className={cn(
					"max-w-prose mx-auto space-y-4 sm:space-y-8 mt-8 sm:mt-16",
					{
						"font-dyslexic": dyslexicReadingFont,
						"text-muted-foreground": bionicReading,
						"text-foreground": !bionicReading,
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

			<Progress
				value={(props.progress * 100) / props.content.split(" ").length}
				className="fixed bottom-0 left-0 right-0 rounded-none"
			/>
		</div>
	);
}
