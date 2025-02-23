import { Link } from 'react-router'
import Logo from "../Logo"
import PrimaryImage from '../PrimaryImage'
import '../../styles/home.css'

const Home = () => {
  return (
    <div>
      <Logo />
      <div className="home-container">
        <div className="home-options">
          <h1><i>Get your family <br /> a new member</i></h1>
          <div className="home-auth-options">
            <Link
              to="/login"
              className="home-auth-btn"
            >
              Log in
            </Link>
            <Link
              to="/sign-up"
              className="home-auth-btn"
            >
              Sign up
            </Link>
          </div>
        </div>
        <PrimaryImage />
      </div>
    </div>
  )
}

export default Home
