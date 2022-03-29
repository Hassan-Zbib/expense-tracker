import { getPublicUserInfo } from "../features/stats/statsSlice"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import {
  Typography,
  TextField,
  DialogContent,
  Divider,
  Grid,
} from "@mui/material"

const InfoDialogue = ({ id }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPublicUserInfo(id))
  }, [])

  const { publicUser } = useSelector((state) => state.stats)

  if(!publicUser.orgName) {
      return null
  }

  return (
    <DialogContent>
      <Typography variant="h6" fontWeight="bold" sx={{ mb: "20px" }}>
        {publicUser.orgName}
      </Typography>

      <Divider />

      <TextField
        disabled
        label="Country"
        type="text"
        value={publicUser.country}
      />

      <TextField
        disabled
        label="City"
        type="text"
        value={publicUser.city}
      />

    </DialogContent>
  )
}
export default InfoDialogue
