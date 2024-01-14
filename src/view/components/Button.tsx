import { cn } from '../../app/utils/cn'

interface ButtonProps extends React.ComponentProps<'button'> {
  isLoading?: boolean
}

export function Button({
  className,
  disabled,
  isLoading,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      className={cn(
        'bg-teal-900 hover:bg-teal-800 disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-400 transition-all px-6 h-12 rounded-2xl text-white font-medium',
        className
      )}
    />
  )
}
