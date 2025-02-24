import { useState, useRef } from "react"
import { Link } from 'react-router'
import Logo from "../Logo"
import '../../styles/offer-pet.css'
import { FaArrowLeftLong } from "react-icons/fa6";

const OfferPet = () => {

  const SERVER_ROOT = import.meta.env.VITE_SERVER_ROOT;

  const user = JSON.parse(localStorage.getItem('user'))

  const [petDetails, setPetDetails] = useState({
    ownerName: '',
    phoneNumber: '',
    breed: '',
    age: '',
    gender: '',
    type: '',
    description: '',
  })

  const [petImage, setPetImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [errors, setErrors] = useState(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const petImageRef = useRef()

  const MAX_FILE_SIZE = 1024 * 1024 * 5

  const validateForm = () => {
    const errors = {}
    if (!petDetails.ownerName.trim()) errors.ownerName = "Owner's Name is required"
    if (!petDetails.phoneNumber.trim()) {
      errors.phoneNumber = "Owner's Phone number is required";
    } else if (!/^\d{10}$/.test(petDetails.phoneNumber)) {
      errors.phoneNumber = "Invalid phone number format";
    }

    if (!petDetails.breed.trim()) errors.breed = "Pet Breed is required"
    if (!petDetails.age.trim()) errors.age = "Pet Age is required"
    if (!petDetails.gender.trim()) errors.gender = "Pet Gender is required"
    if (!petDetails.type.trim()) errors.type = "Pet Type is required"
    if (!petDetails.description.trim()) errors.description = "Pet Description is required"
    if (!petImage) {
      errors.propertyImage = "Pet image is required";
    } else {
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
      if (!allowedTypes.includes(petImage.type)) {
        errors.propertyImage = "Only JPG, JPEG, or PNG images are allowed";
      }

      if (petImage.size > MAX_FILE_SIZE) {
        errors.propertyImage = "Image size must be 5MB or less";
      }
    }

    return Object.keys(errors).length ? errors : null
  }

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

  const handleSubmit = async (e) => {
    e.preventDefault()

    setErrors(null)
    const errors = validateForm()
    if (errors) {
      setErrors(errors || null)
      return
    }

    const formData = new FormData()
    Object.entries(petDetails).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append("petImage", petImage);
    formData.append("userId", user.id)

    try {
      setLoading(true)
      const response = await fetch(`${SERVER_ROOT}/api/pets/offerPet`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (!data.success) {
        setErrors(prev => ({
          ...prev,
          serverError: data.error || data.message
        }));
        console.error(data.error || data.message)
        return
      }

      setMessage("Pet offered for adoption successfully") //❌
      setPetDetails({
        ownerName: '',
        phoneNumber: '',
        breed: '',
        age: '',
        gender: '',
        type: '',
        description: '',
      })
      setPetImage(null)
      setImagePreview(null)
      setLoading(false)
      setTimeout(() => {
        setMessage("")
      }, 2000);
    }
    catch (error) {
      setErrors(prev => ({
        ...prev,
        serverError: "An error occured. Please try again."
      }))
      console.error(error)
    }
    finally {
      setLoading(false)
    }
  }


  return (
    <div>
      <Logo />
      <div className="op-container">
        <h1 style={{ alignSelf: "center" }}>Offer a Pet</h1>
        <div className="op-container-header">
          <Link to="/dashboard" className="op-back-link"> <FaArrowLeftLong /> Back to Dashboard</Link>
        </div>

        <div className="op-form-container">
          <form
            onSubmit={handleSubmit}
            className="op-form"
          >
            <p className="op-form-title">Enter pet details</p>
            <div className="op-form-tab">
              <div className="op-form-div">
                <div className="op-form-group">
                  <input
                    type="text"
                    name="ownerName"
                    value={petDetails.ownerName}
                    onChange={handleChange}
                    placeholder="Owner's Name"
                  />
                  {errors && errors.ownerName &&
                    <p className="error-message">{errors.ownerName}</p>
                  }
                </div>
                <div className="op-form-group">
                  <input
                    type="number"
                    name="phoneNumber"
                    value={petDetails.phoneNumber}
                    onChange={handleChange}
                    placeholder="Owner's Phone Number"
                  />
                  {errors && errors.phoneNumber &&
                    <p className="error-message">{errors.phoneNumber}</p>
                  }
                </div>
                <div className="op-form-group">
                  <input
                    type="text"
                    name="breed"
                    value={petDetails.breed}
                    onChange={handleChange}
                    placeholder="Pet Breed"
                  />
                  {errors && errors.breed &&
                    <p className="error-message">{errors.breed}</p>
                  }
                </div>
                <div className="op-form-group">
                  <input
                    type="number"
                    name="age"
                    value={petDetails.age}
                    onChange={handleChange}
                    placeholder="Pet Age"
                  />
                  {errors && errors.age &&
                    <p className="error-message">{errors.age}</p>
                  }
                </div>
                <div className="op-form-group">
                  <select
                    name="gender"
                    value={petDetails.gender}
                    onChange={handleChange}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                  {errors && errors.gender &&
                    <p className="error-message">{errors.gender}</p>
                  }
                </div>
                <div className="op-form-group">
                  <input
                    type="text"
                    name="type"
                    value={petDetails.type}
                    onChange={handleChange}
                    placeholder="Pet Type"
                  />
                  {errors && errors.type &&
                    <p className="error-message">{errors.type}</p>
                  }
                </div>
              </div>

              <div className="op-form-div">
                <div className="op-form-group">
                  <label style={{ alignSelf: "flex-start", fontSize: "20px", fontWeight: "500" }} htmlFor="pet-description">Pet Description</label>
                  <textarea
                    name="description"
                    rows="4"
                    value={petDetails.description}
                    onChange={handleChange}
                    placeholder="Describe your pet here..."
                    id="pet-description"
                    style={{ resize: "none" }}
                  />
                  {errors && errors.description &&
                    <p className="error-message">{errors.description}</p>
                  }
                </div>
                <div className="op-form-group">
                  <label style={{ alignSelf: "flex-start", fontSize: "20px", fontWeight: "500" }} htmlFor="pet-image">Pet Photo</label>
                  <input
                    type="file"
                    name="petImage"
                    ref={petImageRef}
                    onChange={handleImageChange}
                    accept="image/*"
                    id="pet-image"
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
                  {errors && errors.propertyImage &&
                    <p className="error-message">{errors.propertyImage}</p>
                  }
                </div>
              </div>
            </div>
            {message &&
              <p style={{ marginBottom: "10px" }} className="success-message">{message}</p>
            }
            {errors && errors.serverError &&
              <p style={{ marginBottom: "10px", alignSelf: "center" }} className="error-message">{errors.serverError}</p>
            }
            <button
              type="submit"
              className="op-submit-btn"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default OfferPet
