import { Link } from "react-router-dom";
import useAuth from "./../../auth/useAuth";

const Navigation = () => {
    let auth = useAuth();
    return (
        <div>
            <header className="App-header">Garisson Scheduler System</header>
            {auth.user ? (
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/dashboard">Dashboard</Link>
                        </li>
                        <li>
                            <Link to="/" onClick={auth.signout}>Logout</Link>
                        </li>
                    </ul>
                </nav>
            ) : (
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/register">Register</Link>
                        </li>
                    </ul>
                </nav>
            )}
        </div>
    );
};

export default Navigation;
