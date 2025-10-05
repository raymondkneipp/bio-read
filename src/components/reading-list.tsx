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

export function ReadingList(props: {
	onReadingChange: React.Dispatch<React.SetStateAction<Reading | null>>;
}) {
	const { data } = useReadings();

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
							{/* TODO: Show preview of where user left off */}
							<p className="line-clamp-3 break-all">
								{reading.content.slice(0, 160)}
							</p>
						</CardContent>
						<CardFooter className="justify-between">
							<Button
								variant="link"
								onClick={() => props.onReadingChange(reading)}
							>
								{reading.progress > 0 ? "Continue Reading" : "Start Reading"}
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
