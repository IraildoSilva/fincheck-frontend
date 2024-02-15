import { ChevronDownIcon } from '@radix-ui/react-icons'
import { TransactionsIcon } from '../../../../components/icons/TransactionsIcon'
import { DropdownMenu } from '../../../../components/DropdownMenu'
import { IncomeIcon } from '../../../../components/icons/IncomeIcon'
import { ExpensesIcon } from '../../../../components/icons/ExpensesIcon'

type TransactionType = 'INCOME' | 'EXPENSE' | undefined

interface TransactionTypeDropdownProps {
	onSelect: (type: TransactionType) => void
	selectedType: TransactionType
}

export function TransactionTypeDropdown({
	onSelect,
	selectedType,
}: TransactionTypeDropdownProps) {
	return (
		<DropdownMenu.Root>
			<DropdownMenu.Trigger asChild>
				<button className="flex items-center gap-2 ">
					{selectedType === 'INCOME' && <IncomeIcon />}
					{selectedType === 'EXPENSE' && <ExpensesIcon />}
					{selectedType === undefined && <TransactionsIcon />}

					<span className="text-sm text-gray-800 tracking-[-0.5px] font-medium">
						{selectedType === 'INCOME' && 'Receitas'}
						{selectedType === 'EXPENSE' && 'Despesas'}
						{selectedType === undefined && 'Transações'}
					</span>

					<ChevronDownIcon className="text-gray-900" />
				</button>
			</DropdownMenu.Trigger>

			<DropdownMenu.Content className="w-[279px]">
				<DropdownMenu.Item
					onSelect={() => onSelect('INCOME')}
					className="gap-2"
				>
					<IncomeIcon />
					Receitas
				</DropdownMenu.Item>

				<DropdownMenu.Item
					onSelect={() => onSelect('EXPENSE')}
					className="gap-2"
				>
					<ExpensesIcon />
					Despesas
				</DropdownMenu.Item>

				<DropdownMenu.Item
					onSelect={() => onSelect(undefined)}
					className="gap-2"
				>
					<TransactionsIcon />
					Transações
				</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	)
}
