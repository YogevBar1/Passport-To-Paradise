import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import RoleModel from "../../../Models/RoleModel";
import VacationModel from "../../../Models/VacationModel";
import { authStore } from "../../../Redux/AuthState";
import notifyService from "../../../Services/NotifyService";
import vacationsService from "../../../Services/VacationsService";
import "./EditVacation.css";


/**
 * The `EditVacation` component allows administrators to edit an existing vacation's details.
 * Administrators can modify the vacation's destination, description, start and end dates, price,
 * and select a new image for the vacation. The component ensures that the new vacation data
 * is valid and makes a PUT request to update the vacation on the server.
 */
function EditVacation(): JSX.Element {
    // Initialize react-hook-form
    const { watch } = useForm<VacationModel>();
    const { register, handleSubmit, setValue } = useForm<VacationModel>();

    // State for image preview
    const [currentImagePreview, setCurrentImagePreview] = useState<string | undefined>("");

    // State to store the selected image file
    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    // Get the navigation function
    const navigate = useNavigate();
    // Get the vacationId from the URL params
    const params = useParams();
    const vacationId = +params.vacationId;

    // UseEffect to fetch and set initial values
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

        // Fetch the vacation data for editing
        vacationsService.getOneVacation(vacationId)
            .then(backendVacation => {
                // Set form fields with the fetched data
                setValue("vacationDestination", backendVacation.vacationDestination);
                setValue("vacationDescription", backendVacation.vacationDescription);
                setValue("vacationStartDate", backendVacation.vacationStartDate.toString().split("T")[0]);
                setValue("vacationEndDate", backendVacation.vacationEndDate.toString().split("T")[0]);
                setValue("vacationPrice", backendVacation.vacationPrice);

                // Set the image URL for preview
                setCurrentImagePreview("http://localhost:4000/api/vacations/" + `${backendVacation.imageUrl}`);
            })
            .catch(err => notifyService.error(err));
    }, [vacationId, setValue]);

    // Function to handle image selection
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const imageFile = e.target.files?.[0];
        if (imageFile) {
            setSelectedImage(imageFile);
            const reader = new FileReader();
            reader.onload = () => {
                setCurrentImagePreview(reader.result as string);
            };
            reader.readAsDataURL(imageFile);
        }
    };

    async function send(vacation: VacationModel) {
        try {
            // Check if the end date is before the start date
            if (vacation.vacationStartDate > vacation.vacationEndDate) {
                notifyService.error("Please select an end date that comes after the start date of the vacation.");
                return;
            }
            vacation.vacationId = vacationId;

            // Check if a new image was selected
            if (selectedImage) {
                vacation.image = selectedImage;

            } else {
                // If no new image was selected, set the image URL to the current one
                vacation.imageUrl = currentImagePreview || "";
            }

            // Send a PUT request to edit the vacation
            await vacationsService.editVacation(vacation);
            notifyService.success("Vacation has been edited");
            // Navigate back to the home page
            navigate("/vacations");
        } catch (err: any) {
            // Handle any errors that occur during the process
            notifyService.error(err);
        }
    }

    // Get the selected start date
    const selectedStartDate = watch("vacationStartDate");
    return (
        <div className="EditVacation">
            <h2>Edit Vacation:</h2>
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
                <input
                    type="text"
                    {...register("vacationDescription")}
                    required
                    minLength={2}
                    maxLength={250}
                />
                <label>Vacation Start Date: </label>
                <input
                    type="date"
                    {...register("vacationStartDate")}
                    //No validate on start date because we edit vacation
                    required
                />
                <label>Vacation End Date: </label>
                <input
                    type="date"
                    {...register("vacationEndDate")}
                    // Minimum end date should be the selected start date or today's date
                    min={selectedStartDate}
                    required
                />
                <label>Price: </label>
                <input
                    type="number"
                    step="0.01"
                    {...register("vacationPrice")}
                    required
                    min="50"
                    max="9999.99"
                />

                <label>Image: </label>
                <input
                    type="file"
                    accept="image/*"
                    {...register("image")}
                    onChange={handleImageChange} // Add onChange to handle image selection
                />
                {/* Display the current image preview */}
                {currentImagePreview && (
                    <div className="current-image-preview">
                        <p>Current Image Preview:</p>
                        <img
                            src={currentImagePreview}
                            alt="Current Vacation"
                            onLoad={() => console.log("Image loaded successfully")}
                            onError={() => console.log("Image failed to load: " + currentImagePreview)} // Handle image loading error
                        />
                    </div>
                )}

                <button>Edit</button>
            </form>
        </div>
    );
}

export default EditVacation;






