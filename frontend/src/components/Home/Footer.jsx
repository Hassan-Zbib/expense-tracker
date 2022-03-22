import { Paper, Typography } from "@mui/material"
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(theme => ({
    paper: {
        padding: '5px',
        backgroundColor: theme.palette.background.main,
        color: "white"
      },
      footer: {
        marginTop: '5px',
      }
}))



const Footer = () => {

const classes = useStyles()

  return (
      <div className={classes.footer}>
      <Paper className={classes.paper} square elevation={0}>
      <Typography variant="h5" component="h3">
          React App with Material UI
        </Typography>
        <Typography component="p">
          @2018 All right reserved
        </Typography>
        
      </Paper>
      </div>
  )
}

export default Footer

