import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../app/hooks/useAuth'

interface AuthGuardProps {
  isPrivate: boolean
}

export function AuthGuard({ isPrivate }: AuthGuardProps) {
  const { signedIn } = useAuth()

  if (!signedIn && isPrivate) {
    Navigate({ to: '/login', replace: true })
  }

  if (signedIn && !isPrivate) {
    Navigate({ to: '/', replace: true })
  }

  return <Outlet />
}
