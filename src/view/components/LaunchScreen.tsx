import { Transition } from '@headlessui/react'
import { Logo } from './Logo'

interface LaunchScreenProps {
  isLoading: boolean
}

export function LaunchScreen({ isLoading }: LaunchScreenProps) {
  return (
    <Transition
      show={isLoading}
      enter="transition-opacity duration-100"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="bg-teal-900 fixed top-0 left-0 w-full h-full flex items-center justify-center">
        <Logo className="h-10 text-white animate-bounce" />
      </div>
    </Transition>
  )
}
