/* eslint-disable react-refresh/only-export-components */
import * as RdxPopover from '@radix-ui/react-popover'
import { cn } from '../../app/utils/cn'

function PopoverRoot({ children }: { children: React.ReactNode }) {
	return <RdxPopover.Root>{children}</RdxPopover.Root>
}

interface PopoverTriggerProps {
	children: React.ReactNode
	asChild?: boolean
}

function PopoverTrigger({ children, asChild }: PopoverTriggerProps) {
	return <RdxPopover.Trigger asChild={asChild}>{children}</RdxPopover.Trigger>
}

interface PopoverContentProps {
	children: React.ReactNode
	className?: string
}

function PopoverContent({ children, className }: PopoverContentProps) {
	return (
		<RdxPopover.Portal>
			<RdxPopover.Content
				className={cn(
					'rounded-2xl bg-white space-y-2 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)] z-50 p-4',
					'data-[side=top]:animate-slide-down-and-fade',
					'data-[side=bottom]:animate-slide-up-and-fade',
					className
				)}
			>
				{children}
			</RdxPopover.Content>
		</RdxPopover.Portal>
	)
}

export const Popover = {
	Root: PopoverRoot,
	Trigger: PopoverTrigger,
	Content: PopoverContent,
}
