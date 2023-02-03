import Image from 'next/image'
import styles from '../styles/404.module.css'
import errorImg from '/public/404.png'

const Custom404 = () => {
  return (
    <>
      <div className={styles.error}>
        <Image src={errorImg} alt="Error Image" height="300" width="300" />
        <div className={styles.errorText}>Куда полез, чертила?</div>
        <p className={styles.errorDescritpion}>Этой страницы нет, иди отсюда</p>
      </div>
    </>
  )
}

export default Custom404
