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

interface iStaffResultLinkProps {
  rows: any
}

const StaffResultLinkButton = (props: iStaffResultLinkProps) => {
  const { rows } = props
  const [user, setUser] = useState<any>()
  const [key, setKey] = useState<any>()
  const [open, setOpen] = useState<boolean>(false)
  const [lobby, setLobby] = useState<string>('')
  const [link, setLink] = useState<string>('')
  // const [player1Score, setPlayer1Score] = useState<number>(0)
  // const [player2Score, setPlayer2Score] = useState<number>(0)
  const [error, setError] = useState<boolean>(false)
  const [openAlert, setOpenAlert] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)

  useEffect(() => {
    setKey(localStorage.getItem('jwt') ?? '')
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('user') !== null) {
        setUser(JSON.parse(localStorage.getItem('user') ?? ''))
      }
    }
  }, [])

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

  const handleSetResults = async () => {
    await axios
      .all([
        axios.post(
          `https://auth.osusvin.ru/lobbies/setResultLink/${lobby}`,
          {
            resultLink: link,
          },
          {
            headers: {
              Authorization: `Bearer ${key}`,
            },
          }
        ),
        // axios.post(
        //   `https://auth.osusvin.ru/lobbies/setPlayerScores/${lobby}`,
        //   {
        //     player1Score: player1Score,
        //     player2Score: player2Score,
        //   },
        //   {
        //     headers: {
        //       Authorization: `Bearer ${key}`,
        //     },
        //   }
        // ),
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

  const currentRoles = user?.role.map((currentRole: any) => currentRole.role)

  return (
    <div>
      {currentRoles?.includes('user') || !user ? null : (
        <>
          <Button variant="outlined" onClick={handleClickOpen}>
            Вставка результатов
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Заполните все поля</DialogTitle>
            <DialogContent>
              <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                <FormControl sx={{ m: 1, minWidth: 120, gap: 2 }}>
                  <InputLabel variant="outlined">Лобби</InputLabel>
                  <Select
                    label="Лобби"
                    onChange={(e) => setLobby(e.target.value)}
                    value={lobby}
                    required
                  >
                    {rows.map((row: any) => {
                      return (
                        <MenuItem key={row.id} value={row.id}>
                          {row.name}
                        </MenuItem>
                      )
                    })}
                  </Select>
                  {/*<TextField*/}
                  {/*  label="Счёт игрока 1"*/}
                  {/*  value={player1Score}*/}
                  {/*  type="number"*/}
                  {/*  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {*/}
                  {/*    const numberValue = !Number.isNaN(*/}
                  {/*      +event.currentTarget.valueAsNumber*/}
                  {/*    )*/}
                  {/*      ? +event.currentTarget.valueAsNumber*/}
                  {/*      : 0*/}

                  {/*    setPlayer1Score(numberValue)*/}
                  {/*  }}*/}
                  {/*/>*/}
                  {/*<TextField*/}
                  {/*  label="Счёт игрока 2"*/}
                  {/*  value={player2Score}*/}
                  {/*  type="number"*/}
                  {/*  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {*/}
                  {/*    const numberValue = !Number.isNaN(*/}
                  {/*      +event.currentTarget.valueAsNumber*/}
                  {/*    )*/}
                  {/*      ? +event.currentTarget.valueAsNumber*/}
                  {/*      : 0*/}

                  {/*    setPlayer2Score(numberValue)*/}
                  {/*  }}*/}
                  {/*/>*/}
                  <TextField
                    label="Ссылка"
                    value={link}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setLink(event.currentTarget.value)
                    }}
                  />
                </FormControl>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleSetResults}>Вставить данные</Button>
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
      )}
    </div>
  )
}

export default StaffResultLinkButton
