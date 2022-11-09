import Image from 'next/image'
import styles from '/styles/Header.module.css'
import Link from 'next/link'
import Head from 'next/head'

const Header = () => {
  return (
    <>
      <Head>
        <title>osu!svin tournament</title>
      </Head>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <Link href="/">
            <a>
              <Image src="header.svg" alt="Header" height="125" width="700" />
            </a>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Header
