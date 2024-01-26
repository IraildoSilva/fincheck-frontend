import { useCallback, useState } from 'react'
import { useDashboard } from '../DashboardContext/useDashboard'

export function useTransactionsController() {
  const { areValuesVisible } = useDashboard()
  const [slideState, setSlideState] = useState({
    isBeginning: true,
    isEnd: false,
  })
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(true)

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
    isInitialLoading: false,
    transactions: [''],
    isLoading: false,
    isFiltersModalOpen,
    handleOpenFiltersModal,
    handleCloseFiltersModal,
  }
}
