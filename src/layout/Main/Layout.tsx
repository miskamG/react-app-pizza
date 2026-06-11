import { NavLink, Outlet, useNavigate } from 'react-router'
import Button from '../../components/Button/Button'
import styles from './Layout.module.css'
import cn from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../../store/store'
import { profile, userActions } from '../../store/user.slice'
import { useEffect } from 'react'

export function Layout() {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const userProfile = useSelector((state: RootState) => state.user.profile)
  const items = useSelector((state: RootState) => state.cart.items)

  useEffect(() => {
    dispatch(profile())
  }, [dispatch])

  const logout = () => {
    dispatch(userActions.logout())
    navigate('/auth/login')
  }
  return (
    <div className={styles.layout}>
      <div className={styles.sidebar}>
        <div className={styles.user}>
          <img src="./person-img.png" alt="" className={styles.avatar} />
          <div className={styles.name}>{userProfile?.name}</div>
          <div className={styles.email}>{userProfile?.email}</div>
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
          {items.reduce((acc, item) => acc + item.count, 0)}
        </div>
        <Button className={styles.exit} onClick={logout}>
          <img src="./exit-icon.svg" alt="" />
          Выйти
        </Button>
      </div>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  )
}
