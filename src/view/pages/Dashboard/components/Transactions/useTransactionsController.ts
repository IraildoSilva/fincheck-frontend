import { useCallback, useEffect, useState } from 'react'
import { useDashboard } from '../DashboardContext/useDashboard'
import { useTransactions } from '../../../../../app/hooks/useTransactions'
import { TransactionsFilters } from '../../../../../app/services/transactionsService/getAll'

export function useTransactionsController() {
	const { areValuesVisible } = useDashboard()
	const [slideState, setSlideState] = useState({
		isBeginning: true,
		isEnd: false,
	})
	const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false)
	const [filters, setFilters] = useState<TransactionsFilters>({
		month: new Date().getMonth(),
		year: new Date().getFullYear(),
	})

	const { transactions, isFetching, isInitialLoading, refetchTransactions } =
		useTransactions(filters)

	useEffect(() => {
		refetchTransactions()
	}, [filters, refetchTransactions])

	function handleChangeMonth(month: number) {
		setFilters((prevState) => ({
			...prevState,
			month,
		}))
	}

	const handleOpenFiltersModal = useCallback(() => {
		setIsFiltersModalOpen(true)
	}, [])

	const handleCloseFiltersModal = useCallback(() => {
		setIsFiltersModalOpen(false)
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
		transactions,
		filters,
		handleChangeMonth,
	}
}
