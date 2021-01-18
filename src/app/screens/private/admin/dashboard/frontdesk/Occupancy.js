import { Container, Typography } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import useAPI from "./../../../../../api/useAPI";
import { makeStyles } from "@material-ui/core/styles";

const Occupancy = (props) => {
    let classes = useStyles();
    const sectionId = sessionStorage.getItem("sectionId");
    const api = useAPI();
    const current = props.checkedIn.length;
    const [chartData, setChartData] = useState({ timeSlot: [], occupancy: [] });
    useEffect(() => {
        fetch(
            `${api.host}${api.path}/dashboard/section/${sectionId}/occupancy/future`
        )
            .then((res) => res.json())
            .then((res) => {
                setChartData(res);
                console.log(chartData);
            });
    }, []);

    const data = {
        labels: chartData.timeSlot,
        datasets: [
            {
                label: "Reservations",
                data: chartData.occupancy,
                fill: true,
                backgroundColor: "rgb(152, 189, 211, 0.5)",
                borderColor: "rgba(0, 90, 143, 1)",
            },
        ],
    };
    const options = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                        max: 50,
                    },
                },
            ],
        },
    };

    return (
        <Container className={classes.occupancyContainer}>
            <Typography variant="h3">Current Occupancy: {current}</Typography>
            <Line data={data} options={options} />
        </Container>
    );
};

const useStyles = makeStyles((theme) => ({
    occupancyContainer: {
        height: 420,
        padding: 0,
    },
}));

export default Occupancy;
