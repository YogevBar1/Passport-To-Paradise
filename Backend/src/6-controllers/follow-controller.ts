import express, { NextFunction, Request, Response } from "express";
import FollowModel from "../3-models/follow-model";
import verifyToken from "../4-middleware/verify-token";
import followService from "../5-services/follow-service";

// Create the router part of express:
const router = express.Router();

// POST "http://localhost:4000/folllow"
router.post("/follow", verifyToken, async (request: Request, response: Response, next: NextFunction) => {

    // Get follow:
    const follow = new FollowModel(request.body);

    try {
        // Call the userFollow function from the service to insert the user-vacation relationship
        await followService.userFollow(follow);

        // Respond with a success message or status code
        response.status(200).json({ message: `User ${follow.userId} followed vacation ${follow.vacationId} successfully` });
    }
    catch (err: any) {
        next(err);
    }
});

// DELETE "http://localhost:4000/unfollow"
router.delete("/unfollow", verifyToken, async (request: Request, response: Response, next: NextFunction) => {

    const unFollow = new FollowModel(request.body);
    try {
        // Call the userFollow function from your service to delete the follow
        await followService.userUnFollow(unFollow);

        // Respond with a success message or status code
        response.status(200).json({ message: `User ${unFollow.userId} unFollowed vacation ${unFollow.vacationId} successfully` });
    }
    catch (err: any) {
        next(err);
    }
});

// GET "http://localhost:4000/checkIfUserIsFollowing/:userId/:vacationId"
router.get("/checkIfUserIsFollowing/:userId([0-9]+)/:vacationId([0-9]+)", verifyToken, async (request: Request, response: Response, next: NextFunction) => {
    const userId = +request.params.userId;
    const vacationId = +request.params.vacationId;

    try {
        // Call the checkIfUserIsFollowing function from the service 
        const isFollow = await followService.checkIfUserIsFollowing(userId, vacationId);

        response.status(200).json(isFollow);
    } catch (err: any) {
        next(err);
    }
});

export default router;
