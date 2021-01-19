/* eslint-disable no-useless-escape */
import React, { useState } from "react";
import { withRouter, Switch, Route, useRouteMatch } from "react-router-dom";
import useAPI from "./../../api/useAPI";
import RegPage1 from "./register/RegPage1";
import RegPage2 from "./register/RegPage2";
import RegPage3 from "./register/RegPage3";
import { useHistory } from "react-router-dom";
import { Container, CssBaseline } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from '@material-ui/core';

const Register = (props) => {
    const classes = useStyles();
    const [state, setState] = useState({
        firstName: "",
        lastName: "",
        dodin: "",
        email: "",
        phone: "",
        association: 0,
        unit: "",
        username: "",
        password: "",
    });
    let api = useAPI();
    let history = useHistory();

    const sendToState = (values) => {
        setState({ ...state, ...values });
    };

    const submitRegistration = async () => {
        if (
            state.firstName &&
            state.lastName &&
            state.dodin &&
            state.email &&
            state.phone &&
            state.association &&
            state.username &&
            state.password
        ) {
            const body = {
                dodin: state.dodin,
                firstName: state.firstName,
                lastName: state.lastName,
                associationId: state.association,
                email: state.email,
                phone: parseInt(state.phone.replaceAll(/[\+\(\)-\s]/g, "")),
                unit: state.unit,
                username: state.username,
                password: state.password,
            };
            console.log(body);
            const options = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            };
            fetch(`${api.host}${api.path}/register/self`, options)
                .then((res) => res.json())
                .then((res) => {
                    if (res.status === 200) {
                        history.replace("/registered");
                    } else {
                        alert(res.message);
                    }
                });
        } else {
            alert(
                "Please ensure all fields are filled in. Check all pages as necessary."
            );
        }
    };

    let { path } = useRouteMatch();
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h2">Registration</Typography>
                <Switch>
                    <Route exact path={path}>
                        <RegPage1
                            path={path}
                            sendToState={sendToState}
                            firstName={state.firstName}
                            lastName={state.lastName}
                            dodin={state.dodin}
                            email={state.email}
                            phone={state.phone}
                        />
                    </Route>
                    <Route path={`${path}/2`}>
                        <RegPage2
                            path={path}
                            sendToState={sendToState}
                            association={state.association}
                            unit={state.unit}
                        />
                    </Route>
                    <Route path={`${path}/3`}>
                        <RegPage3
                            path={path}
                            sendToState={sendToState}
                            username={state.username}
                            password={state.password}
                            submitRegistration={submitRegistration}
                        />
                    </Route>
                </Switch>
            </div>
        </Container>
    );
};

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
}));

export default withRouter(Register);
