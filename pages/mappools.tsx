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
  bpm: string
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
  bpm: string,
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
    bpm,
    mapper,
    mapID,
    suggester,
  }
}

const rows: any = [
  createData(
    'https://assets.ppy.sh/beatmaps/226670/covers/cover.jpg',
    'https://osu.ppy.sh/beatmapsets/226670#osu/862642',
    'NM1',
    'senya - Iro wa Jou e to Izanau [Insane]',
    '4 | 6 | 7 | 9',
    '200',
    'Momizi',
    226670,
    'SLAVA MARL0W'
  ),
  createData(
    'https://assets.ppy.sh/beatmaps/1297231/covers/cover.jpg',
    'https://osu.ppy.sh/beatmapsets/1297231#osu/2842753',
    'NM2',
    'F-777 - Unsafe Speeds [Turbulent Fall]',
    '3,2 | 4 | 7,2 | 9',
    '170',
    'Quag',
    1297231,
    'lefrutit230'
  ),
  createData(
    'https://assets.ppy.sh/beatmaps/1705113/covers/cover.jpg',
    'https://osu.ppy.sh/beatmapsets/1705113#osu/3490443',
    'NM3',
    'DECO*27 - Parasite [Insane]',
    '3,6 | 4 | 8,7 | 9',
    '138',
    'Vanya2',
    1705113,
    'lefrutit230'
  ),
  createData(
    'https://assets.ppy.sh/beatmaps/1458846/covers/cover.jpg',
    'https://osu.ppy.sh/beatmapsets/1458846#osu/3005759',
    'NM4',
    'midwxst - Smile (feat. glaive) [Insane]',
    '3,8 | 4,6 | 8 | 9',
    '92,48',
    '- ascended -',
    1458846,
    'SLAVA MARL0W'
  ),
  createData(
    'https://assets.ppy.sh/beatmaps/1323916/covers/cover.jpg',
    'https://osu.ppy.sh/beatmapsets/1323916#osu/2818046',
    'HD1',
    'DUSTCELL - STIGMA [AGATSU`S INSANE]',
    '4 | 5 | 7,7 | 9',
    '220',
    'SMOKELIND',
    1323916,
    'SLAVA MARL0W'
  ),
  createData(
    'https://assets.ppy.sh/beatmaps/37391/covers/cover.jpg',
    'https://osu.ppy.sh/beatmapsets/37391#osu/120250',
    'HD2',
    'Hatsune Miku - Mushroom Mother [Insane]',
    '4 | 7 | 7 | 8',
    '168',
    'Ryuusei Aika',
    37391,
    'Crosbic'
  ),
  createData(
    'https://assets.ppy.sh/beatmaps/932457/covers/cover.jpg',
    'https://osu.ppy.sh/beatmapsets/932457#osu/2294195',
    'HR1',
    'Liz Triangle - Yoru no Circus [xChorse`s Lunatic]',
    '4 | 5 | 7 | 8,8',
    '192',
    'Entry',
    932457,
    'Kobra_TF'
  ),
  createData(
    'https://assets.ppy.sh/beatmaps/5763/covers/cover.jpg',
    'https://osu.ppy.sh/beatmapsets/5763#osu/27546',
    'HR2',
    'UI-70 - Invisible Full Moon [ignore`s hard]',
    '5 | 3 | 7 | 7',
    '159',
    'James',
    5763,
    'SLAVA MARL0W'
  ),
  createData(
    'https://assets.ppy.sh/beatmaps/193583/covers/cover.jpg',
    'https://osu.ppy.sh/beatmapsets/193583#osu/459993',
    'DT1',
    'Mizukara o Enshutsu Suru Otome no Kai - Girlish Lover [Kibbleru`s Hard]',
    '4 | 5 | 6 | 8',
    '165',
    'No Dap',
    193583,
    'Crosbic'
  ),
  createData(
    'https://assets.ppy.sh/beatmaps/1717807/covers/cover.jpg',
    'https://osu.ppy.sh/beatmapsets/1717807#osu/3518574',
    'DT2',
    'Tsuko G. - You Will Know Our Names... KAZOO`d! [Hard]',
    '3,6 | 4,5 | 6 | 7,5',
    '176',
    'Sylvarus',
    1762731,
    'Crosbic'
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
      fontSize: 14,
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
                      size="small"
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell align="center"></TableCell>
                          <TableCell align="center"></TableCell>
                          <TableCell align="center" className={styles.link}>
                            <Link
                              href={`https://disk.yandex.ru/d/HguyjMD5mXZydA`}
                            >
                              Скачать маппак
                            </Link>
                          </TableCell>
                          <TableCell align="center">CS|HP|OD|AR</TableCell>
                          <TableCell align="center">BPM</TableCell>
                          <TableCell align="center">Маппер</TableCell>
                          <TableCell align="center">Саггестер</TableCell>
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
                              <TableCell align="center">
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
                              <TableCell align="center">{row.bpm}</TableCell>
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
