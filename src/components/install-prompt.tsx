import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Download, X, Smartphone } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
	readonly platforms: string[];
	readonly userChoice: Promise<{
		outcome: "accepted" | "dismissed";
		platform: string;
	}>;
	prompt(): Promise<void>;
}

export function InstallPrompt() {
	const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const handleBeforeInstallPrompt = (e: Event) => {
			e.preventDefault();
			setDeferredPrompt(e as BeforeInstallPromptEvent);
			setIsVisible(true);
		};

		window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

		// Check if already installed
		window.addEventListener("appinstalled", () => {
			setIsVisible(false);
			setDeferredPrompt(null);
		});

		return () => {
			window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
		};
	}, []);

	const handleInstall = async () => {
		if (!deferredPrompt) return;

		deferredPrompt.prompt();
		const { outcome } = await deferredPrompt.userChoice;
		
		if (outcome === "accepted") {
			setIsVisible(false);
		}
		
		setDeferredPrompt(null);
	};

	const handleDismiss = () => {
		setIsVisible(false);
	};

	if (!isVisible) return null;

	return (
		<div className="fixed bottom-4 left-4 z-50 max-w-sm">
			<Card className="border-2 border-primary/20 shadow-lg">
				<CardHeader className="pb-3">
					<div className="flex items-center justify-between">
						<CardTitle className="text-sm font-medium flex items-center gap-2">
							<Smartphone className="h-4 w-4" />
							Install BioRead
						</CardTitle>
						<Button
							variant="ghost"
							size="sm"
							onClick={handleDismiss}
							className="h-6 w-6 p-0"
						>
							<X className="h-4 w-4" />
						</Button>
					</div>
					<CardDescription className="text-xs">
						Install BioRead on your device for a better reading experience and offline access.
					</CardDescription>
				</CardHeader>
				<CardContent className="pt-0">
					<div className="flex gap-2">
						<Button onClick={handleInstall} size="sm" className="flex-1">
							<Download className="mr-2 h-4 w-4" />
							Install
						</Button>
						<Button onClick={handleDismiss} variant="outline" size="sm">
							Not Now
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
