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
          <Typography variant="h6" sx={{ margin: "30px" }}>
            NGO EXPENSE TRACKER
          </Typography>
          <Typography variant="h2" textAlign="center" sx={{ margin: "30px" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit
          </Typography>
          <Button
            component={Link}
            to="/sign-up"
            fullWidth={false}
            variant="contained"
            sx={{ margin: "30px" }}
          >
            SIGN UP
          </Button>
        </Grid>
      </Container>
    </Paper>
  )
}

export default Welcome
