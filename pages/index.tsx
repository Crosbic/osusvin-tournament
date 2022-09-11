import type { NextPage } from "next";
import Image from "next/image";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div>
      <div className={styles.background}>
        <div className={styles.main}>
          <div className={styles.reggrid}>
            <a href="https://nextjs.org/docs" className={styles.regcard}>
              <h2>Регистрация</h2>
            </a>

            <div className={styles.grid}>
              <a href="https://nextjs.org/learn" className={styles.card}>
                <h2>Список игроков</h2>
              </a>

              <a
                href="https://github.com/vercel/next.js/tree/canary/examples"
                className={styles.card}
              >
                <h2>Расписание</h2>
              </a>

              <a
                href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                className={styles.card}
              >
                <h2>Маппулы</h2>
              </a>
            </div>
            <div className={styles.icons}>
              <a href="https://discord.gg/GBcrMYBx">
                <Image
                  src="/discord.png"
                  alt="Discord logo"
                  width={52}
                  height={52}
                />
              </a>
              <Image src="/osu.png" alt="Osu logo" width={56} height={52} />
              <Image
                src="/twitch.png"
                alt="Twitch logo"
                width={52}
                height={52}
              />
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by Crosbic ass
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
