import React from 'react'
import styles from '../styles/ErrorRegistration.module.css'
import Image from 'next/image'
import errorRegImg from '../public/errorRegistration.png'

const errorRegistration = () => {
  return (
    <>
      <div className={styles.wrapper}>
        <Image
          src={errorRegImg}
          alt="errorRegImg"
          height="300"
          width="300"
          unoptimized
        />
        <div className={styles.errorText}>Ошибка</div>
        <div className={styles.errorDescritpiton}>
          При регистрации что-то пошло не так...
        </div>
      </div>
    </>
  )
}

export default errorRegistration
