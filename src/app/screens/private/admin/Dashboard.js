import { Route, Switch, useRouteMatch, useHistory } from "react-router-dom";
import Selector from "./dashboard/Selector";
import FrontDesk from "./dashboard/FrontDesk";
import Administration from "./dashboard/Administration";
// import DashRoute from './dashboard/DashRoute';
import { Typography, Container as div, Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";

const Dashboard = () => {
    let { path } = useRouteMatch();
    const history = useHistory();
    let classes = useStyles();
    let destination = sessionStorage.getItem("destination");
    let serviceName = sessionStorage.getItem("serviceName");

    const location = destination
        ? serviceName + " - " + destination
        : "Select a Service";
    const dashboardReset = () => {
        history.push(`${path}`);
        sessionStorage.clear();
    };

    return (
        <div className={classes.root}>
            <Grid container spacing={1}>
                <Grid item xs={2}>
                    <Button
                        className={classes.serviceReturnBtn}
                        onClick={() => dashboardReset()}
                    >
                        <ArrowLeftIcon />
                        Reset Dashboard
                    </Button>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant="h2">Dashboard</Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant="h2">{location}</Typography>
                </Grid>
                <Grid item xs={2}></Grid>
                <Grid item xs={12}>
                    <Switch>
                        <Route exact path={path}>
                            <Selector path={path} />
                        </Route>
                        <Route path={`${path}/:id/frontdesk`}>
                            <FrontDesk path={path} />
                        </Route>
                        <Route path={`${path}/:id/administration`}>
                            <Administration path={path} />
                        </Route>
                    </Switch>
                </Grid>
            </Grid>
        </div>
    );
};

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    serviceHeader: {
        textAlign: "center",
        padding: theme.spacing(3),
    },
}));

export default Dashboard;
