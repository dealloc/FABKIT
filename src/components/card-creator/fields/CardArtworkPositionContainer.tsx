import type * as React from "react";
import { type ReactNode, useCallback, useRef } from "react";
import { useCardCreator } from "../../../stores/card-creator";

interface CardArtworkPositionContainerProps {
	children: ReactNode;
}

/**
 * Container component that captures drag and scroll events.
 */
export function CardArtworkPositionContainer({
	children,
}: CardArtworkPositionContainerProps) {
	const { CardArtPosition, setCardArtPosition } = useCardCreator();
	const isDragging = useRef(false);
	const dragStart = useRef({ x: 0, y: 0 });

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
			if (!isDragging.current) return;

			const newX = e.clientX - dragStart.current.x;
			const newY = e.clientY - dragStart.current.y;

			setCardArtPosition({
				x: newX,
				y: newY,
			});
		},
		[setCardArtPosition],
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

	const handleWheel = useCallback((e: React.WheelEvent) => {
		console.log("Wheel event:", {
			deltaY: e.deltaY,
			deltaX: e.deltaX,
			deltaMode: e.deltaMode,
		});
	}, []);

	return (
		<div
			role="application"
			onMouseDown={handleMouseDown}
			onMouseMove={handleMouseMove}
			onMouseUp={handleMouseUp}
			onMouseLeave={handleMouseLeave}
			onWheel={handleWheel}
		>
			{children}
		</div>
	);
}
