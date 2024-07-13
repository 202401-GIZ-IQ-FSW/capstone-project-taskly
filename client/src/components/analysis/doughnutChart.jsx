import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';


const DoughnutChart = () => {
    const [resolvedTickets, setResolvedTickets] = useState([]);
    const [openedTickets, setOpenedTickets] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const resolvedResponse = await fetch('/api/analytics/resolved-tickets');
            const resolvedData = await resolvedResponse.json();
            setResolvedTickets(resolvedData);

            const openedResponse = await fetch('/api/analytics/opened-tickets');
            const openedData = await openedResponse.json();
            setOpenedTickets(openedData);
        };

        fetchData();
    }, []);

    const chartData = {
        labels: ['Resolved Tickets', 'Opened Tickets'],
        datasets: [
            {
                label: 'Counts',
                data: [resolvedTickets.length, openedTickets.length],
                backgroundColor: ['rgba(54, 162, 235, 0.2)', 'rgba(255, 99, 132, 0.2)'],
                borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div>
            <h2>Resolved and Opened Tickets</h2>
            <Doughnut data={chartData} />
        </div>
    );
};

export default DoughnutChart;
