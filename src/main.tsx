import { createRouter, RouterProvider } from "@tanstack/react-router";
import { ThemeProvider } from "next-themes";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import "./i18n.ts";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import {NotFound} from "./routes/not-found.tsx";

// Create a new router instance
const router = createRouter({
	routeTree,
	defaultNotFoundComponent: () => <NotFound />
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

const root = document.getElementById("root");
createRoot(root || document.body).render(
	<StrictMode>
		<ThemeProvider>
			<RouterProvider router={router} />
		</ThemeProvider>
	</StrictMode>,
);
