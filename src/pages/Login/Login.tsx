import { useEffect, type SubmitEventHandler } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router'
import Button from '../../components/Button/Button'
import Headling from '../../components/Headling/Headling'
import Input from '../../components/Input/input'
import type { AppDispatch, RootState } from '../../store/store'
import { login, userActions } from '../../store/user.slice'
import styles from './Login.module.css'

export type LoginForm = {
  email: {
    value: string
  }
  password: {
    value: string
  }
}

export function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const { jwt, loginErrorMessage } = useSelector(
    (state: RootState) => state.user,
  )

  useEffect(() => {
    if (jwt) {
      navigate('/')
    }
  }, [jwt, navigate])

  const submit: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()

    dispatch(userActions.cleanLoginError())

    const target = e.target as typeof e.target & LoginForm
    const { email, password } = target

    await sendLogin(email.value, password.value)
  }

  const sendLogin = async (email: string, password: string) => {
    dispatch(login({ email, password }))
    // try {
    //   const { data } = await axios.post<LoginResponse>(`${PREFIX}/auth/login`, {
    //     email,
    //     password,
    //   })

    //   dispatch(userActions.addJwt(data.access_token))

    //   navigate('/')
    // } catch (e) {
    //   if (e instanceof AxiosError) {
    //     setError(e.response?.data.message)
    //   }
    // }
  }

  return (
    <div className={styles.login}>
      <Headling>Вход</Headling>
      {loginErrorMessage && (
        <div className={styles.error}>{loginErrorMessage}</div>
      )}
      <form className={styles.form} onSubmit={submit}>
        <div className={styles.field}>
          <label htmlFor="email">Ваш email</label>
          <Input id="email" name="email" placeholder="Email" />
        </div>
        <div className={styles.field}>
          <label htmlFor="password">Ваш пароль</label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Пароль"
          />
        </div>
        <Button appearance="big">Вход</Button>
      </form>
      <div className={styles.links}>
        <div>Нет аккаунта?</div>
        <Link to="auth/register">Зарегистрироваться</Link>
      </div>
    </div>
  )
}
