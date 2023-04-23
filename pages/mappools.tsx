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

const qfRows: any = [
  createData(
    'https://assets.ppy.sh/beatmaps/1658721/covers/cover.jpg',
    'https://osu.ppy.sh/beatmapsets/1658721#osu/3390576',
    'NM1',
    'Mimori Suzuko - Univer Page [Amawari`s Insane]',
    '4 | 6 | 7.6 | 9',
    '187',
    'Amateurre',
    3390576,
    'RatatiC'
  ),
  createData(
    'https://w7.pngwing.com/pngs/1020/310/png-transparent-trollface-internet-troll-rage-comic-trolls-miscellaneous-template-white.png',
    'https://osu.ppy.sh/beatmapsets/44453#osu/139249',
    'NM2',
    'Suzaku VS Genbu - Himiko [Another]',
    '4 | 8 | 8 | 9',
    '185',
    'Maddy',
    139249,
    'RatatiC'
  ),
  createData(
    'https://assets.ppy.sh/beatmaps/1817884/covers/cover.jpg',
    'https://osu.ppy.sh/beatmapsets/1817884#osu/3736118',
    'NM3',
    'ZAQ - Dance In The Game [Min`s Insane]',
    '4 | 5 | 8 | 9',
    '135',
    'Airiesu',
    3736118,
    'lefrutit230'
  ),
  createData(
    'https://assets.ppy.sh/beatmaps/1192060/covers/cover.jpg',
    'https://osu.ppy.sh/beatmapsets/1192060#osu/2919737',
    'NM4',
    'Camellia - #1f1e33 [Heatwave`s Insane]',
    '4 | 5 | 8 | 9',
    '181',
    'Realazy',
    2919737,
    'lefrutit230'
  ),
  createData(
    'https://assets.ppy.sh/beatmaps/1278333/covers/cover.jpg',
    'https://osu.ppy.sh/beatmapsets/1278333#osu/2666177',
    'NM5',
    "Omoi - Teioh Education [Daycore's Insane]",
    '4.5 | 5 | 8.2 | 9',
    '208',
    'Yooh',
    2666177,
    'lefrutit230'
  ),
  createData(
    'https://assets.ppy.sh/beatmaps/1730932/covers/cover.jpg',
    'https://osu.ppy.sh/beatmapsets/1730932#osu/3555364',
    'NM6',
    "Aether Realm - She's Back [Roupus' Insane]",
    '4 | 4.9 | 8.5 | 9',
    '210',
    'iamtickrate',
    3555364,
    'SLAVA MARL0W'
  ),
  createData(
    'https://assets.ppy.sh/beatmaps/1699465/covers/cover.jpg',
    'https://osu.ppy.sh/beatmapsets/1699465#osu/3741633',
    'HD1',
    'ATARASHII GAKKO! - Koi Geba [NcFix`s Insane]',
    '3.8 | 6 | 8 | 9.2',
    '202',
    'Pigeons',
    3741633,
    'SLAVA MARL0W'
  ),
  createData(
    'https://assets.ppy.sh/beatmaps/673878/covers/cover.jpg',
    'https://osu.ppy.sh/beatmapsets/673878#osu/1436998',
    'HD2',
    'Zekk - Calling [Reiji`s Insane]',
    '4 | 6 | 7 | 8',
    '180',
    'NeilPerry',
    1436998,
    'lefrutit230'
  ),
  createData(
    'https://assets.ppy.sh/beatmaps/1107500/covers/cover.jpg',
    'https://osu.ppy.sh/beatmapsets/1107500#osu/2402711',
    'HD3',
    'Doja Cat - Boss Bitch [Another]',
    '3.7 | 5 | 8 | 9',
    '126',
    'Plaudible',
    2402711,
    'RatatiC'
  ),
  createData(
    'https://assets.ppy.sh/beatmaps/181681/covers/cover.jpg',
    'https://osu.ppy.sh/beatmapsets/181681#osu/816319',
    'HR1',
    'yanaginagi - Zoetrope [toykii`s Insane]',
    '4 | 7 | 8 | 9',
    '184',
    'Asphyxia',
    816319,
    'RatatiC'
  ),
  createData(
    'https://assets.ppy.sh/beatmaps/1766945/covers/cover.jpg',
    'https://osu.ppy.sh/beatmapsets/1766945#osu/3616922',
    'HR2',
    'Ceres Fauna - Let Me Stay Here [A Fairy Tale For Saplings]',
    '5 | 5 | 8 | 8.7',
    '97',
    'Gweon Sua',
    3616922,
    'RatatiC'
  ),
  createData(
    'https://assets.ppy.sh/beatmaps/440997/covers/cover.jpg',
    'https://osu.ppy.sh/beatmapsets/440997#osu/1045832',
    'HR3',
    'LeaF - Evanescent [Insane]',
    '4 | 5 | 7 | 9',
    '190',
    'Anxient',
    1045832,
    'seriker'
  ),
  createData(
    'https://assets.ppy.sh/beatmaps/122349/covers/cover.jpg',
    'https://osu.ppy.sh/beatmapsets/122349#osu/312973',
    'DT1',
    'FELT - Hail Storm [Challenging]',
    '4 | 6 | 6 | 8',
    '134',
    'Kite',
    312973,
    'RatatiC'
  ),
  createData(
    'https://assets.ppy.sh/beatmaps/1301407/covers/cover.jpg',
    'https://osu.ppy.sh/beatmapsets/1301407#osu/2699267',
    'DT2',
    'Mizuki Nana - PHANTOM MINDS [Hard]',
    '3.8 | 4 | 6.8 | 7.8',
    '150',
    'Lasse',
    2699267,
    'RatatiC'
  ),
  createData(
    'https://assets.ppy.sh/beatmaps/1023081/covers/cover.jpg',
    'https://osu.ppy.sh/beatmapsets/1023081#osu/2198954',
    'DT3',
    'Suda Keina - veil [airin`s hard]',
    '3.8 | 4 | 6 | 8',
    '150',
    'Kaitjuh',
    2198954,
    'seriker'
  ),
  createData(
    'https://assets.ppy.sh/beatmaps/1646328/covers/cover.jpg',
    'https://osu.ppy.sh/beatmapsets/1646328#osu/3360393',
    'DT4',
    'Bi-2 - Polkovniku nikto ne pishet [Toska]',
    '4 | 5 | 8 | 6',
    '87.98',
    'riffy',
    3360393,
    'RatatiC'
  ),
  createData(
    'https://assets.ppy.sh/beatmaps/1636051/covers/cover.jpg',
    'https://osu.ppy.sh/beatmapsets/1636051#osu/3418164',
    'FM1',
    'Waterparks - Turbulent [Insane]',
    '3.8 | 5 | 7 | 9',
    '172',
    'elvin',
    3418164,
    'SLAVA MARL0W'
  ),
  createData(
    'https://assets.ppy.sh/beatmaps/39678/covers/cover.jpg',
    'https://osu.ppy.sh/beatmapsets/39678#osu/126337',
    'FM2',
    'Tokiwa Yuu - Shounen Ripples [EXTREME]',
    '5 | 7 | 7 | 8',
    '210',
    'Suzully',
    126337,
    'SLAVA MARL0W'
  ),
  createData(
    'https://assets.ppy.sh/beatmaps/1061947/covers/cover.jpg',
    'https://osu.ppy.sh/beatmapsets/1061947#osu/2251926',
    'FM3',
    'Britney Spears - Toxic [Emilia`s Expert]',
    '4 | 5 | 8 | 9.1',
    '143',
    'schoolboy',
    2251926,
    'SLAVA MARL0W'
  ),
  createData(
    'https://assets.ppy.sh/beatmaps/1229050/covers/cover.jpg',
    'https://osu.ppy.sh/beatmapsets/1229050#osu/2555507',
    'TB',
    'Mili - Vitamins feat. world`s end girlfriend [Scub x Kalibe`s Insane]',
    '3.8 | 5 | 8 | 9',
    '191',
    'ScubDomino',
    2555507,
    'RatatiC'
  ),
]

const sfRows: any = [
  createData(
    'https://assets.ppy.sh/beatmaps/1876870/covers/cover.jpg',
    'https://osu.ppy.sh/beatmapsets/1876870#osu/3862969',
    'NM1',
    'kessoku band - Karakara [Virtual Reality]',
    '4 | 6 | 8 | 9',
    '190',
    'VINXIS',
    3862969,
    'SLAVA MARL0W'
  ),
  createData(
    'https://assets.ppy.sh/beatmaps/1551011/covers/cover.jpg',
    'https://osu.ppy.sh/beatmapsets/1551011#osu/3169487',
    'NM2',
    'm108 - Shinku no Senkou [Niva`s Insane]',
    '4 | 5 | 7.5 | 9',
    '185',
    'Leader',
    3169487,
    'lefrutit230'
  ),
  createData(
    'https://assets.ppy.sh/beatmaps/1791758/covers/cover.jpg',
    'https://osu.ppy.sh/beatmapsets/1791758#osu/3671821',
    'NM3',
    'PALC - S kazhdym [Expert]',
    '4 | 5 | 9 | 9.4',
    '123',
    'nemidnight',
    3671821,
    'bl1nq'
  ),
  createData(
    'https://assets.ppy.sh/beatmaps/1219865/covers/cover.jpg',
    'https://osu.ppy.sh/beatmapsets/1219865#osu/2537757',
    'NM4',
    'Dictate - Melodik (Short Ver.) [ozbargain]',
    '4.2 | 6 | 8.6 | 9.2',
    '155',
    'Pentori',
    2537757,
    'RatatiC'
  ),
  createData(
    'https://assets.ppy.sh/beatmaps/1765453/covers/cover.jpg',
    'https://osu.ppy.sh/beatmapsets/1765453#osu/3646485',
    'NM5',
    "tarolabo - eth ken [zetera's insane]",
    '3.8 | 3.6 | 7 | 9',
    '126',
    'DeviousPanda',
    3646485,
    'lefrutit230'
  ),
  createData(
    'https://assets.ppy.sh/beatmaps/1556131/covers/cover.jpg',
    'https://osu.ppy.sh/beatmapsets/1556131#osu/3318542',
    'NM6',
    "Aether Realm - Swampwitch [Kerupt's Insane]",
    '3.8 | 4.5 | 8.5 | 9',
    '210',
    'iamtickrate',
    3318542,
    'SLAVA MARL0W'
  ),
  createData(
    'https://assets.ppy.sh/beatmaps/1415113/covers/cover.jpg',
    'https://osu.ppy.sh/beatmapsets/1415113#osu/2953364',
    'HD1',
    'Horie Yui - True truly love [Koori`s Insane]',
    '4 | 5 | 8 | 9',
    '204',
    '[Karcher]',
    2953364,
    'lefrutit230'
  ),
  createData(
    'https://assets.ppy.sh/beatmaps/45028/covers/cover.jpg',
    'https://osu.ppy.sh/beatmapsets/45028#osu/141669',
    'HD2',
    'Hatsune Miku - Dance of many [Pokie`s Insane]',
    '4 | 6 | 8 | 8',
    '183',
    'LKs',
    141669,
    'lefrutit230'
  ),
  createData(
    'https://assets.ppy.sh/beatmaps/1505515/covers/cover.jpg',
    'https://osu.ppy.sh/beatmapsets/1505515#osu/3113327',
    'HD3',
    'Moe Shop - Charm (w/ Puniden) [Mocaotic`s Another]',
    '4.2 | 5 | 8 | 9.1',
    '128',
    'Amateurre',
    3113327,
    'RatatiC'
  ),
  createData(
    'https://assets.ppy.sh/beatmaps/1177092/covers/cover.jpg',
    'https://osu.ppy.sh/beatmapsets/1177092#osu/2456296',
    'HR1',
    'YOASOBI - Ano Yume o Nazotte [Kuse`s Insane]',
    '4 | 5.2 | 8 | 9',
    '180',
    'Sarawatlism',
    2456296,
    'RatatiC'
  ),
  createData(
    'https://assets.ppy.sh/beatmaps/1235574/covers/cover.jpg',
    'https://osu.ppy.sh/beatmapsets/1235574#osu/2568447',
    'HR2',
    'Hikaru Station - Bubblegum K.K. [Insane]',
    '5 | 6.5 | 8 | 8.8',
    '166',
    'Andrea',
    2568447,
    'RatatiC'
  ),
  createData(
    'https://assets.ppy.sh/beatmaps/1719626/covers/cover.jpg',
    'https://osu.ppy.sh/beatmapsets/1719626#osu/3583583',
    'HR3',
    'Masayoshi Iimori - Non Stop Rock [Another]',
    '4 | 4 | 7.5 | 9',
    '172',
    'Fursum',
    3583583,
    'RatatiC'
  ),
  createData(
    'https://assets.ppy.sh/beatmaps/959074/covers/cover.jpg',
    'https://osu.ppy.sh/beatmapsets/959074#osu/2007934',
    'DT1',
    'Perfume - Secret Secret [Perception]',
    '4 | 5 | 7.5 | 8.5',
    '132',
    'eiri-',
    2007934,
    'RatatiC'
  ),
  createData(
    'https://assets.ppy.sh/beatmaps/1401651/covers/cover.jpg',
    'https://osu.ppy.sh/beatmapsets/1401651#osu/2896899',
    'DT2',
    'kozato - Tsuki -Yue- [kanor`s Hard]',
    '5 | 5 | 6 | 8',
    '150',
    'Gust',
    2896899,
    'SLAVA MARL0W'
  ),
  createData(
    'https://assets.ppy.sh/beatmaps/1572038/covers/cover.jpg',
    'https://osu.ppy.sh/beatmapsets/1572038#osu/3253621',
    'DT3',
    'Sephid - Epistrofi [117`s Hard]',
    '3.3 | 3.5 | 6 | 8',
    '185',
    'Mattay',
    3253621,
    'SLAVA MARL0W'
  ),
  createData(
    'https://assets.ppy.sh/beatmaps/1844850/covers/cover.jpg',
    'https://osu.ppy.sh/beatmapsets/1844850#osu/3839743',
    'DT4',
    'Tyler, The Creator - I Ain`t Got Time! [Hard]',
    '3.6 | 4 | 7 | 7.8',
    '109',
    'chaser01',
    3839743,
    'RatatiC'
  ),
  createData(
    'https://assets.ppy.sh/beatmaps/1217477/covers/cover.jpg',
    'https://osu.ppy.sh/beatmapsets/1217477#osu/2678864',
    'FM1',
    'Tiny Moving Parts - Whale Watching [FuJu`s Insane]',
    '4.2 | 5 | 8 | 9',
    '180',
    'spoes',
    2678864,
    'SLAVA MARL0W'
  ),
  createData(
    'https://assets.ppy.sh/beatmaps/15917/covers/cover.jpg',
    'https://osu.ppy.sh/beatmapsets/15917#osu/57380',
    'FM2',
    'Nightcore - You Got Me Dancing [Insane]',
    '5 | 7 | 8 | 8',
    '174.36',
    'osuplayer111',
    57380,
    'RatatiC'
  ),
  createData(
    'https://assets.ppy.sh/beatmaps/1580891/covers/cover.jpg',
    'https://osu.ppy.sh/beatmapsets/1580891#osu/3851000',
    'FM3',
    'PSYQUI - Hysteric Night Girl -Awakening- (feat. Such) [Insane]',
    '4 | 4 | 7 | 8.5',
    '160',
    'Luminiscental',
    3851000,
    'lefrutit230'
  ),
  createData(
    'https://assets.ppy.sh/beatmaps/1034179/covers/cover.jpg',
    'https://osu.ppy.sh/beatmapsets/1034179#osu/2257469',
    'TB',
    'Demetori - Yuuga ni Sakase, Sumizome no Sakura ~ The Harm of Coming into Existence [Trustlfj`s Lunatic]',
    '4 | 5 | 8 | 9',
    '185',
    'jonathanlfj',
    2257469,
    'RatatiC'
  ),
]

const fRows: any = [
  createData(
    'https://assets.ppy.sh/beatmaps/1701031/covers/cover.jpg',
    'https://osu.ppy.sh/beatmapsets/1701031#osu/3483436',
    'NM1',
    'ClariS - border [captin`s Extra]',
    '4.2 | 5 | 8 | 9',
    '178',
    'Azu',
    3483436,
    'SLAVA MARL0W'
  ),
  createData(
    'https://assets.ppy.sh/beatmaps/1685761/covers/cover.jpg',
    'https://osu.ppy.sh/beatmapsets/1685761#osu/3451428',
    'NM2',
    'Rhapsody - Emerald Sword (Cut Ver.) [Extra]',
    '3.5 | 5 | 8.8 | 9.2',
    '180',
    'Kronick',
    3451428,
    'SLAVA MARL0W'
  ),
  createData(
    'https://assets.ppy.sh/beatmaps/657341/covers/cover.jpg',
    'https://osu.ppy.sh/beatmapsets/657341#osu/1414767',
    'NM3',
    'fhana - Hello!My World!! [toyruto`s Insane]',
    '4.1 | 6 | 8.2 | 9.2',
    '141',
    'Sotarks',
    1414767,
    'lefrutit230'
  ),
  createData(
    'https://assets.ppy.sh/beatmaps/1166748/covers/cover.jpg',
    'https://osu.ppy.sh/beatmapsets/1166748#osu/2836212',
    'NM4',
    'Feryquitous vs. xi - Orca [Ducky x Risen`s Insane]',
    '4 | 5 | 8 | 9',
    '195',
    'lcfc',
    2836212,
    'RatatiC'
  ),
  createData(
    'https://assets.ppy.sh/beatmaps/660630/covers/cover.jpg',
    'https://osu.ppy.sh/beatmapsets/660630#osu/1439335',
    'NM5',
    "Ocelot - KAEDE [Koiyuki's EX]",
    '7 | 6 | 7 | 9',
    '177',
    'Hollow Wings',
    1439335,
    'RatatiC'
  ),
  createData(
    'https://assets.ppy.sh/beatmaps/480298/covers/cover.jpg',
    'https://osu.ppy.sh/beatmapsets/480298#osu/1215683',
    'NM6',
    "Veil of Maya - Mikasa [DavidEd's Insane]",
    '4 | 6 | 7.5 | 9.2',
    '220',
    'Bergy',
    1215683,
    'Koteykaaa'
  ),
  createData(
    'https://assets.ppy.sh/beatmaps/1865974/covers/cover.jpg',
    'https://osu.ppy.sh/beatmapsets/1865974#osu/3849157',
    'HD1',
    'Nakigoto - Shiranai Wakusei [Kyuuchie`s Expert]',
    '4 | 4.5 | 7 | 8.8',
    '178',
    'Amateurre',
    3849157,
    'SLAVA MARL0W'
  ),
  createData(
    'https://assets.ppy.sh/beatmaps/1069288/covers/cover.jpg',
    'https://osu.ppy.sh/beatmapsets/1069288#osu/2239337',
    'HD2',
    'BUTAOTOME - Towa no Maigo [Insane]',
    '4 | 5 | 7 | 8',
    '180',
    'Icekalt',
    2239337,
    'SLAVA MARL0W'
  ),
  createData(
    'https://assets.ppy.sh/beatmaps/1246543/covers/cover.jpg',
    'https://osu.ppy.sh/beatmapsets/1246543#osu/2590940',
    'HD3',
    'K/DA - THE BADDEST feat. (G)I-DLE, Bea Miller, Wolftyla [AYYNNA`S EXTRA]',
    '4 | 5 | 8.5 | 9',
    '150',
    'Sylas',
    2590940,
    'RatatiC'
  ),
  createData(
    'https://assets.ppy.sh/beatmaps/1193063/covers/cover.jpg',
    'https://osu.ppy.sh/beatmapsets/1193063#osu/2485990',
    'HR1',
    'BAND-MAID - RINNE [INSANE]',
    '4 | 6 | 8 | 9',
    '190',
    'ShirohaMyMommy',
    2485990,
    'RatatiC'
  ),
  createData(
    'https://assets.ppy.sh/beatmaps/1596341/covers/cover.jpg',
    'https://osu.ppy.sh/beatmapsets/1596341#osu/3262088',
    'HR2',
    'Aishuu Mania - the lost dedicated [rolniczy`s insane]',
    '5 | 5 | 8 | 8',
    '134',
    'Matrix',
    3262088,
    'RatatiC'
  ),
  createData(
    'https://assets.ppy.sh/beatmaps/1329045/covers/cover.jpg',
    'https://osu.ppy.sh/beatmapsets/1329045#osu/2794904',
    'HR3',
    'sakuraburst - Glacierfall (Park Remix) [haruto x ancel`s ins*ne]',
    '4 | 5 | 7.5 | 9',
    '170',
    'ScubDomino',
    2794904,
    'hrds'
  ),
  createData(
    'https://assets.ppy.sh/beatmaps/393343/covers/cover.jpg',
    'https://osu.ppy.sh/beatmapsets/393343#osu/940293',
    'DT1',
    '96Neko x KurousaP - Kagen no Tsuki [Collab Insane]',
    '4 | 6 | 7.5 | 8.5',
    '92',
    'jonathanlfj',
    940293,
    'SLAVA MARL0W'
  ),
  createData(
    'https://assets.ppy.sh/beatmaps/751956/covers/cover.jpg',
    'https://osu.ppy.sh/beatmapsets/751956#osu/1589441',
    'DT2',
    'Ito Kashitaro - Kyouhansha [Hard]',
    '3 | 5 | 7 | 8',
    '155',
    'Hailie',
    1589441,
    'SLAVA MARL0W'
  ),
  createData(
    'https://assets.ppy.sh/beatmaps/1898472/covers/cover.jpg',
    'https://osu.ppy.sh/beatmapsets/1898472#osu/3912911',
    'DT3',
    'NOMA - Brain Power (Cranky Remix) [milr_`s Hard]',
    '3.5 | 4 | 6 | 8',
    '165',
    'Cellina',
    3912911,
    'SLAVA MARL0W'
  ),
  createData(
    'https://assets.ppy.sh/beatmaps/1089084/covers/cover.jpg',
    'https://osu.ppy.sh/beatmapsets/1089084#osu/2277127',
    'DT4',
    'Kola Kid - timer [Hard]',
    '4 | 5 | 6 | 7',
    '180',
    'Mirash',
    2277127,
    'RatatiC'
  ),
  createData(
    'https://assets.ppy.sh/beatmaps/1846926/covers/cover.jpg',
    'https://osu.ppy.sh/beatmapsets/1846926#osu/3913657',
    'FM1',
    'Good Kid - No Time to Explain [Shiny Braixen`s Expert]',
    '4 | 5.2 | 8.8 | 9.2',
    '180',
    'wafer',
    3913657,
    'SLAVA MARL0W'
  ),
  createData(
    'https://assets.ppy.sh/beatmaps/1786226/covers/cover.jpg',
    'https://osu.ppy.sh/beatmapsets/1786226#osu/3714164',
    'FM2',
    'The Beatles - A Hard Day`s Night [Fsjallink`s Insane]',
    '4.2 | 5 | 8 | 8.3',
    '138',
    'Apo11o',
    3714164,
    'RatatiC'
  ),
  createData(
    'https://assets.ppy.sh/beatmaps/1842709/covers/cover.jpg',
    'https://osu.ppy.sh/beatmapsets/1842709#osu/3886310',
    'FM3',
    'john - Utage [Silverboxer`s Insane]',
    '4 | 6 | 8 | 8.5',
    '175',
    'Ryuusei Aika',
    3886310,
    'SLAVA MARL0W'
  ),
  createData(
    'https://assets.ppy.sh/beatmaps/985041/covers/cover.jpg',
    'https://osu.ppy.sh/beatmapsets/985041#osu/2064113',
    'TB',
    'FELT - Lost in the Abyss [NowaTsuin`s Extra]',
    '4 | 4.5 | 8.5 | 9.3',
    '183',
    'Nowaie',
    2064113,
    'RatatiC'
  ),
]

const MappoolTable = () => {
  const [value, setValue] = useState('F')

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
            <Tab label="Квалификация" value="quals" />
            <Tab label="Round of 32" value="RO32" />
            <Tab label="Round of 16" value="RO16" />
            <Tab label="Quarterfinals" value="QF" />
            <Tab label="Semifinals" value="SF" />
            <Tab label="Finals" value="F" />
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
                      <TableCell align="center">ID</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {qualifiersRows.map((row: any) => {
                      return (
                        <TableRow
                          key={row.mapID}
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
                          <TableCell align="center">{row.mapID}</TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </TabPanel>
          <TabPanel value="RO32">
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
                      <TableCell align="center">ID</TableCell>
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
                          <TableCell align="center">{row.mapID}</TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </TabPanel>
          <TabPanel value="RO16">
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
                      <TableCell align="center">ID</TableCell>
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
                          <TableCell align="center">{row.mapID}</TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </TabPanel>
          <TabPanel value="QF">
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
                        <Link href={`https://disk.yandex.ru/d/IyBDMrUBPOwRQg`}>
                          Скачать маппак
                        </Link>
                      </TableCell>
                      <TableCell align="center">CS | HP | OD | AR</TableCell>
                      <TableCell align="center">BPM</TableCell>
                      <TableCell align="center">Маппер</TableCell>
                      <TableCell align="center">Саггестер</TableCell>
                      <TableCell align="center">ID</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {qfRows.map((row: any) => {
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
                          <TableCell align="center">{row.mapID}</TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </TabPanel>
          <TabPanel value="SF">
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
                        <Link href={`https://disk.yandex.ru/d/XWpOBnbp2zOYlg`}>
                          Скачать маппак
                        </Link>
                      </TableCell>
                      <TableCell align="center">CS | HP | OD | AR</TableCell>
                      <TableCell align="center">BPM</TableCell>
                      <TableCell align="center">Маппер</TableCell>
                      <TableCell align="center">Саггестер</TableCell>
                      <TableCell align="center">ID</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {sfRows.map((row: any) => {
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
                          <TableCell align="center">{row.mapID}</TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </TabPanel>
          <TabPanel value="F">
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
                        <Link href={`https://disk.yandex.ru/d/XWpOBnbp2zOYlg`}>
                          Скачать маппак
                        </Link>
                      </TableCell>
                      <TableCell align="center">CS | HP | OD | AR</TableCell>
                      <TableCell align="center">BPM</TableCell>
                      <TableCell align="center">Маппер</TableCell>
                      <TableCell align="center">Саггестер</TableCell>
                      <TableCell align="center">ID</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {fRows.map((row: any) => {
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
                          <TableCell align="center">{row.mapID}</TableCell>
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
