import CheckedIn from "./CheckedIn";
import socketIOClient from "socket.io-client";
import React, { useCallback, useEffect, useState } from "react";
import useAPI from "./../../../../../api/useAPI";
import Upcoming from "./Upcoming";
import Occupancy from "./Occupancy";
import { isToday } from "./../../../../../functions";
import {
    Container as div,
    Grid,
    Paper,
    Button,
    Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { startPolling } from "./../../../../../functions/polling";
import OptionButtons from "./OptionButtons";
import AddNewUserDialog from "./AddNewUserDialog";

const Display = (props) => {
    const classes = useStyles();
    const sectionId = sessionStorage.getItem("sectionId");
    const sectionName = sessionStorage.getItem("sectionName");

    const api = useAPI();
    const [state, setState] = useState({
        todayRes: [],
        checkedIn: [],
        upcoming: [],
        currentCount: 0,
    });
    const [dialogBox, setDialogBox] = useState({
        newUser: false,
        userLookup: false,
    });
    const [chartData, setChartData] = useState({ timeSlot: [], occupancy: [] });

    const getReservations = useCallback(async () => {
        fetch(`${api.host}${api.path}/dashboard/section/${sectionId}/current`)
            .then((res) => res.json())
            .then((res) => {
                let todayResArray = res.filter((item) =>
                    isToday(new Date(item.start))
                );
                let checkedInArray = res.filter(
                    (item) => item.checked_out === null && item.checked_in
                );
                let upcomingArray = res.filter(
                    (item) => item.checked_in === null
                );
                let currentCountNum = checkedInArray.length;
                setState({
                    todayRes: todayResArray,
                    checkedIn: checkedInArray,
                    upcoming: upcomingArray,
                    currentCount: currentCountNum,
                });
            });
        fetch(
            `${api.host}${api.path}/dashboard/section/${sectionId}/occupancy/future`
        )
            .then((res) => res.json())
            .then((res) => {
                setChartData(res);
            });
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

    useEffect(() => {
        getReservations();
        return startPolling(getReservations, 30000);
    }, [getReservations]);

    // useEffect(() => {
    //     const socket = socketIOClient(api.host);
    //     socket.on("reservations update", (data) => {
    //         data = data.filter(
    //             (item) => item.section_id === parseInt(sectionId)
    //         );
    //         setState({
    //             todayRes: data.filter((res) => isToday(new Date(res.start))),
    //             checkedIn: data.filter(
    //                 (res) => res.checked_out === null && res.checked_in
    //             ),
    //             upcoming: data.filter((res) => res.checked_in === null),
    //         });
    //     });
    //     return () => socket.disconnect();
    // }, [api, sectionId]);

    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={2}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                <Typography
                                    variant="h3"
                                    classname={classes.headingMargin}
                                >
                                    Patron Count
                                </Typography>
                                <Typography className={classes.currentCount}>
                                    {state.currentCount}
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                <Typography
                                    variant="h3"
                                    className={classes.headingMargin}
                                >
                                    Options
                                </Typography>
                                <Button
                                    variant="contained"
                                    className={classes.button}
                                    onClick={handleOpenNewUser}
                                    color="primary"
                                    fullWidth
                                >
                                    Add New User
                                </Button>
                                <Button
                                    variant="contained"
                                    className={classes.button}
                                    onClick={handleOpenLookupUser}
                                    color="primary"
                                    fullWidth
                                >
                                    Lookup User
                                </Button>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={5}>
                    <Paper className={classes.paper}>
                        <Upcoming reservations={state.upcoming} />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={5}>
                    <Paper className={classes.paper}>
                        <CheckedIn reservations={state.checkedIn} />
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Occupancy chartData={chartData} />
                    </Paper>
                </Grid>
            </Grid>
            <AddNewUserDialog
                handleClose={handleClose}
                open={dialogBox.newUser}
                sectionDetails={props.sectionDetails}
                getReservations={getReservations}
            />
        </div>
    );
};

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(2),
    },
    paper: {
        padding: theme.spacing(2),
    },
    headingMargin: {
        marginBottom: theme.spacing(4),
    },
    button: {
        marginBottom: theme.spacing(1),
    },
    currentCount: {
        textAlign: "center",
        fontSize: "1.5rem",
    },
}));

export default Display;
