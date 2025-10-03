import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { readings } from "@/mock/readings";
import { PlusIcon } from "lucide-react";

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
						<CardDescription>Card Description</CardDescription>
						<CardAction>Card Action</CardAction>
					</CardHeader>
					<CardContent>
						{/* TODO: Show preview of where user left off */}
						<p className="line-clamp-2">{reading.content.slice(0, 400)}</p>
					</CardContent>
					<CardFooter>
						<p>Card Footer</p>
					</CardFooter>
				</Card>
			))}
		</div>
	);
}
