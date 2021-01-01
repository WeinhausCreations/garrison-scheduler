import { Redirect, Route } from "react-router-dom";
import useAuth from "./useAuth";

const AdminRoute = ({ children, ...rest }) => {
    let auth = useAuth();
    return (
        <Route
            {...rest}
            render={({ location }) =>
                auth.admin ? (
                    children
                ) : auth.user ? (
                    <Redirect to={{ pathname: "/" }} />
                ) : (
                    <Redirect
                        to={{ pathname: "/login", state: { from: location } }}
                    />
                )
            }
        />
    );
};

export default AdminRoute;
