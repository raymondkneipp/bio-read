import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Download, X } from "lucide-react";

export function PWAUpdate() {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		// Listen for service worker updates
		if ("serviceWorker" in navigator) {
			navigator.serviceWorker.addEventListener("controllerchange", () => {
				setIsVisible(true);
			});
		}
	}, []);

	const handleUpdate = () => {
		// Reload the page to get the new service worker
		window.location.reload();
	};

	const handleDismiss = () => {
		setIsVisible(false);
	};

	if (!isVisible) return null;

	return (
		<div className="fixed bottom-4 right-4 z-50 max-w-sm">
			<Card className="border-2 border-primary/20 shadow-lg">
				<CardHeader className="pb-3">
					<div className="flex items-center justify-between">
						<CardTitle className="text-sm font-medium">Update Available</CardTitle>
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
						A new version of BioRead is available. Update to get the latest features and improvements.
					</CardDescription>
				</CardHeader>
				<CardContent className="pt-0">
					<div className="flex gap-2">
						<Button onClick={handleUpdate} size="sm" className="flex-1">
							<Download className="mr-2 h-4 w-4" />
							Update Now
						</Button>
						<Button onClick={handleDismiss} variant="outline" size="sm">
							Later
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
