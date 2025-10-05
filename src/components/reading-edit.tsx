import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "./ui/label";
import TextareaAutosize from "react-textarea-autosize";
import { Button } from "./ui/button";
import { useReadings } from "@/hooks/use-readings";
import { useEffect, useState } from "react";
import { z } from "zod";
import type { Reading } from "@/db";
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

export function ReadingEdit(props: {
	reading: Reading;
	children: React.ReactNode;
}) {
	const [title, setTitle] = useState(props.reading.title);
	const [content, setContent] = useState(props.reading.content);
	const [errors, setErrors] = useState<z.ZodError<{
		title: string;
		content: string;
	}> | null>(null);
	const [open, setOpen] = useState(false);

	const { editReading } = useReadings();

	const saveChanges = (resetProgress: boolean) => {
		const schema = z.object({
			title: z.string().min(3, "Too short").max(50, "Too long"),
			content: z.string().min(50, "Must be 50 characters or more"),
		});

		const results = schema.safeParse({ title, content });

		if (!results.success) {
			setErrors(results.error);
			return;
		}

		editReading(
			{
				id: props.reading.id,
				title,
				content,
			},
			resetProgress,
		);

		setOpen(false);
		setErrors(null);
	};

	useEffect(() => {
		if (open) {
			setTitle(props.reading.title ?? "");
			setContent(props.reading.content ?? "");
		}
	}, [open, props.reading.title, props.reading.content]);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{props.children}</DialogTrigger>
			<DialogContent className="max-h-svh">
				<DialogHeader>
					<DialogTitle>Edit Reading</DialogTitle>
				</DialogHeader>

				<div className="grid w-full gap-4">
					<InputGroup>
						<InputGroupInput
							id="title"
							placeholder="The..."
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
						<InputGroupAddon align="block-start">
							<Label htmlFor="title" className="text-foreground">
								Title
							</Label>
						</InputGroupAddon>
						{errors && z.treeifyError(errors).properties?.title && (
							<InputGroupAddon align="block-end">
								<Label htmlFor="title" className="text-destructive text-xs">
									{z.treeifyError(errors).properties?.title?.errors[0]}
								</Label>
							</InputGroupAddon>
						)}
					</InputGroup>

					<InputGroup>
						<InputGroupAddon align="block-start">
							<Label htmlFor="content" className="text-foreground">
								Content
							</Label>
						</InputGroupAddon>
						<TextareaAutosize
							value={content}
							onChange={(e) => setContent(e.target.value)}
							id="content"
							data-slot="input-group-control"
							className="dark:bg-transparent flex field-sizing-content min-h-16 w-full resize-none rounded-md bg-transparent px-3 py-2 text-sm transition-[color,box-shadow] outline-none max-h-[50svh]"
							placeholder="Once upon a time..."
						/>

						{errors && z.treeifyError(errors).properties?.content && (
							<InputGroupAddon align="block-end">
								<Label htmlFor="title" className="text-destructive text-xs">
									{z.treeifyError(errors).properties?.content?.errors[0]}
								</Label>
							</InputGroupAddon>
						)}
					</InputGroup>
				</div>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant="outline">Cancel</Button>
					</DialogClose>

					<AlertDialog>
						<AlertDialogTrigger asChild>
							<Button>Save changes</Button>
						</AlertDialogTrigger>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle>Reset your progress?</AlertDialogTitle>
								<AlertDialogDescription>
									Since this reading was changed, do you want to reset your
									progress?
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel onClick={() => saveChanges(false)}>
									No
								</AlertDialogCancel>
								<AlertDialogAction onClick={() => saveChanges(true)}>
									Yes
								</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
