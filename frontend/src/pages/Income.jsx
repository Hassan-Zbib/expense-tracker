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
  reset,
} from "../features/income/incomeSlice"
import { toast } from "react-toastify"

import AdapterDateFns from "@mui/lab/AdapterDateFns"
import LocalizationProvider from "@mui/lab/LocalizationProvider"
import DatePicker from "@mui/lab/DatePicker"

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
  const dispatch = useDispatch()

  const { data, isError, isSuccess, message } = useSelector(
    (state) => state.income
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess) {
      toast.success("Record Added")
    }

    dispatch(reset())
  }, [isError, isSuccess, message, dispatch])

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
      type: "",
      amount: 0,
      date: new Date().toISOString(),
    },
    // validationSchema: loginSchema,
    onSubmit: (values) => {
      dispatch(createIncome(values))
      setAddOpen(false)
    },
  })

  return (
    <>
      <Dialog open={addOpen} onClose={handleAddClose}>
        <DialogContent>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: "20px" }}>
            Add a new record
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
              type="number"
              value={formik.values.amount}
              onChange={formik.handleChange}
              error={formik.touched.amount && Boolean(formik.errors.amount)}
              helperText={formik.touched.amount && formik.errors.amount}
              sx={{ marginTop: "20px" }}
            />

            <Box sx={{ marginTop: "20px" }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  renderInput={(props) => <TextField {...props} />}
                  label="Date"
                  value={formik.values.date}
                  onChange={(value) => {
                    formik.setFieldValue("date", value)
                  }}
                />
              </LocalizationProvider>
            </Box>
            <Divider />
            <Grid
              container
              direction="row"
              alignItems="center"
              justifyContent="flex-end"
            >
              <Grid item>
                <Button onClick={handleAddClose}>Cancel</Button>
              </Grid>
              <Grid item>
                <Button color="primary" variant="contained" type="submit">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
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
