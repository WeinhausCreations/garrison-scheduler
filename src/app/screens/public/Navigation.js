import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Button,
    Tooltip,
    Drawer,
    Divider,
    List,
    ListItem,
    ListItemText,
    CssBaseline,
} from "@material-ui/core";
import clsx from "clsx";
import { useHistory, Link } from "react-router-dom";
import useAuth from "./../../auth/useAuth";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useState } from "react";

const Navigation = () => {
    let auth = useAuth();
    let history = useHistory();
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = useState(false);

    const toggleDrawerOpen = () => {
        setOpen(!open);
    };

    const routeHome = () => {
        if (open) toggleDrawerOpen();
        history.push("/home");
    };
    const routeLogin = () => {
        if (open) toggleDrawerOpen();
        history.push("/login");
    };
    const routeProfile = () => {
        if (open) toggleDrawerOpen();
        history.push("/profile");
    };
    const routeDashboard = () => {
        if (open) toggleDrawerOpen();
        history.push("/dashboard");
    };
    const routeAbout = () => {
        if (open) toggleDrawerOpen();
        history.push("/about");
    };
    const routeScheduler = () => {
        if (open) toggleDrawerOpen();
        history.push("/scheduler");
    };
    const routeRegister = () => {
        if (open) toggleDrawerOpen();
        history.push("/register");
    };
    const routeAppointments = () => {
        if (open) toggleDrawerOpen();
        history.push("/appointments");
    };
    const logout = () => {
        auth.signout();
        if (open) toggleDrawerOpen();
    };

    const profile = (
        <div>
            <Tooltip title="View Profile" placement="left" arrow>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={routeProfile}
                    color="inherit"
                >
                    <AccountCircle />
                    <Typography>{auth.username}</Typography>
                </IconButton>
            </Tooltip>
        </div>
    );
    const login = <Button onClick={routeLogin}>Login</Button>;

    const adminNav = (
        <List>
            <ListItem button key="Dashboard" onClick={() => routeDashboard()}>
                <ListItemText primary="Dashboard" />
            </ListItem>
        </List>
    );

    const userNav = (
        <List>
            <ListItem
                button
                key="My Appointments"
                onClick={() => routeAppointments()}
            >
                <ListItemText primary="My Appointments" />
            </ListItem>
            <ListItem button key="My Profile" onClick={() => routeProfile()}>
                <ListItemText primary="My Profile" />
            </ListItem>
        </List>
    );

    const loginNav = (
        <ListItem button key="Login" onClick={routeLogin}>
            <ListItemText primary="Login" />
        </ListItem>
    );

    const registerNav = (
        <ListItem button key="Register" onClick={routeRegister}>
            <ListItemText primary="Register" />
        </ListItem>
    );

    const logoutNav = (
        <ListItem button key="Logout" onClick={() => logout()}>
            <ListItemText primary="Logout" />
        </ListItem>
    );

    const alwaysNav = (
        <List>
            <ListItem button key="Home" onClick={() => routeHome()}>
                <ListItemText primary="Home" />
            </ListItem>
            <ListItem button key="About" onClick={() => routeAbout()}>
                <ListItemText primary="About" />
            </ListItem>
            <ListItem button key="Scheduler" onClick={() => routeScheduler()}>
                <ListItemText primary="Scheduler" />
            </ListItem>
            {auth.user ? logoutNav : loginNav}
            {auth.user ? null : registerNav}
        </List>
    );

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={clsx(
                            classes.menuButton,
                            open && classes.hide
                        )}
                        color="inherit"
                        aria-label="menu"
                        onClick={toggleDrawerOpen}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h2" className={classes.title}>
                        Garrison Scheduler
                    </Typography>
                    {auth.user ? profile : login}
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                anchor="left"
                open={open}
                onClose={toggleDrawerOpen}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={toggleDrawerOpen}>
                        {theme.direction === "ltr" ? (
                            <ChevronLeftIcon />
                        ) : (
                            <ChevronRightIcon />
                        )}
                    </IconButton>
                </div>
                <Divider />
                {alwaysNav}

                <Divider />
                {auth.user ? userNav : null}
                {auth.admin ? <Divider /> : null}
                {auth.admin ? adminNav : null}
            </Drawer>
        </div>
    );
};
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    appBar: {
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    hide: {
        display: "none",
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: "flex-end",
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    title: {
        flexGrow: 1,
    },
}));

export default Navigation;
