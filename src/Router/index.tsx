// import {
//   Route,
//   Routes,
//   BrowserRouter,
//   createBrowserRouter,
//   Outlet,
// } from 'react-router-dom'

import { Route, Routes, BrowserRouter } from 'react-router-dom'
import { AuthGuard } from './AuthGuard'
import { Login } from '../view/pages/Login'
import { Register } from '../view/pages/Register'
import { Dashboard } from '../view/pages/Dashboard'
import { AuthLayout } from '../view/layouts/AuthLayout'

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthGuard isPrivate={false} />}>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Route>

        <Route element={<AuthGuard isPrivate />}>
          <Route path="/" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

// export const routes = createBrowserRouter([
//   {
//     element: <Layout />,
//     children: [
//       { path: '/login', element: <h1>Login</h1> },
//       { path: '/register', element: <h1>Register</h1> },
//     ],
//   },
//   { path: '/', element: <h1>Dashboard</h1> },
// ])
