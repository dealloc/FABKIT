import { readdir, readFile, writeFile } from "node:fs/promises";

const CARDBACKS_DIR = "public/cardbacks/generated";
const VITE_CONFIG_PATH = "vite.config.ts";
const IMAGE_EXTENSIONS = [".png", ".jpg", ".jpeg", ".webp", ".svg"];

async function getCardbackImages(): Promise<string[]> {
	try {
		const files = await readdir(CARDBACKS_DIR);
		return files
			.filter((file) =>
				IMAGE_EXTENSIONS.some((ext) => file.toLowerCase().endsWith(ext)),
			)
			.map((file) => `cardbacks/generated/${file}`)
			.sort();
	} catch (error) {
		console.error(`Error reading cardbacks directory: ${error}`);
		return [];
	}
}

async function updateViteConfig(cardbackPaths: string[]): Promise<void> {
	const configContent = await readFile(VITE_CONFIG_PATH, "utf-8");

	// Find the includeAssets array
	const includeAssetsRegex = /includeAssets:\s*\[([\s\S]*?)\]/;
	const match = configContent.match(includeAssetsRegex);

	if (!match) {
		console.error("Could not find includeAssets array in vite.config.ts");
		process.exit(1);
	}

	// Build the new includeAssets array content
	const staticAssets = ["favicon.ico", "apple-touch-icon.png"];
	const allAssets = [...staticAssets, ...cardbackPaths];

	const newIncludeAssets = allAssets
		.map((asset) => `\t\t\t\t"${asset}"`)
		.join(",\n");

	const newConfig = configContent.replace(
		includeAssetsRegex,
		`includeAssets: [\n${newIncludeAssets}\n\t\t\t]`,
	);

	await writeFile(VITE_CONFIG_PATH, newConfig, "utf-8");
	console.log(
		`✅ Updated ${VITE_CONFIG_PATH} with ${cardbackPaths.length} cardback images`,
	);
}

async function main() {
	console.log("🔍 Scanning for cardback images...");
	const cardbackImages = await getCardbackImages();

	if (cardbackImages.length === 0) {
		console.warn("⚠️  No cardback images found in public/cardbacks/generated");
		return;
	}

	console.log(`📦 Found ${cardbackImages.length} cardback images`);
	await updateViteConfig(cardbackImages);
	console.log("✨ Done!");
}

main().catch((error) => {
	console.error("❌ Error:", error);
	process.exit(1);
});
