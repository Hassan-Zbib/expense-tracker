import React from "react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Bar } from "react-chartjs-2"
import { useTheme } from "@mui/styles"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const BarChart = (props) => {

  const theme = useTheme()

  const { title, dataSet } = props

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: title,
      },
    },
  }


  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Dataset 2",
        data: [8, 9, 0, 12, 34, 32, 66],
        backgroundColor: theme.palette.primary.main,
      },
    ],
  }

  return <Bar options={options} data={data} />
}

export default BarChart
