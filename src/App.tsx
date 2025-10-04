import { useState } from "react";
import { Header } from "./components/header";
import { ReadingList } from "./components/reading-list";
import { ReadingView } from "./components/reading-view";
import { useSettings } from "./contexts/settings-context";
import { type Reading } from "./mock/readings";
import { RSVP } from "./components/rsvp";

export function App() {
	const [selectedReading, setSelectedReading] = useState<Reading | null>(null);
	const { rsvpReading } = useSettings();

	return (
		<div className="space-y-4 sm:space-y-8">
			<Header
				selectedReading={selectedReading}
				onReadingChange={setSelectedReading}
			/>

			{!selectedReading && <ReadingList onReadingChange={setSelectedReading} />}

			{selectedReading && (
				<>
					{rsvpReading ? (
						<RSVP {...selectedReading} />
					) : (
						<ReadingView {...selectedReading} />
					)}
				</>
			)}
		</div>
	);
}
