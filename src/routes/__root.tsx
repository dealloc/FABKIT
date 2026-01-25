import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Footer } from "../components/Footer.tsx";
import { Menu } from "../components/Menu.tsx";

export const Route = createRootRoute({
	component: RootComponent,
});

function RootComponent() {
	return (
		<>
			<Menu />
			<main className="flex-1 lg:pl-72">
				<Outlet />
			</main>
			<Footer />
			<TanStackRouterDevtools />
		</>
	);
}
