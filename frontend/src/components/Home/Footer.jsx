import { Divider, Grid, Paper, Typography } from "@mui/material"
import { makeStyles } from "@mui/styles"

const useStyles = makeStyles((theme) => ({
  footer: {
    padding: "10px 30px",
    color: theme.palette.background.darker,
    fontSize: "small",
  },
  divider: {
    backgroundColor: theme.palette.background.darker,
  },
  bottom: {
    padding: "10px 30px",
    color: theme.palette.background.darker,
    fontSize: "small",
    marginLeft: "8%",
  },
}))

const Footer = () => {
  const classes = useStyles()

  return (
    <Paper id="aboutus">
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="flex-start"
        spacing={0}
        className={classes.footer}
      >
        <Grid item md={1} xs={12}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bolder",
              fontStyle: "italic",
              color: "white",
            }}
          >
            NET
          </Typography>
        </Grid>

        <Grid item md={6} xs={12}>
          <Typography component="p">
            Presented on the NET landing page, an interface that enables users
            to navigate quickly and efficiently between the publicized
            statistics that our platform has captured over time. Along with
            great transparency , the brand also eflects a well-balanced strategy
            that serves many organizations in their financial management.
          </Typography>
        </Grid>
      </Grid>

      <Divider light={true} className={classes.divider} />
      <Typography component="p" className={classes.bottom}>
        © 2021-2022 All Rights Reserved.
      </Typography>
    </Paper>
  )
}

export default Footer
