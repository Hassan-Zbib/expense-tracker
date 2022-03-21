import {
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
  Box,
} from "@mui/material"
import { useFormik } from "formik"
import { Link } from "react-router-dom"
// import { registerSchema } from "../validators/userValidator"

const SignUp = () => {
  const formik = useFormik({
    initialValues: {
      orgName: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPass: "",
    },
    // validationSchema: loginSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2))
    },
  })

  return (
    <>
      <Box sx={{ marginBottom: "20px" }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ margin: "10px 0 20px 0" }}
        >
          Sign Up
        </Typography>

        <Typography variant="p" fontWeight="light" fontSize="small">
          Already a User ?
        </Typography>

        <Button
          variant="text"
          component={Link}
          to="/Login"
          size="small"
          sx={{ width: "auto" }}
        >
          Login
        </Button>
      </Box>

      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="orgName"
          name="orgName"
          label="NGO Name"
          type="text"
          value={formik.values.orgName}
          onChange={formik.handleChange}
          error={formik.touched.orgName && Boolean(formik.errors.orgName)}
          helperText={formik.touched.orgName && formik.errors.orgName}
        />

        <Grid container direction='row' alignItems='center' justifyContent="space-between" spacing={0}>
        <TextField
          id="firstName"
          name="firstName"
          label="First Name"
          type="text"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          helperText={formik.touched.firstName && formik.errors.firstName}
          sx={{ margin: "10px 2px 0 0" }}
        />
        <TextField
          id="lastName"
          name="lastName"
          label="Last Name"
          type="text"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          helperText={formik.touched.lastName && formik.errors.lastName}
          sx={{ margin: "10px 0 0 2px" }}
        />
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
          sx={{ marginTop: "10px" }}
        />

        <TextField
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          sx={{ marginTop: "10px" }}
        />
        <Divider />
        <Button color="primary" variant="contained" type="submit">
          Sign In
        </Button>
      </form>
    </>
  )
}

export default SignUp
