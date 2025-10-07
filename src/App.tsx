import { useState } from "react";
import { Header } from "./components/header";
import { ReadingList } from "./components/reading-list";
import { ReadingView } from "./components/reading-view";
import { useSettings } from "./contexts/settings-context";
import { RSVP } from "./components/rsvp";
import { Footer } from "./components/footer";
import { useReadings } from "./hooks/use-readings";

export function App() {
	const [selectedReadingId, setSelectedReadingId] = useState<number | null>(null);
	const { rsvpReading } = useSettings();
	const { data: readings } = useReadings();
	
	// Get the current reading from the live query data
	const selectedReading = readings?.find(r => r.id === selectedReadingId) || null;

	return (
		<div className="space-y-4 sm:space-y-8 min-h-dvh flex flex-col">
			<Header
				selectedReading={selectedReading}
				onReadingChange={(reading) => {
					if (typeof reading === 'function') {
						const newReading = reading(selectedReading);
						setSelectedReadingId(newReading ? newReading.id : null);
					} else {
						setSelectedReadingId(reading ? reading.id : null);
					}
				}}
			/>

			<main className="flex-grow">
				{!selectedReading && (
					<ReadingList onReadingChange={(reading) => {
						if (typeof reading === 'function') {
							const newReading = reading(selectedReading);
							setSelectedReadingId(newReading ? newReading.id : null);
						} else {
							setSelectedReadingId(reading ? reading.id : null);
						}
					}} />
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
