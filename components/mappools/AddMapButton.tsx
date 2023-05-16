import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material'
import React, { useState } from 'react'

interface MapDataProps {
  beatmapUrl: string
  tournamentMod: string
  tournamentModName: string
}

interface AddMapProps {
  callBack: any
  index: number
  data: MapDataProps
}

const AddMapButton = (props: AddMapProps) => {
  const { callBack, index, data } = props
  const [beatmapUrl, setBeatmapUrl] = useState<string>(data?.beatmapUrl || '')
  const [tournamentMod, setTournamentMod] = useState<string>(
    data?.tournamentMod || ''
  )
  const [tournamentModName, setTournamentModName] = useState<string>(
    data?.tournamentModName || ''
  )
  const mods = ['NM', 'HD', 'HR', 'DT', 'FM', 'TB']

  const onChangeHandler = (e: any, valueName: string) => {
    const value = e.target.value
    const newData = {
      beatmapUrl: beatmapUrl,
      tournamentMod: tournamentMod,
      tournamentModName: tournamentModName,
    }
    switch (valueName) {
      case 'BeatmapUrl':
        setBeatmapUrl(value)
        newData.beatmapUrl = value
        break
      case 'TournamentMod':
        setTournamentMod(value)
        newData.tournamentMod = value
        break
      case 'TournamentModName':
        setTournamentModName(value)
        newData.tournamentModName = value
        break
    }
    callBack(newData, index)
  }

  return (
    <>
      <TextField
        label="Ссылка на карту"
        value={beatmapUrl}
        onChange={(e) => onChangeHandler(e, 'BeatmapUrl')}
        required
      />
      <FormControl sx={{ width: 220 }}>
        <InputLabel variant="outlined">Статы по моду</InputLabel>
        <Select
          label="Статы по моду"
          onChange={(e) => onChangeHandler(e, 'TournamentMod')}
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
        onChange={(e) => onChangeHandler(e, 'TournamentModName')}
        required
      />
    </>
  )
}

export default AddMapButton
