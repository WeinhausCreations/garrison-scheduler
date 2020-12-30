/* eslint-disable no-useless-escape */
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import InputMask from "react-input-mask";

const RegPage1 = (props) => {
    let history = useHistory();
    const classes = useStyles();

    const [firstName, setFirstName] = useState(props.firstName);
    const [lastName, setLastName] = useState(props.lastName);
    const [dodin, setDodin] = useState(props.dodin);
    const [email, setEmail] = useState(props.email);
    const [phone, setPhone] = useState(props.phone);
    const [firstNameError, setFirstNameError] = useState(false);
    const [lastNameError, setLastNameError] = useState(false);
    const [dodinError, setDodinError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [phoneError, setPhoneError] = useState(false);
    const [firstNameErrorText, setFirstNameErrorText] = useState("");
    const [lastNameErrorText, setLastNameErrorText] = useState("");
    const [dodinErrorText, setDodinErrorText] = useState("");
    const [emailErrorText, setEmailErrorText] = useState("");
    const [phoneErrorText, setPhoneErrorText] = useState("");

    const goToPage2 = () => {
        if (
            !firstNameError &&
            !lastNameError &&
            !dodinError &&
            !emailError &&
            !phoneError &&
            firstName &&
            lastName &&
            dodin &&
            email &&
            phone
        ) {
            props.sendToState({
                firstName: firstName,
                lastName: lastName,
                dodin: dodin,
                email: email,
                phone: phone,
            });
            history.push(`${props.path}/2`);
        } else {
            alert(
                "Please ensure all fields are filled in properly before continuing."
            );
        }
    };

    const validate = async (e) => {
        const { name, value } = e.target;
        if (name === "firstName") {
            if (!value) {
                setFirstNameError(true);
                setFirstNameErrorText("You must enter a first name");
            } else {
                setFirstNameError(false);
                setFirstNameErrorText("");
            }
            if (!/^[A-Za-z\s\-]+$/.test(value)) {
                setFirstNameError(true);
                setFirstNameErrorText(
                    "Name can only contain letters, spaces, or dashes."
                );
            } else {
                setFirstNameError(false);
                setFirstNameErrorText("");
            }
        }
        if (name === "lastName") {
            if (!value) {
                setLastNameError(true);
                setLastNameErrorText("You must enter a first name");
            } else {
                setLastNameError(false);
                setLastNameErrorText("");
            }
            if (!/^[A-Za-z\s\-]+$/.test(value)) {
                setLastNameError(true);
                setLastNameErrorText(
                    "Name can only contain letters, spaces, or dashes."
                );
            } else {
                setLastNameError(false);
                setLastNameErrorText("");
            }
        }
        if (name === "dodin") {
            if (value.length !== 10) {
                setDodinError(true);
                setDodinErrorText("DoD ID Numbers must contain 10 digits.");
            } else {
                await fetch(
                    "http://localhost:3500/gss/api/users/check?dodin=" + value
                )
                    .then((res) => res.json())
                    .then((res) => {
                        if (res > 0) {
                            setDodinError(true);
                            setDodinErrorText(
                                "DoD ID already found in the system."
                            );
                        } else {
                            setDodinError(false);
                            setDodinErrorText("");
                        }
                    });
            }
        }
        if (name === "email") {
            if (!value.indexOf("@") > 0) {
                setEmailError(true);
                setEmailErrorText("Please enter a valid email.");
            } else {
                await fetch(
                    "http://localhost:3500/gss/api/users/check?email=" + value
                )
                    .then((res) => res.json())
                    .then((res) => {
                        if (res > 0) {
                            setEmailError(true);
                            setEmailErrorText(
                                "Email already found in the system."
                            );
                        } else {
                            setEmailError(false);
                            setEmailErrorText("");
                        }
                    });
            }
        }
        if (name === "phone") {
            const phoneNum = parseInt(value.replaceAll(/[\+\(\)-\s]/g, ""));
            if (!phoneNum.length === 10) {
                setPhoneError(true);
                setPhoneErrorText(
                    "Please enter a valid, 10-digit phone number."
                );
            } else {
                setPhoneError(false);
                setPhoneErrorText("");
            }
        }
    };

    return (
        <div className={classes.root}>
            <h3>Personal Information</h3>

            <TextField
                required
                id="firstName"
                name="firstName"
                type="text"
                label="First Name"
                variant="outlined"
                value={firstName}
                onChange={(e) => {
                    setFirstName(e.target.value);
                    validate(e);
                }}
                onBlur={validate}
                error={firstNameError}
                helperText={firstNameErrorText}
            />
            <TextField
                required
                id="lastName"
                name="lastName"
                type="text"
                label="Last Name"
                variant="outlined"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                onBlur={validate}
                error={lastNameError}
                helperText={lastNameErrorText}
            />
            <TextField
                required
                id="dodin"
                name="dodin"
                type="number"
                label="DoD ID Number"
                variant="outlined"
                onInput={(e) => {
                    e.target.value = Math.max(0, parseInt(e.target.value))
                        .toString()
                        .slice(0, 10);
                }}
                value={dodin}
                onChange={(e) => {
                    setDodin(e.target.value);
                    validate(e);
                }}
                onBlur={validate}
                error={dodinError}
                helperText={dodinErrorText}
            />
            <TextField
                required
                id="email"
                name="email"
                type="email"
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => {
                    setEmail(e.target.value);
                    validate(e);
                }}
                onBlur={validate}
                error={emailError}
                helperText={emailErrorText}
            />
            <InputMask
                mask="(999) 999-9999"
                // value={props.phone}
                maskChar=" "
                id="phone"
                name="phone"
                required
                label="Phone Number"
                variant="outlined"
                value={phone}
                onChange={(e) => {
                    setPhone(e.target.value);
                    validate(e);
                }}
                onBlur={validate}
                error={phoneError}
                helperText={phoneErrorText}
            >
                {(inputProps) => <TextField {...inputProps} />}
            </InputMask>

            <Button variant="contained" color="primary" onClick={goToPage2}>
                Next
            </Button>
        </div>
    );
};

const useStyles = makeStyles((theme) => ({
    root: {
        "& > *": {
            margin: theme.spacing(1),
            width: "25ch",
        },
    },
}));

export default RegPage1;
