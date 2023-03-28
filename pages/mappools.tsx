import { TabContext, TabList, TabPanel } from '@mui/lab'
import {
  createTheme,
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

interface QualifiersData {
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

interface Ro32Data {
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

function createRo32Data(
  backgroundLink: string,
  mapLink: string,
  modeID: string,
  title: string,
  stats: string,
  bpm: string,
  mapper: string,
  mapID: number,
  suggester: string
): Ro32Data {
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

function createQualsData(
  backgroundLink: string,
  mapLink: string,
  modeID: string,
  title: string,
  stats: string,
  bpm: string,
  mapper: string,
  mapID: number,
  suggester: string
): QualifiersData {
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

const qualifiersRows: any = [
  createQualsData(
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
  createQualsData(
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
  createQualsData(
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
  createQualsData(
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
  createQualsData(
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
  createQualsData(
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
  createQualsData(
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
  createQualsData(
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
  createQualsData(
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
  createQualsData(
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

const ro32Rows: any = [
  createRo32Data(
    'https://assets.ppy.sh/beatmaps/1531033/covers/cover.jpg',
    'https://osu.ppy.sh/beatmapsets/1531033#osu/3221981',
    'NM1',
    'AliA - nostalgia [banter`s insane]',
    '3.6 | 5 | 8 | 9',
    '190',
    'Nelliel',
    3221981,
    'lefrutit230'
  ),
  createRo32Data(
    'https://assets.ppy.sh/beatmaps/317439/covers/cover.jpg',
    'https://osu.ppy.sh/beatmapsets/317439#osu/1319822',
    'NM2',
    'dj TAKA - Colors -sasakure.UK Futurelogic Remix- [Hyper]',
    '4 | 5 | 7.5 | 8.5',
    '148',
    'wa_',
    1319822,
    'Zoleks'
  ),
  createRo32Data(
    'https://assets.ppy.sh/beatmaps/1241588/covers/cover.jpg',
    'https://osu.ppy.sh/beatmapsets/1241588#osu/2608162',
    'NM3',
    'YOASOBI - Yoru ni Kakeru [Ducky=Eresh`s Insane]',
    '4.3 | 5 | 8.5 | 9',
    '130',
    'Smug Nanachi',
    2608162,
    'SLAVA MARLOW'
  ),
  createRo32Data(
    'https://assets.ppy.sh/beatmaps/917915/covers/cover.jpg',
    'https://osu.ppy.sh/beatmapsets/917915#osu/2039004',
    'NM4',
    'Silentroom - Nhelv [Rhonen`s Hyper]',
    '3.5 | 5 | 6.5 | 9',
    '174.58',
    'Nyxa',
    2039004,
    'lefrutit230'
  ),
  createRo32Data(
    'https://assets.ppy.sh/beatmaps/1354017/covers/cover.jpg',
    'https://osu.ppy.sh/beatmapsets/1354017#osu/2907223',
    'NM5',
    'PolyphonicBranch - Aru Shoujo no Senzai Ishiki [Collab Insane]',
    '4 | 5 | 7 | 8',
    '140',
    'Some Hero',
    2907223,
    'lefrutit230'
  ),
  createRo32Data(
    'https://assets.ppy.sh/beatmaps/1885417/covers/cover.jpg',
    'https://osu.ppy.sh/beatmapsets/1885417#osu/3905815',
    'HD1',
    'Kawada Mami - No buts! [Level 4]',
    '3.8 | 5.2 | 7.8 | 9',
    '183',
    'Akitoshi',
    3905815,
    'lefrutit230'
  ),
  createRo32Data(
    'https://assets.ppy.sh/beatmaps/1373644/covers/cover.jpg',
    'https://osu.ppy.sh/beatmapsets/1373644#osu/2839868',
    'HD2',
    'Kitazawa Kyouhei feat. Hatsune Miku - ONIRIC [HOLLOW INSANE]',
    '4.3 | 4.5 | 7 | 8',
    '93',
    '-Sylvari',
    2839868,
    'Crosbic'
  ),
  createRo32Data(
    'https://assets.ppy.sh/beatmaps/936267/covers/cover.jpg',
    'https://osu.ppy.sh/beatmapsets/936267#osu/2012244',
    'HR1',
    'JIN feat. LiSA - Headphone Actor [Sidetail`s Insane]',
    '4 | 5 | 7.5 | 8.5',
    '202',
    'Amiya',
    2012244,
    'lefrutit230'
  ),
  createRo32Data(
    'https://assets.ppy.sh/beatmaps/275841/covers/cover.jpg',
    'https://osu.ppy.sh/beatmapsets/275841#osu/748754',
    'HR2',
    'Between August and December - Blow with the Fires [Shadren`s Shurik Insane]',
    '5 | 6.5 | 7 | 9',
    '75',
    'AnatOWJIya',
    748754,
    'SLAVA MARL0W'
  ),
  createRo32Data(
    'https://assets.ppy.sh/beatmaps/1064735/covers/cover.jpg',
    'https://osu.ppy.sh/beatmapsets/1064735#osu/2229334',
    'DT1',
    'Britney Spears - ...Baby One More Time [My Loneliness is Killing Me.]',
    '4 | 5 | 7 | 8',
    '92.98',
    'Nitroz',
    2229334,
    'Zoleks'
  ),
  createRo32Data(
    'https://assets.ppy.sh/beatmaps/1004928/covers/cover.jpg',
    'https://osu.ppy.sh/beatmapsets/1004928#osu/2498032',
    'DT2',
    "Kinoshita - Norowareta Sei / Shukufuku Sareta Sei (the confusion) [neko ds' Hard]",
    '4 | 5 | 6.5 | 7.5',
    '130',
    'Mirash',
    2498032,
    'Kobra_TF'
  ),
  createRo32Data(
    'https://assets.ppy.sh/beatmaps/1906645/covers/cover.jpg',
    'https://osu.ppy.sh/beatmapsets/1906645#osu/3931739',
    'DT3',
    'Mewhan - Netsujou no Edda [Collab Hard]',
    '3.6 | 4 | 6 | 8',
    '132',
    'Kuro Fuyusaki',
    3931739,
    'Kobra_TF'
  ),
  createRo32Data(
    'https://assets.ppy.sh/beatmaps/1253433/covers/cover.jpg',
    'https://osu.ppy.sh/beatmapsets/1253433#osu/2991141',
    'FM1',
    "Palaye Royale - Massacre, The New American Dream [384's Insane]",
    '4 | 5.5 | 8 | 9',
    '168',
    'C00L',
    2991141,
    'lefrutit230'
  ),
  createRo32Data(
    'https://assets.ppy.sh/beatmaps/12116/covers/cover.jpg',
    'https://osu.ppy.sh/beatmapsets/12116#osu/45695',
    'FM2',
    'Smiley - Delirium [Hard]',
    '5 | 7 | 8 | 8',
    '163',
    'Hanyuu',
    45695,
    'Zoleks'
  ),
  createRo32Data(
    'https://assets.ppy.sh/beatmaps/412140/covers/cover.jpg',
    'https://osu.ppy.sh/beatmapsets/412140#osu/974072',
    'TB',
    'Yousei Teikoku - Torikago [Insane]',
    '4 | 6 | 7.5 | 9',
    '172',
    'Okorin',
    974072,
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
  const [value, setValue] = useState('2')

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
                        <TableCell align="center"></TableCell>
                        <TableCell align="center"></TableCell>
                        <TableCell align="center" className={styles.link}>
                          <Link
                            href={`https://disk.yandex.ru/d/HguyjMD5mXZydA`}
                          >
                            Скачать маппак
                          </Link>
                        </TableCell>
                        <TableCell align="center">CS | HP | OD | AR</TableCell>
                        <TableCell align="center">BPM</TableCell>
                        <TableCell align="center">Маппер</TableCell>
                        <TableCell align="center">Саггестер</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {qualifiersRows.map((row: any) => {
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
                        <TableCell align="center"></TableCell>
                        <TableCell align="center"></TableCell>
                        <TableCell align="center" className={styles.link}>
                          <Link
                            href={`https://disk.yandex.ru/d/Y9dieIEyFVA-vg`}
                          >
                            Скачать маппак
                          </Link>
                        </TableCell>
                        <TableCell align="center">CS | HP | OD | AR</TableCell>
                        <TableCell align="center">BPM</TableCell>
                        <TableCell align="center">Маппер</TableCell>
                        <TableCell align="center">Саггестер</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {ro32Rows.map((row: any) => {
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
            </TabPanel>
          </TabContext>
        </div>
      </ThemeProvider>
    </>
  )
}

export default MappoolTable
