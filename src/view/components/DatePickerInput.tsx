import { ChevronDownIcon, CrossCircledIcon } from '@radix-ui/react-icons'
import { cn } from '../../app/utils/cn'
import { useState } from 'react'
import { FormatDate } from '../../app/utils/formatDate'
import { Popover } from './Popover'
import { DatePicker } from './DatePicker'

interface DatePickerInputProps {
	error?: string
	className?: string
}

export function DatePickerInput({ className, error }: DatePickerInputProps) {
	const [selectedDate, setSelectedDate] = useState(new Date())

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

						<span>{FormatDate(selectedDate)}</span>

						<div className="absolute top-1/2 -translate-y-1/2 right-3">
							<ChevronDownIcon className="w-6 h-6 text-gray-800 " />
						</div>
					</button>
				</Popover.Trigger>

				<Popover.Content className="z-[51]">
					<DatePicker
						value={selectedDate}
						onChange={(date) => setSelectedDate(date)}
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
