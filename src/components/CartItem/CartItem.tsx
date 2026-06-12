import { useDispatch } from 'react-redux'
import type { AppDispatch } from '../../store/store'
import styles from './CartItem.module.css'
import type { CartItemProps } from './CartItem.props'
import { cartActions } from '../../store/cart.slice'

function CartItem(props: CartItemProps) {
  const dispatch = useDispatch<AppDispatch>()

  const increase = () => {
    // dispatch(dispatch(cartActions.add(props.id))
  }

  const descrease = () => {
    // dispatch(dispatch(cartActions.remove(props.id)))
  }

  const remove = () => {
    // dispatch(dispatch(cartActions.remove(props.id)))
  }

  return (
    <div className={styles['item']}>
      <div
        className={styles['image']}
        style={{ backgroundImage: `url(${props.image})` }}
      ></div>
      <div className={styles['description']}>
        <div className={styles.name}>{props.name}</div>
        <div className={styles.currency}>{props.price}&nbsp;₽</div>
      </div>
      <div className={styles['actions']}>
        <button className={styles['button']} onClick={descrease}>
          <img src="./cart-button-icon.svg" />
        </button>
        <div>{props.count}</div>
        <button className={styles['button']} onClick={increase}>
          <img src="./cart-button-icon.svg"  />
        </button>
        <button className={styles['remove']} onClick={increase}>
          <img src="./cart-button-icon.svg"  />
        </button>
      </div>
    </div>
  )
}

export default CartItem
