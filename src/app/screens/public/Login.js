import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import useAuth from "./../../auth/useAuth";
import { makeStyles } from "@material-ui/core/styles";
import {
    TextField,
    Button,
    FormControlLabel,
    Checkbox,
    Grid,
    Container,
    Typography,
    Link,
} from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";

const Login = () => {
    let history = useHistory();
    let location = useLocation();
    let auth = useAuth();
    let classes = useStyles();
    let { from } = location.state || { from: { pathname: "/" } };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const useMountEffect = (func) => useEffect(func, []);

    let login = () => {
        auth.signin(() => {
            history.replace(from);
        });
    };
    let forgotPassword = () => {
        history.push("/forgot");
    };
    useMountEffect(() => {
        let validate = () => {
            auth.validate(() => {
                history.replace(from);
            });
        };
        validate();
    });

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h2">
                    Sign in
                </Typography>
                <TextField
                    required
                    margin="normal"
                    fullWidth
                    autoFocus
                    id="username"
                    name="username"
                    type="text"
                    label="Username"
                    variant="outlined"
                    autoComplete="username"
                    value={auth.username}
                    onChange={(e) => auth.setUsername(e.target.value)}
                />
                <TextField
                    required
                    fullWidth
                    margin="normal"
                    id="password"
                    name="password"
                    type="password"
                    label="Password"
                    variant="outlined"
                    autoComplete="current-password"
                    value={auth.password}
                    onChange={(e) => auth.setPassword(e.target.value)}
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={auth.remember}
                            onChange={(e) => auth.setRemember(e.target.checked)}
                            name="remember"
                            id="remember"
                            color="primary"
                        />
                    }
                    label="Remeber Login"
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={login}
                    className={classes.submit}
                    fullWidth
                >
                    Login
                </Button>
                <Grid container>
                    <Grid item xs>
                        <Link href="#" variant="body2">
                            Forgot password?
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link href="/register" variant="body2">
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </Grid>
                </Grid>
            </div>
        </Container>
    );
};

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default Login;
