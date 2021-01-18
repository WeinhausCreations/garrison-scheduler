import { Redirect, Route } from "react-router-dom";

const DashRoute = ({ children, ...rest }) => {
    let serviceId = sessionStorage.getItem("serviceId");
    return (
        <Route
            {...rest}
            render={({ location }) =>
                serviceId > 0 ? (
                    children
                ) : (
                    <Redirect to={{ pathname: "/dashboard" }} />
                )
            }
        />
    );
};

export default DashRoute;
