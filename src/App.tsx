import { ModeToggle } from "./components/mode-toggle";
import { ThemeProvider } from "./components/theme-provider";
import { Button } from "./components/ui/button";

export function App() {
	return (
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<h1>BioRead</h1>
			<Button>Click Me</Button>
			<ModeToggle />
		</ThemeProvider>
	);
}
