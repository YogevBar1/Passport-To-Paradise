import axios from "axios";
import FollowModel from "../Models/FollowModel";
import { authStore } from "../Redux/AuthState";
import appConfig from "../Utils/AppConfig";

// FollowService class encapsulates functions related to following and unfollowing vacations
class FollowService {
    // Function to follow a vacation
    public async followVacation(follow: FollowModel): Promise<void> {
        try {
            // Set up headers with authorization token
            const options = {
                headers: { "Authorization": "Bearer " + authStore.getState().token }
            }

            // Send a POST request to follow a vacation
            await axios.post(appConfig.followUrl, follow, options);

        } catch (err: any) {
            // Handle errors during the follow process
            console.error('Error following vacation:', err.message);
        }
    }

    // Function to unfollow a vacation
    public async unFollowVacation(follow: FollowModel): Promise<void> {
        try {
            // Set up headers with authorization token
            const options = {
                headers: { "Authorization": "Bearer " + authStore.getState().token }
            };

            // Send a DELETE request to unfollow a vacation
            await axios.delete(appConfig.unfollowUrl, {
                data: follow, // Send the FollowModel in the request body
                headers: options.headers,
            });
        } catch (err: any) {
            // Handle errors during the unfollow process
            console.error('Error unfollowing vacation:', err.message);
        }
    }

    // Function to check if a user is following a vacation
    public async checkIfUserIsFollowing(userId: number, vacationId: number): Promise<boolean> {
        try {
            // Set up headers with authorization token
            const options = {
                headers: { "Authorization": "Bearer " + authStore.getState().token }
            }

            // Send a GET request to check if the user is following the vacation
            const response = await axios.get(appConfig.isUserFollowUrl + userId + "/" + vacationId, options);

            // Extract the data from the response
            const isFollow = response.data;

            return isFollow;
        } catch (err: any) {
            // Handle errors during the check process
            console.error('Error checking if user is following vacation:', err.message);
            return false; // Return false in case of an error
        }
    }
}

// Create an instance of the FollowService class
const followService = new FollowService();

// Export the followService instance
export default followService;
