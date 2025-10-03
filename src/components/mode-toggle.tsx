import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTheme, type Theme } from "@/components/theme-provider";
import { Label } from "./ui/label";

export function ModeToggle() {
	const { setTheme, theme } = useTheme();

	return (
		<div className="space-y-1.5">
			<Label htmlFor="theme">Theme</Label>
			<Tabs
				defaultValue={theme}
				onValueChange={(theme) => setTheme(theme as Theme)}
				id="theme"
			>
				<TabsList className="w-full">
					<TabsTrigger value="light">Light</TabsTrigger>
					<TabsTrigger value="dark">Dark</TabsTrigger>
					<TabsTrigger value="system">System</TabsTrigger>
				</TabsList>
			</Tabs>
		</div>
	);
}
