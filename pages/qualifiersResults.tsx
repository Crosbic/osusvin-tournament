import {
  createTheme,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  ThemeProvider,
} from '@mui/material'
import { ruRU } from '@mui/material/locale'
import axios from 'axios'
import React from 'react'
import { NumericFormat } from 'react-number-format'
import useSWR from 'swr'

import styles from '../styles/QualifiersResults.module.css'

const fetcher = (url: any) =>
  axios(url).then((res) => {
    return JSON.parse(res.data)
  })

const Quals = () => {
  const { data, error } = useSWR('/api/staticdata', fetcher)

  if (error) {
    return <div className={styles.loading}>Failed to load</div>
  }
  if (!data) {
    return <div>Loading...</div>
  }

  const sortedScores = data.sort(
    (a: any, b: any) => b.overalScore - a.overalScore
  )

  const theme = createTheme(
    {
      palette: {
        mode: 'dark',
        primary: { main: '#eaeaea' },
        secondary: { main: '#ff7eb9' },
      },
      typography: {
        fontFamily: ['Comfortaa', 'TrebuchetMS'].join(','),
        fontSize: 16,
      },
    },
    ruRU
  )

  let count = 1

  return (
    <>
      <ThemeProvider theme={theme}>
        <div className={styles.table}>
          <TableContainer>
            <Table
              sx={{
                minWidth: 500,
              }}
              size="small"
            >
              <TableHead>
                <TableRow>
                  <TableCell align="center">Место</TableCell>
                  <TableCell align="center">Имя</TableCell>
                  <TableCell align="center">NM счёт</TableCell>
                  <TableCell align="center">HD счёт</TableCell>
                  <TableCell align="center">HR счёт</TableCell>
                  <TableCell align="center">DT счёт</TableCell>
                  <TableCell align="center">Общий счёт</TableCell>
                  <TableCell align="center">Сид</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedScores.map((userMatch: any) => {
                  return (
                    <TableRow
                      key={userMatch.user.username}
                      sx={{
                        '&:last-child td, &:last-child th': {
                          border: 0,
                        },
                      }}
                    >
                      <TableCell align="center">{count++}</TableCell>
                      <TableCell align="center">
                        {userMatch.user.username}
                      </TableCell>
                      <TableCell align="center">
                        <NumericFormat
                          value={userMatch.scoresByMods.NF}
                          thousandSeparator=" "
                          displayType="text"
                        />
                      </TableCell>
                      <TableCell align="center" className={styles.link}>
                        <NumericFormat
                          value={userMatch.scoresByMods.NFHD}
                          thousandSeparator=" "
                          displayType="text"
                        />
                      </TableCell>
                      <TableCell align="center">
                        <NumericFormat
                          value={userMatch.scoresByMods.NFHR}
                          thousandSeparator=" "
                          displayType="text"
                        />
                      </TableCell>
                      <TableCell align="center">
                        <NumericFormat
                          value={userMatch.scoresByMods.NFDT}
                          thousandSeparator=" "
                          displayType="text"
                        />
                      </TableCell>
                      <TableCell align="center">
                        <NumericFormat
                          value={userMatch.overalScore}
                          thousandSeparator=" "
                          displayType="text"
                        />
                      </TableCell>
                      <TableCell align="center">
                        {userMatch.user.seed}
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </ThemeProvider>
    </>
  )
}

export default Quals
