import Avatar from "@mui/material/Avatar"
import { Grid, Typography, Button } from "@mui/material"
import { logout, reset, resetLoaders, getCurrent } from "../../features/auth/authSlice"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"

const ProfileHeader = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCurrent())
  }, [])

  const { profile, isError, isSuccess, message } = useSelector((state) => state.auth)

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    dispatch(resetLoaders())
  }, [profile, isError, isSuccess, message, navigate, dispatch])

  const getInitials = () => {
    const first = profile.firstName
      ? profile.firstName.substring(0, 1).toUpperCase()
      : "U"
    const last = profile.lastName
      ? profile.lastName.substring(0, 1).toUpperCase()
      : "N"
    return first + last
  }

  const getFullName = () => {
    const first = profile.firstName
      ? profile.firstName.charAt(0).toUpperCase() + profile.firstName.slice(1).toLowerCase()
      : "User"
    const last = profile.lastName
      ? profile.lastName.charAt(0).toUpperCase() + profile.lastName.slice(1).toLowerCase()
      : "Name"
    return first + ' ' + last
  }

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate("/")
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
          <Avatar>{getInitials()}</Avatar>
        </Grid>
        <Grid item>
          <Grid
            container
            direction="column"
            alignItems="flex-start"
            justifyContent="center"
          >
            <Typography variant="h6" noWrap component="div" fontSize="medium">
              {getFullName()}
            </Typography>{" "}
            <Typography variant="p" noWrap component="div" fontSize="small">
              {profile.orgName ? profile.orgName : 'Org Name'}
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
