import React from "react";
import { Link } from "react-router-dom";
import useAuth from "./../../auth/useAuth";
import { Button, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const Home = () => {
    let auth = useAuth();
    // const classes = useStyles();
    let userMsg = auth.user ? "Hello User" : "Not logged in";
    let adminMsg = auth.admin ? "Hello Admin" : "Not logged in";
    console.log(auth);
    return (
        <Container>
            <h2 className="intro-text">Welcome!</h2>
            <p>{userMsg}</p>
            <p>{adminMsg}</p>
        </Container>
    );
};

// const useStyles = makeStyles((theme) => ({
// 
// }));

export default Home;
