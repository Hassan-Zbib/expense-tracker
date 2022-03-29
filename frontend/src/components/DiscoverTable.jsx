import {
  Paper,
  Table,
  TableHead,
  TableContainer,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Tooltip,
  Dialog,
  Avatar,
} from "@mui/material"
import InfoIcon from "@mui/icons-material/Info"
import InfoDialogue from "./InfoDialogue"
import { useState } from "react"

export default function DiscoverTable(props) {
  const [Open, setOpen] = useState(false)
  const [Id, setId] = useState(0)

  const { rows } = props

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Dialog open={Open} onClose={handleClose}>
        <InfoDialogue id={Id} />
      </Dialog>
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
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>NGO Name</TableCell>
                <TableCell align="center">Country</TableCell>
                <TableCell align="center">City</TableCell>
                <TableCell align="center">Total Income</TableCell>
                <TableCell align="center">Total Expenses</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.orgName}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.orgName}
                  </TableCell>
                  <TableCell align="center">{row.country}</TableCell>
                  <TableCell align="center">{row.city}</TableCell>
                  <TableCell align="center">$ {row.totalIncome}</TableCell>
                  <TableCell align="center">$ {row.totalExpenses}</TableCell>
                  <TableCell align="center">
                    <Tooltip title="Check Info">
                      <IconButton
                        aria-label="info"
                        onClick={() => {
                          setId(row._id)
                          handleClickOpen()
                        }}
                      >
                        <InfoIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  )
}
