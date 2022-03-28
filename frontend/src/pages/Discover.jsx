import { Grid, Typography } from "@mui/material"
import DiscoverTable from "../components/DiscoverTable"
import { useTheme } from "@mui/styles"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { getDiscoverUsers } from "../features/stats/statsSlice"

const Discover = () => {
  const theme = useTheme()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getDiscoverUsers())
  }, [])

  const { data } = useSelector((state) => state.stats)

  if (data[0]) {
    return (
      <>
        <Typography variant="h4" fontWeight="bold">
          Discover
        </Typography>

        <DiscoverTable rows={data}></DiscoverTable>
      </>
    )
  }
  return null
}
export default Discover
