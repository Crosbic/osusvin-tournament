import React, { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import axios from "axios";
import { useRouter } from "next/router";

const AuthButton = () => {
  const router = useRouter();
  const [token, setToken] = useState<string>();
  const [user, setUser] = useState<any>();

  useEffect(() => {
    setToken(localStorage.getItem("jwt") ?? "");
    setUser(JSON.parse(localStorage.getItem("user") ?? "{}"));
  }, []);

  const signIn = async () => {
    try {
      const { data } = await axios.get(
        "https://auth.osusvin.ru/auth/osu/login"
      );

      console.log(data);

      if (data.accessToken) {
        localStorage.setItem("jwt", data.accessToken);
        localStorage.setItem("user", JSON.stringify(data.user));
        setToken(data.accessToken);
        setUser(data.user);
        router.push("/successRegistration");
      } else {
        router.push("/successRegistration");
      }
    } catch (e) {
      router.push("/errorRegistration");
    }
  };

  const signOut = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("user");
    setToken("");
    setUser(null);
  };

  if (!token) {
    return (
      <div className={styles.regcard} onClick={signIn}>
        <h2>Регистрация</h2>
      </div>
    );
  } else {
    return (
      <>
        <h2>Привет, {user.username}</h2>
        <div className={styles.regcard} onClick={signOut}>
          <h2>Выйти</h2>
        </div>
      </>
    );
  }
};

export default AuthButton;
