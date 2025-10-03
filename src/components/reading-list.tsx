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

export function ReadingList() {
	return (
		<div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
			<Card className="border-dashed bg-background">
				<CardHeader>
					<CardTitle className="text-center">New Reading</CardTitle>
				</CardHeader>
				<CardContent>
					<PlusIcon className="size-24 mx-auto text-muted-foreground" />
				</CardContent>
			</Card>

			{readings.map((reading) => (
				<Card>
					<CardHeader>
						<CardTitle>{reading.title}</CardTitle>
						<CardDescription>
							{reading.createdAt.toLocaleString()}
						</CardDescription>
					</CardHeader>
					<CardContent>
						{/* TODO: Show preview of where user left off */}
						<p className="line-clamp-2">{reading.content.slice(0, 400)}</p>
					</CardContent>
					<CardFooter className="justify-end">
						<Button variant="ghost" size="icon">
							<PencilIcon />
						</Button>
						<Button variant="ghost" size="icon">
							<TrashIcon />
						</Button>
					</CardFooter>
				</Card>
			))}
		</div>
	);
}
