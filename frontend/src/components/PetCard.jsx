/* eslint-disable react/prop-types */
import '../styles/take-pet.css'

const PetCard = ({petDetails, onClick}) => {

  return (
    <div 
    className="pet-card"
    onClick={() => onClick(petDetails.id)}
    >
      <div className="pet-card-image">
        <img src={petDetails.petImage} alt="Pet" />
      </div>
      <div className="pet-card-info">
        <h3>{petDetails.type}</h3>
        <p>{petDetails.breed}</p>
        <p>{petDetails.age} years old</p>
      </div>
    </div>
  )
}

export default PetCard
