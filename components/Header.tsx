import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import headerImg from '/public/header.svg'
import styles from '/styles/Header.module.css'

const Header = () => {
  return (
    <>
      <Head>
        <title>osu! svin tournament</title>
      </Head>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <Link href="/">
            <Image src={headerImg} alt="Header" height="210" width="700" />
          </Link>
        </div>
      </div>
    </>
  )
}

export default Header
