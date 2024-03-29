import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material'
import FirstPageIcon from '@mui/icons-material/FirstPage'
import LastPageIcon from '@mui/icons-material/LastPage'
import {
  Box,
  createTheme,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from '@mui/material'
import { ruRU } from '@mui/material/locale'
import { visuallyHidden } from '@mui/utils'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { NumericFormat } from 'react-number-format'

import styles from '../styles/Participants.module.css'

interface Data {
  id: number
  avatarUrl: string
  flagUrl: string
  username: string
  pp: number
  rank: number
  accuracy: number
}

type Order = 'asc' | 'desc'

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

  if (!rowsPerPage) {
    return <></>
  }

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
  const [page, setPage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(5)
  const [total, setTotal] = useState<number>(0)
  const [isLoading, setLoading] = useState<boolean>(false)
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

  useEffect(() => {
    setLoading(true)
    axios
      .post(`http://localhost:8080/users/participants`, {
        page,
        perPage: rowsPerPage !== -1 ? rowsPerPage : undefined,
        reverse: order === 'asc',
        sortBy: orderBy,
      })
      .then((res) => res.data)
      .then((data) => {
        setRows(data.items as Data[])
        setTotal(data.total)
      })
      .finally(() => setLoading(false))
  }, [order, orderBy, page, rowsPerPage])

  if (isLoading) {
    return <div className={styles.loading}>Loading...</div>
  }

  return (
    <div className={styles.tableContainer}>
      <div className={styles.participantsList}>Список игроков</div>
      <div className={styles.table}>
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
              {rows.map((row) => {
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
                      <div className={styles.profileLink}>
                        <Link href={`https://osu.ppy.sh/users/${row.id}`}>
                          {row.username}
                        </Link>
                      </div>
                    </TableCell>
                    <TableCell align="center" size="small">
                      <NumericFormat
                        value={Number(row.pp.toFixed(0))}
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
                      {row.accuracy.toFixed(2)}%
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
            <TableFooter>
              <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: 'Все', value: -1 }]}
                  count={total}
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
      </div>
    </div>
  )
}

export default ParticipantsTable
