/* eslint-disable react/prop-types */
import '../styles/take-pet.css'

const PetCard = ({ petDetails, onClick, showTools = false, onEdit, onDelete }) => {

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
        <div className='pet-card-edit'>
          <p>{petDetails.breed}</p>
          {showTools &&
            <button
              onClick={() => onEdit(petDetails.id)}
            >
              Edit
            </button>
          }
        </div>
        <div className='pet-card-delete'>
          <p>{petDetails.age} years old</p>
          {showTools &&
            <button
              onClick={() => onDelete(petDetails.id)}
            >
              Delete
            </button>
          }
        </div>
      </div>
    </div>
  )
}

export default PetCard
