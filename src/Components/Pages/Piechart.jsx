import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

// Register required components for Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ specialties }) => {
    const data = {
        labels: Object.keys(specialties),
        datasets: [
            {
                data: Object.values(specialties),
                backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0', '#9966ff'],
            },
        ],
    };

    return <Pie data={data} />;
};

export default PieChart;
