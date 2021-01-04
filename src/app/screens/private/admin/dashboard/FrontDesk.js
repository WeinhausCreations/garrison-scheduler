import { useParams, Link, useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";
import useAPI from "./../../../../api/useAPI";
import { FormControl, InputLabel, Select } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Display from "./frontdesk/Display";

const FrontDesk = (props) => {
    let { id } = useParams();
    let api = useAPI();
    let history = useHistory();
    const classes = useStyles();
    const [state, setState] = useState({
        sectionList: [],
        section: 0,
        sectionName: "",
    });

    const handleChange = (e) => {
        let id = e.target.value;
        let index = e.target.selectedIndex;
        let name = e.target[index].label;
        setState({ ...state, section: id, sectionName: name });
    };

    useEffect(() => {
        fetch(`${api.host}${api.path}/dashboard/service/${id}/frontdesk`)
            .then((res) => res.json())
            .then((res) => {
                if (res.status === 404) {
                    history.replace(props.path);
                }
                setState({
                    sectionList: res,
                    section: res[0].id,
                    sectionName: res[0].name,
                });
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [api]);

    const sections = state.sectionList.map((section) => (
        <option key={`section${section.id}`} value={section.id}>
            {section.name}
        </option>
    ));

    return (
        <div>
            <h2>Front Desk - {props.serviceName}</h2>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel htmlFor="select-section">Select Section</InputLabel>
                <Select
                    native
                    value={state.section}
                    onChange={(e) => handleChange(e)}
                    label="Select Section"
                    inputProps={{
                        name: "section",
                        id: "select-section",
                    }}
                >
                    {sections}
                </Select>
            </FormControl>
            <Display section={state.section} sectionName={state.sectionName} />
            <Link to={props.path}>Back to Dashboard</Link>
        </div>
    );
};

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default FrontDesk;
