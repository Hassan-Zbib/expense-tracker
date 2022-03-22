import { Paper, Container, Typography, Grid, Button } from "@mui/material"
import { Link } from "react-router-dom"

const Welcome = () => {
  return (
    <Paper>
      <Container maxWidth="true">
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
          spacing={0}
          sx={{ minHeight: "90vh" }}
        >
          <Typography variant="h6" >
            NGO EXPENSE TRACKER
          </Typography>
          <Typography variant="h2" textAlign='center'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit
          </Typography>
          <Button
                component={Link}
                to='/SignUp'
                fullWidth={false}
                variant="contained"
              >
                SIGN UP
              </Button>
        </Grid>
      </Container>
    </Paper>
  )
}

export default Welcome
