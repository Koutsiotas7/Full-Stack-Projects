import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from '../api/axios';
import "./Login.css";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const response = await api.post(
                "/users/login",
                {email, password}
            );

            const token = response.data.token;

            localStorage.setItem("token", token);
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.message || "Login has failed!");
        }
    };

    return(
        <>
            <h2>Login</h2>
            {error && <p style={{ color: "red" }}>{error} </p>}

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email: </label>
                    <input 
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                 <div>
                    <label>Password: </label>
                    <input 
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit">Login</button>
            </form>
        </>
    );
}

export default Login;