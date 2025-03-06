import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar">
            <h2>Food Redistribution System</h2>
            <div>
                <Link to="/login">
                    <button>Sign In</button>
                </Link>
                <Link to="/register">
                    <button>Sign Up</button>
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
