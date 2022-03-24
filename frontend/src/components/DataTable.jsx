import { useState } from "react"
import PropTypes from "prop-types"
import {
  Paper,
  Box,
  ButtonGroup,
  Button,
  Table,
  TableContainer,
  TablePagination,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material"
import TableHeader from '../components/TableHeader'
// import FormControlLabel from "@mui/material/FormControlLabel"
// import Switch from "@mui/material/Switch"
// import IconButton from "@mui/material/IconButton"
// import DeleteIcon from "@mui/icons-material/Delete"
// import FilterListIcon from "@mui/icons-material/FilterList"
// import Tooltip from "@mui/material/Tooltip"
// import Typography from "@mui/material/Typography"

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) {
      return order
    }
    return a[1] - b[1]
  })
  return stabilizedThis.map((el) => el[0])
}

export default function DataTable(props) {
  const [order, setOrder] = useState("asc")
  const [orderBy, setOrderBy] = useState("calories")
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const { headCells, rows, onDelete, onEdit, documents } = props

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc"
    setOrder(isAsc ? "desc" : "asc")
    setOrderBy(property)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

  return (
    <Box sx={{ width: "100%" }}>
      <Paper
        sx={{
          width: "100%",
          mb: 2,
          color: "black",
          backgroundColor: "white",
          border: "0.1px solid #CCC",
          borderRadius: " 5px",
        }}
      >
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={"medium"}
          >
            <TableHeader
              cells={headCells}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`

                  return (
                    <TableRow hover tabIndex={-1} key={row.name}>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.calories}</TableCell>
                      <TableCell align="right">{row.fat}</TableCell>
                      <TableCell align="right">{row.carbs}</TableCell>
                      <TableCell align="right">{row.protein}</TableCell>
                      <TableCell align="center">
                        <ButtonGroup
                          variant="outlined"
                          size="small"
                          aria-label="outlined primary button group"
                        >
                          <Button
                          variant="contained"
                            size="small"
                            sx={{ borderRadius: "5px" }}
                            onClick={(event) => documents(event, row.name)}
                          >
                            Documents
                          </Button>
                          <Button
                            sx={{ borderRadius: "5px" }}
                            color="secondary"
                            onClick={(event) => onEdit(event, row.name)}
                          >
                            Edit
                          </Button>
                          <Button sx={{ borderRadius: "5px" }} color="danger"  onClick={(event) => onDelete(event, row.name)}>
                            Delete
                          </Button>
                        </ButtonGroup>
                      </TableCell>
                    </TableRow>
                  )
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      {/* <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      /> */}
    </Box>
  )
}

DataTable.propTypes = {
  headCells: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  documents: PropTypes.func.isRequired,
}