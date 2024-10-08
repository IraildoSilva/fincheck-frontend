import { VerboseMonths } from '../../../../../../app/config/constants'
import { Transaction } from '../../../../../../app/entities/Transaction'

type Transactions = Transaction[]

export function useSummaryModal(transactions: Transactions) {
  const totalIncome = transactions.reduce((acc, transaction) => {
    return acc + (transaction.type === 'INCOME' ? transaction.value : 0)
  }, 0)

  const totalExpense = transactions.reduce((acc, transactions) => {
    return acc + (transactions.type === 'EXPENSE' ? transactions.value : 0)
  }, 0)

  const balance = totalIncome - totalExpense
  const isNegativeBalance = balance < 0
  const currentMonth = VerboseMonths[new Date(transactions[0]?.date).getMonth()]

  return {
    totalExpense,
    totalIncome,
    balance,
    isNegativeBalance,
    currentMonth,
  }
}
