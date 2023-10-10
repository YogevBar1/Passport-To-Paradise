import { useForm } from "react-hook-form";
import VacationModel from "../../../Models/VacationModel";
import "./InsertVacation.css";
import { useNavigate } from "react-router-dom";
import notifyService from "../../../Services/NotifyService";
import vacationsService from "../../../Services/VacationsService";
import { useEffect, useState } from "react";
import { authStore } from "../../../Redux/AuthState";
import RoleModel from "../../../Models/RoleModel";

/**
 * The `InsertVacation` component enables administrators to add new vacation details.
 * Administrators can input the destination, description, start and end dates, price,
 * and select an image for the new vacation. The component validates the vacation data
 * and sends a POST request to create the vacation on the server.
 */
function InsertVacation(): JSX.Element {

    // Initialize the form handling with react-hook-form
    const { register, handleSubmit, watch } = useForm<VacationModel>();
    const navigate = useNavigate();

    // State to manage image preview
    const [currentImagePreview, setCurrentImagePreview] = useState<string | undefined>("");

    // State to track if a new image is selected
    const [newImageSelected, setNewImageSelected] = useState<boolean>(false);

    // State to store the selected image file
    const [selectedImage, setSelectedImage] = useState<File | null>(null);

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
    }, [navigate]);

    // Function to handle image selection
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Get the selected image file from the input element
        const imageFile = e.target.files?.[0];

        // Check if an image file was selected
        if (imageFile) {
            // Set the selected image file in the state
            setSelectedImage(imageFile);

            // Indicate that a new image has been selected
            setNewImageSelected(true);

            // Create a FileReader to read the image file
            const reader = new FileReader();

            // When the FileReader finishes reading the file, this event handler is called
            reader.onload = () => {
                // Set the image preview when the file is loaded
                setCurrentImagePreview(reader.result as string);
            };

            // Read the selected image file as a data URL (base64 encoded)
            reader.readAsDataURL(imageFile);
        }
    };

    // Function to handle form submission
    const send = async (vacation: VacationModel) => {
        try {
            // Check if the end date is before the start date
            if (vacation.vacationStartDate > vacation.vacationEndDate) {
                notifyService.error("Please select an end date that comes after the start date of the vacation.");
                return;
            }

            // Trim the values to remove leading and trailing spaces
            vacation.vacationDestination = vacation.vacationDestination.trim();
            vacation.vacationDescription = vacation.vacationDescription.trim();

            // Check if the values consist only of spaces or are empty
            if (vacation.vacationDestination === "" || vacation.vacationDescription === "") {
                notifyService.error("Vacation destination and description cannot be empty or consist only of spaces.");
                return;
            }

            // Check if the value consists of a single regular character followed by spaces
            if (/^[^\s][\s]*$/.test(vacation.vacationDestination) || /^[^\s][\s]*$/.test(vacation.vacationDescription)) {
                notifyService.error("Vacation destination and description cannot start with a regular character followed by spaces.");
                return;
            }

            // Check if a new image was selected
            vacation.image = newImageSelected ? (selectedImage as File) : undefined;

            // Send a POST request to add the vacation
            await vacationsService.addVacation(vacation);
            notifyService.success("Vacation has been added");
            // Navigate back to the home page
            navigate("/vacations");
        } catch (err: any) {
            // Handle any errors that occur during the process
            notifyService.error(err);
        }
    };

    // Get the selected start date
    const selectedStartDate = watch("vacationStartDate");

    return (
        <div className="AddVacation">
            <h2>Add Vacation:</h2>
            <form onSubmit={handleSubmit(send)}>
                <label>Vacation Destination:</label>
                <input
                    type="text"
                    {...register("vacationDestination")}
                    required
                    minLength={2}
                    maxLength={50}
                />
                <label>Vacation Description:</label>
                <textarea
                    {...register("vacationDescription")}
                    required
                    minLength={2}
                    maxLength={250}
                    rows={8}
                    style={{ resize: "none" }} // Disable textarea resizing

                />

                <label>Vacation Start Date: </label>
                <input
                    type="date"
                    {...register("vacationStartDate")}
                    min={new Date().toISOString().split("T")[0]}
                    required
                />
                <label>Vacation End Date: </label>
                <input
                    type="date"
                    {...register("vacationEndDate")}
                    // Minimum end date should be the selected start date or today's date
                    min={
                        selectedStartDate
                            ? new Date(selectedStartDate).toISOString().split("T")[0]
                            : new Date().toISOString().split("T")[0]
                    }
                    required
                />
                <label>Price: </label>
                <input
                    type="number"
                    step="0.01"
                    {...register("vacationPrice")}
                    required
                    min="0"
                    max="9999.99"
                />
                <label>Image: </label>
                <input
                    type="file"
                    accept="image/*"
                    {...register("image")}
                    onChange={handleImageChange}
                />

                {/* Display the image preview only when a new image has been selected */}
                {newImageSelected && (
                    <div className="current-image-preview">
                        <p>Selected Image Preview:</p>
                        <img
                            src={currentImagePreview}
                            alt="Selected Vacation"
                            onLoad={() => console.log("Image loaded successfully")}
                            onError={() =>
                                console.log("Image failed to load: " + currentImagePreview)
                            }
                        />
                    </div>
                )}
                <button className="btn btn-primary">Add Vacation</button>

            </form>
        </div>
    );
}

export default InsertVacation;


