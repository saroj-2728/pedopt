/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { IoMdClose } from "react-icons/io";
import PetCard from '../PetCard';
import '../../styles/take-pet.css'

const TakePet = ({ filters }) => {

  const SERVER_ROOT = import.meta.env.VITE_SERVER_ROOT

  const [showSidePanel, setShowSidePanel] = useState(false);
  const [pets, setPets] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);

  useEffect(() => {
    const fetchAvailablePets = async () => {
      try {
        setIsFetching(true);
        const response = await fetch(`${SERVER_ROOT}/api/pets/getAvailablePets`);
        const data = await response.json();
        setPets(data.pets);
      }
      catch (error) {
        console.error(error);
      }
      finally {
        setIsFetching(false)
      }
    }
    fetchAvailablePets();
  }, [SERVER_ROOT])

  const handleViewPanel = (petId) => {
    setShowSidePanel(true);
    const pet = pets.find(pet => pet.id === petId);
    setSelectedPet(pet);
  }

  const filterPets = (pets) => {
    return pets.filter(pet => {
      
      const matchesType = !filters.animalType ||
      pet.type.toLowerCase() === filters.animalType.toLowerCase();

      const matchesBreed = !filters.breed ||
      pet.breed.toLowerCase() === filters.breed.toLowerCase();

      const matchesGender = !filters.gender ||
      pet.gender.toLowerCase() === filters.gender.toLowerCase();

      const matchesAge = !filters.age || pet.age <= filters.age;

      return matchesType && matchesBreed && matchesAge && matchesGender;
    });
  };

  const filteredPets = filterPets(pets);

  return (
    <div className="take-pet-container">
      <h1>Adoptable Pets</h1>
      <main className='take-pet-main'>
        <div
          className="pet-card-container"
          style={{ width: showSidePanel ? '50%' : '100%' }}
        >
          {isFetching ?
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              Loading. Please wait... 
            </div>
            :
            filteredPets.map(pet => (
              <PetCard key={pet.id} onClick={handleViewPanel} petDetails={pet} />
            ))
          }
        </div>

        {showSidePanel && selectedPet &&
          <div className="pet-side-panel">
            <button className="side-panel-close-btn" onClick={() => setShowSidePanel(false)}>
              <IoMdClose />
            </button>
            <div className="side-panel-image">
              <img src={selectedPet.petImage} alt="Pet" />
            </div>
            <div className="side-panel-info">
              <div className="side-panel-details">
                <h3>{selectedPet.breed}</h3>
                <div>
                  <p>{selectedPet.type}, {selectedPet.gender[0].toUpperCase() + selectedPet.gender.slice(1)}</p>
                  <p>{selectedPet.age} years old</p>
                </div>
              </div>
              <p className='side-panel-description'>
                {selectedPet.description}
              </p>
              <div className="side-panel-owner-info">
                <h4>Owner Details:</h4>
                <p>Name: {selectedPet.ownerName}</p>
                <p>Phone: {selectedPet.phoneNumber}</p>
              </div>
              <div className="adopt-btn-container">
                <button className="adopt-btn">Adopt</button>
              </div>
            </div>
          </div>
        }
      </main>
    </div>
  )
}

export default TakePet
