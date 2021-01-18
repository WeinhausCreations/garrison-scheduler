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
} from "@material-ui/core";
import useAPI from "./../../../../../api/useAPI";

const OptionButtons = () => {
    const api = useAPI();
    const classes = useStyles();
    const [dialogBox, setDialogBox] = useState({
        newUser: false,
        userLookup: false,
    });
    const [associationList, setAssociationList] = useState([]);
    const [newUser, setNewUser] = useState({
        dodin: null,
        firstName: "",
        lastName: "",
        associationId: 0,
        email: "",
        phone: null,
        unit: "",
    });

    useEffect(() => {
        fetch(`${api.host}${api.path}/association/`)
            .then((res) => res.json())
            .then((res) => setAssociationList(res));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleOpenNewUser = () => {
        setDialogBox({ ...dialogBox, newUser: true });
    };

    const handleOpenLookupUser = () => {
        setDialogBox({ ...dialogBox, userLookup: true });
    };

    const handleClose = () => {
        setDialogBox({ newUser: false, userLookup: false });
    };

    return (
        <div>
            <Grid container spacing={1}>
                <Grid item>
                    <Button
                        variant="contained"
                        className={classes.button}
                        onClick={handleOpenNewUser}
                    >
                        Add New User
                    </Button>
                </Grid>
                <Grid item>
                    <Button
                        variant="contained"
                        className={classes.button}
                        onClick={handleOpenLookupUser}
                    >
                        Lookup User
                    </Button>
                </Grid>
            </Grid>
            <Dialog
                open={dialogBox.newUser}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Add New User</DialogTitle>
                <DialogContent>
                    <Grid container spacing={1}>
                        <Grid item xs={4}>
                            <TextField
                                autoFocus
                                id="dodin"
                                name="dodin"
                                label="DoD ID Number"
                                type="number"
                                variant="outlined"
                                value={newUser.dodin}
                                onChange={(e) =>
                                    setNewUser({
                                        ...newUser,
                                        [e.target.name]: e.target.value,
                                    })
                                }
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                id="firstName"
                                name="firstName"
                                label="First Name"
                                type="text"
                                variant="outlined"
                                value={newUser.firstName}
                                onChange={(e) =>
                                    setNewUser({
                                        ...newUser,
                                        [e.target.name]: e.target.value,
                                    })
                                }
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                id="lastName"
                                name="lastName"
                                label="First Name"
                                type="text"
                                variant="outlined"
                                value={newUser.lastName}
                                onChange={(e) =>
                                    setNewUser({
                                        ...newUser,
                                        [e.target.name]: e.target.value,
                                    })
                                }
                            />
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                autoFocus
                                id="email"
                                name="email"
                                label="Email"
                                type="email"
                                variant="outlined"
                                value={newUser.email}
                                onChange={(e) =>
                                    setNewUser({
                                        ...newUser,
                                        [e.target.name]: e.target.value,
                                    })
                                }
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                autoFocus
                                id="phone"
                                name="phone"
                                label="Phone Number"
                                type="number"
                                variant="outlined"
                                value={newUser.phone}
                                onChange={(e) =>
                                    setNewUser({
                                        ...newUser,
                                        [e.target.name]: e.target.value,
                                    })
                                }
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                autoFocus
                                id="association"
                                name="associationId"
                                label="Association"
                                type="number"
                                variant="outlined"
                                value={newUser.associationId}
                                onChange={(e) =>
                                    setNewUser({
                                        ...newUser,
                                        [e.target.name]: e.target.value,
                                    })
                                }
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                autoFocus
                                id="unit"
                                name="unit"
                                label="Unit"
                                type="text"
                                variant="outlined"
                                value={newUser.unit}
                                onChange={(e) =>
                                    setNewUser({
                                        ...newUser,
                                        [e.target.name]: e.target.value,
                                    })
                                }
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleClose}
                        variant="contained"
                        color="primary"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleClose}
                        variant="contained"
                        color="primary"
                    >
                        Add
                    </Button>
                    <Button
                        onClick={handleClose}
                        variant="contained"
                        color="primary"
                    >
                        Add and Check In
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

const useStyles = makeStyles((theme) => ({
    button: {
        minWidth: 150,
    },
}));

export default OptionButtons;
