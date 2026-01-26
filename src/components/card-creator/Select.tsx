import {
	Description,
	Field,
	Label,
	Listbox,
	ListboxButton,
	ListboxOption,
	ListboxOptions,
} from "@headlessui/react";
import { Check, ChevronDown } from "lucide-react";

interface SelectOption {
	value: string;
	label: string;
}

interface SelectProps {
	label: string;
	description?: string;
	required?: boolean;
	value: string;
	onChange: (value: string) => void;
	options: SelectOption[];
	placeholder?: string;
}

export default function Select({
	label,
	description,
	required,
	value,
	onChange,
	options,
	placeholder,
}: SelectProps) {
	const selectedOption = options.find((opt) => opt.value === value);

	return (
		<Field className="space-y-1">
			<Label className="block text-sm font-medium text-muted">
				{label}
				{required && <span className="text-primary ml-1">*</span>}
			</Label>
			{description && (
				<Description className="text-xs text-subtle">{description}</Description>
			)}
			<Listbox value={value} onChange={onChange}>
				<ListboxButton className="relative w-full px-3 py-2 bg-surface border border-border rounded-lg text-left text-body focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed">
					<span className={selectedOption ? "text-body" : "text-faint"}>
						{selectedOption?.label || placeholder || "Select an option"}
					</span>
					<ChevronDown
						className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none"
						strokeWidth={2}
					/>
				</ListboxButton>
				<ListboxOptions
					anchor="bottom"
					className="mt-1 w-(--button-width) bg-surface border border-border rounded-lg shadow-lg py-1 focus:outline-none z-10 max-h-60 overflow-auto"
				>
					{options.map((option) => (
						<ListboxOption
							key={option.value}
							value={option.value}
							className="relative px-3 py-2 cursor-pointer select-none text-body data-focus:bg-surface-muted data-selected:bg-primary/5 transition-colors"
						>
							{({ selected }) => (
								<>
									<span className={selected ? "font-medium" : "font-normal"}>
										{option.label}
									</span>
									{selected && (
										<Check
											className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary"
											strokeWidth={2.5}
										/>
									)}
								</>
							)}
						</ListboxOption>
					))}
				</ListboxOptions>
			</Listbox>
		</Field>
	);
}
