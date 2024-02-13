import { useMemo, useState } from 'react'
import { useWindowWidth } from '../../../../../app/hooks/useWindowWidth'
import { useDashboard } from '../DashboardContext/useDashboard'
import { useBankAccounts } from '../../../../../app/hooks/useBankAccounts'

export function useAccountsController() {
	const windowWidth = useWindowWidth()
	const { areValuesVisible, toggleValuesVisibility, openNewAccountModal } =
		useDashboard()

	const [sliderState, setSliderState] = useState({
		isBeginning: true,
		isEnd: false,
	})

	const { accounts, isFetching } = useBankAccounts()

	const currentBalance = useMemo(() => {
		if (!accounts) return 0

		return accounts.reduce(
			(total, account) => total + account.currentBalance,
			0
		)
	}, [accounts])

	return {
		windowWidth,
		sliderState,
		setSliderState,
		areValuesVisible,
		toggleValuesVisibility,
		isLoading: isFetching,
		accounts,
		openNewAccountModal,
		currentBalance,
	}
}
