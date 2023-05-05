import DeleteIcon from '@mui/icons-material/Delete'
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
} from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

import AddMap from './AddMap'

interface MapDataProps {
  beatmapUrl: string
  tournamentMod: string
  tournamentModName: string
}

const CreateMappoolButton = () => {
  const [key, setKey] = useState<any>()
  const [stage, setStage] = useState<string>('')
  const [open, setOpen] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [openAlert, setOpenAlert] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)
  const [mapDatas, setMapDatas] = useState<MapDataProps[]>([])
  const [inputRowIndexes, setInputRowIndexes] = useState<number[]>([1])

  const stages = [
    { id: 1, label: 'Qualifications' },
    { id: 2, label: 'Round of 32' },
    { id: 3, label: 'Round of 16' },
    { id: 4, label: 'Quarterfinals' },
    { id: 5, label: 'Semifinals' },
    { id: 6, label: 'Finals' },
    { id: 7, label: 'Grand Finals' },
  ]

  useEffect(() => {
    setKey(localStorage.getItem('jwt') ?? '')
  }, [])

  const handleAddBeatmap = async () => {
    // !!! check functionality sendinп data from mapDatas
    mapDatas.map(async (mapData: MapDataProps) => {
      console.log(mapData)
      await axios
        .post(
          `https://auth.osusvin.ru/mappool/addBeatmap/${stage}`,
          {
            beatmapUrl: mapData.beatmapUrl,
            tournamentMod: mapData.tournamentMod,
            tournamentModName: mapData.tournamentModName,
          },
          {
            headers: {
              Authorization: `Bearer ${key}`,
            },
          }
        )
        .then(() => {
          setTimeout(function () {
            window.location.reload()
          }, 1000)
          setSuccess(true)
          setOpenAlert(true)
        })
        .catch((err) => {
          if (err.request === 401) {
            console.log('Успех')
          } else {
            setOpenAlert(true)
            setError(true)
          }
        })
    })
    setInputRowIndexes([0])
    setMapDatas([])
    setOpen(false)
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = (
    event: React.SyntheticEvent<unknown>,
    reason?: string
  ) => {
    if (reason !== 'backdropClick') {
      setInputRowIndexes([0])
      setMapDatas([])
      setOpen(false)
    }
  }

  const handleAlertClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenAlert(false)
  }

  const handleAddInputRow = () => {
    const newLastIndex = inputRowIndexes[inputRowIndexes.length - 1] + 1
    setInputRowIndexes(inputRowIndexes.concat(newLastIndex))
  }

  const handleRemoveInputRow = (index: number) => {
    if (inputRowIndexes.length <= 1) {
      return
    }
    const inputRows = [...inputRowIndexes]
    inputRows.splice(index, 1)
    setInputRowIndexes(inputRows)

    const mapData = [...mapDatas]
    mapData.splice(index, 1)
    setMapDatas(mapData)
  }

  const callBack = (data: MapDataProps, index: number) => {
    mapDatas[index] = data
  }

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Добавить карту
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth={false}>
        <DialogTitle>Заполните данные</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              maxWidth: 1000,
              justifyContent: 'center',
            }}
          >
            <FormControl sx={{ m: 1, maxWidth: 1000, gap: 2 }}>
              <InputLabel variant="outlined">Стадия</InputLabel>
              <Select
                label="Лобби"
                onChange={(e) => setStage(e.target.value)}
                value={stage}
                required
              >
                {stages.map((row: any) => {
                  return (
                    <MenuItem key={row.id} value={row.id}>
                      {row.label}
                    </MenuItem>
                  )
                })}
              </Select>
              {inputRowIndexes
                .map((map: any, index: number) => {
                  return (
                    <FormControl
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 2,
                        minWidth: 300,
                      }}
                      key={map}
                    >
                      <AddMap callBack={callBack} index={index} data={mapDatas[index]} />
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          cursor: 'pointer',
                        }}
                      >
                        <DeleteIcon
                          onClick={() => handleRemoveInputRow(index)}
                        />
                      </div>
                    </FormControl>
                  )
                })}
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddInputRow}>Добавить карту</Button>
          <Button onClick={handleAddBeatmap}>Создать пул</Button>
          <Button onClick={handleClose}>Отмена</Button>
        </DialogActions>
      </Dialog>
      {error ? (
        <Snackbar
          open={openAlert}
          autoHideDuration={4000}
          onClose={handleAlertClose}
        >
          <Alert severity="error">
            <AlertTitle>Ошибка</AlertTitle>Некорректные данные
          </Alert>
        </Snackbar>
      ) : null}

      {success ? (
        <Snackbar
          open={openAlert}
          autoHideDuration={1000}
          onClose={handleAlertClose}
        >
          <Alert severity="success">
            <AlertTitle>Успех</AlertTitle>Данные успешно вставлены
          </Alert>
        </Snackbar>
      ) : null}
    </>
  )
}

export default CreateMappoolButton
