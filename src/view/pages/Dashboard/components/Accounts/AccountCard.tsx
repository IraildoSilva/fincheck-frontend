import { formatCurrency } from '../../../../../app/utils/formatCurrency'
import { BankAccountTypeIcon } from '../../../../components/icons/BankAccountTypeIcon'

interface AccountCardProps {
  color: string
  type: 'CHECKING' | 'INVESTMENT' | 'CASH'
  name: string
  balance: number
}

export function AccountCard({ color, type, name, balance }: AccountCardProps) {
  return (
    <div
      className="bg-white flex-1 h-[200px] rounded-2xl p-4 flex flex-col justify-between border-b-4 border-red-600"
      style={{ borderColor: color }}
    >
      <div>
        <BankAccountTypeIcon type={type} />

        <span className="text-gray-800 font-medium tracking-[-0.5px] block mt-4">
          {name}
        </span>
      </div>

      <div className="">
        <span className="text-gray-800 font-medium tracking-[-0.5px] block">
          {formatCurrency(balance)}
        </span>
        <small className="text-gray-600 text-sm">Saldo atual</small>
      </div>
    </div>
  )
}
