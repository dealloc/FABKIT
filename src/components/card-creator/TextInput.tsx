import { Description, Field, Input, Label } from "@headlessui/react";
import type { ComponentProps } from "react";

interface TextInputProps extends Omit<ComponentProps<typeof Input>, "className"> {
	label: string;
	description?: string;
	required?: boolean;
	value?: string;
	placeholder?: string;
	maxLength?: number;
}

export default function TextInput({
	label,
	description,
	required,
	...props
}: TextInputProps) {
	return (
		<Field className="space-y-1">
			<Label className="block text-sm font-medium text-muted">
				{label}
				{required && <span className="text-primary ml-1">*</span>}
			</Label>
			{description && (
				<Description className="text-xs text-subtle">{description}</Description>
			)}
			<Input
				{...props}
				className="w-full px-3 py-2 bg-surface border border-border rounded-lg text-body placeholder:text-faint focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed"
			/>
		</Field>
	);
}
