import { useCardCreator } from "../../stores/card-creator.ts";

export function Preview() {
	const { cardType } = useCardCreator();

	return <div>{cardType}</div>;
}
