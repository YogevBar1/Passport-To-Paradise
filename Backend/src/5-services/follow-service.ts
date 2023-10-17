import dal from "../2-utils/dal";
import FollowModel from "../3-models/follow-model";

// User make follow on vacation
async function userFollow(follow: FollowModel): Promise<void> {
    const sql = `
    INSERT INTO followers (userId, vacationId)
    VALUES (?, ?)
`;

    try {
        // Execute the SQL query to insert the user-vacation relationship
        await dal.execute(sql, [follow.userId, follow.vacationId]);
    } catch (error) {
        // Handle any errors that may occur during the database operation
        throw error;
    }
}

// User make unFollow on vacation
async function userUnFollow(follow: FollowModel): Promise<void> {
    const sql = `
        DELETE FROM followers
        WHERE userId = ? AND vacationId = ?
    `;

    try {
        // Execute the SQL query to insert the user-vacation relationship
        const info = await dal.execute(sql, [follow.userId, follow.vacationId]);

        if (info.affectedRows === 0) {
            // If no rows were affected, the relationship didn't exist
            throw new Error("Follow not exist.");
            // You can customize the error message as needed
        }

    } catch (error) {
        // Handle any errors that may occur during the database operation
        throw error;
    }

}

// Is the user follow the vacation?
async function checkIfUserIsFollowing(userId: number, vacationId: number): Promise<boolean> {
    const sql = `
    SELECT *
    FROM followers
    WHERE userId = ? AND vacationId = ?;
`;

    try {
        const result = await dal.execute(sql, [userId, vacationId]);
        return result.length > 0;

    } catch (error) {
        // Handle any errors that may occur during the database operation
        throw error;
    }
}

export default {
    userFollow,
    userUnFollow,
    checkIfUserIsFollowing
}