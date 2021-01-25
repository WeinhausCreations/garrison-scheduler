import React, { useState } from "react";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Container,
    Typography,
    Button,
    Grid,
    TextField,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { getTime } from "../../../../../functions";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

const CheckedIn = (props) => {
    let classes = useStyles();
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    // console.log(reservations)
    const currDTG = new Date();
    const resList = props.reservations.map((res) => {
        let overDue = false;
        const stopDTG = new Date(res.stop);
        const startDTG = new Date(res.start);
        const checkedInDTG = new Date(res.checked_in);
        const stopTime = getTime(stopDTG);
        const startTime = getTime(startDTG);
        const checkedInTime = getTime(checkedInDTG);
        if (stopDTG < currDTG) {
            overDue = true;
        }
        return (
            <Accordion
                expanded={expanded === `panel${res.id}`}
                onChange={handleChange(`panel${res.id}`)}
                key={`panel${res.id}`}
                className={
                    overDue
                        ? classes.badStatusBackground
                        : classes.goodStatusBackground
                }
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel${res.id}bh-content`}
                    id={`panel${res.id}bh-header`}
                >
                    <Typography
                        variant="body2"
                        className={classes.name}
                    >{`${res.first_name} ${res.last_name}`}</Typography>
                    {overDue ? (
                        <Typography
                            variant="body2"
                            className={clsx(classes.status, classes.badStatus)}
                        >
                            Over Due
                        </Typography>
                    ) : (
                        <Typography
                            variant="body2"
                            className={clsx(classes.status, classes.goodStatus)}
                        >
                            On-Time
                        </Typography>
                    )}
                </AccordionSummary>
                <AccordionDetails id={`panel${res.id}bh-details`}>
                    <Grid container spacing={1}>
                        <Grid item xs={7}>
                            <Grid container spacing={1}>
                                <Grid item xs={6}>
                                    <Typography variant="body2">
                                        <b>Start</b>
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body2">
                                        {startTime}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body2">
                                        <b>Checked In</b>
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body2">
                                        {checkedInTime}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body2">
                                        <b>Stop</b>
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body2">
                                        {stopTime}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={5}>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    {overDue ? (
                                        <Button
                                            variant="contained"
                                            className={classes.optionButton}
                                        >
                                            Options
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="contained"
                                            className={classes.optionButton}
                                        >
                                            Check Out
                                        </Button>
                                    )}
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        variant="contained"
                                        className={classes.optionButton}
                                    >
                                        Details
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>
        );
    });

    return (
        <Container className={classes.checkedInContainer}>
            <Grid container spacing={1}>
                <Grid item xs={12} sm={5}>
                    <Typography variant="h3">Checked In</Typography>
                </Grid>
                <Grid item xs={12} sm={7}>
                    <TextField
                        id="checkedInSearch"
                        type="text"
                        label="Search"
                        variant="outlined"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    {resList}
                </Grid>
            </Grid>
        </Container>
    );
};

const useStyles = makeStyles((theme) => ({
    checkedInContainer: {
        height: 432,
        padding: 0,
        overflowY: 'scroll',
        overflowX: 'hidden'
    },
    name: {
        fontWeight: "bold",
        flexBasis: "65%",
        flexShrink: 0,
    },
    optionButton: {
        width: "100%",
    },
    badStatusText: {
        color: theme.palette.error.main,
    },
    goodStatusText: {
        color: theme.palette.success.main,
    },
    badStatusBackground: {
        backgroundColor: theme.palette.error.light,
    },
    goodStatusBackground: {
        backgroundColor: theme.palette.success.light,
    },
}));

export default CheckedIn;
