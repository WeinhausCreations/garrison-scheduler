import { Container, Typography } from "@material-ui/core";
import React from "react";
import { Line } from "react-chartjs-2";

const data = {
    labels: [
        "08:00",
        "09:00",
        "10:00",
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
    ],
    datasets: [
        {
            label: "Reserved Occupancy",
            data: [7, 10, 12, 14, 6, 8, 30, 25, 9, 0],
            fill: true,
            backgroundColor: "rgb(255, 99, 132)",
            borderColor: "rgba(255, 99, 132, 0.2)",
        },
    ],
};

const options = {
    scales: {
        yAxes: [
            {
                ticks: {
                    beginAtZero: true,
                    max: 50
                },
            },
        ],
    },
};

const Occupancy = (props) => {
    return (
        <Container>
            <Typography variant="h4">Current Occupancy:</Typography>
            <Typography variant="h3">4</Typography>
            <Typography variant="h4">Expected Occupancy:</Typography>
            <Line data={data} options={options} />
        </Container>
    );
};

export default Occupancy;
