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
import { transactionSchema } from "../validators/transactionValidator"

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

const documents = () => {
  return true
}

const importData = () => {
  return true
}

const exportData = () => {
  return true
}

const Income = () => {
  const [addOpen, setAddOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getIncomes())
  }, [])
  
  const { data, isError, isSuccess, message } = useSelector(
    (state) => state.income
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess) {
      toast.success("Done!")
    }

    dispatch(reset())
  }, [isError, isSuccess, message, dispatch])

  const handleAddClickOpen = () => {
    setAddOpen(true)
  }
  const handleAddClose = () => {
    setAddOpen(false)
    AddForm.resetForm()
  }
  const handleEditClickOpen = () => {
    setEditOpen(true)
  }
  const handleEditClose = () => {
    setEditOpen(false)
  }

  const AddForm = useFormik({
    initialValues: {
      type: "",
      amount: 0,
      date: new Date().toISOString(),
    },
    validationSchema: transactionSchema,
    onSubmit: (values) => {
      dispatch(createIncome(values))
      AddForm.resetForm()
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
          <form onSubmit={AddForm.handleSubmit}>
            <TextField
              fullWidth
              id="type"
              name="type"
              label="Type"
              type="text"
              value={AddForm.values.type}
              onChange={AddForm.handleChange}
              error={AddForm.touched.type && Boolean(AddForm.errors.type)}
              helperText={AddForm.touched.type && AddForm.errors.type}
            />

            <TextField
              fullWidth
              id="amount"
              name="amount"
              label="Amount ($)"
              type="number"
              value={AddForm.values.amount}
              onChange={AddForm.handleChange}
              error={AddForm.touched.amount && Boolean(AddForm.errors.amount)}
              helperText={AddForm.touched.amount && AddForm.errors.amount}
              sx={{ marginTop: "20px" }}
            />

            <Box sx={{ marginTop: "20px" }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  renderInput={(props) => <TextField {...props} />}
                  label="Date"
                  value={AddForm.values.date}
                  onChange={(value) => {
                    AddForm.setFieldValue("date", value)
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
        rows={data}
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
