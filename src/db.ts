import Dexie, { type EntityTable } from "dexie";

export interface Reading {
	id: number;
	title: string;
	content: string;
	createdAt: Date;
	progress: number;
}

export interface Settings {
	id: number;
	readingFont: string;
	readingSize: string;
	readingLineHeight: string;
	readingLetterSpacing: string;
	dyslexicReadingFont: boolean;
	bionicReading: boolean;
	rsvpReading: boolean;
	selectedVoice: string;
	speechSpeed: string;
	rsvpSpeed: number;
	updatedAt: Date;
}

const db = new Dexie("BioReadDatabase") as Dexie & {
	readings: EntityTable<Reading, "id">;
	settings: EntityTable<Settings, "id">;
};

db.version(1).stores({
	readings: "++id, title, content, createdAt, progress",
});

db.version(2).stores({
	readings: "++id, title, content, createdAt, progress",
	settings: "++id, readingFont, readingSize, readingLineHeight, readingLetterSpacing, dyslexicReadingFont, bionicReading, rsvpReading, selectedVoice, speechSpeed, rsvpSpeed, updatedAt",
});

db.on("populate", async () => {
	await db.readings.add({
		id: 1,
		title: "Welcome to BioRead",
		content: `What is BioRead?

BioRead is a modern reading app designed to make reading more comfortable, focused, and personal. Whether you’re studying for school, reading articles, or diving into longer texts, BioRead helps you stay engaged while keeping track of your progress automatically. It supports light and dark mode, works entirely offline, and gives you complete control over how you read. You can adjust font size, line height, and letter spacing, choose your favorite font family, or toggle a dyslexic-friendly font to make text easier to process.

Bionic Reading Mode

Bionic Reading is a unique reading method that highlights the first few letters of each word to guide your eyes naturally through the text. By emphasizing just the right amount, your brain fills in the rest, helping you read faster while maintaining comprehension. It’s especially helpful for staying focused on long passages. In BioRead, you can enable or disable Bionic Reading anytime to find the style that fits your rhythm.

RSVP Reading Mode

RSVP (Rapid Serial Visual Presentation) is designed to improve reading focus and speed by showing one word at a time in the same spot on your screen. This eliminates the need for your eyes to move across lines of text, reducing strain and helping you maintain flow. BioRead’s RSVP mode lets you set your own speed, allowing for a smoother and more focused reading experience.

Read Aloud

Prefer to listen instead of read? BioRead’s Read Aloud feature brings your text to life using natural-sounding voices. You can choose the voice and speaking rate that suit you best — perfect for multitasking, listening on the go, or reinforcing comprehension through audio. Combined with offline access, it ensures you can keep up with your readings anytime, anywhere.

Your Reading, Your Way

With BioRead, every part of your reading experience is in your control — from how the words look to how they sound. It’s flexible, accessible, and built to help you stay focused, learn more efficiently, and enjoy reading in the way that feels right for you.`,
		progress: 0,
		createdAt: new Date(),
	});
});

// Database utility functions
export const dbUtils = {
	async clearAllData(): Promise<void> {
		try {
			await db.settings.clear();
			await db.readings.clear();
		} catch (error) {
			console.error('Error clearing database:', error);
			throw error;
		}
	},

	async resetSettings(): Promise<void> {
		try {
			await db.settings.clear();
		} catch (error) {
			console.error('Error resetting settings:', error);
			throw error;
		}
	}
};

// Settings service functions
export const settingsService = {
	async getSettings(): Promise<Settings | null> {
		try {
			const settings = await db.settings.orderBy('updatedAt').last();
			return settings || null;
		} catch (error) {
			console.error('Error getting settings:', error);
			return null;
		}
	},

	async initializeDefaultSettings(): Promise<void> {
		try {
			const existingSettings = await db.settings.orderBy('updatedAt').last();
			if (!existingSettings) {
				const defaultSettings: Omit<Settings, 'id' | 'updatedAt'> = {
					readingFont: "Geist",
					readingSize: "md",
					readingLineHeight: "md",
					readingLetterSpacing: "md",
					dyslexicReadingFont: false,
					bionicReading: false,
					rsvpReading: false,
					selectedVoice: "default",
					speechSpeed: "normal",
					rsvpSpeed: 300,
				};
				
				await db.settings.add({
					...defaultSettings,
					updatedAt: new Date(),
				});
			}
		} catch (error) {
			console.error('Error initializing default settings:', error);
			throw error;
		}
	},

	async saveSettings(settingsData: Omit<Settings, 'id' | 'updatedAt'>): Promise<void> {
		try {
			// Clear all existing settings and add new one
			await db.settings.clear();
			await db.settings.add({
				...settingsData,
				updatedAt: new Date(),
			});
		} catch (error) {
			console.error('Error saving settings:', error);
			throw error;
		}
	},

	async updateSetting<K extends keyof Omit<Settings, 'id' | 'updatedAt'>>(
		key: K,
		value: Settings[K]
	): Promise<void> {
		try {
			const existingSettings = await db.settings.orderBy('updatedAt').last();
			
			if (existingSettings) {
				await db.settings.update(existingSettings.id, {
					[key]: value,
					updatedAt: new Date(),
				});
			} else {
				// Create new settings if none exist - use upsert to avoid constraint errors
				const defaultSettings: Omit<Settings, 'id' | 'updatedAt'> = {
					readingFont: "Geist",
					readingSize: "md",
					readingLineHeight: "md",
					readingLetterSpacing: "md",
					dyslexicReadingFont: false,
					bionicReading: false,
					rsvpReading: false,
					selectedVoice: "default",
					speechSpeed: "normal",
					rsvpSpeed: 300,
				};
				
				// Use put instead of add to avoid constraint errors
				await db.settings.put({
					...defaultSettings,
					[key]: value,
					id: 1, // Use a fixed ID for settings
					updatedAt: new Date(),
				});
			}
		} catch (error) {
			console.error('Error updating setting:', error);
			// If there's still an error, try to clear and recreate
			try {
				await db.settings.clear();
				const defaultSettings: Omit<Settings, 'id' | 'updatedAt'> = {
					readingFont: "Geist",
					readingSize: "md",
					readingLineHeight: "md",
					readingLetterSpacing: "md",
					dyslexicReadingFont: false,
					bionicReading: false,
					rsvpReading: false,
					selectedVoice: "default",
					speechSpeed: "normal",
					rsvpSpeed: 300,
				};
				
				await db.settings.add({
					...defaultSettings,
					[key]: value,
					updatedAt: new Date(),
				});
			} catch (retryError) {
				console.error('Error retrying settings creation:', retryError);
				throw retryError;
			}
		}
	}
};

export { db };
