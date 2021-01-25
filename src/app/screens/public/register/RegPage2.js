/* eslint-disable no-useless-escape */
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    FormHelperText,
    Typography,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import useAPI from "./../../../api/useAPI";
import { Grid } from "@material-ui/core";

const RegPage2 = (props) => {
    let history = useHistory();
    const classes = useStyles();
    let api = useAPI();

    const [association, setAssociation] = useState(props.association);
    const [unit, setUnit] = useState(props.unit);
    const [disabled, setDisabled] = useState(true);
    const [associationError, setAssociationError] = useState(false);
    const [unitError, setUnitError] = useState(false);
    const [associationErrorText, setAssociationErrorText] = useState("");
    const [unitErrorText, setUnitErrorText] = useState("");
    const [associationList, setAssociationList] = useState([]);

    const goToPage1 = () => {
        props.sendToState({
            association: association,
            unit: unit,
        });
        history.push(`${props.path}/`);
    };

    const goToPage3 = () => {
        if (!associationError && !unitError && association && unit) {
            props.sendToState({
                association: association,
                unit: unit,
            });
            history.push(`${props.path}/3`);
        } else {
            alert(
                "Please ensure all fields are filled in properly before continuing."
            );
        }
    };

    useEffect(() => {
        fetch(`${api.host}${api.path}/association`)
            .then((res) => res.json())
            .then((res) => {
                setAssociationList(res);
            });
        if (association >= 1 && association <= 4) {
            setDisabled(false);
        } else {
            setDisabled(true);
            setUnit("");
        }
    }, [api, association]);

    const validate = (e) => {
        const { name, value } = e.target;
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
        <div>
            <Typography variant="subtitle1">Military Information</Typography>
            <FormControl
                variant="outlined"
                className={classes.formControl}
                fullWidth
                margin="normal"
            >
                <InputLabel htmlFor="association">Association</InputLabel>
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
                <FormHelperText>{associationErrorText}</FormHelperText>
            </FormControl>
            <TextField
                required={!disabled}
                disabled={disabled}
                fullWidth
                margin="normal"
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
            <Grid container spacing={1}>
                <Grid item xs={6}>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={goToPage1}
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
                        onClick={goToPage3}
                        fullWidth
                        className={classes.button}
                    >
                        Next
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

export default RegPage2;
