import { Link } from 'react-router'
import styles from './ProductCard.module.css'
import type { ProductCardProps } from './ProductCard.props'

function ProductCard({
  id,
  title,
  description,
  image,
  price,
  rating,
}: ProductCardProps) {
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
          <button className={styles['add-to-cart']}>
            <img src="./cart-button-icon.svg" alt="Добавить в корзину" />
          </button>
          <span className={styles['rating']}>{rating} ⭐</span>
        </div>
        <div className={styles['footer']}>
          <h3 className={styles['title']}>{title}</h3>
          <p className={styles['description']}>{description}</p>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
