import { cn } from '../../app/utils/cn'
import { Spinner } from './Spinner'

interface ButtonProps extends React.ComponentProps<'button'> {
	isLoading?: boolean
	variant?: 'danger' | 'ghost'
}

export function Button({
	className,
	children,
	disabled,
	isLoading,
	variant,
	...props
}: ButtonProps) {
	return (
		<button
			{...props}
			disabled={disabled || isLoading}
			className={cn(
				'bg-teal-900 hover:bg-teal-800 disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-400 transition-all px-6 h-12 rounded-2xl text-white font-medium flex items-center justify-center',
				variant === 'danger' && 'bg-red-900 hover:bg-red-800',
				variant === 'ghost' &&
					'bg-transparent text-gray-800 border border-gray-800 hover:bg-gray-50',
				className
			)}
		>
			{!isLoading && <span>{children}</span>}
			{isLoading && <Spinner className="w-6 h-6" />}
		</button>
	)
}
