/* eslint-disable no-useless-escape */
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    TextField,
    FormControl,
    InputLabel,
    Select,
    FormHelperText,
} from "@material-ui/core";
import InputMask from "react-input-mask";
import useAPI from "../../../../../api/useAPI";
import useAuth from "./../../../../../auth/useAuth";
import socketIOClient from "socket.io-client";

const AddNewUserDialog = (props) => {
    const api = useAPI();
    const auth = useAuth();
    const classes = useStyles();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dodin, setDodin] = useState(null);
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState(null);
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
    const [association, setAssociation] = useState(props.association);
    const [unit, setUnit] = useState(props.unit);
    const [disabled, setDisabled] = useState(true);
    const [associationError, setAssociationError] = useState(false);
    const [unitError, setUnitError] = useState(false);
    const [associationErrorText, setAssociationErrorText] = useState("");
    const [unitErrorText, setUnitErrorText] = useState("");
    const [associationList, setAssociationList] = useState([]);

    useEffect(() => {
        fetch(`${api.host}${api.path}/association/`)
            .then((res) => res.json())
            .then((res) => setAssociationList(res));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const register = async (cb) => {
        if (
            !firstNameError &&
            !lastNameError &&
            !dodinError &&
            !emailError &&
            !phoneError &&
            !associationError &&
            !unitError &&
            firstName &&
            lastName &&
            dodin &&
            email &&
            phone &&
            association
        ) {
            const body = {
                firstName: firstName,
                lastName: lastName,
                dodin: dodin,
                email: email,
                phone: parseInt(phone.replaceAll(/[\+\(\)-\s]/g, "")),
                associationId: association,
                unit: unit,
                updatedUserId: auth.user,
            };
            const options = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            };
            fetch(`${api.host}${api.path}/users/`, options)
                .then((res) => res.json())
                .then((res) => {
                    cb(res);
                })
                .catch((res) => alert(res.message));
        } else {
            alert("Please ensure all fields are filled in properly.");
        }
    };

    const checkIn = async (newId) => {
        const body = {
            userId: newId,
            sectionId: sessionStorage.getItem("sectionId"),
        };
        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        };
        fetch(`${api.host}${api.path}/dashboard/user/checkin`, options)
            .then((res) => res.json())
            .then((res) => {
                const socket = socketIOClient(api.host);
                socket.emit("reservation created", res, (response) => {
                    if (response.status === "success"){
                        alert("User Created and Checked In.");
                    } else {
                        alert("something went wrong");
                    }
                });
                socket.disconnect();
                props.handleClose();
            })
            .catch((res) => alert(res.message));
    };

    const registerNewUser = async () => {
        register((newId) => {
            if (newId > 0) {
                alert("User Created");
                props.handleClose();
            }
        });
    };

    const checkInNewUser = async () => {
        register((newId) => {
            if (newId > 0) {
                checkIn(newId);
            }
        });
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
                await fetch(`${api.host}${api.path}/users/check?dodin=${value}`)
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
            if (value.indexOf("@") < 0) {
                setEmailError(true);
                setEmailErrorText("Please enter a valid email.");
            } else {
                await fetch(`${api.host}${api.path}/users/check?email=${value}`)
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
            if (phoneNum.toString().length < 10) {
                setPhoneError(true);
                setPhoneErrorText(
                    "Please enter a valid, 10-digit phone number."
                );
            } else {
                setPhoneError(false);
                setPhoneErrorText("");
            }
        }
        if (name === "association") {
            if (!value || value === 0) {
                setAssociationError(true);
                setAssociationErrorText(
                    "You must select your military association."
                );
                setDisabled(true);
                setUnit("");
            } else {
                setAssociationError(false);
                setAssociationErrorText("");
                if (value >= 1 && value <= 4) {
                    setDisabled(false);
                }
            }
        }
        if (name === "unit" && !disabled) {
            if (!value) {
                setUnitError(true);
                setUnitErrorText("You must enter a unit.");
            } else {
                setUnitError(false);
                setUnitErrorText("");
            }
            if (!/^[A-Za-z0-9\s\-]+$/.test(value)) {
                setUnitError(true);
                setUnitErrorText(
                    "Unit can only contain letters, numbers, spaces, or dashes."
                );
            } else {
                setUnitError(false);
                setUnitErrorText("");
            }
        }
    };

    const associationOptions = associationList.map((item) => (
        <option key={`association_${item.id}`} value={item.id}>
            {item.name}
        </option>
    ));

    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">Add New User</DialogTitle>
            <DialogContent>
                <Grid container spacing={1}>
                    <Grid item xs={4}>
                        <TextField
                            className={classes.input}
                            required
                            id="dodin"
                            name="dodin"
                            type="number"
                            label="DoD ID Number"
                            variant="outlined"
                            onInput={(e) => {
                                e.target.value = Math.max(
                                    0,
                                    parseInt(e.target.value)
                                )
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
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            className={classes.input}
                            required
                            id="firstName"
                            name="firstName"
                            type="text"
                            label="First Name"
                            variant="outlined"
                            maxLength={50}
                            value={firstName}
                            onChange={(e) => {
                                setFirstName(e.target.value);
                                validate(e);
                            }}
                            onBlur={validate}
                            error={firstNameError}
                            helperText={firstNameErrorText}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            className={classes.input}
                            required
                            id="lastName"
                            name="lastName"
                            type="text"
                            label="Last Name"
                            variant="outlined"
                            maxLength={50}
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            onBlur={validate}
                            error={lastNameError}
                            helperText={lastNameErrorText}
                        />
                    </Grid>
                    <Grid item xs={8}>
                        <TextField
                            className={classes.input}
                            required
                            id="email"
                            name="email"
                            type="email"
                            label="Email"
                            variant="outlined"
                            maxLength={50}
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                validate(e);
                            }}
                            onBlur={validate}
                            error={emailError}
                            helperText={emailErrorText}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <InputMask
                            className={classes.input}
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
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl
                            variant="outlined"
                            className={classes.input}
                        >
                            <InputLabel htmlFor="association">
                                Association
                            </InputLabel>
                            <Select
                                native
                                required
                                label="Association"
                                variant="outlined"
                                value={association}
                                inputProps={{
                                    name: "association",
                                    id: "association",
                                }}
                                onChange={(e) => {
                                    setAssociation(e.target.value);
                                    validate(e);
                                }}
                                onBlur={validate}
                                error={associationError}
                            >
                                <option value="0">Select</option>
                                {associationOptions}
                            </Select>
                            <FormHelperText>
                                {associationErrorText}
                            </FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            className={classes.input}
                            required={!disabled}
                            disabled={disabled}
                            id="unit"
                            name="unit"
                            type="text"
                            label="Unit"
                            variant="outlined"
                            maxLength={50}
                            value={unit}
                            onChange={(e) => setUnit(e.target.value)}
                            onBlur={validate}
                            error={unitError}
                            helperText={unitErrorText}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose} variant="contained">
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={registerNewUser}
                >
                    Add
                </Button>
                <Button
                    onClick={checkInNewUser}
                    variant="contained"
                    color="primary"
                >
                    Check In Now
                </Button>
            </DialogActions>
        </Dialog>
    );
};

const useStyles = makeStyles((theme) => ({
    dialogBoxContainer: {
        width: 800,
    },
    input: {
        width: "100%",
    },
}));

export default AddNewUserDialog;
