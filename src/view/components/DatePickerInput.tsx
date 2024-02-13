import { ChevronDownIcon, CrossCircledIcon } from '@radix-ui/react-icons'
import { cn } from '../../app/utils/cn'
import { useState } from 'react'
import { formatDate } from '../../app/utils/formatDate'
import { Popover } from './Popover'
import { DatePicker } from './DatePicker'

interface DatePickerInputProps {
	error?: string
	className?: string
	value?: Date
	onChange?: (date: Date) => void
}

export function DatePickerInput({
	className,
	error,
	value,
	onChange,
}: DatePickerInputProps) {
	const [selectedDate, setSelectedDate] = useState(value ?? new Date())

	function handleChangeDate(date: Date) {
		setSelectedDate(date)
		onChange?.(date)
	}

	return (
		<div>
			<Popover.Root>
				<Popover.Trigger asChild>
					<button
						type="button"
						className={cn(
							'bg-white w-full rounded-lg border border-gray-500 px-3 h-[52px] text-gray-700 focus:border-gray-800 outline-none transition-all text-left relative pt-4',
							error && '!border-red-900',
							className
						)}
					>
						<span className="absolute text-gray-700 text-xs left-[13px] top-2 pointer-events-none">
							Data
						</span>

						<span>{formatDate(selectedDate)}</span>

						<div className="absolute top-1/2 -translate-y-1/2 right-3">
							<ChevronDownIcon className="w-6 h-6 text-gray-800 " />
						</div>
					</button>
				</Popover.Trigger>

				<Popover.Content className="z-[51]">
					<DatePicker
						value={selectedDate}
						onChange={(date) => handleChangeDate(date)}
					/>
				</Popover.Content>
			</Popover.Root>

			{error && (
				<div className="flex gap-2 items-center mt-2 text-red-500">
					<CrossCircledIcon />
					<span className="text-xs">{error}</span>
				</div>
			)}
		</div>
	)
}
