import { createStore } from "redux";
import VacationModel from "../Models/VacationModel";

// 1. Global State:
export class VacationState {
    public vacations: VacationModel[] = []; // Init with an empty array
}

// 2. Action type:
export enum VacationsActionType {
    AddVacation = "AddVacation",
    EditVacation = "EditVacation",
    DeleteVacation = "DeleteVacation"
}

// 3. Action:
export interface VacationAction {
    type: VacationsActionType;  // Action Type
    payload?: any; // The data related to the action
}

// 4. Reducer (invoked by the redux library):
export function vacationsReducer(currentState = new VacationState(), action: VacationAction): VacationState {
    const newState = { ...currentState }; // Duplicate the global state

    // Change the duplicated global state according to the action:
    switch (action.type) {

        case VacationsActionType.AddVacation: // Here the payload is a single vacation to add:
            newState.vacations.push(action.payload); // Add that vacation into the global state.
            break;

        case VacationsActionType.EditVacation: // Here the payload is a single vacation to update
            const indexToUpdate = newState.vacations.findIndex(v => v.vacationId === action.payload.id);
            if (indexToUpdate >= 0) newState.vacations[indexToUpdate] = action.payload;
            break;

        case VacationsActionType.DeleteVacation: // Here the payload is the id to delete
            const indexToDelete = newState.vacations.findIndex(v =>  v.vacationId === action.payload);
            if (indexToDelete >= 0) newState.vacations.splice(indexToDelete, 1);
            break;
    }

    return newState; // Return the changed duplicated global state.
}

// 5. Store:
export const vacationStore = createStore(vacationsReducer);


