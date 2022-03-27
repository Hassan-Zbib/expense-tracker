import Avatar from "@mui/material/Avatar"
import { Grid, Typography, Button } from "@mui/material"
import { useDispatch } from "react-redux"
import { logout, reset } from "../../features/auth/authSlice"
import { useNavigate } from 'react-router-dom'
import { getCurrent } from '../../features/auth/authSlice'
import { useSelector, useDispatch } from "react-redux"

const ProfileHeader = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
      dispatch(getCurrent())
    }, [])
  
    const { profile } = useSelector(
      (state) => state.auth
    )
  
    const onLogout = () => {
      dispatch(logout())
      dispatch(reset())
      navigate('/')
    }

  return (
    <>
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        spacing={2}
      >
        <Grid item>
          <Avatar>HZ</Avatar>
        </Grid>
        <Grid item>
          <Grid
            container
            direction="column"
            alignItems="flex-start"
            justifyContent="center"
          >
            <Typography variant="h6" noWrap component="div" fontSize="medium">
              Hassan Zbib
            </Typography>{" "}
            <Typography variant="p" noWrap component="div" fontSize="small">
              NGO Name
            </Typography>
          </Grid>
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            color="secondary"
            size="small"
            onClick={onLogout}
          >
            Logout
          </Button>
        </Grid>
      </Grid>
    </>
  )
}
export default ProfileHeader
