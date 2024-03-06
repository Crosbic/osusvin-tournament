import Image from 'next/image'
import Link from 'next/link'

import AuthButton from '../components/AuthButton'
import styles from '../styles/Home.module.css'

const Home = () => {
  return (
    <>
      <div className={styles.content}>
        <div className={styles.reggrid}>
          <AuthButton />
          <div className={styles.grid}>
            <Link href="/participants">
              <div className={styles.card}>
                <h2>Список игроков</h2>
              </div>
            </Link>
            <Link href="/schedule">
              <div className={styles.card}>
                <h2>Расписание</h2>
              </div>
            </Link>
            <Link href="/mappools">
              <div className={styles.card}>
                <h2>Маппулы</h2>
              </div>
            </Link>
          </div>
          <div className={styles.icons}>
            <Link href="https://discord.gg/KfdDd2zqas">
              <Image
                src="/discord.svg"
                alt="Discord logo"
                width={42}
                height={30}
              />
            </Link>
            <Link href="https://osu.ppy.sh/community/forums/topics/1718381?n=1">
              <Image src="/osu.svg" alt="Osu logo" width={30} height={30} />
            </Link>
            <Link href="https://www.twitch.tv/osu_svin">
              <Image
                src="/twitch.svg"
                alt="Twitch logo"
                width={32.25}
                height={30}
              />
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
