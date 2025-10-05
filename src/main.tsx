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

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Providers>
			<App />
			<Toaster />
		</Providers>
	</StrictMode>,
);
