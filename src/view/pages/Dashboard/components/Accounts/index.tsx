import { EyeIcon } from "../../../../components/icons/EyeIcon";
import { AccountCard } from "./AccountCard";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import { SliderNavigation } from "./SliderNavigation";
import { useAccountsController } from "./useAccountsController";
import { formatCurrency } from "../../../../../app/utils/formatCurrency";
import { cn } from "../../../../../app/utils/cn";
import { Spinner } from "../../../../components/Spinner";
import { PlusIcon } from "@radix-ui/react-icons";

export function Accounts() {
	const {
		windowWidth,
		sliderState,
		setSliderState,
		areValuesVisible,
		toggleValuesVisibility,
		isLoading,
		accounts,
		openNewAccountModal,
	} = useAccountsController();

	return (
		<div className="rounded-2xl bg-teal-900 h-full w-full px-4 py-8 lg:p-10 flex flex-col">
			{isLoading && (
				<div className="w-full h-full flex items-center justify-center">
					<Spinner className="text-teal-950/30 fill-white w-10 h-10" />
				</div>
			)}

			{!isLoading && (
				<>
					<div>
						<span className="tracking-[-0.5px] text-white block">
							Saldo total
						</span>

						<div className="flex items-center gap-2">
							<strong
								className={cn(
									"text-[32px] tracking-[-1px] text-white",
									!areValuesVisible && "blur-md"
								)}
							>
								{formatCurrency(1000)}
							</strong>

							<button
								onClick={toggleValuesVisibility}
								className="w-8 h-8 flex items-center justify-center"
							>
								<EyeIcon open={areValuesVisible} />
							</button>
						</div>
					</div>

					<div className="flex-1 flex flex-col justify-end mt-10 lg:mt-0">
						{accounts.length === 0 && (
							<>
								<div className="mb-4">
									<strong className="tracking-[-1px] text-white text-lg font-bold">
										Minhas contas
									</strong>
								</div>

								<button
									onClick={openNewAccountModal}
									className="mt-4 h-52 border-2 border-teal-600 rounded-2xl border-dashed flex flex-col items-center justify-center gap-4 text-white"
								>
									<div className="w-11 h-11 rounded-full border-dashed border-2 flex items-center justify-center">
										<PlusIcon className="w-6 h-6" />
									</div>

									<span className="font-medium tracking-[-0.5px] block text-center w-32">
										Cadastre uma nova conta
									</span>
								</button>
							</>
						)}

						{accounts.length > 0 && (
							<div>
								<Swiper
									spaceBetween={windowWidth > 500 ? 16 : 8}
									slidesPerView={windowWidth > 500 ? 2.2 : 1.1}
									onSlideChange={(swiper) => {
										setSliderState({
											isBeginning: swiper.isBeginning,
											isEnd: swiper.isEnd,
										});
									}}
								>
									<div
										slot="container-start"
										className="flex items-center justify-between mb-4"
									>
										<strong className="tracking-[-1px] text-white text-lg font-bold">
											Minhas contas
										</strong>

										<SliderNavigation
											isBeginning={sliderState.isBeginning}
											isEnd={sliderState.isEnd}
										/>
									</div>

									<SwiperSlide>
										<AccountCard
											color="#7950F2"
											type="CHECKING"
											name="Nubank"
											balance={980.23}
										/>
									</SwiperSlide>

									<SwiperSlide>
										<AccountCard
											color="#F43F00"
											type="CHECKING"
											name="Inter"
											balance={980.23}
										/>
									</SwiperSlide>

									<SwiperSlide>
										<AccountCard
											color="#A1A"
											type="INVESTMENT"
											name="XP"
											balance={980.23}
										/>
									</SwiperSlide>
								</Swiper>
							</div>
						)}
					</div>
				</>
			)}
		</div>
	);
}
