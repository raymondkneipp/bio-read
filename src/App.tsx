import { ModeToggle } from "./components/mode-toggle";
import { ReadingList } from "./components/reading-list";
import { ThemeProvider } from "./components/theme-provider";
import { Button } from "./components/ui/button";

export function App() {
	return (
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<h1>BioRead</h1>
			<ReadingList />
			<Button>Click Me</Button>
			<ModeToggle />
		</ThemeProvider>
	);
}
