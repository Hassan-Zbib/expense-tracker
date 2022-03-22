import Navbar from "../components/Home/Navbar"
import Footer from "../components/Home/Footer"
import Ngos from "../components/Home/Ngos"
import Stats from "../components/Home/Stats"
import Welcome from "../components/Home/Welcome"

const Home = () => {
  return (
    <>
      <Navbar />
      <Welcome />
      <Stats />
      <Ngos />
      <Footer />
    </>
  )
}
export default Home
