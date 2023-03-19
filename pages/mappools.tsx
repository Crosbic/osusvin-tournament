import { TabContext, TabList, TabPanel } from '@mui/lab'
import {
  createTheme,
  Paper,
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
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

import styles from '../styles/Mappols.module.css'

interface Data {
  backgroundLink: string
  mapLink: string
  modeID: string
  title: string
  stats: string
  mapper: string
  mapID: number
  suggester: string
}

function createData(
  backgroundLink: string,
  mapLink: string,
  modeID: string,
  title: string,
  stats: string,
  mapper: string,
  mapID: number,
  suggester: string
): Data {
  return {
    backgroundLink,
    mapLink,
    modeID,
    title,
    stats,
    mapper,
    mapID,
    suggester,
  }
}

const rows: any = [
  createData(
    'https://assets.ppy.sh/beatmaps/842412/covers/cover.jpg',
    'https://osu.ppy.sh/beatmapsets/842412#osu/1762731',
    'NM',
    'Harumachi Clover - Will Stetson 00',
    '3/3/5',
    'Sotarks',
    1762731,
    'Muga'
  ),
  createData(
    'https://assets.ppy.sh/beatmaps/1790301/covers/cover.jpg',
    'https://osu.ppy.sh/beatmapsets/1790301#osu/3678648',
    'NM',
    'Dokuzu - NAKISO',
    '4/4/7,5',
    'Ryuusei Aika',
    3678648,
    'Muga'
  ),
  createData(
    'https://assets.ppy.sh/beatmaps/1422289/covers/cover.jpg',
    'https://osu.ppy.sh/beatmapsets/1422289#osu/2929300',
    'HR',
    'yama - Yuurei Tokyo [Ghost]',
    '4/5,5/9,3',
    'climbx3145',
    2929300,
    'Muga'
  ),
  createData(
    'https://assets.ppy.sh/beatmaps/842412/covers/cover.jpg',
    'https://osu.ppy.sh/beatmapsets/842412#osu/1762731',
    'FM',
    'Harumachi Clover - Will Stetson 01',
    '3/3/5',
    'Sotarks',
    1762731,
    'Muga'
  ),
  createData(
    'https://assets.ppy.sh/beatmaps/842412/covers/cover.jpg',
    'https://osu.ppy.sh/beatmapsets/842412#osu/1762731',
    'TB',
    'Harumachi Clover - Will Stetson 02',
    '3/3/5',
    'Sotarks',
    1762731,
    'Muga'
  ),
  createData(
    'https://assets.ppy.sh/beatmaps/842412/covers/cover.jpg',
    'https://osu.ppy.sh/beatmapsets/842412#osu/1762731',
    'HD',
    'Harumachi Clover - Will Stetson 03',
    '3/3/5',
    'Sotarks',
    1762731,
    'Muga'
  ),
]

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

const MappoolTable = () => {
  const [value, setValue] = useState('1')

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <div className={styles.tabs}>
          <TabContext value={value}>
            <TabList
              textColor="inherit"
              indicatorColor="secondary"
              className={styles.tabs}
              onChange={handleTabChange}
            >
              <Tab label="Quals" value="1" />
              <Tab label="Amogus" value="2" />
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
                          <TableCell></TableCell>
                          <TableCell align="center">Мод</TableCell>
                          <TableCell align="center">Название</TableCell>
                          <TableCell align="center">Статы</TableCell>
                          <TableCell align="center">Маппер</TableCell>
                          <TableCell align="center">Саггестер</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.map((row: any) => {
                          return (
                            <TableRow
                              key={row.modeId}
                              sx={{
                                '&:last-child td, &:last-child th': {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell align="center" padding="none">
                                <Image
                                  className={styles.bg}
                                  src={row.backgroundLink}
                                  alt="mapImage"
                                  height="30"
                                  width="108"
                                  unoptimized
                                />
                              </TableCell>
                              <TableCell align="center">{row.modeID}</TableCell>
                              <TableCell align="center" className={styles.link}>
                                <Link href={row.mapLink}>{row.title}</Link>
                              </TableCell>
                              <TableCell align="center">{row.stats}</TableCell>
                              <TableCell align="center">{row.mapper}</TableCell>
                              <TableCell align="center">
                                {row.suggester}
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

export default MappoolTable
