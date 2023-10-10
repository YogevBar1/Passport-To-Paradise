import express, { Request, Response, NextFunction } from "express";
import dataService from "../5-services/vacations-service";
import verifyAdmin from "../4-middleware/verify-admin";
import verifyToken from "../4-middleware/verify-token";
import VacationModel from "../3-models/vacation-model";
import vacationsService from "../5-services/vacations-service";
import StatusCode from "../3-models/status-code";
import path from "path";

const router = express.Router();

// POST http://localhost:4000/api/vacations
router.post("/vacations", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {

    try {
        // Add image from request.files into request.body:
        request.body.image = request.files?.image;

        // Get vacation sent from frontend:
        const vacation = new VacationModel(request.body);

        // Add vacation to database:
        const addedVacation = await vacationsService.addVacation(vacation);

        // Response back the added vacation: 
        response.status(StatusCode.Created).json(addedVacation);
    }
    catch (err: any) {
        next(err);
    }

});

// Get vacations that followed by the user
// Get http://localhost:4000/vacations/:userId
router.get("/vacationsFollowedByUserId/:userId([0-9]+)", verifyToken, async (request: Request, response: Response, next: NextFunction) => {
    try {
        // Extract the userId from request.params
        const userId = +request.params.userId;
        const vacationsFollowedByUSer = await vacationsService.getVacationsFollowedByUser(userId);
        response.json(vacationsFollowedByUSer);
    }
    catch (err: any) { next(err); }

});

// PUT "http://localhost:4000/vacations/:vacationId
router.put("/vacations/:vacationId([0-9]+)", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {

    try {

        // Extract route id into body:
        request.body.vacationId = +request.params.vacationId;

        // Add image from request.files into request.body:
        request.body.image = request.files?.image;

        // Get vacation sent from frontend:
        const vacation = new VacationModel(request.body);

        // Update vacation to database:
        const updatedVacation = await vacationsService.editVacation(vacation);

        //Response back the added vacation
        response.json(updatedVacation);

    }
    catch (err: any) {
        next(err);
    }
});

router.delete("/vacations/:id([0-9]+)", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {

    try {
        // Get route id:
        const id = +request.params.id;

        // Delete product from database:
        await vacationsService.deleteVacation(id);

        // Response back:
        response.sendStatus(StatusCode.NoContent);
    }
    catch (err: any) {
        next(err);
    }
});

// Get http://localhost:4000/getFollowedVacations/:userId
router.get("/getFollowedVacations/:userId", verifyToken, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const userId = +request.params.userId;
        const followedVacations = await vacationsService.getFollowedVacations(userId);
        response.json(followedVacations);
    }
    catch (err: any) { next(err); }

});

// Get all vacation Image
// Get http://localhost:4000/vacations/:imageUrl
router.get("/vacations/:imageUrl", async (request: Request, response: Response, next: NextFunction) => {
    try {

        //Get image URL
        const imageUrl = request.params.imageUrl;

        // Get image absoluth path
        const absolutePath = path.join(__dirname, "..", "1-assets", "images", imageUrl)

        // Response back the file
        response.sendFile(absolutePath);
    }
    catch (err: any) { next(err); }

});

// Get "http://localhost:4000/vacationsById/:vacationId"
router.get("/vacationsById/:vacationId([0-9]+)", verifyToken, async (request: Request, response: Response, next: NextFunction) => {

    try {        
        // Get route id:
        const vacationId = +request.params.vacationId;

        // Get one product from database:
        const vacation = await vacationsService.getOneVacation(vacationId);

        //Response back desired vacation
        response.json(vacation);

    }
    catch (err: any) {
        next(err);
    }
});

export default router;
