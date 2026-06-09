import { Suspense } from 'react'
import { Await, useLoaderData } from 'react-router'
import type { Product } from '../../interfaces/Product.interface'

export function Product() {
  // const {id} = useParams()
  const data = useLoaderData() as { data: Product }

  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <Await resolve={data}>{(data) => <div>{data.name}</div>}</Await>
    </Suspense>
  )
}
