import axios from "axios";
import FollowModel from "../Models/FollowModel";
import { authStore } from "../Redux/AuthState";
import appConfig from "../Utils/AppConfig";

class FollowService {
    public async followVacation(follow: FollowModel): Promise<void> {
        try {
            const options = {
                headers: { "Authorization": "Bearer " + authStore.getState().token }
            }
            await axios.post(appConfig.followUrl, follow, options);

        } catch (err: any) {
            console.error('Error following vacation:', err.message);
            // You can handle the error here, display an error message, or perform any other necessary actions.
        }
    }

    // Define a function to unfollow a vacation
    public async unFollowVacation(follow: FollowModel): Promise<void> {
        try {
            const options = {
                headers: { "Authorization": "Bearer " + authStore.getState().token }
            };

            await axios.delete(appConfig.unfollowUrl, {
                data: follow, // Send the FollowModel in the request body
                headers: options.headers,
            });
        } catch (err: any) {
            console.error('Error unfollowing vacation:', err.message);
        }
    }

    public async checkIfUserIsFollowing(userId: number, vacationId: number): Promise<boolean> {
        const options = {
            headers: { "Authorization": "Bearer " + authStore.getState().token }
        }

        const response = await axios.get(appConfig.isUserFollowUrl + userId + "/" + vacationId, options);

        // Extract the data from the response
        const isFollow = response.data;

        return isFollow;
    }
}
const followService = new FollowService();

export default followService;
