import { Fab, Zoom, useScrollTrigger, Box } from "@mui/material"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import Navbar from "../components/Home/Navbar"
import Footer from "../components/Home/Footer"
import Ngos from "../components/Home/Ngos"
import Stats from "../components/Home/Stats"
import Welcome from "../components/Home/Welcome"
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import PropTypes from "prop-types"

function ScrollTop(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100
  });

  const handleClick = event => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    )

    if (anchor) {
      anchor.scrollIntoView({
        behavior: "smooth",
        block: "center",
      })
    }
  }

  return (
    <Zoom in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Zoom>
  )
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired
};

const Home = () => {

  const { user } = useSelector(
    (state) => state.auth
  )

  if( user ) {
    return <Navigate to="/Dashboard" replace />
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
