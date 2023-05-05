import { TabContext, TabList, TabPanel } from '@mui/lab'
import {
  CircularProgress,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

import CreateMappoolButton from '../components/mappols/CreateMappoolButton'
import styles from '../styles/Mappols.module.css'

interface MappolsData {
  id: number
  stage: string
  downloadLink: string
  beatmaps: any
}

enum Modes {
  NM,
  HD,
  HR,
  DT,
  FM,
  TB,
}

const MappoolTable = () => {
  const [user, setUser] = useState<any>()
  const [rows, setRows] = useState<MappolsData[]>()
  const [stage, setStage] = useState('QUALS')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const currentRoles = user?.role.map((currentRole: any) => currentRole.role)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('user') !== null) {
        setUser(JSON.parse(localStorage.getItem('user') ?? ''))
      }
    }
    axios
      .get(`https://auth.osusvin.ru/mappool`, {
        params: { stage: stage },
      })
      .then((res) => res.data)
      .then((data) => {
        setRows(data as MappolsData[])
      })
      .finally(() => setIsLoading(false))
  }, [stage])

  if (isLoading) {
    return (
      <div>
        <CircularProgress />
      </div>
    )
  }

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setStage(newValue)
  }

  const beatmaps = rows?.map((row) => row.beatmaps)

  return (
    <>
      <div className={styles.wrapper}>
        {currentRoles?.includes('user') || !user ? null : (
          <div className={styles.buttonGroup}>
            <CreateMappoolButton />
          </div>
        )}
        <TabContext value={stage}>
          <TabList
            textColor="inherit"
            indicatorColor="secondary"
            className={styles.tabs}
            onChange={handleTabChange}
            variant="scrollable"
            allowScrollButtonsMobile
          >
            <Tab label="Квалификация" value="QUALS" />
            <Tab label="Round of 32" value="RO32" />
            <Tab label="Round of 16" value="RO16" />
            <Tab label="Quarterfinals" value="QF" />
            <Tab label="Semifinals" value="SF" />
            <Tab label="Finals" value="F" />
            <Tab label="Grand Finals" value="GF" disabled />
          </TabList>
          <TabPanel value={stage}>
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
                      <TableCell
                        align="center"
                        className={styles.link}
                        colSpan={3}
                      >
                        {rows?.map((row: any) => {
                          return (
                            <Link key={row.id} href={row.downloadLink}>
                              Скачать маппак
                            </Link>
                          )
                        })}
                      </TableCell>
                      <TableCell align="center">CS | AR | OD | HP</TableCell>
                      <TableCell align="center">BPM</TableCell>
                      <TableCell align="center">Маппер</TableCell>
                      <TableCell align="center">ID</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {beatmaps
                      ?.flat()
                      .sort((mapA: any, mapB: any) => {
                        const modComparasion =
                          Number(Modes[mapA.tournamentMod]) -
                          Number(Modes[mapB.tournamentMod])

                        return modComparasion === 0
                          ? mapA.tournamentModName.slice(-1) -
                              mapB.tournamentModName.slice(-1)
                          : modComparasion
                      })
                      .map((map: any) => {
                        const name =
                          map.artist +
                          ' - ' +
                          map.title +
                          ' [' +
                          map.difficultyName +
                          ']'

                        const stats =
                          map.stats.cs.toFixed(1) +
                          ' | ' +
                          map.stats.hp.toFixed(1) +
                          ' | ' +
                          map.stats.od.toFixed(1) +
                          ' | ' +
                          map.stats.ar.toFixed(1)

                        return (
                          <TableRow
                            key={map.id}
                            sx={{
                              '&:last-child td, &:last-child th': {
                                border: 0,
                              },
                            }}
                          >
                            <TableCell align="center">
                              <Image
                                className={styles.bg}
                                src={map.backgroundUrl}
                                alt="mapImage"
                                height="30"
                                width="108"
                                unoptimized
                              />
                            </TableCell>
                            <TableCell align="center">
                              {map.tournamentModName}
                            </TableCell>
                            <TableCell
                              sx={{ maxWidth: 700 }}
                              align="center"
                              className={styles.link}
                            >
                              <Link href={map.url}>{name}</Link>
                            </TableCell>
                            <TableCell align="center">{stats}</TableCell>
                            <TableCell align="center">
                              {map.bpmString}
                            </TableCell>
                            <TableCell align="center">{map.mapper}</TableCell>
                            <TableCell align="center">{map.id}</TableCell>
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
