// import { RouterProvider } from 'react-router-dom'
// import { routes } from './Router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Router } from './Router'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './app/contexts/AuthContext'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
})

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />

        <Toaster />
      </AuthProvider>

      <ReactQueryDevtools position="top" buttonPosition="top-right" />
    </QueryClientProvider>
  )
}

// export function App() {
//   return <RouterProvider router={routes}>{/* children */}</RouterProvider>
// }
