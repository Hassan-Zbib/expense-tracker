import { Button, Typography, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"
import DataTable from "../components/DataTable"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import {
  createIncome,
  getIncomes,
  deleteIncome,
  updateIncome,
} from "../features/auth/authSlice"
import { toast } from "react-toastify"

// import { loginSchema } from "../validators/userValidator"

const rows = [{
  _id: 1,
  type: 'invoice',
  amount: 100,
  date: '1/1/2022',
  createdAt: '1/1/2022',
  updatedAt: '1/1/2022',
}]

const headCells = [
  {
    id: "_id",
    numeric: false,
    disablePadding: false,
    label: "ID",
  },
  {
    id: "type",
    numeric: false,
    disablePadding: false,
    label: "Type",
  },
  {
    id: "amount",
    numeric: false,
    disablePadding: false,
    label: "Amount ($)",
  },
  {
    id: "date",
    numeric: false,
    disablePadding: false,
    label: "Date",
  },
  {
    id: "createdAt",
    numeric: false,
    disablePadding: false,
    label: "Created At",
  },
  {
    id: "updatedAt",
    numeric: false,
    disablePadding: false,
    label: "Updated At",
  },
  {
    id: "action",
    numeric: false,
    disablePadding: false,
    label: "",
  },
]

const onDelete = (event, name) => {
  alert(name)
}

const onEdit = () => {
  return true
}

const documents = () => {
  return true
}

const importData = () => {
  return true
}

const exportData = () => {
  return true
}

const addNew = () => {
  return true
}

const Income = () => {
  const [addOpen, setAddOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)

  const handleAddClickOpen = () => {
    setAddOpen(true)
  }

  const handleAddClose = () => {
    setAddOpen(false)
  }

  const handleEditClickOpen = () => {
    setAddOpen(true)
  }

  const handleEditClose = () => {
    setAddOpen(false)
  }

  return (
    <>
      <Dialog open={addOpen} onClose={handleAddClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddClose}>Cancel</Button>
          <Button onClick={handleAddClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={editOpen} onClose={handleEditClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button onClick={handleEditClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>


      <Typography variant="h4" fontWeight="bold">
        Income
      </Typography>
      <DataTable
        headCells={headCells}
        rows={rows}
        onDelete={onDelete}
        onEdit={handleEditClickOpen}
        documents={documents}
        importData={importData}
        exportData={exportData}
        addNew={handleAddClickOpen}
      />
    </>
  )
}
export default Income
