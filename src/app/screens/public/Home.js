import React from "react";
import { Link } from "react-router-dom";
import useAuth from "./../../auth/useAuth";
import { Button } from "@material-ui/core";

const Home = () => {
    const auth = useAuth();
    // auth.validate();
    const checkCookie = async () => {
        fetch("http://localhost:3500/gss/api/checkcookie")
            .then((res) => res.json())
            .then((res) => alert(res));
    };
    return (
        <div>
            <h2 className="intro-text">Welcome!</h2>
        </div>
    );
};

export default Home;
