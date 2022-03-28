import {
  Paper,
  Table,
  TableHead,
  TableContainer,
  TableBody,
  TableRow,
  TableCell,
  Avatar,
} from "@mui/material"

export default function DiscoverTable(props) {
  const { rows } = props

  return (
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}
