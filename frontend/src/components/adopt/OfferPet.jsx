import { useState, useRef } from "react"
import Logo from "../Logo"
import '../../styles/offer-pet.css'

const OfferPet = () => {

  const [petDetails, setPetDetails] = useState({
    ownerName: '',
    phoneNumber: '',
    breed: '',
    age: '',
    gender: '',
    type: '',
    description: '',
    petImage: ''
  })

  const [petImage, setPetImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [errors, setErrors] = useState(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const petImageRef = useRef()

  const MAX_FILE_SIZE = 1024 * 1024 * 5

  const handleChange = (e) => {
    const { name, value } = e.target
    setPetDetails(prev => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPetImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };


  return (
    <div>
      <Logo />
      <div className="op-container">
        <h1>Offer a Pet</h1>
        <div className="op-form-container">
          <form
            action=""
            className="op-form"
          >
            <div className="op-form-div">
              <div className="op-form-group">
                <input
                  type="text"
                  name="ownerName"
                  value={petDetails.ownerName}
                  onChange={handleChange}
                  placeholder="Owner's Name"
                  required
                />
              </div>
              <div className="op-form-group">
                <input
                  type="number"
                  name="phoneNumber"
                  value={petDetails.phoneNumber}
                  onChange={handleChange}
                  placeholder="Owner's Phone Number"
                  required
                />
              </div>
              <div className="op-form-group">
                <input
                  type="text"
                  name="breed"
                  value={petDetails.breed}
                  onChange={handleChange}
                  placeholder="Pet Breed"
                  required
                />
              </div>
              <div className="op-form-group">
                <input
                  type="number"
                  name="age"
                  value={petDetails.age}
                  onChange={handleChange}
                  placeholder="Pet Age"
                  required
                />
              </div>
              <div className="op-form-group">
                <input
                  type="text"
                  name="gender"
                  value={petDetails.gender}
                  onChange={handleChange}
                  placeholder="Pet's Gender"
                  required
                />
              </div>
              <div className="op-form-group">
                <input
                  type="text"
                  name="type"
                  value={petDetails.type}
                  onChange={handleChange}
                  placeholder="Pet Type"
                  required
                />
              </div>
            </div>

            <div className="op-form-div">
              <div className="op-form-group">
              <label style={{alignSelf: "flex-start", fontSize: "20px", fontWeight: "500"}} htmlFor="pet-description">Pet Description</label>
                <textarea
                  name="description"
                  rows="4"
                  value={petDetails.description}
                  onChange={handleChange}
                  placeholder="Describe your pet here..."
                  id="pet-description"
                  required
                />
              </div>
              <div className="op-form-group">
                <label style={{alignSelf: "flex-start", fontSize: "20px", fontWeight: "500"}} htmlFor="pet-image">Pet Photo</label>
                <input
                  type="file"
                  name="petImage"
                  ref={petImageRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  id="pet-image"
                  required
                  hidden
                />
                <div
                  onClick={() => petImageRef.current.click()} className="op-pet-image-container"
                >
                    <img
                      src={imagePreview || '/images/fileImage.png'}
                      alt="Pet Image"
                    />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default OfferPet
