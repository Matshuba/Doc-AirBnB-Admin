import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from "../../firebaseConfig";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, Tooltip, Legend, CategoryScale, LinearScale } from 'chart.js';
import { Box, IconButton } from '@mui/material';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import './MainDashboard.css';

ChartJS.register(BarElement, Tooltip, Legend, CategoryScale, LinearScale);

const MainDashboard = () => {
    const [doctors, setDoctors] = useState([]);
    const [specialtiesData, setSpecialtiesData] = useState([]);
    const [specialtyLabels, setSpecialtyLabels] = useState([]);
    const [statusCount, setStatusCount] = useState({ on: 0, off: 0 });

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'doctors'));
                const fetchedDoctors = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                setDoctors(fetchedDoctors);

                const specialtiesCount = {};
                fetchedDoctors.forEach((doctor) => {
                    const speciality = doctor.speciality || "Unknown";
                    specialtiesCount[speciality] = (specialtiesCount[speciality] || 0) + 1;
                });

                setSpecialtiesData(Object.values(specialtiesCount));
                setSpecialtyLabels(Object.keys(specialtiesCount));

                // Count the doctors with status "Active" and "Suspend"
                const countStatus = { on: 0, off: 0 };
                fetchedDoctors.forEach((doctor) => {
                    if (doctor.status === "Active") {
                        countStatus.on += 1;
                    } else if (doctor.status === "Suspend") {
                        countStatus.off += 1;
                    }
                });

                setStatusCount(countStatus);
            } catch (error) {
                console.error("Failed to fetch doctors:", error);
            }
        };
        fetchDoctors();
    }, []);

    const data = {
        labels: specialtyLabels,
        datasets: [
            {
                label: 'Specialties',
                data: specialtiesData,
                backgroundColor: [
                    '#ff6384',
                    '#36a2eb',
                    '#ffce56',
                    '#4bc0c0',
                    '#9966ff',
                    '#c9cbcf',
                ],
                borderWidth: 1,
            },
        ],
    };

    const Topbar = () => {
        return (
            <Box className="topbar-container">
                <Box className="topbar-inner">
                    <Box className="icons-container">
                        <IconButton className="icon-button">
                            <NotificationsOutlinedIcon />
                        </IconButton>
                        <IconButton className="icon-button">
                            <SettingsOutlinedIcon />
                        </IconButton>
                    </Box>
                </Box>
            </Box>
        );
    };

    return (
        <div className="dashboard">
            {/* Topbar */}
            <Topbar />

            {/* Card Views */}
            <div className="card-container">
                <div className="card">
                    <h3>Total Doctors</h3>
                    <p>{doctors.length}</p>
                </div>
                <div className="card">
                    <h3>Status "On"</h3>
                    <p>{statusCount.on}</p>
                    <h3>Status "Off"</h3>
                    <p>{statusCount.off}</p>
                </div>
            </div>

            {/* Bar Graph and Doctor List Side by Side */}
            <div className="chart-doctor-container">
                {/* Bar Graph */}
                <div className="chart-container">
                    <h3>Distribution of Specialties</h3>
                    <Bar data={data} />
                </div>

                {/* List of Doctors and Locations */}
                <div className="doctor-list-container">
                    <h3>Doctors and Locations</h3>
                    <ul className="doctor-list">
                        {doctors.map((doctor) => (
                            <li key={doctor.id}>
                                <strong>{doctor.doctorName}</strong> - {doctor.location}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default MainDashboard;
