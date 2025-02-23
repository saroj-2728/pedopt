import { Link, useNavigate } from "react-router"
import { useState } from "react"
import Logo from "../Logo"
import '../../styles/auth.css'
import PrimaryImage from "../PrimaryImage"

const Signup = () => {

    const SERVER_ROOT = import.meta.env.VITE_SERVER_ROOT;
    const navigate = useNavigate()

    const [user, setUser] = useState({
        name: '',
        username: '',
        address: '',
        phone: '',
        password: '',
        confirmPassword: ''
    })

    const [errors, setErrors] = useState({})
    const [message, setMessage] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const validateForm = () => {
        const errors = {}
        if (!user.name) errors.name = 'Name is required'
        if (!user.username) errors.username = 'Username is required'
        if (!user.address) errors.address = 'Address is required'
        if (!user.phone) errors.phone = 'Phone number is required'
        if (!user.password) errors.password = 'Password is required'
        if (user.username.length < 3) errors.username = 'Username must be at least 3 characters long'
        if (user.password.length < 6) errors.password = 'Password must be at least 6 characters long'
        if (!user.confirmPassword) errors.confirmPassword = 'Confirm Password is required'
        if (user.password !== user.confirmPassword) errors.confirmPassword = 'Passwords do not match'

        return Object.keys(errors).length === 0 ? null : errors
    }

    const handleChange = (e) => {
        setUser(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        setErrors({})
        const errors = validateForm()
        if (errors) {
            setErrors(errors)
            return
        }

        try {
            setIsLoading(true)

            const response = await fetch(`${SERVER_ROOT}/api/auth/sign-up`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })
            const data = await response.json()

            if (!data.success) {
                setErrors(prev => ({
                    ...prev,
                    serverError: data.error || data.message
                }));
                return
            }

            setMessage("Sign up successful. Please log in to continue")
            setTimeout(() => {
                navigate('/login')
            }, 2000);
            // localStorage.setItem('user', JSON.stringify(data.user));
            // navigate('/dashboard')
        }
        catch (error) {
            console.error('An error occurred', error)
            setErrors(prev => ({
                ...prev,
                serverError: 'Failed to sign up. Please try again'
            }))
        }
        finally {
            setIsLoading(false)
        }
    }

    return (
        <div>
            <Logo />
            <div className="auth-container">
                <div className="signup-options">
                    <h1>Sign up</h1>
                    <form
                        onSubmit={handleSubmit}
                        className="auth-form"
                        style={{ maxWidth: "235px" }}
                    >
                        <input
                            name="name"
                            value={user.name}
                            onChange={handleChange}
                            type="text"
                            placeholder="Name"
                        />
                        {errors.name &&
                            <p className="error-message">{errors.name}</p>
                        }
                        <input
                            name="username"
                            value={user.username}
                            onChange={handleChange}
                            type="text"
                            placeholder="Username"
                        />
                        {errors.username &&
                            <p className="error-message">{errors.username}</p>
                        }
                        <input
                            name="address"
                            value={user.address}
                            onChange={handleChange}
                            type="text"
                            placeholder="Address"
                        />
                        {errors.address &&
                            <p className="error-message">{errors.address}</p>
                        }
                        <input
                            name="phone"
                            value={user.phone}
                            onChange={handleChange}
                            type="text"
                            placeholder="Phone number"
                        />
                        {errors.phone &&
                            <p className="error-message">{errors.phone}</p>
                        }
                        <input
                            name="password"
                            value={user.password}
                            onChange={handleChange}
                            type="password"
                            placeholder="Password"
                        />
                        {errors.password &&
                            <p className="error-message">{errors.password}</p>
                        }
                        <input
                            name="confirmPassword"
                            value={user.confirmPassword}
                            onChange={handleChange}
                            type="password"
                            placeholder="Confirm Password"
                        />
                        {errors.confirmPassword &&
                            <p className="error-message">{errors.confirmPassword}</p>
                        }
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="auth-btn"
                        >
                            {isLoading ? "Signing up..." : "Sign up"}
                        </button>
                        {message &&
                            <p style={{marginTop: "5px"}} className="success-message">{message}</p>
                        }
                        <Link
                            to="/login"
                            className="signup-to-login"
                        >
                            Already have an account? Log in
                        </Link>
                    </form>
                </div>
                <PrimaryImage />
            </div>
        </div>
    )
}

export default Signup
