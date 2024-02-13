import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons'
import { Modal } from '../../../../../components/Modal'
import { Button } from '../../../../../components/Button'
import { useFiltersModal } from './useFiltersModal'
import { cn } from '../../../../../../app/utils/cn'

interface FiltersModal {
  open: boolean
  onClose: () => void
}

const mockedAccounts = [
  {
    id: '123',
    name: 'Nubank',
  },
  {
    id: '1234',
    name: 'XP Investimentos',
  },
  {
    id: '12345',
    name: 'Dinheiro',
  },
]

export function FiltersModal({ onClose, open }: FiltersModal) {
  const {
    handleSelectBankAccount,
    selectedBankAccountId,
    selectedYear,
    handleChangeYear,
  } = useFiltersModal()

  return (
    <Modal open={open} onClose={onClose} title="Filtros">
      <div>
        <span className="text-lg font-bold tracking-[-1px] text-gray-800">
          Conta
        </span>

        <div className="space-y-2 mt-2">
          {mockedAccounts.map((bankAccount) => (
            <button
              key={bankAccount.id}
              onClick={() => handleSelectBankAccount(bankAccount.id)}
              className={cn(
                'p-2 rounded-2xl w-full text-left text-gray-800 hover:bg-gray-50 transition-colors ',
                selectedBankAccountId === bankAccount.id && '!bg-gray-200'
              )}
            >
              {bankAccount.name}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 text-gray-800">
        <span className="text-lg font-bold tracking-[-1px]">Ano</span>

        <div className="mt-2 w-52 flex items-center justify-between">
          <button
            onClick={() => handleChangeYear(-1)}
            className="w-12 h-12 flex items-center justify-center"
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>

          <div className="flex-1 text-center">
            <span className="text-sm font-medium tracking-[-0.5px]">
              {selectedYear}
            </span>
          </div>

          <button
            onClick={() => handleChangeYear(1)}
            className="w-12 h-12 flex items-center justify-center"
          >
            <ChevronRightIcon className="w-6 h-6" />
          </button>
        </div>
      </div>

      <Button className="w-full mt-10">Aplicar Filtros</Button>
    </Modal>
  )
}