import { CardBacks } from "../config/cards/card_backs.ts";
import type { CardCreatorState } from "../stores/card-creator";

const DB_NAME = "fabkit-cards";
const DB_VERSION = 1;
const STORE_NAME = "cards";

export interface StoredCard {
	version: string; // __version UUID as primary key
	cardName: string;
	createdAt: number;
	updatedAt: number;
	preview: Blob;
	state: SerializedCardState;
}

export interface SerializedCardState
	extends Omit<CardCreatorState, "CardBack"> {
	CardBack: number;
}

let dbInstance: IDBDatabase | null = null;

export async function initCardDatabase(): Promise<IDBDatabase> {
	if (dbInstance) return dbInstance;

	return new Promise((resolve, reject) => {
		const request = indexedDB.open(DB_NAME, DB_VERSION);

		request.onerror = () => reject(request.error);
		request.onsuccess = () => {
			dbInstance = request.result;
			resolve(request.result);
		};

		request.onupgradeneeded = (event) => {
			const db = (event.target as IDBOpenDBRequest).result;

			if (!db.objectStoreNames.contains(STORE_NAME)) {
				const store = db.createObjectStore(STORE_NAME, { keyPath: "version" });
				store.createIndex("cardName", "cardName", { unique: false });
				store.createIndex("createdAt", "createdAt", { unique: false });
				store.createIndex("updatedAt", "updatedAt", { unique: false });
			}
		};
	});
}

export function serializeCardState(
	state: CardCreatorState,
): SerializedCardState {
	return {
		__version: state.__version,
		CardType: state.CardType,
		CardBack: state.CardBack.id,
		CardBackStyle: state.CardBackStyle,
		CardArtwork: state.CardArtwork,
		CardArtPosition: state.CardArtPosition,
		CardArtworkCredits: state.CardArtworkCredits,
		CardSetNumber: state.CardSetNumber,
		CardTextHTML: state.CardTextHTML,
		CardTextNode: state.CardTextNode,
		CardPitch: state.CardPitch,
		CardName: state.CardName,
		CardResource: state.CardResource,
		CardText: state.CardText,
		CardPower: state.CardPower,
		CardTalent: state.CardTalent,
		CardClass: state.CardClass,
		CardSecondaryClass: state.CardSecondaryClass,
		CardSubType: state.CardSubType,
		CardRarity: state.CardRarity,
		CardDefense: state.CardDefense,
		CardLife: state.CardLife,
		CardHeroIntellect: state.CardHeroIntellect,
		CardWeapon: state.CardWeapon,
		CardMacroGroup: state.CardMacroGroup,
	};
}

export function deserializeCardState(
	stored: SerializedCardState,
): Partial<CardCreatorState> {
	return {
		...stored,
		CardBack:
			CardBacks.find((back) => back.id === stored.CardBack) || CardBacks[0],
	};
}

export async function saveCard(
	name: string,
	state: CardCreatorState,
	preview: Blob,
): Promise<string> {
	const db = await initCardDatabase();
	const now = Date.now();

	const card: StoredCard = {
		version: state.__version,
		cardName: name,
		createdAt: now,
		updatedAt: now,
		preview,
		state: serializeCardState(state),
	};

	return new Promise((resolve, reject) => {
		const transaction = db.transaction([STORE_NAME], "readwrite");
		const store = transaction.objectStore(STORE_NAME);
		const request = store.add(card);

		request.onsuccess = () => resolve(state.__version);
		request.onerror = () => reject(request.error);
	});
}

export async function updateCard(
	version: string,
	state: CardCreatorState,
	preview: Blob,
): Promise<void> {
	const db = await initCardDatabase();
	const existing = await getCard(version);

	if (!existing) {
		throw new Error("Card not found");
	}

	const card: StoredCard = {
		version,
		cardName: state.CardName || "unnamed",
		createdAt: existing.createdAt,
		updatedAt: Date.now(),
		preview,
		state: serializeCardState(state),
	};

	return new Promise((resolve, reject) => {
		const transaction = db.transaction([STORE_NAME], "readwrite");
		const store = transaction.objectStore(STORE_NAME);
		const request = store.put(card);

		request.onsuccess = () => resolve();
		request.onerror = () => reject(request.error);
	});
}

export async function getCard(version: string): Promise<StoredCard | null> {
	const db = await initCardDatabase();

	return new Promise((resolve, reject) => {
		const transaction = db.transaction([STORE_NAME], "readonly");
		const store = transaction.objectStore(STORE_NAME);
		const request = store.get(version);

		request.onsuccess = () => resolve(request.result || null);
		request.onerror = () => reject(request.error);
	});
}

export async function getAllCards(): Promise<StoredCard[]> {
	const db = await initCardDatabase();

	return new Promise((resolve, reject) => {
		const transaction = db.transaction([STORE_NAME], "readonly");
		const store = transaction.objectStore(STORE_NAME);
		const index = store.index("updatedAt");
		const request = index.openCursor(null, "prev"); // Sort by updatedAt descending

		const cards: StoredCard[] = [];

		request.onsuccess = (event) => {
			const cursor = (event.target as IDBRequest).result;
			if (cursor) {
				cards.push(cursor.value);
				cursor.continue();
			} else {
				resolve(cards);
			}
		};

		request.onerror = () => reject(request.error);
	});
}

export async function deleteCard(version: string): Promise<void> {
	const db = await initCardDatabase();

	return new Promise((resolve, reject) => {
		const transaction = db.transaction([STORE_NAME], "readwrite");
		const store = transaction.objectStore(STORE_NAME);
		const request = store.delete(version);

		request.onsuccess = () => resolve();
		request.onerror = () => reject(request.error);
	});
}

async function blobToBase64(blob: Blob): Promise<string> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onloadend = () => resolve(reader.result as string);
		reader.onerror = reject;
		reader.readAsDataURL(blob);
	});
}

export async function exportCardToJSON(card: StoredCard): Promise<string> {
	// Convert preview Blob to base64
	const previewBase64 = await blobToBase64(card.preview);

	// Convert artwork Blob to base64 if it exists
	const artworkBase64 = card.state.CardArtwork
		? await blobToBase64(card.state.CardArtwork)
		: null;

	// Create exportable object with base64 images
	const exportData = {
		version: card.version,
		cardName: card.cardName,
		createdAt: card.createdAt,
		updatedAt: card.updatedAt,
		preview: previewBase64,
		state: {
			...card.state,
			CardArtwork: artworkBase64,
		},
	};

	return JSON.stringify(exportData, null, 2);
}

export function downloadCardJSON(jsonString: string, cardName: string): void {
	const blob = new Blob([jsonString], { type: "application/fabkit+json" });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = `${cardName.replace(/[^a-z0-9]/gi, "_").toLowerCase()}.fabkit`;
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
	URL.revokeObjectURL(url);
}

async function base64ToBlob(base64: string): Promise<Blob> {
	const response = await fetch(base64);
	return response.blob();
}

export async function importCardFromJSON(jsonString: string): Promise<void> {
	const data = JSON.parse(jsonString);

	// Validate basic structure
	if (!data.version || !data.cardName || !data.state) {
		throw new Error("Invalid card file format");
	}

	// Convert base64 images back to Blobs
	const preview = await base64ToBlob(data.preview);
	const artwork = data.state.CardArtwork
		? await base64ToBlob(data.state.CardArtwork)
		: null;

	// Create the stored card object
	const card: StoredCard = {
		version: data.version,
		cardName: data.cardName,
		createdAt: data.createdAt || Date.now(),
		updatedAt: Date.now(), // Update to current time on import
		preview,
		state: {
			...data.state,
			CardArtwork: artwork,
		},
	};

	// Save to IndexedDB (will overwrite if version already exists)
	const db = await initCardDatabase();
	return new Promise((resolve, reject) => {
		const transaction = db.transaction([STORE_NAME], "readwrite");
		const store = transaction.objectStore(STORE_NAME);
		const request = store.put(card); // Use put instead of add to allow overwriting

		request.onsuccess = () => resolve();
		request.onerror = () => reject(request.error);
	});
}
