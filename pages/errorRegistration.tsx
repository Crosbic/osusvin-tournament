import Image from 'next/image'
import React from 'react'

import errorRegistrationImg from '../public/errorRegistration.png'
import styles from '../styles/ErrorRegistration.module.css'

const errorRegistration = () => {
  return (
    <>
      <div className={styles.wrapper}>
        <Image
          src={errorRegistrationImg}
          alt="errorReg"
          height="300"
          width="300"
          unoptimized
        />
        <div className={styles.errorText}>Ошибка</div>
        <div className={styles.errorDescritpiton}>
          Ваш ранг не удовлетворяет поставелнным рамкам
        </div>
        <div className={styles.errorDescritpiton2}>
          (100 000 - 500 000 глобального топа).
        </div>
      </div>
    </>
  )
}

export default errorRegistration
