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
  const [rows, setRows] = useState<QualifiersData[]>([])
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
        setRows(data as QualifiersData[])
      })
      .finally(() => setLoading(false))
  }, [])

  if (isLoading) {
    return <div>Loading...</div>
  }

  const sortedRows = rows.sort((a, b) => a.id - b.id)

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

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
                      {sortedRows.map((row) => {
                        const date = (row.dateStarted = new Date(
                          row.dateStarted
                        ))

                        return (
                          <TableRow
                            key={row.name}
                            sx={{
                              '&:last-child td, &:last-child th': {
                                border: 0,
                              },
                            }}
                          >
                            <TableCell align="center">{row.name}</TableCell>
                            <TableCell align="center">
                              {date.toLocaleString('ru-RU')}
                            </TableCell>
                            <TableCell align="center">
                              {row.users.map((user: any) => {
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
                              {row.referees.map((referee: any) => {
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
                              {row.resultLink ? (
                                <div className={styles.link}>
                                  <Link href={row.resultLink}>Ссылка</Link>
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
