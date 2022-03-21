import { Grid, Typography } from "@mui/material"
import { makeStyles } from "@mui/styles"

const useStyles = makeStyles((theme) => ({
  left: {
    padding: "10px",
    backgroundColor: theme.palette.background.main,
    color: "white",
  },
  right: {
    padding: "10px",
    backgroundColor: "white",
    color: theme.palette.background.main,
  },
  title: {
    fontWeight: "bolder",
    textAlign: "center",
    textTransform: "uppercase",
    fontStyle: "italic",
    padding: "30px",
  },
  text: {
    fontWeight: "medium",
    textAlign: "center",
    textTransform: "none",
  },
}))

const AuthLayout = ({ children }) => {
  const classes = useStyles()

  return (
    <>
      <Grid
        container
        spacing={0}
        direction="row"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item md={5} xs={12} className={classes.left}>
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: "80vh" }}
          >
            <Grid item>
              <Typography variant="h4" className={classes.title}>
                NET
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h5" className={classes.text}>
                Keep Track Of All Your Org's Finance
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item md={5} xs={12} className={classes.right}>
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: "80vh" }}
          >
            {children}
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}
export default AuthLayout
