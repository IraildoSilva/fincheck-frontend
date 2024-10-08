import { Button } from '../../../../components/Button'
import { FileCheckIcon } from '../../../../components/icons/FileCheckIcon'

interface SummaryButtonProps {
  onClick: () => void
}

export function SummaryButton({ onClick }: SummaryButtonProps) {
  return (
    <Button
      variant="ghost"
      className="py-1 h-6 px-4 outline-none text-sm text-gray-800 flex border-none transition-colors cursor-pointer hover:bg-transparent"
      onClick={onClick}
    >
      <FileCheckIcon className="inline mr-1 size-5" />
      <span>Resumo</span>
    </Button>
  )
}
