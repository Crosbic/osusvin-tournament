import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import styles from '../../styles/Schedule.module.css'

interface ScheduleTableProps {
  sortedQualifiersRows: any
}

const MainStagesCards = (props: ScheduleTableProps) => {
  const { sortedQualifiersRows } = props

  return (
    <>
      {sortedQualifiersRows.map((rows: any) => {
        const date = (rows.dateStarted = new Date(rows.dateStarted))
        const player1 = rows.player1.map((user: any) => {
          return (
            <div key={user.id} className={styles.link}>
              <Link href={`https://osu.ppy.sh/users/${user.id}`}>
                <div className={styles.user2}>
                  {user.username}
                  &ensp;
                  <div style={{ width: '25px' }}>
                    <Image
                      className={styles.avatar}
                      src={user.avatarUrl}
                      alt="User avatar"
                      width="25"
                      height="25"
                      unoptimized
                    />
                  </div>
                </div>
              </Link>
            </div>
          )
        })
        const player2 = rows.player2.map((user: any) => {
          return (
            <div key={user.id} className={styles.link}>
              <Link href={`https://osu.ppy.sh/users/${user.id}`}>
                <div className={styles.user2}>
                  <div style={{ width: '25px' }}>
                    <Image
                      className={styles.avatar}
                      src={user.avatarUrl}
                      alt="User avatar"
                      width="25"
                      height="25"
                      unoptimized
                    />
                  </div>
                  &ensp;
                  {user.username}
                </div>
              </Link>
            </div>
          )
        })

        return (
          <div key={rows.id} className={styles.card}>
            <Card
              variant="outlined"
              sx={{
                minWidth: 325,
                width: '100%',
                background:
                  'linear-gradient(107.64deg, rgba(255, 255, 255, 0.28) 1.92%, rgba(255, 255, 255, 0) 100.84%)',
                backdropFilter: 'blur(6px)',
                border: '1px inset #eaeaea',
                borderRadius: '15px',
              }}
            >
              <CardContent
                sx={{
                  padding: '0.7rem 0.7rem 0.2rem 0.7rem',
                  '&:last-child': {
                    paddingBottom: '0.2rem',
                  },
                }}
              >
                <Typography
                  sx={{
                    display: 'flex',
                    fontSize: 15,
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    paddingBottom: '0.2rem',
                  }}
                >
                  Матч&nbsp;{rows.name}
                </Typography>
                <Typography sx={{ fontSize: 14 }} component="span">
                  <div className={styles.cardRow}>
                    {player1}&nbsp;
                    {rows.player1Score > rows.player2Score ? (
                      <div className={styles.cardRow}>
                        <div className={styles.winner}>{rows.player1Score}</div>
                        &nbsp;:&nbsp;
                        <div className={styles.looser}>{rows.player2Score}</div>
                      </div>
                    ) : (
                      <div className={styles.cardRow}>
                        <div className={styles.looser}>{rows.player1Score}</div>
                        &nbsp;:&nbsp;
                        <div className={styles.winner}>{rows.player2Score}</div>
                      </div>
                    )}
                    &nbsp;{player2}
                  </div>
                </Typography>
                <Typography
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    fontSize: 13,
                    paddingTop: '0.3rem',
                  }}
                >
                  {date.toLocaleString('ru-RU', {
                    day: 'numeric',
                    month: 'long',
                    hour: 'numeric',
                    minute: '2-digit',
                    second: undefined,
                  })}
                </Typography>

                <Typography
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: 13,
                  }}
                >
                  Рефери:&ensp;
                  {rows.referees.map((referee: any) => referee.username)}
                </Typography>
              </CardContent>
              <CardActions className={styles.cardButton}>
                {rows.resultLink ? (
                  <Button
                    size="small"
                    variant="outlined"
                    href={rows.resultLink}
                    sx={{
                      fontSize: 12,
                      background: '#3d3f3d',
                    }}
                  >
                    Ссылка на лобби
                  </Button>
                ) : null}
              </CardActions>
            </Card>
          </div>
        )
      })}
    </>
  )
}

export default MainStagesCards
