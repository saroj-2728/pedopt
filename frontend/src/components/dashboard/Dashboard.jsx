import { useState } from "react"
import Logo from "../Logo"
import '../../styles/dashboard.css'

const Dashboard = () => {

  const [filters, setFilters] = useState({
    animalType: '',
    breed: '',
    age: '',
    gender: ''
  })

  const handleFilterChange = (e) => {
    const { id, value } = e.target
    setFilters({
      ...filters,
      [id]: value
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
                className="animal-type-select"

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
                className="breed-select"
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
                id="animal-age"
                className="age-select"
              >
                <option value="">Any</option>
                <option value="baby">Baby</option>
                <option value="young">Young</option>
                <option value="adult">Adult</option>
                <option value="senior">Senior</option>
              </select>
            </div>

            <div className="dashboard-filter">
              <label htmlFor="animal-gender">Gender</label>
              <select
                id="animal-gender"
                className="gender-select"
              >
                <option value="">Any</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
