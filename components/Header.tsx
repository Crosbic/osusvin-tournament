import Image from 'next/image'
import styles from '/styles/Header.module.css'

const Header = () => {
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <a href="">
            <Image src="header.svg" alt="Header" height="125" width="600" />
          </a>
        </div>
      </div>
    </>
  )
}

export default Header
