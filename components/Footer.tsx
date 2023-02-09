import styles from '../styles/Home.module.css'

const Footer = () => {
  return (
    <footer>
      <p className={styles.footer}>© 2023 Crosbic Inc. Все права защищены.</p>
      <a href="mailto:contact@crosbic.ru">
        <p className={styles.description}>По всем вопросам писать на почту</p>
      </a>
    </footer>
  )
}

export default Footer
