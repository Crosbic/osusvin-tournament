import {
  Box,
  createTheme,
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
  TableSortLabel,
  ThemeProvider,
} from '@mui/material'
import styles from '../styles/Participants.module.css'
import React, { ChangeEvent, useState, useEffect } from 'react'
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material'
import LastPageIcon from '@mui/icons-material/LastPage'
import FirstPageIcon from '@mui/icons-material/FirstPage'
import { visuallyHidden } from '@mui/utils'
import { ruRU } from '@mui/material/locale'
import Image from 'next/image'
import { NumericFormat } from 'react-number-format'
import axios from 'axios'

interface Data {
  avatarUrl: string
  flagUrl: string
  username: string
  pp: number
  rank: number
  accuracy: number
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }

  return 0
}

type Order = 'asc' | 'desc'

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) {
      return order
    }

    return a[1] - b[1]
  })

  return stabilizedThis.map((el) => el[0])
}

interface HeadCell {
  disablePadding: boolean
  id: keyof Data
  label: string
  numeric: boolean
  sort: boolean
}

const headCells: readonly HeadCell[] = [
  {
    id: 'avatarUrl',
    numeric: false,
    disablePadding: true,
    label: 'Avatar',
    sort: false,
  },
  {
    id: 'flagUrl',
    numeric: true,
    disablePadding: true,
    label: 'Flag',
    sort: false,
  },
  {
    id: 'username',
    numeric: true,
    disablePadding: true,
    label: 'Nickname',
    sort: true,
  },
  {
    id: 'pp',
    numeric: true,
    disablePadding: true,
    label: 'PP',
    sort: true,
  },
  {
    id: 'rank',
    numeric: true,
    disablePadding: true,
    label: 'Global Rank',
    sort: true,
  },
  {
    id: 'accuracy',
    numeric: false,
    disablePadding: true,
    label: 'Accuracy',
    sort: true,
  },
]

interface PartcipantsTableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void
  order: Order
  orderBy: string
  rowCount: number
}

interface TablePaginationActionsProps {
  count: number
  page: number
  rowsPerPage: number
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void
}

const theme = createTheme(
  {
    palette: { mode: 'dark' },
    typography: {
      fontFamily: ['Comfortaa', 'TrebuchetMS'].join(','),
      fontSize: 16,
    },
  },
  ruRU
)

function TablePaginationActions(props: TablePaginationActionsProps) {
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
      <IconButton onClick={handleFirstPageButtonClick} disabled={page === 0}>
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0}>
        {theme.direction === 'rtl' ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
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
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  )
}

const ParticipantsTableHead = (props: PartcipantsTableProps) => {
  const { order, orderBy, onRequestSort } = props

  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property)
    }

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="center"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.sort ? (
              <TableSortLabel
                active={headCell.sort ? orderBy === headCell.id : false}
                direction={orderBy === headCell.id ? order : 'desc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc'
                      ? 'sorted descending'
                      : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            ) : (
              headCell.label
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

const ParticipantsTable = () => {
  const [order, setOrder] = useState<Order>('desc')
  const [orderBy, setOrderBy] = useState<keyof Data>('pp')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [isLoading, setLoading] = useState(false)
  const [rows, setRows] = useState<Data[]>([])

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isDesc = orderBy === property && order === 'desc'
    setOrder(isDesc ? 'asc' : 'desc')
    setOrderBy(property)
  }

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

  useEffect(() => {
    setLoading(true)
    axios
      .post(`https://osusvin.ru/users/participants`, {
        perPage: 0,
        page: 0,
      })
      .then((res) => res.data)
      .then((data) => {
        setRows(data.items as Data[])
      })
      .finally(() => setLoading(false))
  }, [])

  if (isLoading) {
    return <p>Loading...</p>
  }

  return (
    <div className={styles.tableContainer}>
      <Paper
        sx={{
          width: '100%',
          backgroundColor: '#00000000',
        }}
      >
        <div className={styles.participantsList}>Список игроков</div>
        <div className={styles.table}>
          <ThemeProvider theme={theme}>
            <TableContainer>
              <Table
                sx={{
                  minWidth: 500,
                }}
              >
                <ParticipantsTableHead
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                  rowCount={rows.length}
                />
                <TableBody>
                  {(rowsPerPage > 0
                    ? stableSort(rows, getComparator(order, orderBy)).slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : stableSort(rows, getComparator(order, orderBy))
                  ).map((row) => {
                    return (
                      <TableRow
                        key={row.username}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                        }}
                      >
                        <TableCell align="center" size="small">
                          <Image
                            src={row.avatarUrl}
                            alt="Avatar"
                            className={styles.avatar}
                            width="40"
                            height="40"
                            unoptimized
                          />
                        </TableCell>
                        <TableCell align="center" size="small">
                          <Image
                            src={row.flagUrl}
                            alt="Flag"
                            width="40"
                            height="40"
                          />
                        </TableCell>
                        <TableCell align="center" size="small">
                          {row.username}
                        </TableCell>
                        <TableCell align="center" size="small">
                          <NumericFormat
                            value={row.pp}
                            thousandSeparator=" "
                            displayType="text"
                          />
                        </TableCell>
                        <TableCell align="center" size="small">
                          <NumericFormat
                            value={row.rank}
                            thousandSeparator=" "
                            displayType="text"
                          />
                        </TableCell>
                        <TableCell align="center" size="small">
                          {row.accuracy}%
                        </TableCell>
                      </TableRow>
                    )
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                <TableFooter>
                  <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TablePagination
                      rowsPerPageOptions={[
                        5,
                        10,
                        25,
                        { label: 'Все', value: -1 },
                      ]}
                      count={rows.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                      ActionsComponent={TablePaginationActions}
                    />
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
          </ThemeProvider>
        </div>
      </Paper>
    </div>
  )
}

export default ParticipantsTable
