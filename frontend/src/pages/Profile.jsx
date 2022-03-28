import {
  Button,
  Typography,
  TextField,
  Divider,
  Grid,
  Tooltip,
} from "@mui/material"
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useFormik } from "formik"
import { update, resetLoaders } from "../features/auth/authSlice"
import { toast } from "react-toastify"
// import { registerSchema } from "../validators/userValidator"

const Profile = () => {
  const dispatch = useDispatch()

  const { profile, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess) {
      toast.success(message)
    }

    dispatch(resetLoaders())
  }, [profile, isError, isSuccess, message])

  const formik = useFormik({
    initialValues: {
      firstName: null,
      lastName: null,
      email: null,
      websiteAddress: null,
      country: null,
      city: null,
      phone: null,
      about: null,
      settings: null,
    },
    // validationSchema: registerSchema,
    onSubmit: (values) => {
      dispatch(update(values))
    },
  })

  return (
    <>
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
        <form onSubmit={formik.handleSubmit}>
          <Grid
            container
            direction="row"
            alignItems="center"
            justifyContent="flex-start"
            sx={{ width: "60vh" }}
          >
            <Tooltip title="Your Organization's Name Cannot Be Changed">
              <TextField
                label="NGO Name"
                type="text"
                disabled
                value={profile.orgName}
              />
            </Tooltip>

            <Grid
              container
              direction="row"
              alignItems="center"
              justifyContent="flex-start"
              spacing={1}
              sx={{ mt: "15px" }}
            >
              <Grid item md={6} xs={12}>
                <TextField
                  id="firstName"
                  name="firstName"
                  label="First Name"
                  type="text"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.firstName && Boolean(formik.errors.firstName)
                  }
                  helperText={
                    formik.touched.firstName && formik.errors.firstName
                  }
                  sx={{ width: '100%'}}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  id="lastName"
                  name="lastName"
                  label="Last Name"
                  type="text"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.lastName && Boolean(formik.errors.lastName)
                  }
                  helperText={formik.touched.lastName && formik.errors.lastName}
                  sx={{ width: '100%' }}
                />
              </Grid>
            </Grid>

            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              sx={{ marginTop: "15px" }}
            />

            <TextField
              fullWidth
              id="websiteAddress"
              name="websiteAddress"
              label="Website Address"
              type="text"
              value={formik.values.websiteAddress}
              onChange={formik.handleChange}
              error={
                formik.touched.websiteAddress &&
                Boolean(formik.errors.websiteAddress)
              }
              helperText={
                formik.touched.websiteAddress && formik.errors.websiteAddress
              }
              sx={{ marginTop: "15px" }}
            />
            <TextField
              fullWidth
              id="country"
              name="country"
              label="Country"
              type="text"
              value={formik.values.country}
              onChange={formik.handleChange}
              error={formik.touched.country && Boolean(formik.errors.country)}
              helperText={formik.touched.country && formik.errors.country}
              sx={{ marginTop: "15px" }}
            />
            <TextField
              fullWidth
              id="city"
              name="city"
              label="City"
              type="text"
              value={formik.values.city}
              onChange={formik.handleChange}
              error={formik.touched.city && Boolean(formik.errors.city)}
              helperText={formik.touched.city && formik.errors.city}
              sx={{ marginTop: "15px" }}
            />
            <TextField
              fullWidth
              id="phone"
              name="phone"
              label="Phone Number"
              type="text"
              value={formik.values.phone}
              onChange={formik.handleChange}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
              sx={{ marginTop: "15px" }}
            />
            <TextField
              fullWidth
              id="about"
              name="about"
              label="Description"
              type="text"
              value={formik.values.about}
              onChange={formik.handleChange}
              error={formik.touched.about && Boolean(formik.errors.about)}
              helperText={formik.touched.about && formik.errors.about}
              sx={{ marginTop: "15px" }}
            />
            <Divider />
            <Grid
              container
              direction="row"
              alignItems="center"
              justifyContent="flex-end"
              sx={{ marginTop: "15px" }}
            >
              <Button
                color="primary"
                variant="contained"
                type="submit"
                fullWidth={false}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </>
  )
}
export default Profile
