import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bar, BarChart, CartesianGrid, Legend, XAxis, YAxis } from "recharts";
import RoleModel from "../../../Models/RoleModel";
import { authStore } from "../../../Redux/AuthState";
import notifyService from "../../../Services/NotifyService";
import vacationsService from "../../../Services/VacationsService";

/**
 * ReportVacation Component:
 * This component is responsible for displaying a bar chart that represents vacation followers count.
 * It fetches the data of followed vacations for the admin user and displays it in a bar chart.
 */
const ReportVacation = () => {
    // State to store vacation data for the chart
    const [vacationFollowersData, setVacationFollowersData] = useState<{ vacationDestination: string; followersCount: number; }[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if the user login:
        const token = authStore.getState().token;
        if (!token) {
            notifyService.error("Please Login");
            navigate("/login");
            return;
        }

        // Check if the user admin:
        const role = authStore.getState().user.roleId;
        if (role !== RoleModel.Admin) {
            notifyService.error("You don`t have access to this page");
            navigate("/home");
        }

        // Fetch and load vacation data for the chart
        const fetchData = async () => {
            try {
                // Fetch followed vacations for the logged-in user
                const vacations = await vacationsService.getFollowedVacations(authStore.getState().user.userId);

                // Prepare data for the chart by mapping vacation properties
                const data = vacations.map((vacation) => ({
                    vacationDestination: vacation.vacationDestination,
                    followersCount: vacation.followersCount
                }));

                // Set the data in the state
                setVacationFollowersData(data);

            } catch (error) {
                // Handle error here
                console.error("Error fetching data:", error);
            }
        };
        
        // Call fetchData when the component mounts
        fetchData();
    }, []);

    return (
        <div>
            <h2>Vacation Followers Report</h2>
            <BarChart width={1800} height={300} data={vacationFollowersData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="vacationDestination" />
                <YAxis />
                <Legend />
                <Bar dataKey="followersCount" fill="#8884d8" />
            </BarChart>
        </div>
    );
};

export default ReportVacation;
