import axios from 'axios'
import { lazy, StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { PREFIX } from './helpers/API'
import './index.css'
import { Layout } from './layout/Main/Layout'
import { Cart } from './pages/Cart/Cart'
import { Error } from './pages/Error/Error'
// import { Menu } from './pages/Menu/Menu'
import { RequireAuth } from './helpers/RequireAuth'
import { AuthLayout } from './layout/Auth/AuthLayout'
import { Login } from './pages/Login/Login'
import { Product } from './pages/Product/Product'
import { Register } from './pages/Register/Register'
import { Provider } from 'react-redux'
import { store } from './store/store'

const Menu = lazy(() => import('./pages/Menu/Menu'))

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <RequireAuth>
        <Layout />
      </RequireAuth>
    ),
    children: [
      {
        path: '/',
        errorElement: <Error />,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Menu />
          </Suspense>
        ),
      },
      {
        path: '/cart',
        element: <Cart />,
      },
      {
        path: '/product/:id',
        element: <Product />,
        errorElement: <Error />,
        loader: async ({ params }) => {
          // throw new Error('Error')
          await new Promise((resolve) => setTimeout(resolve, 2000))
          const { data } = await axios.get(`${PREFIX}/products/${params.id}`)
          return data
        },
      },
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
    ],
  },
  {
    path: '*',
    element: <Error />,
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
