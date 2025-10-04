import { createContext, useState, use } from "react";

export const readingFonts = [
	"Montserrat",
	"Playfair",
	"Geist",
	"Inter",
] as const;
export const readingSizes = ["sm", "md", "lg", "xl"] as const;

export type ReadingFont = (typeof readingFonts)[number];
export type ReadingSize = (typeof readingSizes)[number];

type SettingsProviderProps = {
	children: React.ReactNode;
};

type SettingsProviderState = {
	readingFont: ReadingFont;
	setReadingFont: (font: ReadingFont) => void;

	readingSize: ReadingSize;
	setReadingSize: (size: ReadingSize) => void;

	readingLineHeight: ReadingSize;
	setReadingLineHeight: (size: ReadingSize) => void;

	readingLetterSpacing: ReadingSize;
	setReadingLetterSpacing: (size: ReadingSize) => void;

	dyslexicReadingFont: boolean;
	setDyslexicReadingFont: (dyslexicFriendlyFont: boolean) => void;

	bionicReading: boolean;
	setBionicReading: (bionicReading: boolean) => void;

	rsvpReading: boolean;
	setRSVPReading: (rsvpReading: boolean) => void;
};

const initialState: SettingsProviderState = {
	readingFont: "Montserrat",
	setReadingFont: () => null,

	readingSize: "sm",
	setReadingSize: () => null,

	readingLineHeight: "sm",
	setReadingLineHeight: () => null,

	readingLetterSpacing: "sm",
	setReadingLetterSpacing: () => null,

	dyslexicReadingFont: true,
	setDyslexicReadingFont: () => null,

	bionicReading: true,
	setBionicReading: () => null,

	rsvpReading: true,
	setRSVPReading: () => null,
};

export const SettingsContext =
	createContext<SettingsProviderState>(initialState);

export function SettingsProvider({ children }: SettingsProviderProps) {
	const [readingFont, setReadingFont] = useState<ReadingFont>("Geist");
	const [readingSize, setReadingSize] = useState<ReadingSize>("md");
	const [readingLineHeight, setReadingLineHeight] = useState<ReadingSize>("md");
	const [readingLetterSpacing, setReadingLetterSpacing] =
		useState<ReadingSize>("md");

	const [dyslexicReadingFont, setDyslexicReadingFont] =
		useState<boolean>(false);
	const [bionicReading, setBionicReading] = useState<boolean>(false);
	const [rsvpReading, setRSVPReading] = useState<boolean>(false);

	return (
		<SettingsContext
			value={{
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
			}}
		>
			{children}
		</SettingsContext>
	);
}

export const useSettings = () => {
	const context = use(SettingsContext);

	if (context === undefined)
		throw new Error("useSettings must be used within a SettingsProvider");

	return context;
};
