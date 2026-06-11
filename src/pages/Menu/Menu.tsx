import axios, { AxiosError } from 'axios'
import { useEffect, useState, type ChangeEvent } from 'react'
import Headling from '../../components/Headling/Headling'
import Search from '../../components/Search/Search'
import { PREFIX } from '../../helpers/API'
import type { Product } from '../../interfaces/Product.interface'
import styles from './Menu.module.css'
import { MenuList } from './MenuList/MenuList'

export default function Menu() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | undefined>()
  const [filter, setFilter] = useState<string>()

  const getMenu = async (name?: string) => {
    try {
      setIsLoading(true)
      const { data } = await axios.get<Product[]>(`${PREFIX}/products`, {
        params: {
          name,
        },
      })

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

  const updateFilter = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value)
  }

  useEffect(() => {
    getMenu(filter)
  }, [filter])

  return (
    <>
      <div className={styles.head}>
        <Headling>Меню</Headling>
        <Search
          placeholder="Введите блюдо или состав"
          onChange={updateFilter}
        />
      </div>
      <div>
        {error && <p>{error}</p>}
        {!isLoading && products.length > 0 && <MenuList products={products} />}
        {isLoading && <p>Загрузка...</p>}
        {!isLoading && products.length === 0 && <>Не найдено</>}
      </div>
    </>
  )
}
