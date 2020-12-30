import { useState } from "react";
import Cookies from "js-cookie";

const useProvideAuth = () => {
    const [user, setUser] = useState(null);
    const [admin, setAdmin] = useState(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false);

    const signin = async (cb) => {
        const body = {
            username: username,
            password: password,
            remember: remember,
        };
        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        };
        console.log(options);
        fetch("http://localhost:3500/gss/api/login/", options)
            .then((res) => res.json())
            .then((res) => {
                if (res.status === 200) {
                    setPassword("");
                    setUser(res.user);
                    setAdmin(res.admin);
                    cb();
                } else {
                    alert(res.message);
                }
            });
    };

    const signout = async () => {
        fetch("http://localhost:3500/gss/api/logout/")
            .then((res) => res.json())
            .then((res) => {
                if (res.status === 200) {
                    setUser(null);
                    setAdmin(null);
                    alert("You have been logged out.");
                } else {
                    alert(res.message);
                }
            });
    };

    const validate = async (cb) => {
        fetch("http://localhost:3500/gss/api/validate/")
            .then((res) => res.json())
            .then((res) => {
                if (res.status === 200) {
                    setUser(res.user);
                    setAdmin(res.admin);
                    cb();
                } else {
                    console.log(res.message);
                }
            });
    };

    // if (user === null && Cookies.get("userSession")) {
    //     validate();
    // }

    return {
        user,
        admin,
        username,
        password,
        remember,
        signin,
        signout,
        validate,
        setUsername,
        setPassword,
        setRemember,
    };
};

export default useProvideAuth;
