import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import type { Reading } from "@/db";
import { useReadings } from "@/hooks/use-readings";

export function ReadingDelete(props: {
	children: React.ReactNode;
	readingId: Reading["id"];
	title: Reading["title"];
}) {
	const { deleteReading } = useReadings();

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>{props.children}</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Remove {props.title}?</AlertDialogTitle>
					<AlertDialogDescription>
						This will permanently delete the reading and all progress associated
						with it. Are you sure you want to continue?
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction
						onClick={async () => await deleteReading(props.readingId)}
					>
						Delete
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
