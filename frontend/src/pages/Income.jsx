import {
  Button,
  Typography,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  Box,
} from "@mui/material"
import DataTable from "../components/DataTable"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useFormik } from "formik"
import {
  createIncome,
  getIncomes,
  deleteIncome,
  updateIncome,
} from "../features/auth/authSlice"
import { toast } from "react-toastify"

import AdapterDateFns from "@mui/lab/AdapterDateFns"
import LocalizationProvider from "@mui/lab/LocalizationProvider"
import DateTimePicker from "@mui/lab/DateTimePicker"

// import { loginSchema } from "../validators/userValidator"

const rows = [
  {
    _id: 1,
    type: "invoice",
    amount: 100,
    date: "1/1/2022",
    createdAt: "1/1/2022",
    updatedAt: "1/1/2022",
  },
]

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
  const [value, setValue] = useState(new Date())

  const handleAddClickOpen = () => {
    setAddOpen(true)
  }
  const handleAddClose = () => {
    setAddOpen(false)
  }
  const handleEditClickOpen = () => {
    setEditOpen(true)
  }
  const handleEditClose = () => {
    setEditOpen(false)
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      date: ""
    },
    // validationSchema: loginSchema,
    onSubmit: (values) => {
      // dispatch(login(values))
      alert(JSON.stringify(values, null, 2));
    },
  })

  return (
    <>
      <Dialog open={addOpen} onClose={handleAddClose} >
        <DialogContent>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: "20px" }}>
            Sign In
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              id="type"
              name="type"
              label="Type"
              type="text"
              value={formik.values.type}
              onChange={formik.handleChange}
              error={formik.touched.type && Boolean(formik.errors.type)}
              helperText={formik.touched.type && formik.errors.type}
            />

            <TextField
              fullWidth
              id="amount"
              name="amount"
              label="Amount"
              type="text"
              value={formik.values.amount}
              onChange={formik.handleChange}
              error={formik.touched.amount && Boolean(formik.errors.amount)}
              helperText={formik.touched.amount && formik.errors.amount}
              sx={{ marginTop: "20px" }}
            />

            <Box sx={{ marginTop: "20px" }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  renderInput={(props) => <TextField {...props} />}
                  label="Date"
                  value={formik.values.amount}
                  onChange={(value) => {
                    formik.setFieldValue('date', value);
                    }}
                />
              </LocalizationProvider>
            </Box>

            <Divider />
            <Button color="primary" variant="contained" type="submit">
              Sign In
            </Button>
          </form>
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
