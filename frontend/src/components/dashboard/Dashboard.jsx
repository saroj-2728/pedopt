import { useState } from "react"
import { Link } from 'react-router'
import TakePet from "../adopt/TakePet"
import Logo from "../Logo"
import '../../styles/dashboard.css'
import { FaArrowRightLong } from "react-icons/fa6";

const Dashboard = () => {

  const [filters, setFilters] = useState({
    animalType: '',
    breed: '',
    age: '',
    gender: ''
  })

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters({
      ...filters,
      [name]: value
    })
  }

  return (
    <div>
      <div className="dashboard-header">
        <Logo isInline={true} />
        <div className="dashboard-header-right">
          <div className="dashboard-filters">

            <div className="dashboard-filter">
              <label htmlFor="animal-type">Animal Type</label>
              <select
                id="animal-type"
                name="animalType"
                className="animal-type-select"
                value={filters.animalType}
                onChange={handleFilterChange}
              >
                <option value="">Any</option>
                <option value="dog">Dogs</option>
                <option value="cat">Cats</option>
                <option value="bird">Birds</option>
                <option value="rabbit">Rabbits</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="dashboard-filter">
              <label htmlFor="animal-breed">Breed</label>
              <select
                id="animal-breed"
                name="breed"
                className="breed-select"
                value={filters.breed}
                onChange={handleFilterChange}
              >
                <option value="">Any</option>
                <option value="labrador">Labrador</option>
                <option value="german-shepherd">German Shepherd</option>
                <option value="persian">Persian</option>
                <option value="siamese">Siamese</option>
                <option value="parakeet">Parakeet</option>
                <option value="cockatiel">Cockatiel</option>
              </select>
            </div>

            <div className="dashboard-filter">
              <label htmlFor="animal-age">Age</label>
              <select
                name="age"
                id="animal-age"
                className="age-select"
                value={filters.age}
                onChange={handleFilterChange}
              >
                <option value="">Any</option>
                <option value="1">Less than a year</option>
                <option value="5">Less than 5 years</option>
                <option value="10">Less than 10 years</option>
                <option value="20">Less than 20 years</option>
              </select>
            </div>

            <div className="dashboard-filter">
              <label htmlFor="animal-gender">Gender</label>
              <select
                id="animal-gender"
                name="gender"
                className="gender-select"
                value={filters.gender}
                onChange={handleFilterChange}
              >
                <option value="">Any</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>
          <Link
            to="/my-pet-list"
            className="offer-pet-link">
            My Pet List
          </Link>
          <Link
            to="/offer-pet"
            className="offer-pet-link">
            Offer a Pet <FaArrowRightLong />
          </Link>
        </div>
      </div>

      <TakePet filters={filters} />
    </div>
  )
}

export default Dashboard
