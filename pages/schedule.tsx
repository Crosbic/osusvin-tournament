import { TabContext, TabList, TabPanel } from '@mui/lab'
import {
  createTheme,
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
import Link from 'next/link'
import React, { useState } from 'react'

import styles from '../styles/Schedule.module.css'

interface QualifiersData {
  id: string
  users: string
  date: string
  referee: string
  resultLink: string
}

function createData(
  id: string,
  users: string,
  date: string,
  referee: string,
  resultLink: string
): QualifiersData {
  return { id, users, date, referee, resultLink }
}

const rows: any = [
  createData('A1', '', '25.03.23 13:00 МСК', '', ''),
  createData('A2', '', '25.03.23 15:00 МСК', '', ''),
  createData('A3', '', '25.03.23 17:00 МСК', '', ''),
  createData('A4', '', '25.03.23 19:00 МСК', '', ''),
  createData('B1', '', '26.03.23 13:00 МСК', '', ''),
  createData('B2', '', '26.03.23 15:00 МСК', '', ''),
  createData('B3', '', '26.03.23 17:00 МСК', '', ''),
  createData('B4', '', '26.03.23 19:00 МСК', '', ''),
]

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

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

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
                        {rows.map((row: any) => {
                          return (
                            <TableRow
                              key={row.id}
                              sx={{
                                '&:last-child td, &:last-child th': {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell align="center">{row.id}</TableCell>
                              <TableCell align="center">{row.date}</TableCell>
                              <TableCell align="center">{row.users}</TableCell>
                              <TableCell align="center">
                                {row.referee}
                              </TableCell>
                              <TableCell align="center">
                                <Link href={row.resultLink}>Тут нажать</Link>
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
