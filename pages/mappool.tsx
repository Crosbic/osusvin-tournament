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
import Image from 'next/image'
import Link from 'next/link'



interface Data {
  backgroundLink: string
  mapLink: string
  modeID: number
  title: string
  stats: string
  mapper: string
  mapID: number
  suggester: string
}
enum Modes {
  NM = 0,
  HD,
  HR,
  DT,
}

function createData(
  backgroundLink: string,
  mapLink: string,
  modeID: number,
  title: string,
  stats: string,
  mapper: string,
  mapID: number,
  suggester: string,
): Data {
  return {
    backgroundLink,
    mapLink,
    modeID,
    title,
    stats,
    mapper,
    mapID,
    suggester,
  }
}

const constRows: Data[] = [
  createData(
    'https://assets.ppy.sh/beatmaps/842412/covers/cover.jpg',
    "https://osu.ppy.sh/beatmapsets/842412#osu/1762731",
    0,
    'Harumachi Clover - Will Stetson 00',
    '3/3/5',
    'Sotarks',
    1762731,
    "Muga",
  ),
  createData(
    'https://assets.ppy.sh/beatmaps/1790301/covers/cover.jpg',
    "https://osu.ppy.sh/beatmapsets/1790301#osu/3678648",
    0,
    'Dokuzu - NAKISO',
    '4/4/7,5',
    'Ryuusei Aika',
    3678648,
    "Muga",
  ),
  createData(
    'https://assets.ppy.sh/beatmaps/1422289/covers/cover.jpg',
    "https://osu.ppy.sh/beatmapsets/1422289#osu/2929300",
    0,
    'yama - Yuurei Tokyo [Ghost]',
    '4/5,5/9,3',
    'climbx3145',
    2929300,
    "Muga",
  ),
  createData(
    'https://assets.ppy.sh/beatmaps/842412/covers/cover.jpg',
    "https://osu.ppy.sh/beatmapsets/842412#osu/1762731",
    0,
    'Harumachi Clover - Will Stetson 01',
    '3/3/5',
    'Sotarks',
    1762731,
    "Muga",
  ),
  createData(
    'https://assets.ppy.sh/beatmaps/842412/covers/cover.jpg',
    "https://osu.ppy.sh/beatmapsets/842412#osu/1762731",
    0,
    'Harumachi Clover - Will Stetson 02',
    '3/3/5',
    'Sotarks',
    1762731,
    "Muga",
  ),
  createData(
    'https://assets.ppy.sh/beatmaps/842412/covers/cover.jpg',
    "https://osu.ppy.sh/beatmapsets/842412#osu/1762731",
    0,
    'Harumachi Clover - Will Stetson 03',
    '3/3/5',
    'Sotarks',
    1762731,
    "Muga",
  ),
]
/*function stableSort<T>(
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
}*/

interface HeadCell {
  disablePadding: boolean
  id: string
  label: string
  numeric: boolean
  sort: boolean
}

const headCells: readonly HeadCell[] = [
  {
    id: 'bg',
    numeric: false,
    disablePadding: true,
    label: 'BG',
    sort: false,
  },
  {
    id: 'mode',
    numeric: false,
    disablePadding: true,
    label: 'Mode',
    sort: true,
  },
  {
    id: 'title',
    numeric: false,
    disablePadding: true,
    label: 'Title',
    sort: true,
  },
  {
    id: 'stats',
    numeric: false,
    disablePadding: true,
    label: 'CS/HP/AR',
    sort: false,
  },
  {
    id: 'mapper',
    numeric: false,
    disablePadding: true,
    label: 'Mapper',
    sort: true,
  },
  {
    id: 'mapID',
    numeric: false,
    disablePadding: true,
    label: 'ID',
    sort: true,
  },
  {
    id: 'suggester',
    numeric: false,
    disablePadding: false,
    label: 'Suggester',
    sort: true,
  },
]

interface MappoolTableProps {
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

const MappoolTableHead = (props: MappoolTableProps) => { 
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="center">
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

const MappoolTable = () => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [value, setValue] = useState('1')
  const [rows, setRows] = useState<Data[]>(constRows)//loadind from back


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
      <div className={styles.tabs}>
        <TabContext value={value}>
          <TabList onChange={handleTabChange}>
            <Tab label="RO32" value="1" />
            <Tab label="Quals" value="2" />
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
                        <MappoolTableHead                       
                          rowCount={rows.length}
                        />
                        <TableBody>
                          {(rowsPerPage > 0
                            ? 
                            rows.slice(
                              page * rowsPerPage,
                              page * rowsPerPage + rowsPerPage
                            )
                            : rows
                          ).map((row) => {
                            return (
                              <TableRow
                                key={row.mapID}
                                sx={{
                                  '&:last-child td, &:last-child th': {
                                    border: 0,
                                  },
                                }}
                              >
                                <TableCell align="center">
                                  <Image
                                    src={row.backgroundLink as string}//?
                                    alt="mapImage"
                                    height="60"
                                    width="120"
                                    layout='fixed'
                                    unoptimized
                                  />
                                </TableCell>
                                <TableCell align="center">
                                  {Modes[row.modeID as number]}
                                </TableCell>
                                <TableCell align="center">
                                  <Link href={row.mapLink as string} >
                                    <a target="_blank"  rel="noreferrer">
                                    {row.title}
                                    </a>
                                  </Link>
                                </TableCell>
                                <TableCell align="center">
                                  {row.stats}
                                </TableCell>
                                <TableCell align="center">
                                  {row.mapper}
                                </TableCell>
                                <TableCell align="center">
                                  {row.mapID}
                                </TableCell>
                                <TableCell align="center">
                                  {row.suggester}
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
            <div className={styles.table2}>Empty</div>
          </TabPanel>
        </TabContext>
      </div>
    </>
  )
}

export default MappoolTable
