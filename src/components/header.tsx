import { ModeToggle } from "@/components/mode-toggle";
import {
	readingFonts,
	speechSpeeds,
	useSettings,
	type ReadingFont,
	type ReadingSize,
	type SpeechSpeed,
} from "@/contexts/settings-context";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { ArrowLeftIcon, BookOpenIcon, SettingsIcon } from "lucide-react";
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
import { Slider } from "@/components/ui/slider";
import type { Reading } from "@/db";

export function Header(props: {
	selectedReading: Reading | null;
	onReadingChange: React.Dispatch<React.SetStateAction<Reading | null>>;
}) {
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

		rsvpReading,
		setRSVPReading,

		selectedVoice,
		setSelectedVoice,

		speechSpeed,
		setSpeechSpeed,

		rsvpSpeed,
		setRSVPSpeed,
	} = useSettings();
	return (
		<header className="border-b p-4 sm:px-8 flex items-center justify-between sticky top-0 bg-background z-10">
			<div className="flex items-center gap-2">
				{!props.selectedReading ? (
					<>
						<div className="size-9 flex items-center justify-center">
							<BookOpenIcon className="size-4" />
						</div>

						<span className="text-lg">
							<strong className="font-bold">Bio</strong>Read
						</span>
					</>
				) : (
					<>
						<Button
							size="icon"
							variant="ghost"
							onClick={() => props.onReadingChange(null)}
						>
							<ArrowLeftIcon />{" "}
						</Button>
						<span className="font-bold">{props.selectedReading.title}</span>
					</>
				)}
			</div>

			<div className="flex items-center gap-2">
				<Popover>
					<PopoverTrigger asChild>
						<Button size="icon" variant="ghost">
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
										<SelectItem key={font} value={font}>
											{font}
										</SelectItem>
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
									<TabsTrigger value="sm">sm</TabsTrigger>
									<TabsTrigger value="md">md</TabsTrigger>
									<TabsTrigger value="lg">lg</TabsTrigger>
									<TabsTrigger value="xl">xl</TabsTrigger>
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
									<TabsTrigger value="sm">sm</TabsTrigger>
									<TabsTrigger value="md">md</TabsTrigger>
									<TabsTrigger value="lg">lg</TabsTrigger>
									<TabsTrigger value="xl">xl</TabsTrigger>
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
									<TabsTrigger value="sm">sm</TabsTrigger>
									<TabsTrigger value="md">md</TabsTrigger>
									<TabsTrigger value="lg">lg</TabsTrigger>
									<TabsTrigger value="xl">xl</TabsTrigger>
								</TabsList>
							</Tabs>
						</div>

						<div className="flex items-center space-x-2">
							<Switch
								id="dyslexic-reading-font"
								checked={dyslexicReadingFont}
								onCheckedChange={setDyslexicReadingFont}
							/>
							<Label htmlFor="dyslexic-reading-font">
								Dyslexic Reading Font
							</Label>
						</div>

						<div className="flex items-center space-x-2">
							<Switch
								id="bionic-reading"
								checked={bionicReading}
								onCheckedChange={setBionicReading}
							/>
							<Label htmlFor="bionic-reading">Bionic Reading</Label>
						</div>

						<div className="flex items-center space-x-2">
							<Switch
								id="rsvp-reading"
								checked={rsvpReading}
								onCheckedChange={setRSVPReading}
							/>
							<Label htmlFor="rspv-reading">RSVP Reading</Label>
						</div>

						{rsvpReading && (
							<div className="space-y-1.5">
								<Label htmlFor="rsvp-speed">RSVP Speed</Label>
								<div className="space-y-2">
									<Slider
										id="rsvp-speed"
										min={100}
										max={1000}
										step={50}
										value={[1100 - rsvpSpeed]}
										onValueChange={(value) => setRSVPSpeed(1100 - value[0])}
										className="w-full"
									/>
									<div className="flex justify-between text-xs text-muted-foreground">
										<span>Slow</span>
										<span className="font-medium">{rsvpSpeed}ms</span>
										<span>Fast</span>
									</div>
								</div>
							</div>
						)}

						<div className="space-y-1.5">
							<Label htmlFor="voice-select">Voice</Label>
							<Select value={selectedVoice} onValueChange={setSelectedVoice}>
								<SelectTrigger className="w-full" id="voice-select">
									<SelectValue placeholder="Select Voice" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="default">Default Voice</SelectItem>
									{typeof window !== "undefined" &&
										window.speechSynthesis?.getVoices().map((voice) => (
											<SelectItem key={voice.name} value={voice.name}>
												{voice.name} ({voice.lang})
											</SelectItem>
										))}
								</SelectContent>
							</Select>
						</div>

						<div className="space-y-1.5">
							<Label htmlFor="speed-select">Reading Speed</Label>
							<Select
								value={speechSpeed}
								onValueChange={(speed) => setSpeechSpeed(speed as SpeechSpeed)}
							>
								<SelectTrigger className="w-full" id="speed-select">
									<SelectValue placeholder="Select Speed" />
								</SelectTrigger>
								<SelectContent>
									{speechSpeeds.map((speed) => (
										<SelectItem key={speed} value={speed}>
											{speed}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
					</PopoverContent>
				</Popover>
			</div>
			<div className="absolute -bottom-12 translate-y-px left-0 right-0 flex h-12 bg-gradient-to-b from-background to-transparent" />
		</header>
	);
}
