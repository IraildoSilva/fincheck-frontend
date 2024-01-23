import { UserMenu } from '../../components/UserMenu'
import { Logo } from '../../components/Logo'
import { Accounts } from './components/Accounts'
import { Transactions } from './components/Transactions'

export function Dashboard() {
  return (
    <div className="h-full w-full p-4 lg:px-8 lg:pb-8 lg:pt-6 flex flex-col gap-4">
      <header className="h-12 flex items-center justify-between">
        <Logo className="text-teal-900 h-6" />
        <UserMenu />
      </header>

      <main className="flex-1 flex flex-col lg:flex-row gap-4">
        <div className="w-full h-full lg:w-1/2">
          {/* className="w-full h-full lg:w-1/2" */}

          <Accounts />
        </div>
        <div className="w-full h-full lg:w-1/2">
          <Transactions />
        </div>
      </main>
    </div>
  )
}
