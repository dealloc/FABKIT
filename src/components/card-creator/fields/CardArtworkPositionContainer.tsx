import type * as React from "react";
import { type ReactNode, useCallback, useRef } from "react";
import { useCardCreator } from "../../../stores/card-creator";

interface CardArtworkPositionContainerProps {
	children: ReactNode;
}

const getTouchDistance = (touches: React.TouchList) => {
	if (touches.length < 2) return null;
	const dx = touches[0].clientX - touches[1].clientX;
	const dy = touches[0].clientY - touches[1].clientY;
	return Math.sqrt(dx * dx + dy * dy);
};

/**
 * Container component that captures drag and scroll events.
 */
export function CardArtworkPositionContainer({
	children,
}: CardArtworkPositionContainerProps) {
	const CardArtPosition = useCardCreator((state) => state.CardArtPosition);
	const setCardArtPosition = useCardCreator(
		(state) => state.setCardArtPosition,
	);
	const isDragging = useRef(false);
	const dragStart = useRef({ x: 0, y: 0 });
	const lastTouchDistance = useRef<number | null>(null);

	const handleMouseDown = useCallback(
		(e: React.MouseEvent) => {
			isDragging.current = true;
			dragStart.current = {
				x: e.clientX - (CardArtPosition?.x ?? 0),
				y: e.clientY - (CardArtPosition?.y ?? 0),
			};
		},
		[CardArtPosition?.x, CardArtPosition?.y],
	);

	const handleMouseMove = useCallback(
		(e: React.MouseEvent) => {
			if (!isDragging.current || !CardArtPosition) return;

			const newX = e.clientX - dragStart.current.x;
			const newY = e.clientY - dragStart.current.y;

			setCardArtPosition({
				x: newX,
				y: newY,
				width: CardArtPosition.width,
				height: CardArtPosition.height,
			});
		},
		[CardArtPosition, setCardArtPosition],
	);

	const handleMouseUp = useCallback(() => {
		if (isDragging.current) {
			isDragging.current = false;
		}
	}, []);

	const handleMouseLeave = useCallback(() => {
		if (isDragging.current) {
			isDragging.current = false;
		}
	}, []);

	const handleWheel = useCallback(
		(e: React.WheelEvent) => {
			if (!CardArtPosition) {
				return;
			}

			e.preventDefault();

			// Calculate scale factor from wheel delta
			const scaleDelta = -e.deltaY * 0.001;
			const scaleFactor = 1 + scaleDelta;

			// Apply scale to width and height (preserves an aspect ratio)
			const newWidth = CardArtPosition.width * scaleFactor;
			const newHeight = CardArtPosition.height * scaleFactor;

			// Optional: Set min/max bounds
			const minSize = 50;
			const maxSize = 5000;

			if (newWidth < minSize || newHeight < minSize) {
				return;
			}
			if (newWidth > maxSize || newHeight > maxSize) {
				return;
			}

			setCardArtPosition({
				x: CardArtPosition.x,
				y: CardArtPosition.y,
				width: newWidth,
				height: newHeight,
			});
		},
		[CardArtPosition, setCardArtPosition],
	);

	const handleTouchStart = useCallback(
		(e: React.TouchEvent) => {
			// Prevent browser's default touch behavior (page scroll/zoom)
			e.preventDefault();

			if (e.touches.length === 1) {
				// Single touch - start dragging
				isDragging.current = true;
				dragStart.current = {
					x: e.touches[0].clientX - (CardArtPosition?.x ?? 0),
					y: e.touches[0].clientY - (CardArtPosition?.y ?? 0),
				};
			} else if (e.touches.length === 2) {
				// Two touches - start pinch-to-zoom
				isDragging.current = false;
				lastTouchDistance.current = getTouchDistance(e.touches);
			}
		},
		[CardArtPosition?.x, CardArtPosition?.y],
	);

	const handleTouchMove = useCallback(
		(e: React.TouchEvent) => {
			if (!CardArtPosition) return;

			if (e.touches.length === 1 && isDragging.current) {
				// Single touch - drag
				e.preventDefault();
				const newX = e.touches[0].clientX - dragStart.current.x;
				const newY = e.touches[0].clientY - dragStart.current.y;

				setCardArtPosition({
					x: newX,
					y: newY,
					width: CardArtPosition.width,
					height: CardArtPosition.height,
				});
			} else if (e.touches.length === 2 && lastTouchDistance.current !== null) {
				// Two touches - pinch-to-zoom
				e.preventDefault();
				const currentDistance = getTouchDistance(e.touches);
				if (currentDistance === null) return;

				const scaleFactor = currentDistance / lastTouchDistance.current;
				const newWidth = CardArtPosition.width * scaleFactor;
				const newHeight = CardArtPosition.height * scaleFactor;

				// Set min/max bounds
				const minSize = 50;
				const maxSize = 5000;

				if (newWidth < minSize || newHeight < minSize) {
					return;
				}
				if (newWidth > maxSize || newHeight > maxSize) {
					return;
				}

				setCardArtPosition({
					x: CardArtPosition.x,
					y: CardArtPosition.y,
					width: newWidth,
					height: newHeight,
				});

				lastTouchDistance.current = currentDistance;
			}
		},
		[CardArtPosition, setCardArtPosition],
	);

	const handleTouchEnd = useCallback((e: React.TouchEvent) => {
		e.preventDefault();
		isDragging.current = false;
		lastTouchDistance.current = null;
	}, []);

	return (
		<div
			role="application"
			style={{ touchAction: "none" }}
			onMouseDown={handleMouseDown}
			onMouseMove={handleMouseMove}
			onMouseUp={handleMouseUp}
			onMouseLeave={handleMouseLeave}
			onWheel={handleWheel}
			onTouchStart={handleTouchStart}
			onTouchMove={handleTouchMove}
			onTouchEnd={handleTouchEnd}
		>
			{children}
		</div>
	);
}
