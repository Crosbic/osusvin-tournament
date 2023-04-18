import { TabContext, TabList, TabPanel } from '@mui/lab'
import {
  Button,
  CircularProgress,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

import SetLobbyResults from '../components/staff/SetLobbyResults'
import StaffRegisterButton from '../components/staff/StaffRegisterButton'
import styles from '../styles/Schedule.module.css'

interface QualifiersData {
  id: number
  name: string
  dateStarted: Date
  resultLink: string
  users: any
  referees: any
}

interface Data {
  id: number
  name: string
  resultLink: string
  dateStarted: Date
  player1Score: number
  player2Score: number
  player1: any
  player2: any
  referees: any
  casters: any
}

const ScheduleTable = () => {
  const [user, setUser] = useState<any>()
  const [value, setValue] = useState<string>('SF')
  const [qualifiersRows, setQualifiersRows] = useState<QualifiersData[]>([])
  const [rows, setRows] = useState<Data[]>([])
  const [isLoading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('user') !== null) {
        setUser(JSON.parse(localStorage.getItem('user') ?? ''))
      }
    }
    setLoading(true)
    axios
      .get('https://auth.osusvin.ru/qualification-lobbies/')
      .then((res) => res.data)
      .then((data) => {
        setQualifiersRows(data as QualifiersData[])
      })
      .finally(() => setLoading(false))
  }, [])

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  useEffect(() => {
    setLoading(true)
    if (value === 'quals') {
      axios
        .get('https://auth.osusvin.ru/qualification-lobbies/')
        .then((res) => res.data)
        .then((data) => {
          setQualifiersRows(data as QualifiersData[])
        })
        .finally(() => setLoading(false))
    } else {
      axios
        .get('https://auth.osusvin.ru/lobbies/', {
          params: { stage: value },
        })
        .then((res) => res.data)
        .then((data) => {
          setRows(data as Data[])
        })
        .finally(() => setLoading(false))
    }
  }, [value])

  if (isLoading) {
    return (
      <div>
        <CircularProgress />
      </div>
    )
  }

  const sortedRows = rows.sort(
    (a, b) =>
      new Date(a.dateStarted).getTime() - new Date(b.dateStarted).getTime()
  )

  const sortedQualifiersRows = qualifiersRows.sort((a, b) => a.id - b.id)
  const currentRoles = user?.role.map((currentRole: any) => currentRole.role)

  return (
    <>
      <div className={styles.wrapper}>
        {currentRoles?.includes('user') || !user ? (
          <div className={styles.buttonGroup}>
            <Button variant="outlined" href="/bracket">
              Сетка
            </Button>
          </div>
        ) : (
          <div className={styles.buttonGroup}>
            <Button variant="outlined" href="/bracket">
              Сетка
            </Button>
            <StaffRegisterButton rows={rows} />
            <SetLobbyResults rows={rows} />
          </div>
        )}
        <TabContext value={value}>
          <TabList
            textColor="inherit"
            indicatorColor="secondary"
            className={styles.tabs}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons
            allowScrollButtonsMobile
          >
            <Tab label="Квалификация" value="quals" />
            <Tab label="Round of 32" value="RO32" />
            <Tab label="Round of 16" value="RO16" />
            <Tab label="Quarterfinals" value="QF" />
            <Tab label="Semifinals" value="SF" />
            <Tab label="Finals" value="F" disabled />
            <Tab label="Grand Finals" value="GF" disabled />
          </TabList>
          <TabPanel value="quals">
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
                      <TableCell align="center">ID</TableCell>
                      <TableCell align="center">Дата</TableCell>
                      <TableCell align="center">Игроки</TableCell>
                      <TableCell align="center">Рефери</TableCell>
                      <TableCell align="center">Ссылка</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {sortedQualifiersRows.map((qualifiersRow) => {
                      const date = (qualifiersRow.dateStarted = new Date(
                        qualifiersRow.dateStarted
                      ))

                      return (
                        <TableRow
                          key={qualifiersRow.name}
                          sx={{
                            '&:last-child td, &:last-child th': {
                              border: 0,
                            },
                          }}
                        >
                          <TableCell align="center" padding="none">
                            {qualifiersRow.name}
                          </TableCell>
                          <TableCell align="center">
                            {date.toLocaleString('ru-RU')}
                          </TableCell>
                          <TableCell align="center">
                            {qualifiersRow.users.map((user: any) => {
                              return (
                                <div key={user.id} className={styles.users}>
                                  <Link
                                    href={`https://osu.ppy.sh/users/${user.id}`}
                                  >
                                    {user.username}
                                  </Link>
                                  &nbsp; &nbsp;
                                </div>
                              )
                            })}
                          </TableCell>
                          <TableCell align="center">
                            {qualifiersRow.referees.map((referee: any) => {
                              return (
                                <div className={styles.link} key={referee.id}>
                                  <Link
                                    href={`https://osu.ppy.sh/users/${referee.id}`}
                                  >
                                    {referee.username}
                                  </Link>
                                </div>
                              )
                            })}
                          </TableCell>
                          <TableCell align="center">
                            {qualifiersRow.resultLink ? (
                              <div className={styles.link}>
                                <Link href={qualifiersRow.resultLink}>
                                  Ссылка
                                </Link>
                              </div>
                            ) : null}
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
            <div className={styles.regButton}>
              <Link href={`https://osusvin.ru/qualifiersResults`}>
                <Button variant="outlined">Результаты квалификаций</Button>
              </Link>
            </div>
          </TabPanel>
          {value !== 'quals' ? (
            <TabPanel value={value}>
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
                        <TableCell align="center">ID</TableCell>
                        <TableCell align="center">Дата</TableCell>
                        <TableCell align="center">Игрок 1</TableCell>
                        <TableCell align="center" colSpan={2}>
                          Счёт
                        </TableCell>
                        <TableCell align="center">Игрок 2</TableCell>
                        <TableCell align="center">Рефери</TableCell>
                        <TableCell align="center">Стример</TableCell>
                        <TableCell align="center">Ссылка</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {sortedRows.map((rows) => {
                        const date = (rows.dateStarted = new Date(
                          rows.dateStarted
                        ))

                        return (
                          <TableRow
                            key={rows.id}
                            sx={{
                              '&:last-child td, &:last-child th': {
                                border: 0,
                              },
                            }}
                          >
                            <TableCell align="center">{rows.name}</TableCell>
                            <TableCell align="center">
                              {date.toLocaleString('ru-RU')}
                            </TableCell>
                            <TableCell align="center">
                              {rows.player1.map((user: any) => {
                                return (
                                  <div key={user.id} className={styles.link}>
                                    <Link
                                      href={`https://osu.ppy.sh/users/${user.id}`}
                                    >
                                      <div className={styles.user1}>
                                        {user.username}
                                        &nbsp;&nbsp;
                                        <Image
                                          className={styles.avatar}
                                          src={user.avatarUrl}
                                          alt="User avatar"
                                          width="30"
                                          height="30"
                                          unoptimized
                                        />
                                      </div>
                                    </Link>
                                  </div>
                                )
                              })}
                            </TableCell>
                            <TableCell align="center" padding="none">
                              {rows.player1Score > rows.player2Score ? (
                                <div className={styles.winner}>
                                  {rows.player1Score}
                                </div>
                              ) : (
                                <div className={styles.looser}>
                                  {rows.player1Score}
                                </div>
                              )}
                            </TableCell>
                            <TableCell align="center" padding="none">
                              {rows.player2Score > rows.player1Score ? (
                                <div className={styles.winner}>
                                  {rows.player2Score}
                                </div>
                              ) : (
                                <div className={styles.looser}>
                                  {rows.player2Score}
                                </div>
                              )}
                            </TableCell>
                            <TableCell align="center">
                              {rows.player2.map((user: any) => {
                                return (
                                  <div key={user.id} className={styles.link}>
                                    <Link
                                      href={`https://osu.ppy.sh/users/${user.id}`}
                                    >
                                      <div className={styles.user2}>
                                        <Image
                                          className={styles.avatar}
                                          src={user.avatarUrl}
                                          alt="User avatar"
                                          width="30"
                                          height="30"
                                          unoptimized
                                        />
                                        &nbsp;&nbsp;
                                        {user.username}
                                      </div>
                                    </Link>
                                  </div>
                                )
                              })}
                            </TableCell>
                            <TableCell align="center">
                              {rows.referees.map((referee: any) => {
                                return (
                                  <div className={styles.link} key={referee.id}>
                                    <Link
                                      href={`https://osu.ppy.sh/users/${referee.id}`}
                                    >
                                      <div className={styles.user}>
                                        <Image
                                          className={styles.avatar}
                                          src={referee.avatarUrl}
                                          alt="User avatar"
                                          width="30"
                                          height="30"
                                          unoptimized
                                        />
                                        &nbsp;
                                        {referee.username}
                                      </div>
                                    </Link>
                                  </div>
                                )
                              })}
                            </TableCell>
                            <TableCell align="center">
                              {rows.casters.map((caster: any) => {
                                return (
                                  <div className={styles.link} key={caster.id}>
                                    <Link
                                      href={`https://osu.ppy.sh/users/${caster.id}`}
                                    >
                                      <div className={styles.user}>
                                        <Image
                                          className={styles.avatar}
                                          src={caster.avatarUrl}
                                          alt="User avatar"
                                          width="30"
                                          height="30"
                                          unoptimized
                                        />
                                        &nbsp;
                                        {caster.username}
                                      </div>
                                    </Link>
                                  </div>
                                )
                              })}
                            </TableCell>
                            <TableCell align="center">
                              {rows.resultLink ? (
                                <div className={styles.link}>
                                  <Link href={rows.resultLink}>Ссылка</Link>
                                </div>
                              ) : null}
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </TabPanel>
          ) : null}
        </TabContext>
      </div>
    </>
  )
}

export default ScheduleTable
