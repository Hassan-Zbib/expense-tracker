import { useNavigate, useParams } from "react-router-dom"
import {
  Button,
  Typography,
  TextField,
  Dialog,
  DialogContent,
  Divider,
  Grid,
  Box,
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
import { transactionSchema } from "../validators/transactionValidator"

const Documents = () => {
  const dispatch = useDispatch()

  const { id, type } = useParams()

  useEffect(() => {
    dispatch(
      getDocuments({
        id: id,
        model: type.charAt(0).toUpperCase() + type.slice(1).toLowerCase(),
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

  return (
    <div>
      ID: {id} {type}
    </div>
  )
}
export default Documents
