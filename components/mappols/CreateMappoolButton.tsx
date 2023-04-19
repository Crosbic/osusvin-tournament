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
  const mods = ['NM', 'HD', 'HR', 'DT', 'FM', 'TB']
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
    await axios
      .post(
        `https://auth.osusvin.ru/mappool/addBeatmap/${stage}`,
        {
          beatmapUrl: beatmapUrl,
          tournamentMod: tournamentMod,
          tournamentModName: tournamentModName,
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
              <FormControl
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: 2,
                }}
              >
                <TextField
                  sx={{ width: 140 }}
                  label="ID карты"
                  type="number"
                  value={mapId}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setMapId(e.currentTarget.valueAsNumber)
                  }
                  required
                />
                <TextField
                  sx={{ width: 390 }}
                  label="Ссылка на карту"
                  value={beatmapUrl}
                  onChange={(e) => setBeatmapUrl(e.currentTarget.value)}
                  required
                />
                <FormControl sx={{ width: 220 }}>
                  <InputLabel variant="outlined">Статы по моду</InputLabel>
                  <Select
                    label="Статы по моду"
                    onChange={(e) => setTournamentMod(e.target.value)}
                    value={tournamentMod}
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
                  sx={{ width: 230 }}
                  label="Мод (Пример: NM1)"
                  value={tournamentModName}
                  onChange={(e) => setTournamentModName(e.currentTarget.value)}
                  required
                />
              </FormControl>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddBeatmap}>Добавить</Button>
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
