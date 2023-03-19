import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

import succesRegistrationImg from '../public/succesRegistration.png'
import styles from '../styles/SuccesRegistration.module.css'

const SuccessRegistration = () => {
  const router = useRouter()

  const timeout = setTimeout(() => {
    router.push('/')
  }, 3000)

  useEffect(() => {
    return () => {
      clearTimeout(timeout)
    }
  }, [timeout])

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
