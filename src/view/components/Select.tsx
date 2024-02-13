import * as RdxSelect from '@radix-ui/react-select'
import {
	ChevronDownIcon,
	ChevronUpIcon,
	CrossCircledIcon,
} from '@radix-ui/react-icons'
import { cn } from '../../app/utils/cn'
import { useState } from 'react'

interface SelectProps {
	className?: string
	error?: string
	placeholder?: string
	options: Array<{
		value: string
		label: string
	}>
	onChange?: (value: string) => void
	value?: string
}

export function Select({
	className,
	error,
	placeholder,
	options,
	onChange,
	value,
}: SelectProps) {
	const [selectedValue, setSelectedValue] = useState(value ?? '')

	function handleSelect(value: string) {
		setSelectedValue(value)
		onChange?.(value)
	}

	return (
		<div>
			<div className="relative">
				<label
					className={cn(
						'absolute left-3 top-1/2 -translate-y-1/2 z-10 text-gray-700 pointer-events-none',
						selectedValue && 'top-2 translate-y-0 text-xs'
					)}
				>
					{placeholder}
				</label>
				<RdxSelect.Root value={value} onValueChange={handleSelect}>
					<RdxSelect.Trigger
						className={cn(
							'bg-white w-full rounded-lg border border-gray-500 px-3 h-[52px] text-gray-800 focus:border-gray-800 outline-none transition-all text-left relative pt-4',
							error && '!border-red-900',
							className
						)}
					>
						<RdxSelect.Value />

						<RdxSelect.Icon className="absolute top-1/2 -translate-y-1/2 right-3">
							<ChevronDownIcon className="w-6 h-6 text-gray-800" />
						</RdxSelect.Icon>
					</RdxSelect.Trigger>
					<RdxSelect.Portal>
						<RdxSelect.Content className="z-[52] overflow-hidden bg-white rounded-2xl border border-gray-100 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)]">
							<RdxSelect.ScrollUpButton className="flex items-center justify-center h-[25px] bg-white text-gray-800 cursor-default">
								<ChevronUpIcon />
							</RdxSelect.ScrollUpButton>

							<RdxSelect.Viewport className="p-2">
								{options.map((option) => (
									<RdxSelect.Item
										key={option.value}
										value={option.value}
										className="p-2 text-sm text-gray-800 data-[state=checked]:font-bold data-[highlighted]:bg-gray-50 outline-none rounded-lg transition-colors cursor-default"
									>
										<RdxSelect.ItemText>{option.label}</RdxSelect.ItemText>
									</RdxSelect.Item>
								))}
							</RdxSelect.Viewport>

							<RdxSelect.ScrollDownButton className="flex items-center justify-center h-[25px] bg-white text-gray-800 cursor-default">
								<ChevronDownIcon />
							</RdxSelect.ScrollDownButton>
						</RdxSelect.Content>
					</RdxSelect.Portal>
				</RdxSelect.Root>
			</div>

			{error && (
				<div className="flex gap-2 items-center mt-2 text-red-500">
					<CrossCircledIcon />
					<span className="text-xs">{error}</span>
				</div>
			)}
		</div>
	)
}
