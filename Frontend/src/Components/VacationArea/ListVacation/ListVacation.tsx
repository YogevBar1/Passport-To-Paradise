import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import VacationModel from "../../../Models/VacationModel";
import { authStore } from "../../../Redux/AuthState";
import notifyService from "../../../Services/NotifyService";
import vacationsService from "../../../Services/VacationsService";
import VacationCard from "../VacationCard/VacationCard";
import "./ListVacation.css";
import RoleModel from "../../../Models/RoleModel";

/**
 * The `ListVacation` component displays a list of vacations, with filtering options for users.
 * Administrators can view all vacations, download vacation data as a CSV file, and add new vacations.
 * Users can filter vacations by followed status, upcoming start dates, and currently active vacations.
 * Users can also view and interact with vacation cards, including following/unfollowing vacations.
 */
function ListVacation(): JSX.Element {
    const navigate = useNavigate();
    const [frontendVacations, setFrontendVacations] = useState<VacationModel[]>(
        []
    );
    const [currentPage, setCurrentPage] = useState<number>(1);
    const vacationsPerPage = 9;
    const [user, setUser] = useState<UserModel>();
    const [showFollowed, setShowFollowed] = useState<boolean>(false); // State to track if checkbox is checked
    const [showUpcoming, setShowUpcoming] = useState<boolean>(false); // State to track if "Show Upcoming Vacations" checkbox is checked
    const [showActive, setShowActive] = useState<boolean>(false); // State to track if "Show Active Vacations" checkbox is checked
    const [vacationDeleted, setVacationDeleted] = useState<boolean>(false); // Add state to trigger re-render

    const [filteredVacations, setFilteredVacations] = useState<VacationModel[]>(
        []
    ); // State to store filtered vacations

    const handleUpdateVacations = (vacationId: number, followed: boolean) => {
        // Update the frontendVacations state
        setFrontendVacations((prevVacations) =>
            prevVacations.map((vacation) =>
                vacation.vacationId === vacationId
                    ? { ...vacation, isFollowing: followed }
                    : vacation
            )
        );
    };

    useEffect(() => {
        // Check if the user login:
        const token = authStore.getState().token;
        // If the user is not logged in, show an error message and navigate to the login page
        if (!token) {
            notifyService.error("Please Login");
            navigate("/login");
            return;
        }

        // Get the logged-in user from the application state and set it in the component's state
        const loggedUser = authStore.getState().user;
        setUser(loggedUser);



        // Fetch followed vacations for the logged-in user and update component state
        vacationsService
            .getFollowedVacations(loggedUser?.userId)
            .then(backendVacations => {
                // Sort the fetched vacations by start date
                backendVacations.sort(
                    (a, b) =>
                        new Date(a.vacationStartDate).getTime() -
                        new Date(b.vacationStartDate).getTime()
                );
                // Set both frontend and filtered vacations to the fetched data
                setFrontendVacations(backendVacations);
                setFilteredVacations(backendVacations);
            })
            .catch((err) => notifyService.error(err));
    }, [navigate, vacationDeleted]);

    // Function to convert data to CSV
    function convertToCSV(data: VacationModel[]): string {
        const header = "Followers,Destination\n";
        // Map each vacation to a CSV row containing followers count and destination
        const csvData = data.map((item) => `${item.followersCount},${item.vacationDestination}`).join("\n");
        return header + csvData;
    }

    // Handler for changing the current page in pagination
    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    // Calculate the total number of pages based on the filtered vacations and vacations per page
    const totalPages = Math.ceil(filteredVacations.length / vacationsPerPage);

    // Calculate the index of the last vacation to display on the current page
    const indexOfLastVacation = currentPage * vacationsPerPage;

    // Calculate the index of the first vacation to display on the current page
    const indexOfFirstVacation = indexOfLastVacation - vacationsPerPage;

    // Function to filter vacations based on the checkbox state
    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;

        // Create new state variables for each checkbox
        let newShowFollowed = showFollowed;
        let newShowUpcoming = showUpcoming;
        let newShowActive = showActive;

        if (name === "showFollowed") {
            newShowFollowed = checked;
        } else if (name === "showUpcoming") {
            newShowUpcoming = checked;
        } else if (name === "showActive") {
            newShowActive = checked;
        }

        // Calculate the filtered vacations based on the new checkbox states
        // Calculate the current date for filtering
        const currentDate = new Date();
        // Filter the vacations based on the new checkbox states
        const filteredVacationsByCheckbox = frontendVacations.filter((vacation) => {
            // Determine if the "Show Followed Vacations" checkbox is checked
            const isFollowed = newShowFollowed;

            // Determine if the "Show Upcoming Vacations" checkbox is checked
            const isUpcoming = newShowUpcoming;

            // Determine if the "Show Active Vacations" checkbox is checked
            const isActive = newShowActive;

            // Convert vacation start and end dates to Date objects
            const vacationStartDate = new Date(vacation.vacationStartDate);
            const vacationEndDate = new Date(vacation.vacationEndDate);

            // Define the filter conditions based on the combination of checkboxes
            let meetsFilterConditions = true;
            if (isFollowed) {
                meetsFilterConditions = meetsFilterConditions && vacation.isFollowing;
            }
            // Check if "Show Upcoming Vacations" is checked and the vacation starts in the future
            if (isUpcoming) {
                meetsFilterConditions = meetsFilterConditions && vacationStartDate > currentDate;
            }
            // Check if "Show Active Vacations" is checked and the vacation is currently active
            if (isActive) {
                meetsFilterConditions =
                    meetsFilterConditions &&
                    vacationStartDate <= currentDate &&
                    vacationEndDate >= currentDate;
            }
            // Return true if the vacation meets all filter conditions, otherwise false
            return meetsFilterConditions;
        });

        // Update the checkbox states and filtered vacations
        setShowFollowed(newShowFollowed);
        setShowUpcoming(newShowUpcoming);
        setShowActive(newShowActive);
        setFilteredVacations(filteredVacationsByCheckbox);
        setCurrentPage(1);
    };

    const currentVacations = filteredVacations.slice(
        indexOfFirstVacation,
        indexOfLastVacation
    );

    // Function to handle deleting a vacation
    const handleDeleteVacation = async (vacationId: number) => {
        try {
            // Display a confirmation dialog
            const confirmed = window.confirm("Are you sure you want to delete this vacation?");

            if (!confirmed) {
                // The user canceled the deletion
                return;
            }

            // Call the deleteVacation function from the vacationsService
            await vacationsService.deleteVacation(vacationId);

            // Update the frontendVacations state by filtering out the deleted vacation
            setFrontendVacations((prevVacations) =>
                prevVacations.filter((vacation) => vacation.vacationId !== vacationId)
            );

            notifyService.success("The vacation has been successfully deleted");

            // Trigger a re-render by updating vacationDeleted
            setVacationDeleted((prevValue) => !prevValue);

        } catch (error) {
            console.error("Error deleting vacation:", error);
        }
    };

    // Function to handle downloading the CSV
    function handleDownloadCSV() {
        // Generate a timestamp for the current date and time
        const timestamp = new Date().toISOString().replace(/[^0-9]/g, '');

        // Create a filename with the timestamp
        const filename = `vacations_${timestamp}.csv`;

        // Convert the filteredVacations data to CSV format
        const csvData = convertToCSV(filteredVacations);

        // Create a Blob object with the CSV data
        const blob = new Blob([csvData], { type: "text/csv" });

        // Create a temporary URL for the Blob
        const url = window.URL.createObjectURL(blob);

        // Create an anchor element for the download
        const a = document.createElement("a");
        a.href = url;
        a.download = filename; // Use the filename with the timestamp

        // Trigger a click event to start the download
        a.click();

        // Clean up by revoking the Blob URL
        window.URL.revokeObjectURL(url);
    }

    return (
        <div className="List">
            {user && user.roleId === RoleModel.Admin && <NavLink to="/vacations/add">Add Vacation</NavLink>}
            <br></br>
            {user && user.roleId === RoleModel.Admin && <NavLink to="/vacations/report">Vacation Report</NavLink>}

            <div>
                {user && user.roleId === RoleModel.Admin && (
                    <button
                        onClick={handleDownloadCSV}
                        className="btn btn-primary"
                    >Download CSV file</button>
                )}
            </div>

            {user && user.roleId === RoleModel.User &&
                <div >
                    <label>
                        <input
                            type="checkbox"
                            name="showFollowed"
                            checked={showFollowed}
                            onChange={handleCheckboxChange}
                        />{" "}
                        Show Followed Vacations
                    </label>
                    <br></br>
                    <label>
                        <input
                            type="checkbox"
                            name="showUpcoming"
                            checked={showUpcoming}
                            disabled={showActive}
                            onChange={handleCheckboxChange}
                        />{" "}
                        Show Upcoming Vacations
                    </label>
                    <br></br>
                    <label>
                        <input
                            type="checkbox"
                            name="showActive"
                            checked={showActive}
                            disabled={showUpcoming}
                            onChange={handleCheckboxChange}
                        />{" "}
                        Show Active Vacations
                    </label>
                </div>
            }
            <div className="pagination">
                {filteredVacations.length > 0 && (
                    <>
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i}
                                onClick={() => handlePageChange(i + 1)}
                                className={currentPage === i + 1 ? "active" : ""}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </>
                )}
            </div>

            <h2>Our Vacations</h2>
            <div className="vacation-cards">

                {currentVacations.map((vacation) => (
                    <VacationCard
                        key={vacation.vacationId}
                        vacation={vacation}
                        userId={user.userId}
                        followersCount={vacation.followersCount}
                        user={user}
                        onDelete={handleDeleteVacation}
                        onUpdateVacations={handleUpdateVacations}
                    />

                ))}
            </div>

            <div className="pagination">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i}
                        onClick={() => handlePageChange(i + 1)}
                        className={currentPage === i + 1 ? "active" : ""}
                    >
                        {i + 1}
                    </button>
                ))}
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default ListVacation;

