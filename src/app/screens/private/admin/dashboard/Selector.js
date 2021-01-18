import {
    List,
    ListItem,
    ListItemText,
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Typography,
    Container,
} from "@material-ui/core";
import useAPI from "./../../../../api/useAPI";
import useAuth from "./../../../../auth/useAuth";
import { Link, useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const Selector = (props) => {
    let classes = useStyles();
    const history = useHistory();
    const auth = useAuth();
    const api = useAPI();
    const [serviceList, setServiceList] = useState([]);
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

    const route = (id, name, destination, destinationName) => {
        sessionStorage.setItem("serviceId", id);
        sessionStorage.setItem("serviceName", name);
        sessionStorage.setItem("destination", destinationName);
        history.push(`${props.path}/${id}/${destination}`);
    };

    const serviceItems = serviceList.map((item) => (
        <Accordion
            expanded={expanded === `panel${item.id}`}
            onChange={handleChange(`panel${item.id}`)}
            key={`accordion-${item.id}`}
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
                <List className={classes.accordionList}>
                    <ListItem
                        button
                        className={classes.listItem}
                        key={`${item.id}-fd`}
                        onClick={() => route(item.id, item.name, "frontdesk", "Front Desk")}
                    >
                        <ListItemText primary={`Front Desk`} />
                    </ListItem>
                    <ListItem
                        button
                        className={classes.listItem}
                        key={`${item.id}-admin`}
                        onClick={() =>
                            route(item.id, item.name, "administration", "Administration")
                        }
                    >
                        <ListItemText primary={`Service Administration`} />
                    </ListItem>
                </List>
            </AccordionDetails>
        </Accordion>
    ));

    return (
        <Container className={classes.selectContainer}>
            {serviceItems}
        </Container>
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
    accordionList: {
        display: "flex",
        flexFlow: "rows wrap",
    },
    listItem: {
        width: 200,
    },
    selectContainer: {
        maxWidth: 800,
    },
}));

export default Selector;
