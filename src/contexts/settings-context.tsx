import { createContext, useState, use, useEffect } from "react";
import { settingsService } from "../db";

export const readingFonts = [
	"Montserrat",
	"Playfair",
	"Geist",
	"Inter",
] as const;
export const readingSizes = ["sm", "md", "lg", "xl"] as const;
export const speechSpeeds = [
	"0.5x",
	"0.75x",
	"normal",
	"1.25x",
	"1.5x",
	"2x",
] as const;

export type ReadingFont = (typeof readingFonts)[number];
export type ReadingSize = (typeof readingSizes)[number];
export type SpeechSpeed = (typeof speechSpeeds)[number];

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

	selectedVoice: string;
	setSelectedVoice: (voice: string) => void;

	speechSpeed: SpeechSpeed;
	setSpeechSpeed: (speed: SpeechSpeed) => void;

	rsvpSpeed: number;
	setRSVPSpeed: (speed: number) => void;
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

	selectedVoice: "default",
	setSelectedVoice: () => null,

	speechSpeed: "normal",
	setSpeechSpeed: () => null,

	rsvpSpeed: 300,
	setRSVPSpeed: () => null,
};

export const SettingsContext =
	createContext<SettingsProviderState>(initialState);

export function SettingsProvider({ children }: SettingsProviderProps) {
	const [readingFont, setReadingFontState] = useState<ReadingFont>("Geist");
	const [readingSize, setReadingSizeState] = useState<ReadingSize>("md");
	const [readingLineHeight, setReadingLineHeightState] = useState<ReadingSize>("md");
	const [readingLetterSpacing, setReadingLetterSpacingState] =
		useState<ReadingSize>("md");

	const [dyslexicReadingFont, setDyslexicReadingFontState] =
		useState<boolean>(false);
	const [bionicReading, setBionicReadingState] = useState<boolean>(false);
	const [rsvpReading, setRSVPReadingState] = useState<boolean>(false);

	const [selectedVoice, setSelectedVoiceState] = useState<string>("default");
	const [speechSpeed, setSpeechSpeedState] = useState<SpeechSpeed>("normal");
	const [rsvpSpeed, setRSVPSpeedState] = useState<number>(300);

	// Load settings from Dexie on mount
	useEffect(() => {
		const loadSettings = async () => {
			try {
				// Initialize default settings if none exist
				await settingsService.initializeDefaultSettings();
				
				const savedSettings = await settingsService.getSettings();
				if (savedSettings) {
					setReadingFontState(savedSettings.readingFont as ReadingFont);
					setReadingSizeState(savedSettings.readingSize as ReadingSize);
					setReadingLineHeightState(savedSettings.readingLineHeight as ReadingSize);
					setReadingLetterSpacingState(savedSettings.readingLetterSpacing as ReadingSize);
					setDyslexicReadingFontState(savedSettings.dyslexicReadingFont);
					setBionicReadingState(savedSettings.bionicReading);
					setRSVPReadingState(savedSettings.rsvpReading);
					setSelectedVoiceState(savedSettings.selectedVoice);
					setSpeechSpeedState(savedSettings.speechSpeed as SpeechSpeed);
					setRSVPSpeedState(savedSettings.rsvpSpeed);
				}
			} catch (error) {
				console.error('Error loading settings:', error);
			}
		};

		loadSettings();
	}, []);

	// Wrapper functions that persist changes to Dexie
	const setReadingFont = async (font: ReadingFont) => {
		setReadingFontState(font);
		try {
			await settingsService.updateSetting('readingFont', font);
		} catch (error) {
			console.error('Error saving reading font:', error);
		}
	};

	const setReadingSize = async (size: ReadingSize) => {
		setReadingSizeState(size);
		try {
			await settingsService.updateSetting('readingSize', size);
		} catch (error) {
			console.error('Error saving reading size:', error);
		}
	};

	const setReadingLineHeight = async (size: ReadingSize) => {
		setReadingLineHeightState(size);
		try {
			await settingsService.updateSetting('readingLineHeight', size);
		} catch (error) {
			console.error('Error saving reading line height:', error);
		}
	};

	const setReadingLetterSpacing = async (size: ReadingSize) => {
		setReadingLetterSpacingState(size);
		try {
			await settingsService.updateSetting('readingLetterSpacing', size);
		} catch (error) {
			console.error('Error saving reading letter spacing:', error);
		}
	};

	const setDyslexicReadingFont = async (dyslexicFriendlyFont: boolean) => {
		setDyslexicReadingFontState(dyslexicFriendlyFont);
		try {
			await settingsService.updateSetting('dyslexicReadingFont', dyslexicFriendlyFont);
		} catch (error) {
			console.error('Error saving dyslexic reading font:', error);
		}
	};

	const setBionicReading = async (bionicReading: boolean) => {
		setBionicReadingState(bionicReading);
		try {
			await settingsService.updateSetting('bionicReading', bionicReading);
		} catch (error) {
			console.error('Error saving bionic reading:', error);
		}
	};

	const setRSVPReading = async (rsvpReading: boolean) => {
		setRSVPReadingState(rsvpReading);
		try {
			await settingsService.updateSetting('rsvpReading', rsvpReading);
		} catch (error) {
			console.error('Error saving RSVP reading:', error);
		}
	};

	const setSelectedVoice = async (voice: string) => {
		setSelectedVoiceState(voice);
		try {
			await settingsService.updateSetting('selectedVoice', voice);
		} catch (error) {
			console.error('Error saving selected voice:', error);
		}
	};

	const setSpeechSpeed = async (speed: SpeechSpeed) => {
		setSpeechSpeedState(speed);
		try {
			await settingsService.updateSetting('speechSpeed', speed);
		} catch (error) {
			console.error('Error saving speech speed:', error);
		}
	};

	const setRSVPSpeed = async (speed: number) => {
		setRSVPSpeedState(speed);
		try {
			await settingsService.updateSetting('rsvpSpeed', speed);
		} catch (error) {
			console.error('Error saving RSVP speed:', error);
		}
	};

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

				selectedVoice,
				setSelectedVoice,

				speechSpeed,
				setSpeechSpeed,

				rsvpSpeed,
				setRSVPSpeed,
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
