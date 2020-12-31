/* eslint-disable no-useless-escape */
import React, { useState } from "react";
import { withRouter, Switch, Route, useRouteMatch } from "react-router-dom";
import useAPI from "./../../api/useAPI";
import RegPage1 from "./register/RegPage1";
import RegPage2 from "./register/RegPage2";
import RegPage3 from "./register/RegPage3";
import { useHistory } from "react-router-dom";

const Register = (props) => {
    const [page1, setPage1] = useState({
        firstName: "",
        lastName: "",
        dodin: "",
        email: "",
        phone: "",
    });
    const [page2, setPage2] = useState({
        association: 0,
        unit: "",
    });
    const [page3, setPage3] = useState({
        username: "",
        password: "",
    });
    let api = useAPI();
    let history = useHistory();
    
    const sendToState1 = (values) => {
        setPage1(values);
    };
    const sendToState2 = (values) => {
        setPage2(values);
    };
    const sendToState3 = (values) => {
        setPage3(values);
    };

    const submitRegistration = async () => {
        if (
            page1.firstName &&
            page1.lastName &&
            page1.dodin &&
            page1.email &&
            page1.phone &&
            page2.association &&
            page3.username &&
            page3.password
        ) {
            const body = {
                dodin: page1.dodin,
                firstName: page1.firstName,
                lastName: page1.lastName,
                associationId: page2.association,
                email: page1.email,
                phone: parseInt(page1.phone.replaceAll(/[\+\(\)-\s]/g, "")),
                unit: page2.unit,
                username: page3.username,
                password: page3.password,
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
                        history.push("/registered");
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
        <div>
            <h2>Registration</h2>
            <Switch>
                <Route exact path={path}>
                    <RegPage1
                        path={path}
                        sendToState={sendToState1}
                        firstName={page1.firstName}
                        lastName={page1.lastName}
                        dodin={page1.dodin}
                        email={page1.email}
                        phone={page1.phone}
                    />
                </Route>
                <Route path={`${path}/2`}>
                    <RegPage2
                        path={path}
                        sendToState={sendToState2}
                        association={page2.association}
                        unit={page2.unit}
                    />
                </Route>
                <Route path={`${path}/3`}>
                    <RegPage3
                        path={path}
                        sendToState={sendToState3}
                        username={page3.username}
                        password={page3.password}
                        submitRegistration={submitRegistration}
                    />
                </Route>
            </Switch>
        </div>
    );
};

export default withRouter(Register);
