import { Divider, Grid, Paper, Typography } from "@mui/material"
import { makeStyles } from "@mui/styles"

const useStyles = makeStyles((theme) => ({
  footer:{
    padding: "10px 30px",
    color: theme.palette.background.darker,
    fontSize: "small",
  },
  divider: {
    backgroundColor: theme.palette.background.darker,
  },
  bottom:{
    padding: "10px 30px",
    color: theme.palette.background.darker,
    fontSize: "small",
    marginLeft:'8%'
  }
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
        <Grid item md={1} xs={12} >
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

        <Grid item md={6} xs={12} >
          <Typography component="p" >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum
            dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit
            amet, consectetur adipiscing elit Lorem ipsum dolor sit amet,
            consectetur adipiscing elit
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
