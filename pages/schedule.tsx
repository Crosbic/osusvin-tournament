import { TabContext, TabList, TabPanel } from '@mui/lab'
import {
  Box,
  Button,
  createTheme,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  SelectChangeEvent,
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
  dateStarted: string
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
  const [user, setUser] = useState<any>()
  const [open, setOpen] = useState<boolean>(false)
  const [lobby, setLobby] = useState<string>()

  const referees = [13679658, 14942638, 25952679, 10434594, 19699989, 12048705]

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user') ?? '{}'))
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

  const handleLobbyChange = (event: SelectChangeEvent<typeof lobby>) => {
    setLobby(event.target.value)
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

  return (
    <>
      <ThemeProvider theme={theme}>
        <div className={styles.wrapper}>
          <Button onClick={handleClickOpen}>Зарегестрироваться в лобби</Button>
          {rows.map((lobbyId) => {
            return (
              <Dialog open={open} onClose={handleClose} key={lobbyId.id}>
                <DialogTitle>Выберите лобби</DialogTitle>
                <DialogContent>
                  <Box
                    component="form"
                    sx={{ display: 'flex', flexWrap: 'wrap' }}
                  >
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                      <InputLabel htmlFor="quals">Лобби</InputLabel>
                      <Select
                        input={<OutlinedInput id="quals" />}
                        onChange={handleLobbyChange}
                        value={''}
                      >
                        <MenuItem value={lobby}>{lobbyId.name}</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Выбрать</Button>
                  <Button onClick={handleClose}>Назад</Button>
                </DialogActions>
              </Dialog>
            )
          })}
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
                                {row.dateStarted}
                              </TableCell>
                              <TableCell align="center">{row.users}</TableCell>
                              <TableCell align="center">
                                {referees.map((referee) => {
                                  if (referee === user.id) {
                                    return <div>asda</div>
                                  } else {
                                    return <></>
                                  }
                                })}
                              </TableCell>
                              <TableCell align="center">
                                <Link href={row.resultLink}>Amogus</Link>
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
        </div>
      </ThemeProvider>
    </>
  )
}

export default ScheduleTable
