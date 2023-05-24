import { Card, CardContent, CardMedia, Typography } from '@mui/material'
import Link from 'next/link'
import React from 'react'

import styles from '../../styles/Mappols.module.css'

interface MappoolsTableProps {
  sortedBeatmaps: any
}

const MainStagesCards = (props: MappoolsTableProps) => {
  const { sortedBeatmaps } = props

  return (
    <>
      {sortedBeatmaps?.map((map: any) => {
        const name =
          map.artist + ' - ' + map.title + ' [' + map.difficultyName + ']'

        const stats =
          map.stats.cs.toFixed(1) +
          ' | ' +
          map.stats.hp.toFixed(1) +
          ' | ' +
          map.stats.od.toFixed(1) +
          ' | ' +
          map.stats.ar.toFixed(1)

        return (
          <div key={map.id} className={styles.card}>
            <Link href={map.url}>
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
                      flexDirection: 'column',
                      fontSize: 13,
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingBottom: '0.2rem',
                      component: 'span',
                    }}
                  >
                    <div style={{ fontSize: 15, fontWeight: 'bold' }}>
                      {map.tournamentModName}
                    </div>
                    <div>{name}</div>
                  </Typography>
                  <CardMedia
                    component="img"
                    alt="bg"
                    image={map.backgroundUrl}
                    sx={{ borderRadius: '15px', maxHeight: '100px' }}
                  />
                  <Typography
                    sx={{
                      display: 'flex',
                      fontSize: 13,
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: '0.2rem 0 0.4rem 0',
                    }}
                  >
                    Маппер:&nbsp;{map.mapper}
                  </Typography>
                  <Typography
                    sx={{
                      display: 'flex',
                      fontSize: 13,
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingTop: '0.2rem',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '1.5rem',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <div>CS | AR | OD | HP</div>
                        <div>{stats}</div>
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <div>BPM</div>
                        <div>{map.bpmString}</div>
                      </div>
                    </div>
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </div>
        )
      })}
    </>
  )
}

export default MainStagesCards
