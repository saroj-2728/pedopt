import { useState, useEffect } from "react"
import { useNavigate } from "react-router"
import Logo from "../Logo"
import PetCard from "../PetCard"
import '../../styles/pet-list.css'

const PetList = () => {

  const SERVER_ROOT = import.meta.env.VITE_SERVER_ROOT
  const navigate = useNavigate()

  const user = JSON.parse(localStorage.getItem('user'))

  const [pets, setPets] = useState([])
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const fetchAvailablePets = async () => {
      try {
        setIsFetching(true);
        const response = await fetch(`${SERVER_ROOT}/api/pets/getPetByUser/${user.id}`);
        const data = await response.json();
        setPets(data.pets);
        console.log(data.pets);
      }
      catch (error) {
        console.error(error);
      }
      finally {
        setIsFetching(false)
      }
    }
    fetchAvailablePets();
  }, [SERVER_ROOT, user.id])

  const handlePetDelete = async (petId) => {
    try {
      const response = await fetch(`${SERVER_ROOT}/api/pets/delete/${petId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();

      if (data.success) {
        setPets(pets.filter(pet => pet.id !== petId));
      }
      else {
        console.error(data.error || data.message || 'Failed to delete pet');
      }
    }
    catch (error) {
      console.error('Error deleting pet:', error);
    }
  };

  const handlePetEdit = (petId) => {
    console.log('Edit pet:', petId);
    navigate(`/offer-pet`, {
      state: {
        isUpdating: true,
        petDetails: pets.find(pet => pet.id === petId)
      }
    });
  }

  return (
    <div>
      <Logo />
      <div className="pet-list-container">
        <h1>My Pets on adoption</h1>
        <main className='pet-list-main'>
          <div className="pet-card-container">
            {isFetching ?
              <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                Loading. Please wait...
              </div>
              :
              pets?.length === 0 ?
                <div style={{ textAlign: 'center', marginTop: '2rem', width: '100%' }}>
                  No pets found
                </div>
                :
                pets.map(pet => (
                  <PetCard
                    key={pet.id}
                    onClick={() => ""}
                    petDetails={pet}
                    showTools={true}
                    onEdit={handlePetEdit}
                    onDelete={handlePetDelete}
                  />
                ))
            }
          </div>
        </main>
      </div>
    </div>
  )
}

export default PetList
