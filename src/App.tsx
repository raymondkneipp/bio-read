import { Header } from "./components/header";
import { ReadingList } from "./components/reading-list";
import { ReadingView } from "./components/reading-view";
import { ThemeProvider } from "./components/theme-provider";
import { SettingsProvider } from "./contexts/settings-context";
import { readings } from "./mock/readings";

export function App() {
	return (
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<SettingsProvider>
				<div className="space-y-4 sm:space-y-8">
					<Header />

					<ReadingList />

					<ReadingView {...readings[1]} />
				</div>
			</SettingsProvider>
		</ThemeProvider>
	);
}
