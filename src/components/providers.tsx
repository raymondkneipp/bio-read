import { ThemeProvider } from "@/components/theme-provider";
import { SettingsProvider } from "@/contexts/settings-context";

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<SettingsProvider>{children}</SettingsProvider>
		</ThemeProvider>
	);
}
