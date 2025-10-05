import { useState } from "react";
import { Header } from "./components/header";
import { ReadingList } from "./components/reading-list";
import { ReadingView } from "./components/reading-view";
import { useSettings } from "./contexts/settings-context";
import { RSVP } from "./components/rsvp";
import { Footer } from "./components/footer";
import type { Reading } from "./db";

export function App() {
	const [selectedReading, setSelectedReading] = useState<Reading | null>(null);
	const { rsvpReading } = useSettings();

	return (
		<div className="space-y-4 sm:space-y-8 min-h-dvh flex flex-col">
			<Header
				selectedReading={selectedReading}
				onReadingChange={setSelectedReading}
			/>

			<main className="flex-grow">
				{!selectedReading && (
					<ReadingList onReadingChange={setSelectedReading} />
				)}

				{selectedReading && (
					<>
						{rsvpReading ? (
							<RSVP {...selectedReading} />
						) : (
							<ReadingView {...selectedReading} />
						)}
					</>
				)}
			</main>

			{!selectedReading && <Footer />}
		</div>
	);
}
