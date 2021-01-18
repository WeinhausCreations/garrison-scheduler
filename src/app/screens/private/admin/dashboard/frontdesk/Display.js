import CheckedIn from "./CheckedIn";
import socketIOClient from "socket.io-client";
import React, { useEffect, useState } from "react";
import useAPI from "./../../../../../api/useAPI";
import Upcoming from "./Upcoming";
import Occupancy from "./Occupancy";
import { isToday } from "./../../../../../functions";
import { Container as div, Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const Display = (props) => {
    const classes = useStyles();
    const sectionId = sessionStorage.getItem("sectionId");
    const sectionName = sessionStorage.getItem("sectionName");

    const api = useAPI();
    const [state, setState] = useState({
        todayRes: [],
        checkedIn: [],
        upcoming: [],
    });

    useEffect(() => {
        const socket = socketIOClient(api.host);
        socket.on("reservations update", (data) => {
            data = data.filter(
                (item) => item.section_id === parseInt(sectionId)
            );
            setState({
                todayRes: data.filter((res) => isToday(new Date(res.start))),
                checkedIn: data.filter(
                    (res) => res.checked_out === null && res.checked_in
                ),
                upcoming: data.filter((res) => res.checked_in === null),
            });
        });
        return () => socket.disconnect();
    }, [api, sectionId]);

    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6} lg={3}>
                    <Paper className={classes.paper}>
                        <Upcoming reservations={state.upcoming} />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                    <Paper className={classes.paper}>
                        <CheckedIn reservations={state.checkedIn} />
                    </Paper>
                </Grid>
                <Grid item xs={12} lg={6}>
                    <Paper className={classes.paper}>
                        <Occupancy
                            todayRes={state.todayRes}
                            checkedIn={state.checkedIn}
                        />
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
};

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(2)
    },
    paper: {
        padding: theme.spacing(2),
    },
}));

export default Display;
