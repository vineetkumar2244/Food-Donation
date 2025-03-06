import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("donor");
    const navigate = useNavigate();

    const handleRegister = async () => {
        const response = await fetch("http://localhost:5000/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password, role }),
        });
        const data = await response.json();

        if (response.ok) {
            alert("Registration Successful");
            navigate("/login");
        } else {
            alert(data.message);
        }
    };

    return (
        <div className="auth">
            <h2>Register</h2>
            <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <select onChange={(e) => setRole(e.target.value)}>
                <option value="donor">Donor</option>
                <option value="ngo">NGO</option>
            </select>
            <button onClick={handleRegister}>Register</button>
        </div>
    );
};

export default Register;
