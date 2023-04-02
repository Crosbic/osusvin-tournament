import { TabContext, TabList, TabPanel } from '@mui/lab'
import {
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
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

const qualifiersRows: any = [
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

const ro32Rows: any = [
  createData(
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
  createData(
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
  createData(
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
  createData(
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
  createData(
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
  createData(
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
  createData(
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
  createData(
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
  createData(
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
  createData(
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
  createData(
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
  createData(
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
  createData(
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
  createData(
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
  createData(
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

const ro16Rows: any = [
  createData(
    'https://assets.ppy.sh/beatmaps/1638844/covers/cover.jpg',
    'https://osu.ppy.sh/beatmapsets/1638844#osu/3839993',
    'NM1',
    'U2 - Saigetsu (Koko & Satsuki ga Tenkomori`s Sagyou Bougai Remix) [bnmc`s LUNATIC JAPANESE GOBLIN!]',
    '4 | 5.5 | 8 | 9',
    '180',
    'Bloxi',
    3839993,
    'SLAVA MARL0W'
  ),
  createData(
    'https://assets.ppy.sh/beatmaps/611095/covers/cover.jpg',
    'https://osu.ppy.sh/beatmapsets/611095#osu/1295717',
    'NM2',
    'Memme - Avalanche [Insane]',
    '4 | 6 | 7.5 | 9',
    '175',
    'Starfy',
    1295717,
    'seriker'
  ),
  createData(
    'https://assets.ppy.sh/beatmaps/1862243/covers/cover.jpg',
    'https://osu.ppy.sh/beatmapsets/1862243#osu/3837066',
    'NM3',
    'Kotoha - Zecchou Sanka [Aglliu`s Insane]',
    '4 | 5 | 7.5 | 9',
    '140',
    'achyoo',
    3837066,
    'lefrutit230'
  ),
  createData(
    'https://assets.ppy.sh/beatmaps/1190470/covers/cover.jpg',
    'https://osu.ppy.sh/beatmapsets/1190470#osu/2529681',
    'NM4',
    'factal - Flux [frakturehawken`s insane]',
    '4 | 5 | 7 | 9',
    '195',
    'Sharu',
    2529681,
    'lefrutit230'
  ),
  createData(
    'https://assets.ppy.sh/beatmaps/1257522/covers/cover.jpg',
    'https://osu.ppy.sh/beatmapsets/1257522#osu/2613063',
    'NM5',
    'Gekidan Record feat. Nekomata Master - Houkou Orpheus [Insane]',
    '3.8 | 3.7 | 7 | 8.4',
    '150',
    'DeviousPanda',
    2613063,
    'seriker'
  ),
  createData(
    'https://assets.ppy.sh/beatmaps/1631189/covers/cover.jpg',
    'https://osu.ppy.sh/beatmapsets/1631189#osu/3334181',
    'HD1',
    'Yorushika - Hole In The Heart [Insane]',
    '4 | 5 | 8 | 9',
    '200',
    'alevi',
    3334181,
    'seriker'
  ),
  createData(
    'https://assets.ppy.sh/beatmaps/31224/covers/cover.jpg',
    'https://osu.ppy.sh/beatmapsets/31224#osu/105978',
    'HD2',
    'BRZion - Game Brain [Insane]',
    '4 | 5 | 6 | 8',
    '190',
    'Zapy',
    105978,
    'lefrutit230'
  ),
  createData(
    'https://assets.ppy.sh/beatmaps/342030/covers/cover.jpg',
    'https://osu.ppy.sh/beatmapsets/342030#osu/787587',
    'HR1',
    'Omoi - Totsugeki Zenya no Dance [Insane]',
    '4 | 7 | 7 | 9',
    '185',
    'Yales',
    787587,
    'seriker'
  ),
  createData(
    'https://assets.ppy.sh/beatmaps/8198/covers/cover.jpg',
    'https://osu.ppy.sh/beatmapsets/8198#osu/33967',
    'HR2',
    'Ayane - Lunatic Tears [Hard]',
    '5 | 7 | 7 | 7',
    '176',
    'azuki',
    33967,
    'seriker'
  ),
  createData(
    'https://assets.ppy.sh/beatmaps/956595/covers/cover.jpg',
    'https://osu.ppy.sh/beatmapsets/956595#osu/2044893',
    'DT1',
    'mafumafu - Moudoku ga Osou [Hard]',
    '4 | 5 | 6 | 8',
    '156',
    'Namki',
    2044893,
    'SLAVA MARL0W'
  ),
  createData(
    'https://assets.ppy.sh/beatmaps/1570536/covers/cover.jpg',
    'https://osu.ppy.sh/beatmapsets/1570536#osu/3417993',
    'DT2',
    "CHON - Splash [Lugu & mez's Hard]",
    '4 | 5 | 6.7 | 8',
    '144',
    'mezelyus',
    3417993,
    'SLAVA MARL0W'
  ),
  createData(
    'https://assets.ppy.sh/beatmaps/1717491/covers/cover.jpg',
    'https://osu.ppy.sh/beatmapsets/1717491#osu/3526717 ',
    'DT3',
    "Ushirokara Haiyoritai G - Koi wa Chaos no Shimobenari [Enon's Hard]",
    '4 | 4 | 5 | 8',
    '158',
    'Amamya',
    3526717,
    'seriker'
  ),
  createData(
    'https://assets.ppy.sh/beatmaps/1818185/covers/cover.jpg',
    'https://osu.ppy.sh/beatmapsets/1818185#osu/3737442',
    'FM1',
    "Green Day - American Idiot [Nymphe's Insane]",
    '3.8 | 5 | 8 | 9',
    '186',
    'Sotarks',
    3737442,
    'seriker'
  ),
  createData(
    'https://assets.ppy.sh/beatmaps/1186908/covers/cover.jpg',
    'https://osu.ppy.sh/beatmapsets/1186908#osu/2503454',
    'FM2',
    'Yorushika - Tada Kimi ni Hare [Ayucchi`s Insane]',
    '5 | 5 | 7.5 | 8',
    '140',
    'newton-',
    2503454,
    'SLAVA MARL0W'
  ),
  createData(
    'https://assets.ppy.sh/beatmaps/433723/covers/cover.jpg',
    'https://osu.ppy.sh/beatmapsets/433723#osu/934841',
    'TB',
    'amazarashi - Kisetsu wa Tsugitsugi Shindeiku [Suffering]',
    '4 | 6.5 | 8 | 9',
    '181',
    '-Nya-',
    934841,
    'seriker'
  ),
]

const MappoolTable = () => {
  const [value, setValue] = useState('3')

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <>
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
            <Tab label="Round of 16" value="3" />
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
                        <Link href={`https://disk.yandex.ru/d/HguyjMD5mXZydA`}>
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
                          <TableCell align="center">{row.suggester}</TableCell>
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
                        <Link href={`https://disk.yandex.ru/d/Y9dieIEyFVA-vg`}>
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
                          <TableCell align="center">{row.suggester}</TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </TabPanel>
          <TabPanel value="3">
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
                        <Link href={`https://disk.yandex.ru/d/5t8QVN3MEMoKqg`}>
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
                    {ro16Rows.map((row: any) => {
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
                          <TableCell align="center">{row.suggester}</TableCell>
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
    </>
  )
}

export default MappoolTable
