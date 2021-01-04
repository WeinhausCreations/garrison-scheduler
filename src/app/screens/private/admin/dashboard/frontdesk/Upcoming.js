import { useState } from "react";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Typography,
    Button,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const Upcoming = (props) => {
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    // console.log(reservations)
    const currDTG = new Date();
    const resList = props.reservations.map((res) => {
        let overDue = false;
        const stopDTG = new Date(res.stop);
        const startDTG = new Date(res.start);
        const checkedInDTG = new Date(res.checked_in);
        const stopTime = stopDTG.toTimeString().substring(0, 8);
        const startTime = startDTG.toTimeString().substring(0, 8);
        const checkedInTime = checkedInDTG.toTimeString().substring(0, 8);
        if (startDTG < currDTG) {
            overDue = true;
        }
        return (
            <Accordion
                expanded={expanded === `panel${res.id}`}
                onChange={handleChange(`panel${res.id}`)}
                key={`panel${res.id}`}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel${res.id}bh-content`}
                    id={`panel${res.id}bh-header`}
                >
                    <Typography>{`${res.first_name} ${res.last_name}`}</Typography>
                    <Typography>{overDue ? "Over Due" : ""}</Typography>
                    <Button>Check In</Button>
                </AccordionSummary>
                <AccordionDetails id={`panel${res.id}bh-details`}>
                    <Typography>
                        Start: {startTime} | Checked In: {checkedInTime}
                    </Typography>
                    <Typography>Expected Checkout: {stopTime}</Typography>
                </AccordionDetails>
            </Accordion>
        );
    });

    return (
        <div>
            <h3>Upcoming</h3>
            {resList}
        </div>
    );
};

export default Upcoming;
