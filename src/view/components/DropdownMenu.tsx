/* eslint-disable react-refresh/only-export-components */
import * as RdxDropdownMenu from '@radix-ui/react-dropdown-menu'
import { cn } from '../../app/utils/cn'

function DropdownMenuRoot({ children }: { children: React.ReactNode }) {
	return <RdxDropdownMenu.Root>{children}</RdxDropdownMenu.Root>
}

interface DropdownTriggerProps {
	children: React.ReactNode
	asChild?: boolean
}

function DropdownMenuTrigger({ children, asChild }: DropdownTriggerProps) {
	return (
		<RdxDropdownMenu.Trigger asChild={asChild} className="outline-none">
			{children}
		</RdxDropdownMenu.Trigger>
	)
}

interface DropdownMenuContentProps {
	children: React.ReactNode
	className?: string
	side?: 'top' | 'right' | 'bottom' | 'left' | undefined
}

function DropdownMenuContent({
	children,
	className,
	side,
}: DropdownMenuContentProps) {
	return (
		<RdxDropdownMenu.Portal>
			<RdxDropdownMenu.Content
				side={side}
				className={cn(
					'rounded-2xl p-2 bg-white space-y-2 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)] z-50',
					'data-[side=top]:animate-slide-down-and-fade',
					'data-[side=bottom]:animate-slide-up-and-fade',
					className
				)}
			>
				{children}
			</RdxDropdownMenu.Content>
		</RdxDropdownMenu.Portal>
	)
}

interface DropdownMenuItemProps {
	children: React.ReactNode
	className?: string
	onSelect?: () => void
}

function DropdownMenuItem({
	children,
	className,
	onSelect,
}: DropdownMenuItemProps) {
	return (
		<RdxDropdownMenu.Item
			onSelect={onSelect}
			className={cn(
				'min-h-10 py-2 px-4 outline-none flex items-center text-sm text-gray-800 data-[highlighted]:bg-gray-50 rounded-2xl transition-colors cursor-pointer',
				className
			)}
		>
			{children}
		</RdxDropdownMenu.Item>
	)
}

export const DropdownMenu = {
	Root: DropdownMenuRoot,
	Trigger: DropdownMenuTrigger,
	Content: DropdownMenuContent,
	Item: DropdownMenuItem,
}
