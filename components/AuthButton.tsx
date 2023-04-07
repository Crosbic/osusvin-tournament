import React, { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'
import Link from 'next/link'

const AuthButton = () => {
  const router = useRouter()
  const [token, setToken] = useState<string>()
  const [user, setUser] = useState<any>()

  useEffect(() => {
    setToken(localStorage.getItem('jwt') ?? '')
    setUser(JSON.parse(localStorage.getItem('user') ?? '{}'))
    migrateUserRole()
    checkLogin()
  }, [])

  const migrateUserRole = () => {
    if (!Array.isArray(user.role)) {
      user.role = [user.role]
      setUser(user)
      localStorage.setItem('user', user)
    }
  }

  const checkLogin = () => {
    const urlSearchParams = new URLSearchParams(window.location.search)
    const params = Object.fromEntries(urlSearchParams.entries())

    if (params.accessToken) {
      localStorage.setItem('jwt', params.accessToken)
      localStorage.setItem('user', params.user)
      setToken(params.accessToken)
      setUser(params.user)
      router.push('/successRegistration')
    }
  }

  const signOut = () => {
    localStorage.removeItem('jwt')
    localStorage.removeItem('user')
    setToken('')
    setUser(null)
  }

  if (!token) {
    return (
      <Link href={'https://auth.osusvin.ru/auth/osu/login'}>
        <a className={styles.regcard}>
          <h2>Регистрация</h2>
        </a>
      </Link>
    )
  } else {
    return (
      <>
        <h2>Привет, {user.username}</h2>
        <div
          className={styles.regcard}
          style={{ maxWidth: '330px', maxHeight: 'auto', cursor: 'pointer' }}
          onClick={signOut}
        >
          <h2>Выйти</h2>
        </div>
      </>
    )
  }
}

export default AuthButton
