import { TabContext, TabList, TabPanel } from '@mui/lab'
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  createTheme,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  MenuItem,
  Paper,
  Select,
  Snackbar,
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
import React, { useEffect, useState } from 'react'

import styles from '../styles/Schedule.module.css'

interface QualifiersData {
  id: number
  name: string
  dateStarted: Date
  resultLink: string
  users: any
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
  const [open, setOpen] = useState<boolean>(false)
  const [lobby, setLobby] = useState<string>('')
  const [key, setKey] = useState<any>()
  const [error, setError] = useState<boolean>(false)
  const [openAlert, setOpenAlert] = useState<boolean>(false)

  useEffect(() => {
    setKey(localStorage.getItem('jwt') ?? '')
    setLoading(true)
    axios
      .get('http://localhost:8080/lobbies/')
      .then((res) => res.data)
      .then((data) => {
        setRows(data as QualifiersData[])
      })
      .finally(() => setLoading(false))
  }, [])

  if (isLoading) {
    return <div>Loading...</div>
  }

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = (
    event: React.SyntheticEvent<unknown>,
    reason?: string
  ) => {
    if (reason !== 'backdropClick') {
      setOpen(false)
    }
  }

  const handleChooseLobby = async () => {
    await axios
      .post(`http://localhost:8080/lobbies/register/${lobby}`, null, {
        headers: {
          Authorization: `Bearer ${key}`,
        },
      })
      .catch((err) => {
        if (err.response === 401) {
          setOpenAlert(true)
          setError(true)
        } else {
          location.reload()
        }
      })
    setOpen(false)
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <div className={styles.wrapper}>
          <Button onClick={handleClickOpen}>Зарегестрироваться в лобби</Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Выберите лобби</DialogTitle>
            <DialogContent>
              <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <Select
                    onChange={(e) => setLobby(e.target.value)}
                    value={lobby}
                    required
                  >
                    {rows.map((lobbyId) => {
                      return (
                        <MenuItem key={lobbyId.id} value={lobbyId.id}>
                          {lobbyId.name}
                        </MenuItem>
                      )
                    })}
                  </Select>
                </FormControl>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleChooseLobby}>Выбрать</Button>
              <Button onClick={handleClose}>Назад</Button>
            </DialogActions>
          </Dialog>
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
              <Paper
                sx={{
                  width: '100%',
                  backgroundColor: '#00000000',
                }}
              >
                <div className={styles.table}>
                  <TableContainer>
                    <Table
                      sx={{
                        minWidth: 500,
                      }}
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
                        {rows.map((row) => {
                          const date = (row.dateStarted = new Date())

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
                                {date.toLocaleDateString('ru-RU')}
                              </TableCell>
                              <TableCell align="center">
                                {row.users.map((data: any) => {
                                  return (
                                    <div className={styles.users} key={data.id}>
                                      {data.role === 'user'
                                        ? data.username + ' '
                                        : null}
                                    </div>
                                  )
                                })}
                              </TableCell>
                              <TableCell align="center">
                                {row.users.map((data: any) => {
                                  return (
                                    <div className={styles.users} key={data.id}>
                                      {data.role === 'referee'
                                        ? data.username + ' '
                                        : null}
                                    </div>
                                  )
                                })}
                              </TableCell>
                              <TableCell align="center">
                                <a href={row.resultLink}>
                                  {row.resultLink ? 'Ссылка есть' : null}
                                </a>
                              </TableCell>
                            </TableRow>
                          )
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              </Paper>
            </TabPanel>
            <TabPanel value="2">
              <div>Empty</div>
            </TabPanel>
          </TabContext>
          {error ? (
            <Snackbar open={openAlert} autoHideDuration={3000}>
              <Alert severity="error">
                <AlertTitle>Ошибка регистрации в лобби</AlertTitle>Авторизуйтесь
                на сайте
              </Alert>
            </Snackbar>
          ) : null}
        </div>
      </ThemeProvider>
    </>
  )
}

export default ScheduleTable
