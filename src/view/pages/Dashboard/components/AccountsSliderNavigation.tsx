import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons'
import { useSwiper } from 'swiper/react'

export function AccountsSliderNavigation() {
  const swiper = useSwiper()
  console.log({ swiper })

  return (
    <div className="">
      <button
        onClick={() => swiper.slidePrev()}
        disabled={swiper.activeIndex !== 0}
        className="rounded-full p-3 enabled:hover:bg-black/10 transition ease-in duration-150 disabled:opacity-40"
      >
        <ChevronLeftIcon className="text-white w-6 h-6" />
      </button>

      <button
        onClick={() => swiper.slideNext()}
        className="rounded-full p-3 enabled:hover:bg-black/10 transition ease-in duration-150 disabled:opacity-40 "
      >
        <ChevronRightIcon className="text-white w-6 h-6" />
      </button>
    </div>
  )
}
