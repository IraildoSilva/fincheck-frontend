import { useCallback, useEffect, useState } from 'react'
import { useDashboard } from '../DashboardContext/useDashboard'
import { useTransactions } from '../../../../../app/hooks/useTransactions'
import { TransactionsFilters } from '../../../../../app/services/transactionsService/getAll'
import { Transaction } from '../../../../../app/entities/Transaction'

export function useTransactionsController() {
  const { areValuesVisible } = useDashboard()
  const [slideState, setSlideState] = useState({
    isBeginning: true,
    isEnd: false,
  })
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false)
  const [isSummaryModalOpen, setIsSummaryModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [transactionBeingEdited, setTransactionBeingEdited] =
    useState<null | Transaction>(null)

  const [filters, setFilters] = useState<TransactionsFilters>({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  })

  const { transactions, isFetching, isInitialLoading, refetchTransactions } =
    useTransactions(filters)

  const sortedTransactions = transactions.sort((a, b) => {
    const aSide = new Date(a.date).getTime()
    const bSide = new Date(b.date).getTime()

    return bSide - aSide
  })

  useEffect(() => {
    refetchTransactions()
  }, [filters, refetchTransactions])

  function handleChangeFilters<TFilter extends keyof TransactionsFilters>(
    filter: TFilter
  ) {
    return (value: TransactionsFilters[TFilter]) => {
      if (value === filters[filter]) return

      setFilters((prevState) => ({
        ...prevState,
        [filter]: value,
      }))
    }
  }

  function handleApplyFilters({
    bankAccountId,
    year,
  }: {
    bankAccountId: string | undefined
    year: number
  }) {
    handleChangeFilters('bankAccountId')(bankAccountId)
    handleChangeFilters('year')(year)
  }

  const handleOpenFiltersModal = useCallback(() => {
    setIsFiltersModalOpen(true)
  }, [])

  const handleCloseFiltersModal = useCallback(() => {
    setIsFiltersModalOpen(false)
  }, [])

  function handleOpenEditModal(transaction: Transaction) {
    setIsEditModalOpen(true)
    setTransactionBeingEdited(transaction)
  }

  function handleCloseEditModal() {
    setIsEditModalOpen(false)
    setTransactionBeingEdited(null)
  }

  const handleOpenSummaryModal = useCallback(() => {
    setIsSummaryModalOpen(true)
  }, [])

  const handleCloseSummaryModal = useCallback(() => {
    setIsSummaryModalOpen(false)
  }, [])

  return {
    slideState,
    setSlideState,
    areValuesVisible,
    isInitialLoading,
    isLoading: isFetching,
    isFiltersModalOpen,
    handleOpenFiltersModal,
    handleCloseFiltersModal,
    transactions: sortedTransactions,
    filters,
    handleChangeFilters,
    handleApplyFilters,
    isEditModalOpen,
    transactionBeingEdited,
    handleOpenEditModal,
    handleCloseEditModal,
    handleOpenSummaryModal,
    handleCloseSummaryModal,
    isSummaryModalOpen,
  }
}
