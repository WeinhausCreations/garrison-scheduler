/* eslint-disable no-useless-escape */
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button, Grid, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import useAPI from "../../../api/useAPI";

const RegPage3 = (props) => {
    let history = useHistory();
    let api = useAPI();
    const classes = useStyles();

    const [username, setUsername] = useState(props.username);
    const [password, setPassword] = useState(props.password);
    const [passwordRepeat, setPasswordRepeat] = useState("");
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [passwordRepeatError, setPasswordRepeatError] = useState(false);
    const [usernameErrorText, setUsernameErrorText] = useState("");
    const [passwordErrorText, setPasswordErrorText] = useState("");
    const [passwordRepeatErrorText, setPasswordRepeatErrorText] = useState("");

    const goToPage2 = () => {
        history.push(`${props.path}/2`);
    };

    const submitForm = () => {
        if (
            !usernameError &&
            !passwordError &&
            !passwordRepeatError &&
            username &&
            password &&
            passwordRepeat
        ) {
            props.submitRegistration();
        } else {
            alert(
                "Please ensure all fields are filled in properly before submitting."
            );
        }
    };

    const validate = async (e) => {
        props.sendToState({
            username: username,
            password: password,
        });
        const { name, value } = e.target;
        if (name === "username") {
            if (!value) {
                setUsernameError(true);
                setUsernameErrorText("You must enter a username.");
            } else {
                setUsernameError(false);
                setUsernameErrorText("");
            }
            if (!/^[A-Za-z0-9_]+$/.test(value) || value.length < 6) {
                setUsernameError(true);
                setUsernameErrorText(
                    "Username can only contain letters, numbers, or underscores and be at least 6 characters."
                );
            } else {
                setUsernameError(false);
                setUsernameErrorText("");
            }
            if (value.length >= 6) {
                if (value.toLowerCase().includes("admin")) {
                    setUsernameError(true);
                    setUsernameErrorText(
                        'Username cannot contain the word "admin".'
                    );
                } else {
                    await fetch(
                        `${api.host}${api.path}/login/check?username=${value}`
                    )
                        .then((res) => res.json())
                        .then((res) => {
                            if (res > 0) {
                                setUsernameError(true);
                                setUsernameErrorText(
                                    "Username already found in the system."
                                );
                            } else {
                                setUsernameError(false);
                                setUsernameErrorText("");
                            }
                        });
                }
            }
        }
        if (name === "password") {
            if (value.length < 8) {
                setPasswordError(true);
                setPasswordErrorText(
                    "Password must be at least eight characters long and have at least one letter and one number."
                );
            } else {
                if (
                    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(
                        e.target.value
                    )
                ) {
                    setPasswordError(false);
                    setPasswordErrorText("");
                } else {
                    setPasswordError(true);
                    setPasswordErrorText(
                        "Password must have at least one letter and one number."
                    );
                }
            }
        }
        if (name === "passwordRepeat") {
            if (value === password) {
                setPasswordRepeatError(false);
                setPasswordRepeatErrorText("");
            } else {
                setPasswordRepeatError(true);
                setPasswordRepeatErrorText(
                    "Password Repeat must match Password."
                );
            }
        }
    };

    return (
        <div>
            <Typography variant="subtitle1">User Account</Typography>

            <TextField
                required
                fullWidth
                margin="normal"
                id="username"
                name="username"
                type="text"
                label="Username"
                variant="outlined"
                value={username}
                onChange={(e) => {
                    setUsername(e.target.value);
                    validate(e);
                }}
                onBlur={validate}
                error={usernameError}
                helperText={usernameErrorText}
            />
            <TextField
                required
                fullWidth
                margin="normal"
                id="password"
                name="password"
                type="password"
                label="Password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={validate}
                error={passwordError}
                helperText={passwordErrorText}
            />
            <TextField
                required
                fullWidth
                margin="normal"
                id="passwordRepeat"
                name="passwordRepeat"
                type="password"
                label="Repeat Password"
                variant="outlined"
                value={passwordRepeat}
                onChange={(e) => setPasswordRepeat(e.target.value)}
                onBlur={validate}
                error={passwordRepeatError}
                helperText={passwordRepeatErrorText}
            />
            <Grid container spacing={1}>
                <Grid item xs={6}>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={goToPage2}
                        fullWidth
                        className={classes.button}
                    >
                        Previous
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={submitForm}
                        fullWidth
                        className={classes.button}
                    >
                        Register
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
};

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default RegPage3;
