import { EyeIcon } from '../../../components/icons/EyeIcon'
import { AccountCard } from './AccountCard'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import { AccountsSliderNavigation } from './AccountsSliderNavigation'

export function Accounts() {
  return (
    <div className="rounded-2xl bg-teal-900 h-full w-full px-4 py-8 lg:p-10 flex flex-col">
      <div className="">
        <span className="tracking-[-0.5px] text-white block">Saldo total</span>

        <div className="flex items-center gap-2">
          <strong className="text-[32px] tracking-[-1px] text-white">
            R$ 1000,00
          </strong>

          <button className="w-8 h-8 flex items-center justify-center">
            <EyeIcon open />
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-end">
        <div>
          <Swiper
            spaceBetween={16}
            slidesPerView={2.2}
            onSlideChange={(swiper) => console.log(swiper.activeIndex)}
          >
            <div
              slot="container-start"
              className="flex items-center justify-between mb-4"
            >
              <strong className="tracking-[1px] text-white text-lg font-bold">
                Minhas contas
              </strong>

              <AccountsSliderNavigation />
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
