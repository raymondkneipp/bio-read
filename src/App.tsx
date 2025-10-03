import { Header } from "./components/header";
import { ReadingList } from "./components/reading-list";
import { ThemeProvider } from "./components/theme-provider";
import { Button } from "./components/ui/button";

export function App() {
	return (
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<div className="space-y-4 sm:space-y-8">
				<Header />

				<ReadingList />
				<Button>Click Me</Button>
			</div>
		</ThemeProvider>
	);
}
