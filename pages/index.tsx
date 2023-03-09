import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import AuthButton from '../components/AuthButton'
const Home = () => {
  return (
    <>
      <div className={styles.content}>
        <div className={styles.reggrid}>
          <AuthButton />
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
            <Link href="mappool">
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
            <Link href="https://osu.ppy.sh/community/forums/topics/1718381?n=1">
              <a>
                <Image src="/osu.svg" alt="Osu logo" width={30} height={30} />
              </a>
            </Link>
            <Image
              src="/twitch.svg"
              alt="Twitch logo"
              width={32.25}
              height={30}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
