import axios from "axios";
import VacationModel from "../Models/VacationModel";
import { authStore } from "../Redux/AuthState";
import { VacationAction, VacationsActionType, vacationStore } from "../Redux/VacationState";
import appConfig from "../Utils/AppConfig";

class VacationsService {

    public async addVacation(vacation: VacationModel): Promise<void> {
        const options = {
            headers: {
                "Authorization": "Bearer " + authStore.getState().token,
                "Content-Type": "multipart/form-data" // Include files in the request
            }
        };

        // Send Vacation to the backend
        const response = await axios.post<VacationModel>(appConfig.vacationsUrl, vacation, options);

        // Extract the added Vacation sent back from the backend:
        const addedVacation = response.data;

        // Add added Vacation to global state:
        const action: VacationAction = { type: VacationsActionType.AddVacation, payload: addedVacation };
        vacationStore.dispatch(action);

    }

    public async getFollowedVacations(userId: number): Promise<VacationModel[]> {

        const options = {
            headers: { "Authorization": "Bearer " + authStore.getState().token }
        }

        const response = await axios.get(appConfig.getFollowedVacations + userId, options);
        const vacations = response.data;
        return vacations;
    }

    public async editVacation(vacation: VacationModel): Promise<VacationModel> {

        const options = {
            headers: {
                "Authorization": "Bearer " + authStore.getState().token,
                "Content-Type": "multipart/form-data" // Include files in the request
            }
        };

        // Send the edited vacation to the backend
        const response = await axios.put<VacationModel>(
            appConfig.vacationsUrl + vacation.vacationId, 
            vacation,
            options
        );

        // Extract the edited vacation sent back from the backend:
        const editedVacation = response.data;

        // Update the vacation in the global state:
        const action: VacationAction = {
            type: VacationsActionType.EditVacation,
            payload: editedVacation
        };
        vacationStore.dispatch(action);

        return editedVacation;
    }

    //Get one Vacation from the backend:
    public async getOneVacation(id: number): Promise<VacationModel> {

        const options = {
            headers: {
                "Authorization": "Bearer " + authStore.getState().token,
                "Content-Type": "multipart/form-data" // Include files in the request
            }
        };

        // Get Vacations from global state:
        let vacations = vacationStore.getState().vacations;

        // Find desired vacation:
        let vacation = vacations.find(vacation => vacation.vacationId === id)

        //if vacation not found:
        if (!vacation) {

            // Get one vacation into response Object:
            const response = await axios.get<VacationModel>(appConfig.getOneVacation + id, options);

            //Extract the vacation from the response
            vacation = response.data;

        }
        // return vacation:
        return vacation;
    }

    public async deleteVacation(vacationId: number): Promise<void> {
        const options = {
            headers: {
                "Authorization": "Bearer " + authStore.getState().token,
            },
        };

        // Send a DELETE request to the backend to delete the vacation
        await axios.delete(`${appConfig.vacationsUrl}${vacationId}`, options);
    }
}
const vacationsService = new VacationsService();

export default vacationsService;
