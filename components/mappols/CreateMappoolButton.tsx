import {
  Alert,
  AlertTitle,
  Autocomplete,
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
  TextField,
} from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const CreateMappoolButton = () => {
  const [key, setKey] = useState<any>()
  const [stage, setStage] = useState<string>('')
  const [open, setOpen] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [openAlert, setOpenAlert] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)
  const [mapId, setMapId] = useState<number>(0)
  const [beatmapUrl, setBeatmapUrl] = useState<string>('')
  const [tournamentMod, setTournamentMod] = useState<string>('')
  const [tournamentModName, setTournamentModName] = useState<string>('')
  const [mapsList, setMapsList] = useState<any>([
    {
      mapId: 0,
      beatmapUrl: '',
      tournamentMod: '',
      tournamentModName: '',
    },
  ])
  const mods = ['NM', 'HD', 'HR', 'DT', 'FM', 'TB']
  const stages = ['RO32', 'RO16', 'QF', 'SF', 'F', 'GF']

  useEffect(() => {
    setKey(localStorage.getItem('jwt') ?? '')
  }, [])

  const handleCreateMappol = async () => {
    await axios
      .all([
        axios.post(
          `https://auth.osusvin.ru/mappool/create`,
          {
            stage: stage,
          },
          {
            headers: {
              Authorization: `Bearer ${key}`,
            },
          }
        ),
        axios.post(`https://auth.osusvin.ru/mappool/addBeatmap/${mapId}`, {
          beatmapUrl: beatmapUrl,
          tournamentMod: tournamentMod,
          tournamentModName: tournamentModName,
        }),
      ])
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
    setOpen(false)
  }

  const handleMapRemove = (index: any) => {
    const list = [...mapsList]
    list.splice(index, 1)
    setMapsList(list)
  }

  const handleAddMap = () => {
    setMapsList([
      ...mapsList,
      { mapId: 0, beatmapUrl: '', tournamentMod: '', tournamentModName: '' },
    ])
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

  const handleAlertClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenAlert(false)
  }

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Создать маппул
      </Button>
      <Dialog open={open} onClose={handleClose} sx={{ width: 1000 }}>
        <DialogTitle>Заполните данные</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              minWidth: 500,
              justifyContent: 'center',
            }}
          >
            <FormControl sx={{ m: 1, minWidth: 500, gap: 2 }}>
              <InputLabel variant="outlined">Стадия</InputLabel>
              <Select
                label="Лобби"
                onChange={(e) => setStage(e.target.value)}
                value={stage}
                required
              >
                {stages.map((row: any) => {
                  return (
                    <MenuItem key={row} value={row}>
                      {row}
                    </MenuItem>
                  )
                })}
              </Select>
              {mapsList.map((entity: any) => {
                return (
                  <FormControl
                    key={entity}
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      gap: 2,
                    }}
                  >
                    <TextField
                      sx={{ width: 130 }}
                      label="ID карты"
                      value={mapsList.mapId}
                      type="number"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setMapId(e.currentTarget.valueAsNumber)
                      }
                      required
                    />
                    <TextField
                      label="Ссылка на карту"
                      value={mapsList.beatmapUrl}
                      onChange={(e) => setBeatmapUrl(e.currentTarget.value)}
                      required
                    />
                    <FormControl sx={{ width: 130 }}>
                      <InputLabel id="stats">Age</InputLabel>
                      <Select
                        labelId="stats"
                        label="stats"
                        onChange={(e) => setTournamentMod(e.target.value)}
                        value={mapsList.tournamentMod}
                        required
                      >
                        {mods.map((mod: any) => {
                          return (
                            <MenuItem key={mod} value={mod}>
                              {mod}
                            </MenuItem>
                          )
                        })}
                      </Select>
                    </FormControl>
                    <TextField
                      // sx={{ width: '100%' }}
                      label="Мод (Пример: NM1)"
                      value={mapsList.tournamentModName}
                      onChange={(e) =>
                        setTournamentModName(e.currentTarget.value)
                      }
                      required
                    />
                    {/*{mapsList.length - 1 === index && mapsList.length < 20()}*/}
                  </FormControl>
                )
              })}
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCreateMappol}>Создать</Button>
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
