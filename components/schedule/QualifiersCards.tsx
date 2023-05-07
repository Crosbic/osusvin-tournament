import {
  // Button,
  Card,
  // CardActions,
  CardContent,
  // Dialog,
  // DialogTitle,
  Typography,
} from '@mui/material'
import Link from 'next/link'
import React from 'react'

// import React, { useState } from 'react'
import styles from '../../styles/Schedule.module.css'

interface ScheduleTableProps {
  sortedQualifiersRows: any
}

const MainStagesCards = (props: ScheduleTableProps) => {
  const { sortedQualifiersRows } = props
  // const [open, setOpen] = useState<boolean>(false)
  //
  // const handleClickOpen = () => {
  //   setOpen(true)
  // }
  //
  // const handleClose = () => {
  //   setOpen(false)
  // }

  return (
    <>
      {sortedQualifiersRows.map((row: any) => {
        const name = 'Лобби ' + row.name
        const date = (row.dateStarted = new Date(row.dateStarted))

        return (
          <div key={row.id} className={styles.card}>
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
                    fontSize: 14,
                    justifyContent: 'center',
                    fontWeight: 'bold',
                  }}
                >
                  {row.resultLink ? (
                    <div className={styles.link}>
                      <Link href={row.resultLink}>{name}</Link>
                    </div>
                  ) : (
                    <div style={{ cursor: 'not-allowed' }}>{name}</div>
                  )}
                </Typography>
                <Typography
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    fontSize: 14,
                    paddingBottom: '0.3rem',
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
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    fontSize: 16,
                  }}
                >
                  {row.users.length !== 0 ? (
                    row.users.map((user: any) => {
                      return (
                        <div key={user.id} className={styles.link}>
                          <Link href={`https://osu.ppy.sh/users/${user.id}`}>
                            {user.username}
                          </Link>
                          &ensp;
                        </div>
                      )
                    })
                  ) : (
                    <div>Никого...</div>
                  )}
                </Typography>
              </CardContent>
              {/*  <CardActions className={styles.cardButton}>*/}
              {/*    <Button*/}
              {/*      size="small"*/}
              {/*      variant="outlined"*/}
              {/*      sx={{*/}
              {/*        fontSize: 12,*/}
              {/*        background: '#313331',*/}
              {/*      }}*/}
              {/*      onClick={handleClickOpen}*/}
              {/*    >*/}
              {/*      Подробнее*/}
              {/*    </Button>*/}
              {/*  </CardActions>*/}
            </Card>

            {/*<Dialog open={open} onClose={handleClose}>*/}
            {/*  <DialogTitle>Данные матча {rows.name}</DialogTitle>*/}
            {/*</Dialog>*/}
          </div>
        )
      })}
    </>
  )
}

export default MainStagesCards
