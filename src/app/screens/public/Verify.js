import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

class Verify extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            response: "",
            message: "",
        };
    }

    resendCode = () => {
        return;
    }

    componentDidMount = async () => {
        let search = window.location.search;
        let params = new URLSearchParams(search);
        let code = params.get("code");
        fetch(`${api.host}${api.path}/verify?code=${code}`)
            .then((res) => res.json())
            .then((res) => {
                this.setState({ response: res.response, message: res.message });
            });
    };

    render() {
        let message;
        switch (this.state.response) {
            case "Verified":
                message = (
                    <div>
                        <p>
                            Your email has been verified. Please continue to the login page to use Garrison Scheduler.
                        </p>
                        <Link to="/login">Login</Link>
                    </div>
                );
                break;
            case "Expired":
                message = (
                    <div>
                        <p>
                            Your verification code has expired. Please click below to resend your verification email.
                        </p>
                        <button onClick={this.resendCode}>Resend Email</button>
                    </div>
                );
                break;
            case "Bad Code":
                message = (
                    <div>
                        <p>
                            Your verification code did not match any records.
                            This could be because you have already verified your
                            account. Please contact support for more assistance
                            if necessary.
                        </p>
                    </div>
                );
                break;
            default:
                break;
        }

        return (
            <div>
                {message}
            </div>
        );
    }
}

export default Verify;
