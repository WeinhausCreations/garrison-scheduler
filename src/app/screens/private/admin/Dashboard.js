import { Route, Switch, useRouteMatch } from "react-router-dom";
import Selector from "./dashboard/Selector";
import FrontDesk from "./dashboard/FrontDesk";
import Administration from "./dashboard/Administration";
import { useState } from 'react';
// import DashRoute from './dashboard/DashRoute';

const Dashboard = () => {
    let { path } = useRouteMatch();
    const [serviceName, setServiceName] = useState("");

    return (
        <div>
            <h2>Service Dashboard</h2>
            <Switch>
                <Route exact path={path}>
                    <Selector path={path} setServiceName={setServiceName} />
                </Route>
                <Route path={`${path}/:id/frontdesk`} serviceName={serviceName}>
                    <FrontDesk path={path} serviceName={serviceName} />
                </Route>
                <Route path={`${path}/:id/administration`} serviceName={serviceName}>
                    <Administration path={path} serviceName={serviceName} />
                </Route>
            </Switch>
        </div>
    );
};

export default Dashboard;
