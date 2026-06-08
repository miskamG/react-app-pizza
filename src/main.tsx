import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { Menu } from './pages/Menu/Menu'
import { Cart } from './pages/Cart/Cart'
import { Layout } from './layout/Layout'
import { Error } from './pages/Error/Error'
import { Product } from './pages/Product/Product'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Menu />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
      {
        path: '/product/:id',
        element: <Product />,
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
    <RouterProvider router={router} />
  </StrictMode>,
)
