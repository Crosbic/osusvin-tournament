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
  import React, { useEffect, useState } from 'react'


const AddMap = () => { 
  const [beatmapUrl, setBeatmapUrl] = useState<string>('')
  const [tournamentMod, setTournamentMod] = useState<string>('')
  const [tournamentModName, setTournamentModName] = useState<string>('')
  const mods = ['NM', 'HD', 'HR', 'DT', 'FM', 'TB']

  return (
    <>
      <TextField
        label="Ссылка на карту"
        value={beatmapUrl}
        onChange={(e) => setBeatmapUrl(e.target.value)}
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
        label="Мод (Пример: NM1)"
        value={tournamentModName}
        onChange={(e) => setTournamentModName(e.currentTarget.value)}
        required
      />
    </>)
};

export default AddMap