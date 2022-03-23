import { Fab } from "@mui/material"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import Navbar from "../components/Home/Navbar"
import Footer from "../components/Home/Footer"
import Ngos from "../components/Home/Ngos"
import Stats from "../components/Home/Stats"
import Welcome from "../components/Home/Welcome"
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import ScrollTop from '../components/ScrollTop'

const Home = () => {

  const { user } = useSelector(
    (state) => state.auth
  )

  if( user ) {
    return <Navigate to="/dashboard" replace />
  }
  
  return (
    <>
      <Navbar id="back-to-top-anchor"/>
      <Welcome />
      <Stats />
      <Ngos />
      <Footer />
      <ScrollTop>
        <Fab color="primary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </>
  )
}
export default Home
