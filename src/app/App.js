import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./screens/public/Home";
import Login from "./screens/public/Login";
import Register from "./screens/public/Register";
import Registered from "./screens/public/Registered";
import Verify from "./screens/public/Verify";
import ProvideAuth from "./auth/ProvideAuth";
import Navigation from "./screens/public/Navigation";
import ProvideAPI from "./api/ProvideAPI";

const App = () => {
    return (
        <ProvideAPI>
            <ProvideAuth>
                <Router>
                    <div className="App">
                        <Navigation />
                        <main>
                            <Switch>
                                <Route path="/login">
                                    <Login />
                                </Route>
                                <Route path="/register">
                                    <Register />
                                </Route>
                                <Route path="/registered">
                                    <Registered />
                                </Route>
                                <Route path="/verify">
                                    <Verify />
                                </Route>
                                <Route path="/">
                                    <Home />
                                </Route>
                            </Switch>
                        </main>
                        <footer>
                            <p className="disclaimer">Disclaimer:</p>
                        </footer>
                    </div>
                </Router>
            </ProvideAuth>
        </ProvideAPI>
    );
};

export default App;
