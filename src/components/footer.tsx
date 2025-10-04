import { HeartIcon } from "lucide-react";

export function Footer() {
	return (
		<footer className="border-t p-4 sm:p-8">
			<div className="container flex justify-center">
				<a
					href="https://raymondkneipp.com"
					target="_blank"
					className="text-muted-foreground text-sm hover:text-foreground hover:underline underline-offset-4"
				>
					Created with <HeartIcon className="inline size-3" /> by Raymond Kneipp
				</a>
			</div>
		</footer>
	);
}
