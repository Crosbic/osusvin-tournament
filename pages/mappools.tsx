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
          >
            <Tab label="Квалификация" value="QUALS" />
            <Tab label="Round of 32" value="RO32" />
            <Tab label="Round of 16" value="RO16" />
            <Tab label="Quarterfinals" value="QF" />
            <Tab label="Semifinals" value="SF" />
            <Tab label="Finals" value="F" disabled />
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
                      <TableCell align="center"></TableCell>
                      <TableCell align="center"></TableCell>
                      <TableCell align="center" className={styles.link}>
                        {rows?.map((row: any) => {
                          return (
                            <Link key={row.id} href={row.downloadLink}>
                              Скачать маппак
                            </Link>
                          )
                        })}
                      </TableCell>
                      <TableCell align="center">CS | HP | OD | AR</TableCell>
                      <TableCell align="center">BPM</TableCell>
                      <TableCell align="center">Маппер</TableCell>
                      <TableCell align="center">Саггестер</TableCell>
                      <TableCell align="center">ID</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {beatmaps?.map((map: any) => {
                      return (
                        <>
                          {map.map((mapData: any) => {
                            const name =
                              mapData.artist +
                              ' - ' +
                              mapData.title +
                              ' [' +
                              mapData.difficultyName +
                              ']'

                            const stats =
                              mapData.stats.cs +
                              ' | ' +
                              mapData.stats.hp +
                              ' | ' +
                              mapData.stats.od +
                              ' | ' +
                              mapData.stats.ar

                            return (
                              <TableRow
                                key={mapData.id}
                                sx={{
                                  '&:last-child td, &:last-child th': {
                                    border: 0,
                                  },
                                }}
                              >
                                <TableCell align="center">
                                  <Image
                                    className={styles.bg}
                                    src={mapData.backgroundUrl}
                                    alt="mapImage"
                                    height="30"
                                    width="108"
                                    unoptimized
                                  />
                                </TableCell>
                                <TableCell align="center">
                                  {mapData.tournamentModName}
                                </TableCell>
                                <TableCell
                                  align="center"
                                  className={styles.link}
                                >
                                  <Link href={mapData.url}>{name}</Link>
                                </TableCell>
                                <TableCell align="center">{stats}</TableCell>
                                <TableCell align="center">
                                  {mapData.bpmString}
                                </TableCell>
                                <TableCell align="center">
                                  {mapData.mapper}
                                </TableCell>
                                <TableCell align="center">
                                  {mapData.suggesterUsername}
                                </TableCell>
                                <TableCell align="center">
                                  {mapData.id}
                                </TableCell>
                              </TableRow>
                            )
                          })}
                        </>
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
