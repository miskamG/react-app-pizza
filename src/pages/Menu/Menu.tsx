import { useEffect, useState } from 'react'
import Headling from '../../components/Headling/Headling'
import ProductCard from '../../components/ProductCard/ProductCard'
import Search from '../../components/Search/Search'
import { PREFIX } from '../../helpers/API'
import type { Product } from '../../interfaces/Product.interface'
import styles from './Menu.module.css'
import axios, { AxiosError } from 'axios'
import { MenuList } from './MenuList/MenuList'

export function Menu() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | undefined>()

  const getMenu = async () => {
    // try {
    //   const res = await fetch(`${PREFIX}/products`)

    //   if (!res.ok) {
    //     return
    //   }

    //   const data = (await res.json()) as Product[]

    //   setProducts(data)
    // } catch (error) {
    //   console.error(error)

    //   return
    // }
    try {
      setIsLoading(true)
      const { data } = await axios.get<Product[]>(`${PREFIX}/products`)

      setProducts(data)
      setIsLoading(false)
    } catch (error) {
      console.error(error)
      setIsLoading(false)
      if (error instanceof AxiosError) {
        setError(error.message)
      }

      return
    }
  }

  useEffect(() => {
    getMenu()
  }, [])

  return (
    <>
      <div className={styles.head}>
        <Headling>Меню</Headling>
        <Search placeholder="Введите блюдо или состав" />
      </div>
      <div>
        {error && <p>{error}</p>}
        {!isLoading && <MenuList products={products} />}
        {isLoading && <p>Загрузка...</p>}
      </div>
    </>
  )
}
