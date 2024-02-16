import { ExitIcon } from '@radix-ui/react-icons'
import { DropdownMenu } from './DropdownMenu'
import { useAuth } from '../../app/hooks/useAuth'

export function UserMenu() {
  const { signout, user } = useAuth()

  const userInitials = user?.name.slice(0, 2).toUpperCase()

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <div className="w-12 h-12 bg-teal-50 rounded-full p-5 flex items-center justify-center border border-teal-100">
          <span className="text-teal-900 text-sm font-medium tracking-[-0.5px]">
            {userInitials}
          </span>
        </div>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content className="w-32">
        <DropdownMenu.Item
          onSelect={signout}
          className="flex items-center justify-between"
        >
          Sair
          <ExitIcon className="w-5 h-5" />
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
