import { ModeToggle } from "@/components/mode-toggle";
import {
	readingFonts,
	useSettings,
	type ReadingFont,
	type ReadingSize,
} from "@/contexts/settings-context";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { SettingsIcon } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function Header() {
	const {
		readingFont,
		setReadingFont,

		readingSize,
		setReadingSize,

		readingLineHeight,
		setReadingLineHeight,

		readingLetterSpacing,
		setReadingLetterSpacing,

		dyslexicReadingFont,
		setDyslexicReadingFont,

		bionicReading,
		setBionicReading,
	} = useSettings();
	return (
		<header className="border-b p-4 sm:p-8 flex items-center justify-between sticky top-0 bg-background z-10">
			<span className="font-bold text-lg">BioRead</span>

			<Popover>
				<PopoverTrigger asChild>
					<Button size="icon" variant="outline">
						<SettingsIcon />
					</Button>
				</PopoverTrigger>
				<PopoverContent align="end" className="space-y-4">
					<ModeToggle />

					<div className="space-y-1.5">
						<Label htmlFor="reading-font">Reading Font</Label>
						<Select
							value={readingFont}
							onValueChange={(font) => setReadingFont(font as ReadingFont)}
						>
							<SelectTrigger className="w-full" id="reading-font">
								<SelectValue placeholder="Reading Font" />
							</SelectTrigger>
							<SelectContent>
								{readingFonts.map((font) => (
									<SelectItem value={font}>{font}</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					<div className="space-y-1.5">
						<Label htmlFor="reading-size">Reading Size</Label>
						<Tabs
							defaultValue={readingSize}
							onValueChange={(size) => setReadingSize(size as ReadingSize)}
							id="reading-size"
						>
							<TabsList className="w-full">
								<TabsTrigger value="sm">SM</TabsTrigger>
								<TabsTrigger value="md">MD</TabsTrigger>
								<TabsTrigger value="lg">LG</TabsTrigger>
								<TabsTrigger value="xl">XL</TabsTrigger>
							</TabsList>
						</Tabs>
					</div>

					<div className="space-y-1.5">
						<Label htmlFor="reading-line-height">Line Height</Label>
						<Tabs
							defaultValue={readingLineHeight}
							onValueChange={(size) =>
								setReadingLineHeight(size as ReadingSize)
							}
							id="reading-line-height"
						>
							<TabsList className="w-full">
								<TabsTrigger value="sm">SM</TabsTrigger>
								<TabsTrigger value="md">MD</TabsTrigger>
								<TabsTrigger value="lg">LG</TabsTrigger>
								<TabsTrigger value="xl">XL</TabsTrigger>
							</TabsList>
						</Tabs>
					</div>

					<div className="space-y-1.5">
						<Label htmlFor="reading-letter-spacing">Letter Spacing</Label>
						<Tabs
							defaultValue={readingLetterSpacing}
							onValueChange={(size) =>
								setReadingLetterSpacing(size as ReadingSize)
							}
							id="reading-letter-spacing"
						>
							<TabsList className="w-full">
								<TabsTrigger value="sm">SM</TabsTrigger>
								<TabsTrigger value="md">MD</TabsTrigger>
								<TabsTrigger value="lg">LG</TabsTrigger>
								<TabsTrigger value="xl">XL</TabsTrigger>
							</TabsList>
						</Tabs>
					</div>

					<div className="flex items-center space-x-2">
						<Switch
							id="dyslexic-reading-font"
							checked={dyslexicReadingFont}
							onCheckedChange={setDyslexicReadingFont}
						/>
						<Label htmlFor="dyslexic-reading-font">Dyslexic Reading Font</Label>
					</div>

					<div className="flex items-center space-x-2">
						<Switch
							id="bionic-reading"
							checked={bionicReading}
							onCheckedChange={setBionicReading}
						/>
						<Label htmlFor="bionic-reading">Bionic Reading</Label>
					</div>
				</PopoverContent>
			</Popover>
		</header>
	);
}
