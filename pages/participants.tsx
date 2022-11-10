import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  useTheme,
} from '@mui/material'
import styles from '../styles/Participants.module.css'
import React from 'react'
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material'
import LastPageIcon from '@mui/icons-material/LastPage'
import FirstPageIcon from '@mui/icons-material/FirstPage'

interface TablePaginationActionsProps {
  count: number
  page: number
  rowsPerPage: number
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme()
  const { count, page, rowsPerPage, onPageChange } = props

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, 0)
  }

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page - 1)
  }

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page + 1)
  }

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
  }

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  )
}

function createData(
  avatar: string,
  flag: string,
  nickname: string,
  pp: number,
  rank: number
) {
  return { avatar, flag, nickname, pp, rank }
}

const rows = [
  createData('img', 'ru', 'Crosbic', 4700, 68000),
  createData('img', 'ru', 'Danton', 2600, 300000),
  createData('img', 'ru', 'unsosh1', 3415, 1234135),
  createData('img', 'ru', 'unsosh1', 3415, 1234135),
  createData('img', 'ru', 'unsosh1', 3415, 1234135),
  createData('img', 'ru', 'unsosh1', 3415, 1234135),
  createData('img', 'ru', 'unsosh1', 3415, 1234135),
  createData('img', 'ru', 'unsosh1', 3415, 1234135),
  createData('img', 'ru', 'unsosh1', 3415, 1234135),
  createData('img', 'ru', 'unsosh1', 3415, 1234135),
  createData('img', 'ru', 'unsosh1', 3415, 1234135),
  createData('img', 'ru', 'Crosbic', 4700, 68000),
  createData('img', 'ru', 'Crosbic', 4700, 68000),
  createData('img', 'ru', 'Crosbic', 4700, 68000),
  createData('img', 'ru', 'Crosbic', 4700, 68000),
]

const Participants = () => {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(6)

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const ParticipantsTable = () => {
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Avatar</TableCell>
              <TableCell align="center">Flag</TableCell>
              <TableCell align="center">Nickname</TableCell>
              <TableCell align="center">PP</TableCell>
              <TableCell align="center">Rank</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row) => (
              <TableRow
                key={row.nickname}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                }}
              >
                <TableCell align="center">{row.avatar}</TableCell>
                <TableCell align="center">{row.flag}</TableCell>
                <TableCell align="center" component="th" scope="row">
                  {row.nickname}
                </TableCell>
                <TableCell align="center">{row.pp}</TableCell>
                <TableCell align="center">{row.rank}</TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[6, 12, 24, { label: 'All', value: -1 }]}
                colSpan={3}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    'aria-label': 'rows per page',
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    )
  }

  return (
    <>
      <main className={styles.table}>
        <ParticipantsTable />
      </main>
    </>
  )
}

export default Participants
