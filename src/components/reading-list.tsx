import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { PencilIcon, PlusIcon, TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { readings } from "@/mock/readings";
import { Progress } from "./ui/progress";

export function ReadingList() {
	return (
		<div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
			<Card className="border-dashed bg-background shadow-none">
				<CardHeader>
					<CardTitle className="text-center">New Reading</CardTitle>
				</CardHeader>
				<CardContent>
					<PlusIcon className="size-24 mx-auto text-muted-foreground" />
				</CardContent>
			</Card>

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
					<CardFooter className="justify-end">
						<Button variant="ghost" size="icon">
							<PencilIcon />
						</Button>
						<Button variant="ghost" size="icon">
							<TrashIcon />
						</Button>
					</CardFooter>

					<Progress
						value={(reading.progress * 100) / reading.content.split(" ").length}
						className="absolute bottom-0 left-0 right-0 rounded-none"
					/>
				</Card>
			))}
		</div>
	);
}
