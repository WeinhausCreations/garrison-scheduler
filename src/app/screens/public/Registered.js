import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const Registered = () => {
    return (
        <div>
            <h2>Thank you for registering!</h2>
            <p>
                An email has been sent to the email provided. Please verify your
                email to utilize your account. The link provided expires in 24
                hours. If you need a new code, please{" "}
                <Link to="/resend">click here </Link> to create a new link.
            </p>
            <Link to="/">Return to Main Page</Link>
        </div>
    );
};

export default Registered;
