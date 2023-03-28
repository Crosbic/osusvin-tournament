import { TabContext, TabList, TabPanel } from '@mui/lab'
import {
  // Alert,
  // AlertTitle,
  // Box,
  Button,
  createTheme,
  // Dialog,
  // DialogActions,
  // DialogContent,
  // DialogTitle,
  // FormControl,
  // MenuItem,
  // Select,
  // Snackbar,
  Tab,
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
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

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

const ScheduleTable = () => {
  const [value, setValue] = useState('1')
  const [qualifiersRows, setQualifiersRows] = useState<QualifiersData[]>([])
  const [rows, setRows] = useState<Data[]>([])
  const [isLoading, setLoading] = useState<boolean>(false)
  // const [open, setOpen] = useState<boolean>(false)
  // const [lobby, setLobby] = useState<string>('')
  // const [key, setKey] = useState<any>()
  // const [error, setError] = useState<boolean>(false)
  // const [openAlert, setOpenAlert] = useState<boolean>(false)
  // const [success, setSuccess] = useState<boolean>(false)

  useEffect(() => {
    // setKey(localStorage.getItem('jwt') ?? '')
    setLoading(true)
    axios
      .get('https://auth.osusvin.ru/qualification-lobbies/')
      .then((res) => res.data)
      .then((data) => {
        setQualifiersRows(data as QualifiersData[])
      })
      .finally(() => setLoading(false))
  }, [])

  if (isLoading) {
    return <div>Loading...</div>
  }

  const handleTabChange = async (
    event: React.SyntheticEvent,
    newValue: string
  ) => {
    setValue(newValue)
    if (value === '1') {
      await axios
        .get('https://auth.osusvin.ru/qualification-lobbies/')
        .then((res) => res.data)
        .then((data) => {
          setQualifiersRows(data as QualifiersData[])
        })
        .finally(() => setLoading(false))
    } else if (value === '2') {
      await axios
        .get('https://auth.osusvin.ru/lobbies/')
        .then((res) => res.data)
        .then((data) => {
          setRows(data as Data[])
        })
        .finally(() => setLoading(false))
    }
  }

  const sortedRows = rows.sort(
    (a, b) =>
      new Date(a.dateStarted).getTime() - new Date(b.dateStarted).getTime()
  )

  const sortedQualifiersRows = qualifiersRows.sort((a, b) => a.id - b.id)

  // const handleClickOpen = () => {
  //   setOpen(true)
  // }
  //
  // const handleClose = (
  //   event: React.SyntheticEvent<unknown>,
  //   reason?: string
  // ) => {
  //   if (reason !== 'backdropClick') {
  //     setOpen(false)
  //   }
  // }

  // const handleAlertClose = (
  //   event?: React.SyntheticEvent | Event,
  //   reason?: string
  // ) => {
  //   if (reason === 'clickaway') {
  //     return
  //   }
  //
  //   setOpenAlert(false)
  // }

  // const handleChooseLobby = async () => {
  //   await axios
  //     .post(
  //       `https://auth.osusvin.ru/qualification-lobbies/register/${lobby}`,
  //       null,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${key}`,
  //         },
  //       }
  //     )
  //     .then(() => {
  //       setTimeout(function () {
  //         window.location.reload()
  //       }, 1000)
  //       setSuccess(true)
  //       setOpenAlert(true)
  //     })
  //     .catch((err) => {
  //       if (err.request === 401) {
  //         console.log('Успех')
  //       } else {
  //         setOpenAlert(true)
  //         setError(true)
  //       }
  //     })
  //   setOpen(false)
  // }

  // const handleSetLink = async () => {
  //   await axios.post({resultLink})
  // }

  return (
    <>
      <ThemeProvider theme={theme}>
        <div className={styles.wrapper}>
          <TabContext value={value}>
            <TabList
              textColor="inherit"
              indicatorColor="secondary"
              className={styles.tabs}
              onChange={handleTabChange}
            >
              <Tab label="Квалификация" value="1" />
              <Tab label="Round of 32" value="2" />
            </TabList>
            <TabPanel value="1">
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
                            <TableCell align="center">
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
            </TabPanel>
            <TabPanel value="2">
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
                      {sortedRows.map((rows) => {
                        const date = (rows.dateStarted = new Date(
                          rows.dateStarted
                        ))

                        return (
                          <TableRow
                            key={rows.name}
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
                              {rows.referees.map((referee: any) => {
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
          </TabContext>
          <div className={styles.regButton}>
            <Link href={`https://osusvin.ru/qualifiersResults`}>
              <Button variant="outlined">Результаты квалификаций</Button>
            </Link>
            {/*<Dialog open={open} onClose={handleClose}>*/}
            {/*  <DialogTitle>Выберите лобби</DialogTitle>*/}
            {/*  <DialogContent>*/}
            {/*    <Box*/}
            {/*      component="form"*/}
            {/*      sx={{ display: 'flex', flexWrap: 'wrap' }}*/}
            {/*    >*/}
            {/*      <FormControl sx={{ m: 1, minWidth: 120 }}>*/}
            {/*        <Select*/}
            {/*          onChange={(e) => setLobby(e.target.value)}*/}
            {/*          value={lobby}*/}
            {/*          required*/}
            {/*        >*/}
            {/*          {sortedRows.map((lobbyId) => {*/}
            {/*            return (*/}
            {/*              <MenuItem key={lobbyId.id} value={lobbyId.id}>*/}
            {/*                {lobbyId.name}*/}
            {/*              </MenuItem>*/}
            {/*            )*/}
            {/*          })}*/}
            {/*        </Select>*/}
            {/*      </FormControl>*/}
            {/*    </Box>*/}
            {/*  </DialogContent>*/}
            {/*  <DialogActions>*/}
            {/*    <Button onClick={handleChooseLobby}>Выбрать</Button>*/}
            {/*    <Button onClick={handleClose}>Назад</Button>*/}
            {/*  </DialogActions>*/}
            {/*</Dialog>*/}
          </div>
        </div>
        {/*{error ? (*/}
        {/*  <Snackbar*/}
        {/*    open={openAlert}*/}
        {/*    autoHideDuration={4000}*/}
        {/*    onClose={handleAlertClose}*/}
        {/*  >*/}
        {/*    <Alert severity="error">*/}
        {/*      <AlertTitle>Ошибка регистрации в лобби</AlertTitle>Возможно лобби*/}
        {/*      заполнено либо вы не авторизованы*/}
        {/*    </Alert>*/}
        {/*  </Snackbar>*/}
        {/*) : null}*/}

        {/*{success ? (*/}
        {/*  <Snackbar*/}
        {/*    open={openAlert}*/}
        {/*    autoHideDuration={1000}*/}
        {/*    onClose={handleAlertClose}*/}
        {/*  >*/}
        {/*    <Alert severity="success">*/}
        {/*      <AlertTitle>Успех</AlertTitle>Успешная регистрация на сайте*/}
        {/*    </Alert>*/}
        {/*  </Snackbar>*/}
        {/*) : null}*/}
      </ThemeProvider>
    </>
  )
}

export default ScheduleTable
