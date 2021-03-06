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
import AddNewUserDialog from "./AddNewUserDialog";

const OptionButtons = (props) => {
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

    const checkInUser = (userId, start, lastName) => {};

    return (
        <div>
            <Grid container spacing={1}>
                <Grid item>
                    <Button
                        variant="contained"
                        // className={classes.button}
                        onClick={handleOpenNewUser}
                        color="primary"
                        fullWidth
                    >
                        Add New User
                    </Button>
                </Grid>
                <Grid item>
                    <Button
                        variant="contained"
                        className={classes.button}
                        onClick={handleOpenLookupUser}
                        color="primary"
                        // fullWidth
                    >
                        Lookup User
                    </Button>
                </Grid>
            </Grid>
            <AddNewUserDialog
                handleClose={handleClose}
                open={dialogBox.newUser}
                sectionDetails={props.sectionDetails}
            />
        </div>
    );
};

const useStyles = makeStyles((theme) => ({
    button: {
        width: '100%',
    },
}));

export default OptionButtons;
