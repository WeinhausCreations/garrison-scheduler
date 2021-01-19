import { useParams, Link, useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";
import useAPI from "./../../../../api/useAPI";
import {
    FormControl,
    InputLabel,
    Select,
    Typography,
    Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Display from "./frontdesk/Display";
import OptionButtons from "./frontdesk/OptionButtons";

const FrontDesk = (props) => {
    let serviceId = sessionStorage.getItem("serviceId");
    let serviceName = sessionStorage.getItem("serviceName");
    let api = useAPI();
    let history = useHistory();
    const classes = useStyles();
    const [sectionList, setSectionList] = useState([]);
    const [section, setSection] = useState("0");

    const handleChange = (e) => {
        let id = e.target.value;
        let index = e.target.selectedIndex;
        let name = e.target[index].label;
        sessionStorage.setItem("sectionId", id);
        sessionStorage.setItem("sectionName", name);
        setSection(id);
    };

    useEffect(() => {
        fetch(`${api.host}${api.path}/dashboard/service/${serviceId}/frontdesk`)
            .then((res) => res.json())
            .then((res) => {
                if (res.status === 404) {
                    history.replace(props.path);
                }
                setSectionList(res);
                // setSection(res[0].id);
                // sessionStorage.setItem("sectionId", res[0].id);
                // sessionStorage.setItem("sectionName", res[0].name);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [api, serviceId]);

    const sections = sectionList.map((section) => (
        <option key={`section${section.id}`} value={section.id}>
            {section.name}
        </option>
    ));

    return (
        <div>
            <Grid container spacing={1}>
                <Grid item xs={4}>
                    <FormControl
                        variant="outlined"
                        className={classes.formControl}
                    >
                        <InputLabel htmlFor="select-section">
                            Select Section
                        </InputLabel>
                        <Select
                            native
                            value={section}
                            onChange={(e) => handleChange(e)}
                            label="Select Section"
                            inputProps={{
                                name: "section",
                                id: "select-section",
                            }}
                        >
                            <option aria-label="None" value="" />
                            {sections}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={8}>
                    {sessionStorage.getItem("sectionId") ? (
                        <OptionButtons />
                    ) : null}
                </Grid>
                <Grid item xs={12}>
                    {sessionStorage.getItem("sectionId") ? <Display /> : null}
                </Grid>
            </Grid>
        </div>
    );
};

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        width: '85%'
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default FrontDesk;
