import { useState } from "react";
import useAPI from './../api/useAPI';

const useProvideAuth = () => {
    const api = useAPI();

    const [user, setUser] = useState(null);
    const [admin, setAdmin] = useState(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false);
    const [servicesAdmin, setServicesAdmin] = useState([])

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
        fetch(`${api.host}${api.path}/login/`, options)
            .then((res) => res.json())
            .then((res) => {
                if (res.status === 200) {
                    setPassword("");
                    setUser(res.userId);
                    setAdmin(res.admin);
                    cb();
                } else {
                    alert(res.message);
                }
            });
    };

    const signout = async () => {
        fetch(`${api.host}${api.path}/logout/`)
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
        fetch(`${api.host}${api.path}/validate/`)
            .then((res) => res.json())
            .then((res) => {
                if (res.status === 200) {
                    setUser(res.userId);
                    setAdmin(res.admin);
                    setUsername(res.username);
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
        servicesAdmin,
        signin,
        signout,
        validate,
        setUsername,
        setPassword,
        setRemember,
        setServicesAdmin,
    };
};

export default useProvideAuth;
