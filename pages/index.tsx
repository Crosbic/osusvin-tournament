import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>osu!svin tournament</title>
      </Head>
      <div className={styles.background}>
        <div className={styles.main}>
          <div className={styles.reggrid}>
            <a href="" className={styles.regcard}>
              <h2>Регистрация</h2>
            </a>

            <div className={styles.grid}>
              <a href="" className={styles.card}>
                <h2>Список игроков</h2>
              </a>

              <a href="" className={styles.card}>
                <h2>Расписание</h2>
              </a>

              <a href="" className={styles.card}>
                <h2>Маппулы</h2>
              </a>
            </div>
            <div className={styles.icons}>
              <a href="https://discord.gg/KfdDd2zqas">
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
            href="https://vk.com/cheeky_breeky_i_v_damke"
            target="_blank"
            rel="noopener noreferrer"
          >
            По всем вопросам обращаться сюда
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
