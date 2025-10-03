import type { Reading } from "@/mock/readings";
import { Progress } from "@/components/ui/progress";

export function ReadingView(props: Reading) {
	return (
		<div>
			<div className="max-w-prose mx-auto space-y-4 sm:space-y-8">
				<h1 className="font-bold text-3xl">{props.title}</h1>

				<div>{props.content}</div>
			</div>

			<Progress
				value={(props.progress * 100) / props.content.split(" ").length}
				className="fixed bottom-0 left-0 right-0 rounded-none"
			/>
		</div>
	);
}
