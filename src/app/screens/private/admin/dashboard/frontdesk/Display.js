import CheckedIn from "./CheckedIn";
import socketIOClient from "socket.io-client";
import React, { useEffect, useState } from "react";
import useAPI from "./../../../../../api/useAPI";
import Upcoming from "./Upcoming";
import Occupancy from "./Occupancy";

const isToday = (someDate) => {
    const today = new Date();
    return (
        someDate.getDate() == today.getDate() &&
        someDate.getMonth() == today.getMonth() &&
        someDate.getFullYear() == today.getFullYear()
    );
};

const Display = (props) => {
    const api = useAPI();
    const [state, setState] = useState({
        todayRes: [],
        checkedIn: [],
        upcoming: [],
    });

    useEffect(() => {
        const socket = socketIOClient(api.host);
        socket.on("reservations update", (data) => {
            data = data.filter((item) => item.section_id === props.section);
            setState({
                todayRes: data.filter((res) => {
                    const startDate = new Date(res.start);
                    return isToday(startDate);
                }),
                checkedIn: data.filter(
                    (res) => res.checked_out === null && res.checked_in
                ),
                upcoming: data.filter((res) => res.checked_in === null),
            });
            console.log(data);
            console.log(state);
        });
        return () => socket.disconnect();
    }, [api, props]);

    return (
        <div>
            <h3>Service Display - {props.sectionName}</h3>
            <Upcoming reservations={state.upcoming} />
            <CheckedIn reservations={state.checkedIn} />
            <Occupancy reservations={state.todayRes} />
        </div>
    );
};

export default Display;
