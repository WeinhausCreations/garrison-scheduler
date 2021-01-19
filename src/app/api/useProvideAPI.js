import { useState } from "react";

const useProvideAPI = () => {
    // website default
    // const defaultHost = "https://api.garrisonscheduler.com";
    // const defaultPath = "/v1";

    // // localhost default
    // const defaultHost = "http://localhost:3500";
    // const defaultPath = "/v1";
    
    // // localhost default
    const defaultHost = "http://192.168.1.4:3500";
    const defaultPath = "/v1";

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
