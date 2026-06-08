import { NavLink, Outlet } from 'react-router'
import Button from '../components/Button/Button'
import styles from './Layout.module.css'
import cn from 'classnames'

export function Layout() {
  return (
    <div className={styles.layout}>
      <div className={styles.sidebar}>
        <div className={styles.user}>
          <img src="./person-img.png" alt="" className={styles.avatar} />
          <div className={styles.name}>Александр Петров</div>
          <div className={styles.email}>petr@ya.ru</div>
        </div>
        <div className={styles.menu}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              cn(styles.link, {
                [styles.active]: isActive,
              })
            }
          >
            <img src="./menu-icon.svg" alt="" />
            Меню
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              cn(styles.link, {
                [styles.active]: isActive,
              })
            }
          >
            <img src="./cart-icon.svg" alt="" />
            Корзина
          </NavLink>
        </div>
        <Button className={styles.exit}>
          <img src="./exit-icon.svg" alt="" />
          Выйти
        </Button>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  )
}
