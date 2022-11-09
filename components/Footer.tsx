import styles from '../styles/Home.module.css'

const Footer = () => {
  return (
    <footer>
      <p className={styles.footer}>© 2022 Crosbic Inc. Все права защищены.</p>
      <a href="mailto:thecrosbic@gmail.com">
        <p className={styles.description}>По всем вопросам писать на почту</p>
      </a>
    </footer>
  )
}

export default Footer
