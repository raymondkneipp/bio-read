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
import { readings, type Reading } from "@/mock/readings";
import { Progress } from "@/components/ui/progress";
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@/components/ui/empty";

export function ReadingList(props: {
	onReadingChange: React.Dispatch<React.SetStateAction<Reading | null>>;
}) {
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
						<Button onClick={() => alert("TODO: Implement add reading")}>
							Add Reading
						</Button>
					</EmptyContent>
				</Empty>

				{readings.map((reading) => (
					<Card className="relative overflow-hidden">
						<CardHeader>
							<CardTitle>{reading.title}</CardTitle>
							<CardDescription>
								{reading.createdAt.toLocaleString()}
							</CardDescription>
						</CardHeader>
						<CardContent>
							{/* TODO: Show preview of where user left off */}
							<p className="line-clamp-3">{reading.content.slice(0, 160)}</p>
						</CardContent>
						<CardFooter className="justify-between">
							<Button
								variant="link"
								onClick={() => props.onReadingChange(reading)}
							>
								{reading.progress > 0 ? "Continue Reading" : "Start Reading"}
							</Button>

							<div className="flex items-center gap-1">
								<Button variant="ghost" size="icon">
									<PencilIcon />
								</Button>
								<Button variant="ghost" size="icon">
									<TrashIcon />
								</Button>
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
