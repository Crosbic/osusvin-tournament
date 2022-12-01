import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

const Home = () => {
  return (
    <>
      <div className={styles.wrapper}>
        <main className={styles.content}>
          <div className={styles.reggrid}>
            <Link href="">
              <a className={styles.regcard}>
                <h2>Регистрация</h2>
              </a>
            </Link>

            <div className={styles.grid}>
              <Link href="participants">
                <a className={styles.card}>
                  <h2>Список игроков</h2>
                </a>
              </Link>

              <Link href="">
                <a className={styles.card}>
                  <h2>Расписание</h2>
                </a>
              </Link>

              <Link href="">
                <a className={styles.card}>
                  <h2>Маппулы</h2>
                </a>
              </Link>
            </div>
            <div className={styles.icons}>
              <Link href="https://discord.gg/KfdDd2zqas">
                <a>
                  <Image
                    src="/discord.svg"
                    alt="Discord logo"
                    width={42}
                    height={30}
                  />
                </a>
              </Link>
              <Image src="/osu.svg" alt="Osu logo" width={30} height={30} />
              <Image
                src="/twitch.svg"
                alt="Twitch logo"
                width={32.25}
                height={30}
              />
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

export default Home
