import { useLoaderData } from "react-router"
import type { Product } from "../../interfaces/Product.interface"

export function Product() {
  // const {id} = useParams()
  const data = useLoaderData() as Product

  return <>Product {data.name}</>
}
