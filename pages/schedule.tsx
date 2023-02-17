import {
  Box,
  createTheme,
  IconButton,
  Paper,
  Tab,
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
import styles from '../styles/Schedule.module.css'
import React, { ChangeEvent, useState } from 'react'
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material'
import LastPageIcon from '@mui/icons-material/LastPage'
import FirstPageIcon from '@mui/icons-material/FirstPage'
import { visuallyHidden } from '@mui/utils'
import { ruRU } from '@mui/material/locale'
import { TabContext, TabList, TabPanel } from '@mui/lab'

interface Data {
  matchID: string
  date: string
  avatar1: string
  player1: string
  score1: number
  score2: number
  player2: string
  avatar2: string
  referee: string
  commentator: string
  mplink: string
}

function createData(
  matchID: string,
  date: string,
  avatar1: string,
  player1: string,
  score1: number,
  score2: number,
  player2: string,
  avatar2: string,
  referee: string,
  commentator: string,
  mplink: string
): Data {
  return {
    matchID,
    date,
    avatar1,
    player1,
    score1,
    score2,
    player2,
    avatar2,
    referee,
    commentator,
    mplink,
  }
}

const rows = [
  createData(
    'а',
    'a',
    '1',
    'asdas',
    12,
    12,
    'asd',
    'asds',
    '23a',
    'dsad',
    'dsd'
  ),
  createData(
    'а',
    'a',
    '1',
    'asdas',
    12,
    12,
    'asd',
    'asds',
    '23a',
    'dsad',
    'dsd'
  ),
  createData(
    'а',
    'a',
    '1',
    'asdas',
    12,
    12,
    'asd',
    'asds',
    '23a',
    'dsad',
    'dsd'
  ),
  createData(
    'а',
    'a',
    '1',
    'asdas',
    12,
    12,
    'asd',
    'asds',
    '23a',
    'dsad',
    'dsd'
  ),
  createData(
    'а',
    'a',
    '1',
    'asdas',
    12,
    12,
    'asd',
    'asds',
    '23a',
    'dsad',
    'dsd'
  ),
  createData(
    'а',
    'a',
    '1',
    'asdas',
    12,
    12,
    'asd',
    'asds',
    '23a',
    'dsad',
    'dsd'
  ),
  createData(
    'а',
    'a',
    '1',
    'asdas',
    12,
    12,
    'asd',
    'asds',
    '23a',
    'dsad',
    'dsd'
  ),
  createData(
    'а',
    'a',
    '1',
    'asdas',
    12,
    12,
    'asd',
    'asds',
    '23a',
    'dsad',
    'dsd'
  ),
  createData(
    'а',
    'a',
    '1',
    'asdas',
    12,
    12,
    'asd',
    'asds',
    '23a',
    'dsad',
    'dsd'
  ),
  createData(
    'а',
    'a',
    '1',
    'asdas',
    12,
    12,
    'asd',
    'asds',
    '23a',
    'dsad',
    'dsd'
  ),
  createData(
    'а',
    'a',
    '1',
    'asdas',
    12,
    12,
    'asd',
    'asds',
    '23a',
    'dsad',
    'dsd'
  ),
  createData(
    'а',
    'a',
    '1',
    'asdas',
    12,
    12,
    'asd',
    'asds',
    '23a',
    'dsad',
    'dsd'
  ),
]

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
    id: 'matchID',
    numeric: false,
    disablePadding: true,
    label: 'ID',
    sort: true,
  },
  {
    id: 'date',
    numeric: false,
    disablePadding: false,
    label: 'Дата и время',
    sort: true,
  },
  {
    id: 'avatar1',
    numeric: false,
    disablePadding: false,
    label: '',
    sort: false,
  },
  {
    id: 'player1',
    numeric: false,
    disablePadding: false,
    label: 'Игрок 1',
    sort: true,
  },
  {
    id: 'score1',
    numeric: true,
    disablePadding: false,
    label: '',
    sort: false,
  },
  {
    id: 'score2',
    numeric: true,
    disablePadding: false,
    label: '',
    sort: false,
  },
  {
    id: 'player2',
    numeric: false,
    disablePadding: false,
    label: 'Игрок 2',
    sort: true,
  },
  {
    id: 'avatar2',
    numeric: false,
    disablePadding: false,
    label: '',
    sort: false,
  },
  {
    id: 'referee',
    numeric: false,
    disablePadding: false,
    label: 'Рефери',
    sort: true,
  },
  {
    id: 'commentator',
    numeric: false,
    disablePadding: false,
    label: 'Комментатор',
    sort: true,
  },
  {
    id: 'mplink',
    numeric: false,
    disablePadding: false,
    label: 'MP Link',
    sort: false,
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
                direction={orderBy === headCell.id ? order : 'asc'}
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
  const [orderBy, setOrderBy] = useState<keyof Data>('date')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [value, setValue] = useState('1')

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
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

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

  return (
    <>
      <div className="styles.tabs">
        <TabContext value={value}>
          <TabList onChange={handleTabChange}>
            <Tab label="RO32" value="1" />
            <Tab label="RO322" value="2" />
            <Tab label="RO323" value="3" />
          </TabList>
          <TabPanel value="1">
            <div className={styles.tableContainer}>
              <Paper
                sx={{
                  width: '100%',
                  backgroundColor: '#00000000',
                }}
              >
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
                            ? stableSort(
                                rows,
                                getComparator(order, orderBy)
                              ).slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                              )
                            : stableSort(rows, getComparator(order, orderBy))
                          ).map((row) => {
                            return (
                              <TableRow
                                key={row.matchID}
                                sx={{
                                  '&:last-child td, &:last-child th': {
                                    border: 0,
                                  },
                                }}
                              >
                                <TableCell align="center">
                                  {row.matchID}
                                </TableCell>
                                <TableCell align="center">{row.date}</TableCell>
                                <TableCell align="center">
                                  {row.avatar1}
                                </TableCell>
                                <TableCell align="center">
                                  {row.player1}
                                </TableCell>
                                <TableCell align="center">
                                  {row.score1}
                                </TableCell>
                                <TableCell align="center">
                                  {row.score2}
                                </TableCell>
                                <TableCell align="center">
                                  {row.player2}
                                </TableCell>
                                <TableCell align="center">
                                  {row.avatar2}
                                </TableCell>
                                <TableCell align="center">
                                  {row.referee}
                                </TableCell>
                                <TableCell align="center">
                                  {row.commentator}
                                </TableCell>
                                <TableCell align="center">
                                  {row.mplink}
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
                            sx={{
                              '&:last-child td, &:last-child th': { border: 0 },
                            }}
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
          </TabPanel>
          <TabPanel value="2">
            <div className={styles.table2}>sdafghjfdgs</div>
          </TabPanel>
        </TabContext>
      </div>
    </>
  )
}

export default ParticipantsTable
