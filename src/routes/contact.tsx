import { createFileRoute } from "@tanstack/react-router";
import { Discord } from "../components/icons/Discord.tsx";
import { Github } from "../components/icons/Github.tsx";

export const Route = createFileRoute("/contact")({
	component: ContactPage,
});

const contactLinks = [
	{
		name: "GitHub Repository",
		description: "Report issues, contribute code, or check our latest updates",
		href: "https://github.com/FABKIT/FABKIT",
		icon: Github,
	},
	{
		name: "Discord Community",
		description:
			"Join our server for support, discussions and showing off your custom cards!",
		href: "https://discord.gg/4twcdby9xp",
		icon: Discord,
	},
];

const teamMembers = [
	{
		name: "@Thencros",
		role: "UI/UX Designer, Creative Director",
		description: "Product concept, graphic design & UI development",
		avatar: "/img/Thencros.svg",
		avatarCredit: "Avatar by Diana Johanna Velasquez",
	},
	{
		name: "@Lambstream",
		role: "Lead Developer",
		description: "Frontend development & application architecture",
		avatar: "/img/Lambstream.svg",
		avatarCredit: "Avatar by Diana Johanna Velasquez",
	},
];

const specialMentions = [
	{
		name: "Animoose",
		description: "Creator of FabCustomCardCreator.com, a huge inspiration!",
	},
	{
		name: "SalisburyBavo",
		description: "Beta tester in the early stages of FABKIT",
	},
];

const supporters = [
    'SalisburyBavo',
    'SalisburyBavo',
    'SalisburyBavo',
    'SalisburyBavo',
    'SalisburyBavo',
    'SalisburyBavo',
    'SalisburyBavo',
    'SalisburyBavo',
    'SalisburyBavo',
]

function ContactPage() {
	return (
		<div className="min-h-screen bg-white dark:bg-dark">
			{/* Header */}
			<div className="border-b border-primary/20 bg-white dark:bg-dark">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="py-8">
						<h1 className="text-3xl font-bold text-primary dark:text-white">
							Contact us
						</h1>
						<p className="mt-2 text-primary/70 dark:text-white/70">
							Give your feedback on FABKIT
						</p>
					</div>
				</div>
			</div>

			<div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
					{/* Left Column */}
					<div className="space-y-8">
						{/* Get in Touch */}
						<div className="rounded-lg border-2 border-primary/20 bg-white shadow-lg dark:bg-dark">
							<div className="border-b border-primary/20 bg-primary/5 px-6 py-4 dark:bg-primary/10">
								<h2 className="text-xl font-semibold text-primary dark:text-white">
									Get in Touch
								</h2>
								<p className="mt-1 text-sm text-primary/70 dark:text-white/70">
									Connect with us through these platforms
								</p>
							</div>
							<div className="space-y-4 p-6">
								{contactLinks.map((link) => (
									<a
										key={link.name}
										href={link.href}
										target="_blank"
										rel="noreferrer"
										className="group flex items-center gap-4 rounded-lg border-2 border-primary/20 p-4 transition-all duration-200 hover:border-primary/40 hover:bg-primary/5"
									>
										<div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
											<link.icon className="h-6 w-6 text-primary" />
										</div>
										<div>
											<h3 className="font-semibold text-primary dark:text-white">
												{link.name}
											</h3>
											<p className="text-sm text-primary/70 dark:text-white/70">
												{link.description}
											</p>
										</div>
									</a>
								))}
							</div>
						</div>

						{/* About Section */}
						<div className="rounded-lg border-2 border-primary/20 bg-white shadow-lg dark:bg-dark">
							<div className="border-b border-primary/20 bg-primary/5 px-6 py-4 dark:bg-primary/10">
								<h2 className="text-xl font-semibold text-primary dark:text-white">
									About FABKIT
								</h2>
							</div>
							<div className="space-y-4 p-6 text-primary/80 leading-relaxed dark:text-white/80">
								<p>
									Our goal is simple: creating high-quality tools for the Flesh
									and Blood TCG community. As passionate FaB players ourselves,
									we saw opportunities to build meaningful tools for fellow
									enthusiasts.
								</p>
								<p>
									Our current flagship tool is the Custom Card Creator. We've
									invested considerable effort into making sure our tool
									generates cards that look as close to real Flesh and Blood
									cards as possible – complete with official fonts, proper
									symbols, and meticulously crafted templates.
								</p>
								<p>
									We believe these great tools should be accessible to everyone,
									which is why FABKIT runs entirely in your browser without
									requiring downloads. Our commitment to the community extends
									to making the platform open source, allowing players to
									contribute and help shape our future.
								</p>
								<p>
									This project is a labor of love that we actively develop in
									our spare time, driven purely by our passion for the game.
									We're not sponsored or backed by anyone, we're just some
									friends who wanted to build something awesome for fellow
									players. However, any{" "}
									<a
										href="https://ko-fi.com/fabkit"
										className="text-primary underline"
									>
										support
									</a>{" "}
									will help us dedicate more time to bringing new features to
									life and keeping everything free for the community.
								</p>
							</div>
						</div>
					</div>

					{/* Right Column */}
					<div className="space-y-8">
						{/* Our Team */}
						<div className="rounded-lg border-2 border-primary/20 bg-white shadow-lg dark:bg-dark">
							<div className="border-b border-primary/20 bg-primary/5 px-6 py-4 dark:bg-primary/10">
								<h2 className="text-xl font-semibold text-primary dark:text-white">
									Our Team
								</h2>
								<p className="mt-1 text-sm text-primary/70 dark:text-white/70">
									The people behind FABKIT
								</p>
							</div>
							<div className="space-y-6 p-6">
								{teamMembers.map((member) => (
									<div
										key={member.name}
										className="rounded-lg border border-primary/20 bg-primary/5 p-6 dark:bg-primary/10"
									>
										<div className="flex items-center gap-6">
											<div className="relative flex h-24 w-24 items-center justify-center">
												<img src={member.avatar} alt={member.name} />
											</div>
											<div>
												<h3 className="text-lg font-semibold text-primary dark:text-white">
													{member.name}
												</h3>
												<p className="text-primary/70 dark:text-white/70">
													{member.role}
												</p>
												<p className="mt-1 text-sm text-primary/60 dark:text-white/60">
													{member.description}
												</p>
											</div>
										</div>
										<div className="mt-3 text-right">
											<p className="text-xs text-primary/40 dark:text-white/40">
												{member.avatarCredit}
											</p>
										</div>
									</div>
								))}
							</div>
						</div>

						{/* Special Mentions */}
						<div className="rounded-lg border-2 border-primary/20 bg-white shadow-lg dark:bg-dark">
							<div className="border-b border-primary/20 bg-primary/5 px-6 py-4 dark:bg-primary/10">
								<h2 className="text-xl font-semibold text-primary dark:text-white">
									Special Mentions
								</h2>
							</div>
							<div className="max-h-32 space-y-2 overflow-y-auto p-4">
								{specialMentions.map((mention) => (
									<div
										key={mention.name}
										className="rounded bg-primary/5 p-3 text-sm text-primary/80 dark:bg-primary/10 dark:text-white/80"
									>
										<span className="font-semibold text-primary dark:text-white">
											{mention.name}
										</span>
										<span className="text-primary/60 dark:text-white/60">
											{" "}
											- {mention.description}
										</span>
									</div>
								))}
							</div>
						</div>

						{/* Ko-Fi Supporters */}
						<div className="rounded-lg border-2 border-primary/20 bg-white shadow-lg dark:bg-dark">
							<div className="border-b border-primary/20 bg-primary/5 px-6 py-4 dark:bg-primary/10">
								<h2 className="text-xl font-semibold text-primary dark:text-white">
									Ko-Fi Supporters
								</h2>
							</div>
							<div className="max-h-32 overflow-y-auto p-4">
                                {supporters.map((supporter) => (
                                    <div key={supporter} className="rounded bg-primary/5 p-3 text-sm text-primary/80 dark:bg-primary/10 dark:text-white/80 mb-2">
                                        <span className="font-medium">{supporter}</span>
                                    </div>
                                ))}
                                <div className="py-4 text-center text-xs italic text-primary/60 dark:text-white/60">
									Every supporter gets their name on our website as well as a
									role on our discord server!
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
