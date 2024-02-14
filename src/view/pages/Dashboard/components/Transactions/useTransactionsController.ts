import { useCallback, useState } from 'react'
import { useDashboard } from '../DashboardContext/useDashboard'
import { useTransactions } from '../../../../../app/hooks/useTransactions'

export function useTransactionsController() {
	const { areValuesVisible } = useDashboard()
	const [slideState, setSlideState] = useState({
		isBeginning: true,
		isEnd: false,
	})
	const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false)

	const { transactions, isFetching, isInitialLoading } = useTransactions()

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
	}
}
