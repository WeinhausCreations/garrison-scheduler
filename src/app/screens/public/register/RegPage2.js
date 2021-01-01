/* eslint-disable no-useless-escape */
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    FormHelperText
} from "@material-ui/core";
import { useHistory } from "react-router-dom";

const RegPage2 = (props) => {
    let history = useHistory();
    const classes = useStyles();

    const [association, setAssociation] = useState(props.association);
    const [unit, setUnit] = useState(props.unit);
    const [disabled, setDisabled] = useState(true);
    const [associationError, setAssociationError] = useState(false);
    const [unitError, setUnitError] = useState(false);
    const [associationErrorText, setAssociationErrorText] = useState("");
    const [unitErrorText, setUnitErrorText] = useState("");

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
        if (association >= 1 && association <= 4) {
            setDisabled(false);
        } else {
            setDisabled(true);
            setUnit("");
        }
    }, [association]);

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

    return (
        <div className={classes.root}>
            <h3>Military Information</h3>
            <FormControl variant="outlined" className={classes.formControl}>
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
                    <option value="1">Active Duty</option>
                </Select>
                <FormHelperText>{associationErrorText}</FormHelperText>
            </FormControl>
            <TextField
                required={!disabled}
                disabled={disabled}
                id="unit"
                name="unit"
                type="text"
                label="Unit"
                variant="outlined"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                onBlur={validate}
                error={unitError}
                helperText={unitErrorText}
            />
            <Button variant="contained" color="primary" onClick={goToPage1}>
                Previous
            </Button>
            <Button variant="contained" color="primary" onClick={goToPage3}>
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

export default RegPage2;
