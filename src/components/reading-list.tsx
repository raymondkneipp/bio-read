import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { BookOpenIcon, PencilIcon, TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@/components/ui/empty";
import { useReadings } from "@/hooks/use-readings";
import type { Reading } from "@/db";
import { ReadingNew } from "./reading-new";
import { ReadingEdit } from "./reading-edit";
import { ReadingDelete } from "./reading-delete";
import { db } from "@/db";

export function ReadingList(props: {
	onReadingChange: React.Dispatch<React.SetStateAction<Reading | null>>;
}) {
	const { data } = useReadings();

	// Function to get preview text based on word count progress
	const getPreviewText = (content: string, wordProgress: number) => {
		const words = content.split(/\s+/);
		const totalWords = words.length;
		
		// If no progress, show beginning
		if (wordProgress === 0) {
			const preview = words.slice(0, 20).join(" ");
			return totalWords > 20 ? preview + "..." : preview;
		}
		
		// If progress is beyond content, show end
		if (wordProgress >= totalWords) {
			const preview = words.slice(-20).join(" ");
			return totalWords > 20 ? "..." + preview : preview;
		}
		
		// Show words around the current progress point
		const startIndex = Math.max(0, wordProgress - 10);
		const endIndex = Math.min(totalWords, wordProgress + 10);
		const preview = words.slice(startIndex, endIndex).join(" ");
		const needsEllipsis = startIndex > 0 || endIndex < totalWords;
		return needsEllipsis ? "..." + preview + "..." : preview;
	};

	// Function to check if reading is complete
	const isReadingComplete = (reading: Reading) => {
		const totalWords = reading.content.split(/\s+/).length;
		return reading.progress >= totalWords;
	};

	// Function to handle reading click (start/continue/read again)
	const handleReadingClick = async (reading: Reading) => {
		if (isReadingComplete(reading)) {
			// Reset progress for "Read again"
			await db.readings.update(reading.id, { progress: 0 });
			// Update the reading object with reset progress
			const updatedReading = { ...reading, progress: 0 };
			props.onReadingChange(updatedReading);
		} else {
			// Continue reading from current progress
			props.onReadingChange(reading);
		}
	};

	return (
		<div className="container space-y-4 sm:space-y-8">
			<h1 className="font-bold text-3xl">Your Readings</h1>

			<div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
				<Empty className="col-span-full max-w-md mx-auto">
					<EmptyHeader>
						<EmptyMedia variant="icon">
							<BookOpenIcon />
						</EmptyMedia>
					</EmptyHeader>
					<EmptyTitle>Add Reading</EmptyTitle>
					<EmptyDescription>
						Add books, essays, or study materials you need to read. Keep
						everything organized in one place.
					</EmptyDescription>
					<EmptyContent>
						<ReadingNew />
					</EmptyContent>
				</Empty>

				{data?.map((reading) => (
					<Card className="relative overflow-hidden" key={reading.id}>
						<CardHeader>
							<CardTitle>{reading.title}</CardTitle>
							<CardDescription>
								{reading.createdAt.toLocaleString()}
							</CardDescription>
						</CardHeader>
						<CardContent className="flex-grow">
							<p className="line-clamp-3 text-muted-foreground">
								{getPreviewText(reading.content, reading.progress)}
							</p>
						</CardContent>
						<CardFooter className="justify-between">
							<Button
								variant="link"
								onClick={() => handleReadingClick(reading)}
							>
								{isReadingComplete(reading) 
									? "Read Again" 
									: reading.progress > 0 
										? "Continue Reading" 
										: "Start Reading"
								}
							</Button>

							<div className="flex items-center gap-1">
								<ReadingEdit reading={reading}>
									<Button variant="ghost" size="icon">
										<PencilIcon />
									</Button>
								</ReadingEdit>
								<ReadingDelete readingId={reading.id} title={reading.title}>
									<Button variant="ghost" size="icon">
										<TrashIcon />
									</Button>
								</ReadingDelete>
							</div>
						</CardFooter>

						<Progress
							value={
								(reading.progress * 100) / reading.content.split(" ").length
							}
							className="absolute bottom-0 left-0 right-0 rounded-none"
						/>
					</Card>
				))}
			</div>
		</div>
	);
}
