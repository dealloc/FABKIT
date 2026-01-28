import { useCardCreator } from "../../stores/card-creator.ts";

export function Preview() {
	const { CardType } = useCardCreator();

	return <div>{CardType}</div>;
}
