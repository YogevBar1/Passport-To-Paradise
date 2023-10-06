import { OkPacket } from "mysql";
import appConfig from "../2-utils/app-config";
import dal from "../2-utils/dal";
import imageHelper from "../2-utils/image-helper";
import { ResourceNotFoundError, ValidationError } from "../3-models/client-errors";
import VacationModel from "../3-models/vacation-model";

// Get vacations followed by a user:
async function getVacationsFollowedByUser(userId: number) {
    const sql = `SELECT vacations.*
    FROM vacations
    INNER JOIN followers ON vacations.vacationId = followers.vacationId
    WHERE followers.userId = ${userId};
    `;

    const vacationsFollowedByUSer = await dal.execute(sql);
    return vacationsFollowedByUSer;
}

// Add a new vacation:
async function addVacation(newVacation: VacationModel): Promise<VacationModel> {

    // Check validity for all model properties:
    newVacation.validate();

    // Image is required only when adding a new vacation:
    if (!newVacation.image) throw new ValidationError("Please add an image.");

    const imageName = await imageHelper.saveImage(newVacation.image);
    const sql = `INSERT INTO vacations VALUES(DEFAULT, ?, ?, ?, ?, ?, ?)`; // Defend sql injection.
    const info: OkPacket = await dal.execute(sql,
        [newVacation.vacationDestination, newVacation.vacationDescription, newVacation.vacationStartDate, newVacation.vacationEndDate,
        newVacation.vacationPrice, imageName]);
    newVacation.vacationId = info.insertId; // Generate unique id.

    newVacation.imageUrl = `${appConfig.domainName}/api/vacations/${imageName}`; // Create reference for the image file.
    delete newVacation.image; // Remove the image object from the new vacation.

    return newVacation;
}

// Edit an existing vacation:
async function editVacation(vacation: VacationModel): Promise<VacationModel> {

    vacation.validate();
    let sql = "";
    let imageName = "";
    const values = [];

    const oldImage = await getOldImage(vacation.vacationId);


    // If client send image to update:
    if (vacation.image) {
        // If a new image is provided, update it
        imageName = await imageHelper.updateImage(vacation.image, oldImage);
        // Construct SQL query to update the image URL
        sql = `
                UPDATE vacations
    SET
    vacationDestination = ?,
        vacationDescription = ?,
        vacationStartDate = ?,
        vacationEndDate = ?,
        vacationPrice = ?,
        imageUrl = ?
            WHERE vacationId = ?
                `;

        values.push(vacation.vacationDestination, vacation.vacationDescription, vacation.vacationStartDate, vacation.vacationEndDate, vacation.vacationPrice, imageName, vacation.vacationId);

    } else {
        // If no new image is provided, retain the existing image
        imageName = oldImage;
        // Construct SQL query to keep the image URL the same
        sql = `
                UPDATE vacations
    SET
    vacationDestination = ?,
        vacationDescription = ?,
        vacationStartDate = ?,
        vacationEndDate = ?,
        vacationPrice = ?
            WHERE vacationId = ?
                `;
        values.push(vacation.vacationDestination, vacation.vacationDescription, vacation.vacationStartDate, vacation.vacationEndDate, vacation.vacationPrice, vacation.vacationId);

    }

    // Execute sql, get back info object:
    const info: OkPacket = await dal.execute(sql, values);

    // If no such vacation:
    if (info.affectedRows === 0) throw new ResourceNotFoundError(vacation.vacationId);

    // Get image URL:
    vacation.imageUrl = `${appConfig.domainName}/api/vacations/${imageName}`;

    // Remove Give image from vacation object because we don`t response it back
    delete vacation.image;

    // return new vacation
    return vacation;
}

// Function to retrieve the old image associated with a vacation by its ID
async function getOldImage(id: number): Promise<string> {
    // Construct a SQL query to select the image URL from the vacations table
    const sql = `SELECT imageUrl FROM vacations WHERE vacationId = ${id}`;

    // Execute the SQL query using the data access layer (DAL)
    const vacations = await dal.execute(sql);

    // Check if there are any results
    const vacation = vacations[0];

    // If no vacation is found with the given ID, return null
    if (!vacation) return null;

    // Extract the image URL from the vacation object
    const imageName = vacation.imageUrl;

    // Return the image name
    return imageName;
}

// Delete Vacation
async function deleteVacation(id: number): Promise<void> {
    // Take old Image:
    const oldImage = await getOldImage(id);

    // Delete that image
    await imageHelper.deleteImage(oldImage);

    // Create sql:
    const sql = `DELETE FROM vacations WHERE vacationId = ?`;

    // Execute sql, get back info object:
    const info: OkPacket = await dal.execute(sql, [id]);

    // If no such vacation (can also ignore this case):
    if (info.affectedRows === 0) throw new ResourceNotFoundError(id);

}

async function getFollowedVacations(userId: number): Promise<VacationModel[]> {
    const sql = `
    SELECT DISTINCT
        V.*,
        EXISTS(SELECT * FROM followers AS F WHERE V.vacationId = F.vacationId AND F.userId = ?) AS isFollowing,
        COUNT(F.userId) AS followersCount,
        CONCAT('http://localhost:4000/api/vacations/', imageUrl) AS imageUrl
    FROM vacations AS V
    LEFT JOIN followers AS F ON V.vacationId = F.vacationId
    GROUP BY V.vacationId
    ORDER BY V.vacationStartDate
        `;

    const vacations = await dal.execute(sql, [userId]);
    return vacations;
}


async function getOneVacation(vacationId: number): Promise<VacationModel> {
    const sql = `
    SELECT * 
    from vacations
    WHERE vacationId = ?
    `;

    const vacations = await dal.execute(sql, [vacationId]);
    if (vacations.length === 0) {
        // If no vacation found, return null or throw an error as per your preference
        return null;
    }
    const vacation = vacations[0];
    return vacation;
}

export default {
    addVacation,
    editVacation,
    deleteVacation,
    getVacationsFollowedByUser,
    getFollowedVacations,
    getOneVacation
};

