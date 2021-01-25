import { Container, Typography } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import useAPI from "./../../../../../api/useAPI";
import { makeStyles } from "@material-ui/core/styles";

const Occupancy = (props) => {
    let classes = useStyles();
    const sectionId = sessionStorage.getItem("sectionId");
    const api = useAPI();

    const data = {
        labels: props.chartData.timeSlot,
        datasets: [
            {
                label: "Reservations",
                data: props.chartData.occupancy,
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
        maintainAspectRatio: false,
    };

    return (
        <Container className={classes.occupancyContainer}>
            <Typography variant="h3">Expected Occupancy</Typography>
            <div className={classes.lineChart}>
                <Line data={data} options={options} height={400} />
            </div>
        </Container>
    );
};

const useStyles = makeStyles((theme) => ({
    occupancyContainer: {
        height: 420,
        padding: 0,
    },
    lineChart: {
        maxHeight: 350,
    },
}));

export default Occupancy;
