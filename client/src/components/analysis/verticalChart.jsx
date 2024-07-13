import fetcher from "@/_utils/fetcher";
import React, {useEffect, useState} from "react";
import fetcher from "@/_utils/fetcher";
import { Bar } from "react-chartjs-2";

const VerticalChart = () => {
    const [allTickets, setAllTickets] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [allProjects, setAllProjects] = useState([]);
}

useEffect(() => {
    const fetchData = async () => {
        const ticketsResponse = await fetcher('/api/analytics/all-tickets');
        const ticketsData = await ticketsResponse.json();
        setAllTickets(ticketsData);

        const usersResponse = await fetcher('/api/analytics/all-users');
        const usersData = await usersResponse.json();
        setAllUsers(usersData);

        const projectsResponse = await fetcher('/api/analytics/all-projects');
        const projectsData = await projectsResponse.json();
        setAllProjects(projectsData);
    };
    fetchData();
}, []);

