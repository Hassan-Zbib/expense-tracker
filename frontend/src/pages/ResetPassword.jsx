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
import { resetPassSchema } from "../validators/userValidator"

const ResetPassword = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      confirmPass: "",
    },
    validationSchema: resetPassSchema,
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
          Reset Your Password
        </Typography>
      </Box>

      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="password"
          name="password"
          label="New Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          sx={{ marginTop: "10px" }}
        />

        <TextField
          fullWidth
          id="confirmPass"
          name="confirmPass"
          label="Confirm Password"
          type="password"
          value={formik.values.confirmPass}
          onChange={formik.handleChange}
          error={
            formik.touched.confirmPass && Boolean(formik.errors.confirmPass)
          }
          helperText={formik.touched.confirmPass && formik.errors.confirmPass}
          sx={{ marginTop: "10px" }}
        />
        <Grid
          container
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
        >
          <Button
            variant="text"
            component={Link}
            to="/Login"
            size="small"
            sx={{ width: "auto", margin: "10px 0 0 0" }}
          >
            Login
          </Button>
        </Grid>
        <Divider />
        <Button color="primary" variant="contained" type="submit">
          Submit
        </Button>
      </form>
    </>
  )
}

export default ResetPassword
