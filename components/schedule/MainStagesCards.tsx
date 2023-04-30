import { Card, CardActionArea, CardContent, Typography } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import styles from '../../styles/Schedule.module.css'

interface ScheduleTableProps {
  sortedRows: any
}

const MainStagesCards = (props: ScheduleTableProps) => {
  const { sortedRows } = props

  return (
    <>
      {sortedRows.map((rows: any) => {
        const title = 'Матч ' + rows.name
        const date = (rows.dateStarted = new Date(rows.dateStarted))
        const player1 = rows.player1.map((user: any) => {
          return (
            <div key={user.id} className={styles.link}>
              <Link href={`https://osu.ppy.sh/users/${user.id}`}>
                <div className={styles.user2}>
                  {user.username}
                  &nbsp;&nbsp;
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
                  &nbsp;&nbsp;
                  {user.username}
                </div>
              </Link>
            </div>
          )
        })

        return (
          <div key={rows.id} className={styles.card}>
            <Card variant="outlined" sx={{ minWidth: 275, width: '100%' }}>
              <CardContent>
                <Typography
                  sx={{
                    display: 'flex',
                    fontSize: 12,
                    justifyContent: 'center',
                    fontWeight: 'bold',
                  }}
                >
                  {title}
                </Typography>
                <Typography sx={{ fontSize: 14 }} component="span">
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                    }}
                  >
                    {player1}&nbsp;vs&nbsp;{player2}
                  </div>
                </Typography>
                <Typography
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    fontSize: 13,
                    color: '#d0d0d0',
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
              </CardContent>
              <CardActionArea></CardActionArea>
            </Card>
          </div>
        )
      })}
    </>
  )
}

export default MainStagesCards
