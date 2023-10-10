import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import RoleModel from "../../../Models/RoleModel";
import VacationModel from "../../../Models/VacationModel";
import { authStore } from "../../../Redux/AuthState";
import notifyService from "../../../Services/NotifyService";
import vacationsService from "../../../Services/VacationsService";
import "./EditVacation.css";

function EditVacation(): JSX.Element {
    // Initialize useForm from react-hook-form to manage form state
    const { watch } = useForm<VacationModel>();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<VacationModel>(); // Destructure the errors object

    // Initialize state variables
    const [currentImagePreview, setCurrentImagePreview] = useState<string | undefined>("");

    // The new image:
    const [updatedImagePreview, setUpdatedImagePreview] = useState<File | null>(null);

    // Initialize navigate function from react-router-dom to handle page navigation
    const navigate = useNavigate();

    // Extract vacationId from URL params
    const params = useParams();
    const vacationId = +params.vacationId;

    // Fetch and populate form fields with existing vacation data
    useEffect(() => {
        // Check if user is authenticated
        const token = authStore.getState().token;
        if (!token) {
            notifyService.error("Please Login");
            navigate("/login");
            return;
        }

        // Check user role and restrict access if not an admin
        const role = authStore.getState().user.roleId;
        if (role !== RoleModel.Admin) {
            notifyService.error("You don't have access to this page");
            navigate("/home");
        }

        // Fetch vacation data by vacationId
        vacationsService.getOneVacation(vacationId)
            .then(backendVacation => {
                // Populate form fields with fetched data
                setValue("vacationDestination", backendVacation.vacationDestination);
                setValue("vacationDescription", backendVacation.vacationDescription);
                setValue("vacationStartDate", backendVacation.vacationStartDate.toString().split("T")[0]);
                setValue("vacationEndDate", backendVacation.vacationEndDate.toString().split("T")[0]);
                setValue("vacationPrice", backendVacation.vacationPrice);

                // Set current image preview
                // setCurrentImagePreview("http://localhost:4000/api/vacations/" + backendVacation.imageUrl);

                let imageUrl = backendVacation.imageUrl;

                // Check if the URL already has the prefix
                if (!imageUrl.startsWith("http://localhost:4000/api/vacations/")) {
                    imageUrl = "http://localhost:4000/api/vacations/" + imageUrl;
                }

                setCurrentImagePreview(imageUrl);


            })
            .catch(err => notifyService.error(err));
    }, [navigate, vacationId, setValue]);

    // Handle image change event
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const imageFile = e.target.files?.[0];
        if (imageFile) {
            setUpdatedImagePreview(imageFile);
            const reader = new FileReader();
            reader.onload = () => {
                setCurrentImagePreview(reader.result as string);
            };
            reader.readAsDataURL(imageFile);
        }
    };

    // Handle form submission
    async function send(vacation: VacationModel) {
        try {
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

            vacation.vacationId = vacationId;

            if (updatedImagePreview) {
                vacation.image = updatedImagePreview;
            } else {
                vacation.imageUrl = currentImagePreview || "";
            }

            await vacationsService.editVacation(vacation);
            notifyService.success("Vacation has been edited");
            navigate("/vacations");
        } catch (err: any) {
            notifyService.error(err.message || "An error occurred while editing the vacation.");
        }
    }

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
                <textarea
                    {...register("vacationDescription")}
                    required
                    minLength={2}
                    maxLength={250}
                    rows={8}
                    style={{ resize: "none" }} // Disable textarea resizing

                />
                {errors.vacationDescription && (
                    <span className="error">Description must be between 2 and 250 characters.</span>
                )}

                <label>Vacation Start Date: </label>
                <input
                    type="date"
                    {...register("vacationStartDate")}
                    required
                />
                <label>Vacation End Date: </label>
                <input
                    type="date"
                    {...register("vacationEndDate")}
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
                    onChange={handleImageChange}
                />

                {currentImagePreview && (
                    <div className="current-image-preview">
                        <p>Current Image Preview:</p>
                        <img
                            src={currentImagePreview}
                            alt="Current Vacation"
                            onLoad={() => console.log("Image loaded successfully")}
                            onError={() => console.log("Image failed to load: " + currentImagePreview)}
                        />
                    </div>
                )}

                <button className="btn btn-primary">Edit</button>
            </form>
        </div>
    );
}

export default EditVacation;
