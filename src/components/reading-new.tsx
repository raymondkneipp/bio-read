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
import { useState } from "react";
import { z } from "zod";

export function ReadingNew() {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [errors, setErrors] = useState<z.ZodError<{
		title: string;
		content: string;
	}> | null>(null);
	const [open, setOpen] = useState(false);

	const { createReading } = useReadings();

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button>Add Reading</Button>
			</DialogTrigger>
			<DialogContent className="max-h-svh">
				<DialogHeader>
					<DialogTitle>New Reading</DialogTitle>
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
					<Button
						type="submit"
						onClick={() => {
							const schema = z.object({
								title: z.string().min(3, "Too short").max(50, "Too long"),
								content: z.string().min(50, "Must be 50 characters or more"),
							});

							const results = schema.safeParse({ title, content });

							if (!results.success) {
								setErrors(results.error);
								return;
							}

							createReading({
								title,
								content,
								progress: 0,
								createdAt: new Date(),
							});

							setTitle("");
							setContent("");
							setOpen(false);
							setErrors(null);
						}}
					>
						Add reading
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
