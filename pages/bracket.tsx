import styles from '../styles/Bracket.module.css'

const Bracket = () => {
  return (
    <>
      <div className={styles.wrapper}>
        <iframe
          style={{
            border: 'none',
            borderRadius: '50px',
          }}
          src="https://challonge.com/ru/osu_svin/module?theme=2"
          width="100%"
          height="630"
          allowTransparency={true}
          allowFullScreen={true}
        ></iframe>
      </div>
    </>
  )
}

export default Bracket
