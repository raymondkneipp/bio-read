import { useEffect, useState } from "react";
import { Card, CardContent } from "./ui/card";
import { WifiOff, Wifi } from "lucide-react";

export function OfflineIndicator() {
	const [isOnline, setIsOnline] = useState(navigator.onLine);
	const [showOfflineMessage, setShowOfflineMessage] = useState(false);

	useEffect(() => {
		const handleOnline = () => {
			setIsOnline(true);
			setShowOfflineMessage(false);
		};

		const handleOffline = () => {
			setIsOnline(false);
			setShowOfflineMessage(true);
		};

		window.addEventListener("online", handleOnline);
		window.addEventListener("offline", handleOffline);

		return () => {
			window.removeEventListener("online", handleOnline);
			window.removeEventListener("offline", handleOffline);
		};
	}, []);

	if (!showOfflineMessage) return null;

	return (
		<div className="fixed top-4 left-4 right-4 z-50 max-w-sm mx-auto">
			<Card className={`border-2 shadow-lg transition-all duration-300 ${
				isOnline 
					? "border-green-500/20 bg-green-50 dark:bg-green-950/20" 
					: "border-orange-500/20 bg-orange-50 dark:bg-orange-950/20"
			}`}>
				<CardContent className="flex items-center gap-3 p-4">
					{isOnline ? (
						<Wifi className="h-5 w-5 text-green-600 dark:text-green-400" />
					) : (
						<WifiOff className="h-5 w-5 text-orange-600 dark:text-orange-400" />
					)}
					<div className="flex-1">
						<p className="text-sm font-medium">
							{isOnline ? "Back Online" : "You're Offline"}
						</p>
						<p className="text-xs text-muted-foreground">
							{isOnline 
								? "Your connection has been restored." 
								: "Don't worry! You can still read your saved content offline."
							}
						</p>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
