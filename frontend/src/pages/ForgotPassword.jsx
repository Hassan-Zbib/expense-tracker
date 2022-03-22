import {
  Button,
  Divider,
  TextField,
  Typography,
  Box,
} from "@mui/material"
import { useFormik } from "formik"
import { forgotPassSchema } from "../validators/userValidator"

const ForgotPassword = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: forgotPassSchema,
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
          Forgot Password?
        </Typography>

          <Typography variant="p" fontWeight="light" fontSize="small" >
          Enter the email address you used when you joined and we'll send you instructions to reset your password. For security reasons, we do NOT store your password. So rest assured that we will never send your password via email.
          </Typography>

      </Box>

      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />

        <Divider />
        <Button color="primary" variant="contained" type="submit">
        Send Reset Instructions
        </Button>
      </form>
    </>
  )
}

export default ForgotPassword
