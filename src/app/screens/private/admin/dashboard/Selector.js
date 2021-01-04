import {
    List,
    ListItem,
    ListItemText,
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Typography,
} from "@material-ui/core";
import useAPI from "./../../../../api/useAPI";
import useAuth from "./../../../../auth/useAuth";
import { Link, useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const Selector = (props) => {
    const history = useHistory();
    const auth = useAuth();
    const api = useAPI();
    const [serviceList, setServiceList] = useState([]);
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    useEffect(() => {
        fetch(`${api.host}${api.path}/dashboard/services`)
            .then((res) => res.json())
            .then((res) => {
                setServiceList(res);
                let list = res.map((item) => item.id);
                auth.setServicesAdmin(list);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const route = (route, name) => {
        props.setServiceName(name);
        history.push(`${props.path}/${route}`);
    };

    const serviceItems = serviceList.map((item) => (
        <Accordion
            expanded={expanded === `panel${item.id}`}
            onChange={handleChange(`panel${item.id}`)}
        >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${item.id}bh-content`}
                id={`panel${item.id}bh-header`}
            >
                <Typography className={classes.heading}>{item.name}</Typography>
                <Typography className={classes.secondaryHeading}>
                    {item.location}
                </Typography>
            </AccordionSummary>
            <AccordionDetails id={`panel${item.id}bh-details`}>
                <List>
                    <ListItem
                        button
                        key={`${item.id}-fd`}
                        onClick={() => route(`${item.id}/frontdesk`, item.name)}
                    >
                        <ListItemText primary={`Front Desk`} />
                    </ListItem>
                    <ListItem
                        button
                        key={`${item.id}-admin`}
                        onClick={() =>
                            route(`${item.id}/administration`, item.name)
                        }
                    >
                        <ListItemText primary={`Service Administration`} />
                    </ListItem>
                </List>
            </AccordionDetails>
        </Accordion>
    ));

    return (
        <div>
            <p>Select a service</p>
            {serviceItems}
        </div>
    );
};

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: "33.33%",
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
}));

export default Selector;
