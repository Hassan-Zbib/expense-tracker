import { Card, CardContent, Grid, Typography } from "@mui/material"

const Stats = (props) => {

  const { data } = props

  return (
    <Grid container direction="row" alignItems="center" justifyContent="space-evenly" sx={{ padding: '30px'}}>
      <Card>
      <CardContent>
        <Typography variant="h5" textAlign="center" >
            Registered NGOs
          </Typography>

          <Typography variant="h4" textAlign="center" color="black" mt='20%'>
           {data.usersCount}
          </Typography>

        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h5" textAlign="center" >
          Tracked Income
          </Typography>

          <Typography variant="h4" textAlign="center" color="black" mt='20%'>
           $ {data.totalIncome}
          </Typography>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h5" textAlign="center" >
          Tracked Expenses
          </Typography>

          <Typography variant="h4" textAlign="center" color="black" mt='20%'>
           $ {data.totalExpenses}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  )
}
export default Stats
