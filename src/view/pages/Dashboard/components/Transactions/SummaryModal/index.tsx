import { Transaction } from '../../../../../../app/entities/Transaction'
import { cn } from '../../../../../../app/utils/cn'
import { formatCurrency } from '../../../../../../app/utils/formatCurrency'
import { Modal } from '../../../../../components/Modal'
import { Separator } from '../../../../../components/Separator'
import { useSummaryModal } from './useSummaryModalController'

interface SummaryModalProps {
  open: boolean
  onClose: () => void
  transactions: Array<Transaction>
}

export function SummaryModal({
  open,
  onClose,
  transactions,
}: SummaryModalProps) {
  const {
    balance,
    currentMonth,
    isNegativeBalance,
    totalExpense,
    totalIncome,
  } = useSummaryModal(transactions)

  return (
    <Modal title="Resumo" open={open} onClose={onClose}>
      <h1 className="text-xl mb-10 font-semibold tracking-[-0.5px]">
        {currentMonth}
      </h1>

      <div className=" text-gray-600">
        <div className="flex justify-between items-center">
          <span>Total receitas</span>
          <strong className="text-green-800 tracking-[-0.5px] font-medium">
            + {formatCurrency(totalIncome)}
          </strong>
        </div>
        <div className="flex justify-between items-center">
          <span>Total despesas </span>
          <span className="text-red-800 tracking-[-0.5px] font-medium">
            - {formatCurrency(totalExpense)}
          </span>
        </div>
        <Separator className="my-2 bg-gray-600" />
        <div className="flex justify-between items-center">
          <span className="text-gray-800">Saldo</span>
          <span
            className={cn(
              'tracking-[-0.5px] text-green-800 font-medium',
              isNegativeBalance && 'text-red-800'
            )}
          >
            {isNegativeBalance ? '' : '+ '}
            {formatCurrency(balance)}
          </span>
        </div>
      </div>
    </Modal>
  )
}
