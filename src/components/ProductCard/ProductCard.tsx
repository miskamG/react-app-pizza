import { useDispatch } from 'react-redux'
import { Link } from 'react-router'
import type { AppDispatch } from '../../store/store'
import styles from './ProductCard.module.css'
import type { ProductCardProps } from './ProductCard.props'
import { cartActions } from '../../store/cart.slice'
import type { MouseEvent } from 'react'

function ProductCard({
  id,
  name,
  description,
  image,
  price,
  rating,
}: ProductCardProps) {
  const dispatch = useDispatch<AppDispatch>()
  const add = (e: MouseEvent) => {
    e.preventDefault()

    dispatch(
      cartActions.add(id),
    )
  }
  return (
    <Link to={`/product/${id}`} className={styles['link']}>
      <div className={styles['card']}>
        <div
          className={styles['head']}
          style={{ backgroundImage: `url(${image})` }}
        >
          <div className={styles['price']}>
            {price}&nbsp;
            <span className={styles.currency}>₽</span>
          </div>
          <button className={styles['add-to-cart']} onClick={add}>
            <img src="./cart-button-icon.svg" alt="Добавить в корзину" />
          </button>
          <span className={styles['rating']}>{rating} ⭐</span>
        </div>
        <div className={styles['footer']}>
          <h3 className={styles['title']}>{name}</h3>
          <p className={styles['description']}>{description}</p>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
