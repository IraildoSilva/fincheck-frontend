import { EyeIcon } from '../../../../components/icons/EyeIcon'
import { AccountCard } from './AccountCard'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import { SliderNavigation } from './SliderNavigation'
import { useAccountsController } from './useAccountsController'
import { formatCurrency } from '../../../../../app/utils/formatCurrency'
import { cn } from '../../../../../app/utils/cn'

export function Accounts() {
  const {
    windowWidth,
    sliderState,
    setSliderState,
    areValuesVisible,
    toggleValuesVisibility,
  } = useAccountsController()

  return (
    <div className="rounded-2xl bg-teal-900 h-full w-full px-4 py-8 lg:p-10 flex flex-col">
      <div className="">
        <span className="tracking-[-0.5px] text-white block">Saldo total</span>

        <div className="flex items-center gap-2">
          <strong
            className={cn(
              'text-[32px] tracking-[-1px] text-white',
              !areValuesVisible && 'blur-md'
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
        <div>
          <Swiper
            spaceBetween={windowWidth > 500 ? 16 : 8}
            slidesPerView={windowWidth > 500 ? 2.2 : 1.1}
            onSlideChange={(swiper) => {
              setSliderState({
                isBeginning: swiper.isBeginning,
                isEnd: swiper.isEnd,
              })
            }}
          >
            <div
              slot="container-start"
              className="flex items-center justify-between mb-4"
            >
              <strong className="tracking-[1px] text-white text-lg font-bold">
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
      </div>
    </div>
  )
}
