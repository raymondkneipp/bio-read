import Dexie, { type EntityTable } from "dexie";

export interface Reading {
	id: number;
	title: string;
	content: string;
	createdAt: Date;
	progress: number;
}

const db = new Dexie("BioReadDatabase") as Dexie & {
	readings: EntityTable<Reading, "id">;
};

db.version(1).stores({
	readings: "++id, title, content, createdAt, progress",
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

export { db };
