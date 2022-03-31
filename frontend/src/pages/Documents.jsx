import { useParams } from "react-router-dom"
import {
  Button,
  Typography,
  TextField,
  Dialog,
  DialogContent,
  Divider,
  Grid,
  Box,
  Tooltip,
} from "@mui/material"
import DataTable from "../components/DataTable"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useFormik } from "formik"
import {
  setDocument,
  getDocuments,
  deleteDocument,
  updateDocument,
  reset,
} from "../features/document/documentSlice"
import { toast } from "react-toastify"
import AdapterDateFns from "@mui/lab/AdapterDateFns"
import LocalizationProvider from "@mui/lab/LocalizationProvider"
import DatePicker from "@mui/lab/DatePicker"
import FileUploadIcon from "@mui/icons-material/FileUpload"
// import { documentSchema } from "../validators/documentValidator"

const headCells = [
  {
    id: "_id",
    numeric: false,
    disablePadding: false,
    label: "ID",
  },
  {
    id: "document",
    numeric: false,
    disablePadding: false,
    label: "Document",
  },
  {
    id: "notes",
    numeric: false,
    disablePadding: false,
    label: "Notes",
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

const Documents = () => {
  const [addOpen, setAddOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const dispatch = useDispatch()

  const { id, type } = useParams()

  const model = type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()

  useEffect(() => {
    dispatch(
      getDocuments({
        id: id,
        model: model,
      })
    )
  }, [])

  const { data, isError, isSuccess, message } = useSelector(
    (state) => state.document
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess) {
      toast.success("Done!")
    }

    dispatch(reset())
  }, [data, isError, isSuccess, message, dispatch])

  const AddForm = useFormik({
    initialValues: {
      model: model,
      transactionId: id,
      notes: "",
      date: new Date().toISOString(),
      file: null,
    },
    // validationSchema: documentSchema,
    onSubmit: (values) => {
      if (!values.file) {
        toast.error("A document is required")
        return 
      }
      const formData = new FormData()
      formData.append("file", values.file)
      formData.append("model", values.model)
      formData.append("extends", values.transactionId)
      formData.append("notes", values.notes)
      formData.append("date", values.date)
      dispatch(setDocument(formData))
      AddForm.resetForm()
      setAddOpen(false)
    },
  })

  const EditForm = useFormik({
    initialValues: {
      id: 0,
      type: "",
      amount: 0,
      date: new Date().toISOString(),
    },
    // validationSchema: documentSchema,
    onSubmit: (values) => {
      dispatch(updateDocument(values))
      EditForm.resetForm()
      setEditOpen(false)
    },
  })

  const handleAddClickOpen = () => {
    setAddOpen(true)
  }
  const handleAddClose = () => {
    setAddOpen(false)
    AddForm.resetForm()
  }
  const handleEditClickOpen = (event, id) => {
    let record = data.filter((obj) => {
      return obj._id === id
    })[0]

    EditForm.setFieldValue("id", record._id)
    EditForm.setFieldValue("amount", record.amount)
    EditForm.setFieldValue("type", record.type)
    EditForm.setFieldValue("date", record.date)
    setEditOpen(true)
  }
  const handleEditClose = () => {
    setEditOpen(false)
  }

  const onDelete = (event, id) => {
    dispatch(deleteDocument(id))
  }

  return (
    <>
      <Dialog open={addOpen} onClose={handleAddClose}>
        <DialogContent>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: "20px" }}>
            Add a new document
          </Typography>
          <form onSubmit={AddForm.handleSubmit}>
            <Box>
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
            <TextField
              fullWidth
              sx={{ marginTop: "20px" }}
              multiline
              rows={3}
              id="notes"
              name="notes"
              label="Notes"
              type="text"
              value={AddForm.values.notes}
              onChange={AddForm.handleChange}
              error={AddForm.touched.notes && Boolean(AddForm.errors.notes)}
              helperText={AddForm.touched.notes && AddForm.errors.notes}
            />

            <input
              color="primary"
              type="file"
              onChange={(event) =>
                AddForm.setFieldValue("file", event.target.files[0])
              }
              id="icon-button-file"
              hidden
            />
            <label htmlFor="icon-button-file">
              <Button
                sx={{ marginTop: "20px" }}
                component="span"
                variant="outlined"
              >
                <FileUploadIcon fontSize="small" />
                Upload
              </Button>
            </label>

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

      {/* <Dialog open={editOpen} onClose={handleEditClose}>
        <DialogContent>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: "20px" }}>
            Edit document
          </Typography>
          <form onSubmit={EditForm.handleSubmit}>
            <TextField
              fullWidth
              id="type"
              name="type"
              label="Type"
              type="text"
              value={EditForm.values.type}
              onChange={EditForm.handleChange}
              error={EditForm.touched.type && Boolean(EditForm.errors.type)}
              helperText={EditForm.touched.type && EditForm.errors.type}
            />

            <TextField
              fullWidth
              id="amount"
              name="amount"
              label="Amount ($)"
              type="number"
              value={EditForm.values.amount}
              onChange={EditForm.handleChange}
              error={EditForm.touched.amount && Boolean(EditForm.errors.amount)}
              helperText={EditForm.touched.amount && EditForm.errors.amount}
              sx={{ marginTop: "20px" }}
            />

            <Box sx={{ marginTop: "20px" }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  renderInput={(props) => <TextField {...props} />}
                  label="Date"
                  value={EditForm.values.date}
                  onChange={(value) => {
                    EditForm.setFieldValue("date", value)
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
                <Button onClick={handleEditClose}>Cancel</Button>
              </Grid>
              <Grid item>
                <Button color="primary" variant="contained" type="submit">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
      </Dialog> */}

      <Typography variant="h4" fontWeight="bold">
        Documents
      </Typography>

      <DataTable
        rows={data}
        onDelete={onDelete}
        onEdit={handleEditClickOpen}
        addNew={handleAddClickOpen}
        isDocument={true}
        headCells={headCells}
      />
    </>
  )
}
export default Documents
