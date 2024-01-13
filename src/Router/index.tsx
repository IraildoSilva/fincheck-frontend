// import {
//   Route,
//   Routes,
//   BrowserRouter,
//   createBrowserRouter,
//   Outlet,
// } from 'react-router-dom'

import { Route, Routes, BrowserRouter } from 'react-router-dom'
import { AuthGuard } from './AuthGuard'

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthGuard isPrivate={false} />}>
          <Route path="/login" element={<h1>Login</h1>} />
          <Route path="/register" element={<h1>Register</h1>} />
        </Route>

        <Route element={<AuthGuard isPrivate />}>
          <Route path="/" element={<h1>Dashboard</h1>} />
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
