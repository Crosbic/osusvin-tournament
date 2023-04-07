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
  MenuItem,
  Select,
  Snackbar,
} from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

interface iStaffRegisterButtonProps {
  rows: any
}

const StaffRegisterButton = (props: iStaffRegisterButtonProps) => {
  const { rows } = props
  const [user, setUser] = useState<any>()
  const [open, setOpen] = useState<boolean>(false)
  const [lobby, setLobby] = useState<string>('')
  const [key, setKey] = useState<any>()
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

  const handleChooseLobby = async () => {
    await axios
      .post(`https://auth.osusvin.ru/lobbies/register/${lobby}`, null, {
        headers: {
          Authorization: `Bearer ${key}`,
        },
      })
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

  return (
    <div>
      {user?.role === 'user' || !user ? null : (
        <>
          <Button variant="outlined" onClick={handleClickOpen}>
            Запись в лобби
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Выберите лобби</DialogTitle>
            <DialogContent>
              <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <Select
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
                </FormControl>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleChooseLobby}>Выбрать</Button>
              <Button onClick={handleClose}>Назад</Button>
            </DialogActions>
          </Dialog>
          {error ? (
            <Snackbar
              open={openAlert}
              autoHideDuration={4000}
              onClose={handleAlertClose}
            >
              <Alert severity="error">
                <AlertTitle>Ошибка регистрации в лобби</AlertTitle>Возможно
                лобби заполнено либо вы не авторизованы
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
                <AlertTitle>Успех</AlertTitle>Успешная регистрация на сайте
              </Alert>
            </Snackbar>
          ) : null}
        </>
      )}
    </div>
  )
}

export default StaffRegisterButton
