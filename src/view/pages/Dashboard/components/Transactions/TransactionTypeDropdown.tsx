import { ChevronDownIcon } from '@radix-ui/react-icons'
import { TransactionsIcon } from '../../../../components/icons/TransactionsIcon'
import { DropdownMenu } from '../../../../components/DropdownMenu'
import { IncomeIcon } from '../../../../components/icons/IncomeIcon'
import { ExpensesIcon } from '../../../../components/icons/ExpensesIcon'
import { useState } from 'react'

export function TransactionTypeDropdown() {
  const [selectedFilter, setSelectedFilter] = useState<
    'income' | 'expense' | 'transaction'
  >('transaction')

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <button className="flex items-center gap-2 ">
          {selectedFilter === 'transaction' && (
            <>
              <TransactionsIcon />

              <span className="text-sm text-gray-800 tracking-[-0.5px] font-medium">
                Transações
              </span>
            </>
          )}

          {selectedFilter === 'income' && (
            <>
              <IncomeIcon />

              <span className="text-sm text-gray-800 tracking-[-0.5px] font-medium">
                Receitas
              </span>
            </>
          )}

          {selectedFilter === 'expense' && (
            <>
              <ExpensesIcon />

              <span className="text-sm text-gray-800 tracking-[-0.5px] font-medium">
                Despesas
              </span>
            </>
          )}

          <ChevronDownIcon className="text-gray-900" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content className="w-[279px] z-20">
        <DropdownMenu.Item
          onSelect={() => setSelectedFilter('income')}
          className="gap-2"
        >
          <IncomeIcon />
          Receitas
        </DropdownMenu.Item>

        <DropdownMenu.Item
          onSelect={() => setSelectedFilter('expense')}
          className="gap-2"
        >
          <ExpensesIcon />
          Despesas
        </DropdownMenu.Item>

        <DropdownMenu.Item
          onSelect={() => setSelectedFilter('transaction')}
          className="gap-2"
        >
          <TransactionsIcon />
          Transações
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
