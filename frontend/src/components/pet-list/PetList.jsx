import { useState, useEffect } from "react"
import Logo from "../Logo"

const PetList = () => {

    const SERVER_ROOT = import.meta.env.VITE_SERVER_ROOT

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

  return (
    <div>
        <Logo />
    </div>
  )
}

export default PetList
