import { useState } from 'react'
import { useBankAccounts } from '../../../../../../app/hooks/useBankAccounts'

export function useFiltersModalController() {
  const [selectedBankAccountId, setSelectedBankAccountId] = useState<
    string | undefined
  >(undefined)
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())

  function handleSelectBankAccount(bankAccountId: string) {
    setSelectedBankAccountId((prevState) =>
      prevState === bankAccountId ? undefined : bankAccountId
    )
  }

  function handleChangeYear(step: number) {
    setSelectedYear((prevState) => prevState + step)
  }

  const { accounts } = useBankAccounts()

  return {
    selectedBankAccountId,
    handleSelectBankAccount,
    selectedYear,
    handleChangeYear,
    accounts,
  }
}
