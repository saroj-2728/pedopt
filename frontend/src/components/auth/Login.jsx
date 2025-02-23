import { Link, useNavigate } from "react-router"
import { useState } from "react"
import Logo from "../Logo"
import PrimaryImage from "../PrimaryImage"
import "../../styles/auth.css"

const Login = () => {

    const SERVER_ROOT = import.meta.env.VITE_SERVER_ROOT;
    const navigate = useNavigate()

    const [user, setUser] = useState({
        username: "",
        password: ""
    })

    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    const validateForm = () => {
        const errors = {}
        if (!user.username) errors.username = "Username is required"
        if (!user.password) errors.password = "Password is required"
        if (user.username.length < 3) errors.username = "Username must be at least 3 characters"
        if (user.password.length < 6) errors.password = "Password must be at least 6 characters"
        return Object.keys(errors).length === 0 ? null : errors
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setUser(prev => ({
            ...prev,
            [name]: value
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
            setIsLoading(true);

            const response = await fetch(`${SERVER_ROOT}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })

            const data = await response.json();

            if (!data.success) {
                setErrors(prev => ({
                    ...prev,
                    serverError: data.error || data.message
                }));
                return
            }

            localStorage.setItem('user', JSON.stringify(data.user));
            navigate('/dashboard')
        }
        catch (error) {
            console.error(error);
            setErrors(prev => ({
                ...prev,
                serverError: 'Failed to sign in. Please try again'
            }))
        }
        finally {
            setIsLoading(false);
        }
    }

    return (
        <div>
            <Logo />
            <div className="auth-container">
                <div className="auth-options">
                    <h1>Log in</h1>
                    <form
                        onSubmit={handleSubmit}
                        className="auth-form"
                        style={{ maxWidth: "235px" }}
                    >
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
                            name="password"
                            value={user.password}
                            onChange={handleChange}
                            type="password"
                            placeholder="Password"
                        />
                        {errors.password &&
                            <p className="error-message">{errors.password}</p>
                        }
                        {errors.serverError &&
                            <p className="error-message">{errors.serverError}</p>
                        }
                        <button
                            type="submit"
                            className="auth-btn"
                            disabled={isLoading}
                        >
                            {isLoading ? "Logging in..." : "Log in"}
                        </button>
                        <Link
                            to="/sign-up"
                            className="login-to-register"
                        >
                            Don&apos;t have an account? Create one
                        </Link>
                    </form>
                </div>
                <PrimaryImage />
            </div>
        </div>
    )
}

export default Login
