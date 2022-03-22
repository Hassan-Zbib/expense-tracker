import { Paper, Typography } from "@mui/material"


const Footer = () => {

  return (
      <Paper sx={{ marginTop: '5px' }} >
      <Typography variant="h5" component="h3">
          React App with Material UI
        </Typography>
        <Typography component="p">
          @2018 All right reserved
        </Typography>
        
      </Paper>
  )
}

export default Footer

