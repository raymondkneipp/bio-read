import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App.tsx";
import "@fontsource-variable/montserrat";
import "@fontsource/opendyslexic/400.css";
import "@fontsource/opendyslexic/700.css";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<App />
	</StrictMode>,
);
