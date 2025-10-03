import { ModeToggle } from "@/components/mode-toggle";

export function Header() {
	return (
		<header className="border-b p-4 sm:p-8 flex items-center justify-between">
			<span className="font-bold text-lg">BioRead</span>

			<ModeToggle />
		</header>
	);
}
