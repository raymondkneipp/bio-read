import { ModeToggle } from "./components/mode-toggle";
import { ReadingList } from "./components/reading-list";
import { ThemeProvider } from "./components/theme-provider";
import { Button } from "./components/ui/button";

export function App() {
	return (
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<h1 className="font-bold text-2xl">BioRead</h1>

			<p className="font-sans">The quick brown fox jumps over the lazy dog</p>
			<p className="font-dyslexic">
				The quick brown fox jumps over the lazy dog
			</p>
			<ReadingList />
			<Button>Click Me</Button>
			<ModeToggle />
		</ThemeProvider>
	);
}
