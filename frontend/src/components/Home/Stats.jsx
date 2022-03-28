import { Card, CardContent, Grid, Typography } from "@mui/material"
import BarChart from "../BarChart"

const Stats = (props) => {
  const { data } = props

  return (
    <>
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="space-evenly"
        sx={{ padding: "30px" }}
        spacing={2}
      >
        <Grid item md={3} xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h5" textAlign="center">
                Registered NGOs
              </Typography>

              <Typography
                variant="h4"
                textAlign="center"
                color="black"
                mt="20%"
              >
                {data.usersCount}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item md={3} xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h5" textAlign="center">
                Tracked Income
              </Typography>

              <Typography
                variant="h4"
                textAlign="center"
                color="black"
                mt="20%"
              >
                $ {data.totalIncome}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item md={3} xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h5" textAlign="center">
                Tracked Expenses
              </Typography>

              <Typography
                variant="h4"
                textAlign="center"
                color="black"
                mt="20%"
              >
                $ {data.totalExpenses}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Typography variant="h5" textAlign="center">
        GENERAL RECODED STATS
      </Typography>
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="center"
        spacing={2}
        sx={{ padding: "30px" }}
      >
        <Grid item md={6} xs={12}>
          <BarChart title="Income Monthly Report" />
        </Grid>

        <Grid item md={6} xs={12}>
          <BarChart title="Expenses Monthly Report" />
        </Grid>
      </Grid>
    </>
  )
}
export default Stats
