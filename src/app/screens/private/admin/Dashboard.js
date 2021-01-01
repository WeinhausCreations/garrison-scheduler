import { List, ListItem, ListItemText } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import useAPI from "./../../../api/useAPI";

const Dashboard = () => {
    const history = useHistory();
    const api = useAPI();

    const [serviceList, setServiceList] = useState([]);

    useEffect(() => {
        fetch(`${api.host}${api.path}/dashboard`)
            .then((res) => res.json())
            .then((res) => setServiceList(res));
    });

    const route = () => {

    }

    const serviceItems = serviceList.map(item => (
        <ListItem
        button
        key={item.name+item.location}
        onClick={() => route()}
        >
            <ListItemText primary={item.name} />
        </ListItem>
    ))

    return (
        <div>
            <h2>Admin Dashboard</h2>
            <p>Select a service</p>
            <List>
                {serviceItems}
            </List>
        </div>
    );
};

export default Dashboard;
