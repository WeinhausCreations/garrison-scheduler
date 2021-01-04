import { Redirect, Route } from "react-router-dom";

const DashRoute = ({ children, ...rest }) => {
    let serviceName = rest.serviceName;
    return (
        <Route
            {...rest}
            render={({ location }) =>
                serviceName ? (
                    children
                ) : (
                    <Redirect to={{ pathname: "/dashboard" }} />
                )
            }
        />
    );
};

export default DashRoute;
