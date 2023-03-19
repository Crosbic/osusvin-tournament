import Image from 'next/image'

import errorImg from '../public/404.png'
import styles from '../styles/404.module.css'

const Custom404 = () => {
  return (
    <>
      <div className={styles.error}>
        <Image
          src={errorImg}
          alt="Error Image"
          height="300"
          width="300"
          unoptimized
        />
        <div className={styles.errorText}>Куда полез, чертила?</div>
        <p className={styles.errorDescritpion}>Этой страницы нет, иди отсюда</p>
      </div>
    </>
  )
}

export default Custom404
