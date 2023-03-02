import React, { useEffect } from 'react'
import styles from '../styles/SuccesRegistration.module.css'
import Image from 'next/image'
import succesRegistrationImg from '../public/succesRegistration.png'
import { useRouter } from 'next/router'

const SuccessRegistration = () => {
  const router = useRouter()

  const timeout = setTimeout(() => {
    router.push('/')
  }, 3000)

  useEffect(() => {
    return () => {
      clearTimeout(timeout)
    }
  }, [])

  return (
    <>
      <div className={styles.wrapper}>
        <Image
          src={succesRegistrationImg}
          alt="succesReg"
          height="300"
          width="329"
          unoptimized
        />
        <div className={styles.succesText}>Успешная регистрация</div>
      </div>
    </>
  )
}

export default SuccessRegistration
