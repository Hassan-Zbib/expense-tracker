import { Fab, Zoom, useScrollTrigger, Box } from "@mui/material"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import Navbar from "../components/Home/Navbar"
import Footer from "../components/Home/Footer"
import Ngos from "../components/Home/Ngos"
import Stats from "../components/Home/Stats"
import Welcome from "../components/Home/Welcome"

function ScrollTop(props) {
  const { children, window } = props
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  })

  const handleClick = (event) => {
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

const Home = () => {
  return (
    <>
      <Navbar  />
      <Welcome id="back-to-top-anchor"/>
      <Stats />
      <Ngos />
      <Footer />
      {/* <ScrollTop >
        <Fab color="primary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop> */}
    </>
  )
}
export default Home
