import { Grid, Typography } from "@mui/material"
import DiscoverTable from "../components/DiscoverTable"
import { useTheme } from "@mui/styles"
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from "react"
import {  } from '../features/stats/statsSlice'


const Discover = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(aFunction())
  }, [])

  const { data } = useSelector(state => state.stats)


  return <div>{data}</div>;
};
export default Discover;
