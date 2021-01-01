import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import useAuth from "./../../auth/useAuth";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button, FormControlLabel, Switch } from "@material-ui/core";

const Login = () => {
    let history = useHistory();
    let location = useLocation();
    let auth = useAuth();
    let { from } = location.state || { from: { pathname: "/" } };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const useMountEffect = (func) => useEffect(func, []);

    let login = () => {
        auth.signin(() => {
            history.replace(from);
        });
    };
    let forgotPassword = () => {
        history.push("/forgot");
    };
    useMountEffect(() => {
        let validate = () => {
            auth.validate(() => {
                history.replace(from);
            });
        };
        validate();
    });

    return (
        <div>
            <h2>Login</h2>
            <TextField
                required
                id="username"
                name="username"
                type="text"
                label="Username"
                variant="outlined"
                value={auth.username}
                onChange={(e) => auth.setUsername(e.target.value)}
            />
            <TextField
                required
                id="password"
                name="password"
                type="password"
                label="Password"
                variant="outlined"
                value={auth.password}
                onChange={(e) => auth.setPassword(e.target.value)}
            />
            <FormControlLabel
                control={
                    <Switch
                        checked={auth.remember}
                        onChange={(e) => auth.setRemember(e.target.checked)}
                        name="remember"
                        id="remember"
                        color="primary"
                    />
                }
                label="Remeber Login"
            />
            <Button variant="contained" color="primary" onClick={login}>
                Login
            </Button>
            <Button
                variant="contained"
                color="secondary"
                onClick={forgotPassword}
            >
                Forgot Username/Password
            </Button>
        </div>
    );
};

export default Login;
