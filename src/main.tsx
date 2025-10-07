import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App.tsx";
import "@fontsource-variable/montserrat";
import "@fontsource-variable/playfair-display";
import "@fontsource-variable/inter";
import "@fontsource-variable/geist";
import "@fontsource/opendyslexic/400.css";
import "@fontsource/opendyslexic/700.css";
import { Providers } from "./components/providers.tsx";
import { Toaster } from "./components/ui/sonner.tsx";

// Register service worker for PWA functionality
if ("serviceWorker" in navigator) {
	window.addEventListener("load", () => {
		navigator.serviceWorker
			.register("/sw.js")
			.then((registration) => {
				console.log("SW registered: ", registration);
			})
			.catch((registrationError) => {
				console.log("SW registration failed: ", registrationError);
			});
	});
}

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not found");

createRoot(rootElement).render(
	<StrictMode>
		<Providers>
			<App />
			<Toaster />
		</Providers>
	</StrictMode>,
);
