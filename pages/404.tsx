import Image from 'next/image'
import styles from '../styles/404.module.css'

const Custom404 = () => {
  return (
    <>
      <main className={styles.error}>
        <Image src="404.png" alt="zxc aboba" height="300" width="300" />
        <div className={styles.errorText}>Куда полез, чертила?</div>
        <p className={styles.errorDescritpion}>Этой страницы нет, иди отсюда</p>
      </main>
    </>
  )
}

export default Custom404
