import { Paper, Container, Typography } from "@mui/material"


const Welcome = () => {

  return (
    <Paper >
      <Container maxWidth="true" sx={{ minHeight: '90vh'}}>
        <Typography variant="h5" component="h3">
          React App with Material UI
        </Typography>
      </Container>
    </Paper>
  )
}

export default Welcome
