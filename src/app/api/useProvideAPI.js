import { useState } from "react";

const useProvideAPI = () => {
    // website default
    const defaultHost = "https://api.garrisonscheduler.com";
    const defaultPath = "/v1";

    // // localhost default
    // const defaultHost = "http://localhost:3500";
    // const defaultPath = "/api";

    const [host, setHost] = useState(defaultHost);
    const [path, setPath] = useState(defaultPath);

    return {
        host,
        path,
        setHost,
        setPath,
    };
};

export default useProvideAPI;
