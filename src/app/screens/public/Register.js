/* eslint-disable no-useless-escape */
import React from "react";
import { withRouter, Switch, Route } from "react-router-dom";
import RegPage1 from "./register/RegPage1";
import RegPage2 from "./register/RegPage2";
import RegPage3 from "./register/RegPage3";

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            dodin: "",
            email: "",
            phone: "",
            association: 0,
            unit: "",
            username: "",
            password: "",
        };
    }
    sendToState = (values) => {
        this.setState(values);
    };

    submitRegistration = async () => {
        if (
            this.state.firstName &&
            this.state.lastName &&
            this.state.dodin &&
            this.state.email &&
            this.state.phone &&
            this.state.association &&
            this.state.username &&
            this.state.password
        ) {
            const body = {
                dodin: this.state.dodin,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                associationId: this.state.association,
                email: this.state.email,
                phone: parseInt(
                    this.state.phone.replaceAll(/[\+\(\)-\s]/g, "")
                ),
                unit: this.state.unit,
                username: this.state.username,
                password: this.state.password,
            };
            console.log(body);
            const options = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            };
            fetch("http://localhost:3500/gss/api/register/self", options)
                .then((res) => res.json())
                .then((res) => {
                    if (res.status === 200) {
                        this.props.history.push('/registered');
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

    render() {
        let { path } = this.props.match;
        return (
            <div>
                <h2>Registration</h2>
                <Switch>
                    <Route exact path={path}>
                        <RegPage1
                            path={path}
                            sendToState={this.sendToState}
                            firstName={this.state.firstName}
                            lastName={this.state.lastName}
                            dodin={this.state.dodin}
                            email={this.state.email}
                            phone={this.state.phone}
                        />
                    </Route>
                    <Route path={`${path}/2`}>
                        <RegPage2
                            path={path}
                            sendToState={this.sendToState}
                            association={this.state.association}
                            unit={this.state.unit}
                        />
                    </Route>
                    <Route path={`${path}/3`}>
                        <RegPage3
                            path={path}
                            sendToState={this.sendToState}
                            username={this.state.username}
                            password={this.state.password}
                            submitRegistration={this.submitRegistration}
                        />
                    </Route>
                </Switch>
            </div>
        );
    }
}

export default withRouter(Register);
