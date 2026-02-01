import { createRootRoute, Outlet } from "@tanstack/react-router";
import { DevBanner } from "../components/DevBanner.tsx";
import { Footer } from "../components/layout/Footer.tsx";
import { Menu } from "../components/layout/Menu.tsx";
import { ServiceWorker } from "../components/ServiceWorker.tsx";

export const Route = createRootRoute({
	component: RootComponent,
});

function RootComponent() {
	return (
		<>
			<Menu />
			<main className="flex flex-col items-center flex-1 lg:pl-72">
				<Outlet />
			</main>
			<Footer />
			<ServiceWorker />
			<DevBanner />
			{/* Decorative gradient bubble */}
			<div
				className="fixed bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none -z-10"
				style={{
					background:
						"radial-gradient(ellipse at center, rgba(166, 134, 74, 0.2) 0%, transparent 70%)",
				}}
			/>
		</>
	);
}
