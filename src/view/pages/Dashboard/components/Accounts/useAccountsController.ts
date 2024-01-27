import { useState } from "react";
import { useWindowWidth } from "../../../../../app/hooks/useWindowWidth";
import { useDashboard } from "../DashboardContext/useDashboard";

export function useAccountsController() {
	const windowWidth = useWindowWidth();
	const { areValuesVisible, toggleValuesVisibility, openNewAccountModal } =
		useDashboard();

	const [sliderState, setSliderState] = useState({
		isBeginning: true,
		isEnd: false,
	});

	return {
		windowWidth,
		sliderState,
		setSliderState,
		areValuesVisible,
		toggleValuesVisibility,
		isLoading: false,
		accounts: [''],
		openNewAccountModal,
	};
}
