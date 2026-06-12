import { useSelector } from "react-redux";
import Headling from "../../components/Headling/Headling";
import type { RootState } from "../../store/store";
import type { Product } from "../../interfaces/Product.interface";
import { useEffect, useState } from "react";
import { PREFIX } from "../../helpers/API";
import axios from "axios";
import CartItem from "../../components/CartItem/CartItem";

export function Cart() {
  const [cardProducts, setCardProducts] = useState<Product[]>([])
  const items = useSelector((state: RootState) => state.cart.items)

  const getItem = async(id: number) => {
    const { data } = await axios.get<Product>(`${PREFIX}/products/${id}`)
    
    return data
  }

  const loadAllItems = async () => {
    const res = await Promise.all(items.map(i => getItem(i.id)))

    setCardProducts(res)
  }

  useEffect(() => {
    loadAllItems()
  }, [items])

  return (
    <>
      <Headling>Корзина</Headling>
      {items.map(i => {
        const product = cardProducts.find(p => p.id === i.id)
        if (!product) {
          return
        }

        return (
          <CartItem
            key={product.id}
            id={product.id}
            name={product.name}
            image={product.image}
            price={product.price}
            count={i.count}
          />
        )
      })}
    </>
  )
}
