import React from "react";
import { Link } from "react-router-dom";
import useAuth from "./../../auth/useAuth";
import { Button } from "@material-ui/core";

const Home = () => {
    const auth = useAuth();
    // auth.validate();

    return (
        <div>
            <h2 className="intro-text">Welcome!</h2>
        </div>
    );
};

export default Home;
