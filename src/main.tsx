import axios from 'axios'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { PREFIX } from './helpers/API'
import './index.css'
import { Layout } from './layout/Layout'
import { Cart } from './pages/Cart/Cart'
import { Error } from './pages/Error/Error'
import { Menu } from './pages/Menu/Menu'
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
    path: '*',
    element: <Error />,
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
