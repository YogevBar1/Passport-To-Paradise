import { expect } from "chai";
import fs from "fs";
import { describe, it } from "mocha";
import * as os from "os";
import path from "path";
import supertest from "supertest";
import router from "../src/6-controllers/vacations-controller";
import app from "../src/app";

describe("Testing the vacation controller", () => {
    // Store the token in a variable
    const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJJZCI6MTYsImZpcnN0TmFtZSI6IkdhYnkiLCJsYXN0TmFtZSI6IkJhciIsImVtYWlsIjoiYWRtaW4xQGdtYWlsLmNvbSIsInJvbGVJZCI6MX0sImlhdCI6MTY5NzUyODE4NCwiZXhwIjoxNjk3NTM4OTg0fQ.3iYD542LfUKyimE4t4tr_P6hYTKczU8nML-4DtOJC_c";

    // Add vacation:
    it("Should add a new vacation to the database", async () => {
        // Hardcoded data for a new vacation:
        const vacation = {
            vacationDestination: "Barcelona",
            vacationDescription: "visit Barcelona",
            vacationStartDate: "2023-11-15",
            vacationEndDate: "2023-12-28",
            vacationPrice: 6500
        };

        // Buffer with dummy image data:
        const imageBuffer = Buffer.from("image-test.jpg");

        // Path to save the mock image:
        const mockImagePath = path.resolve(__dirname, "../src/1-assets/images/image-test.jpg");

        // Create the mock file:
        fs.writeFileSync(mockImagePath, imageBuffer);

        // Send the request to the backend with the token variable
        const response = await supertest(app.server)
            .post("/api/vacations")
            .set("Authorization", token) // Use the token variable
            .field("vacationDestination", vacation.vacationDestination)
            .field("vacationDescription", vacation.vacationDescription)
            .field("vacationStartDate", vacation.vacationStartDate)
            .field("vacationEndDate", vacation.vacationEndDate)
            .field("vacationPrice", vacation.vacationPrice)
            .attach("image", mockImagePath);

        // Expect the object to have a body and id:
        const addedVacation = response.body;
        expect(addedVacation).to.haveOwnProperty("vacationId");

        // Verify that the parsed price from the response matches the expected price in the test data:
        expect(parseFloat(addedVacation.vacationPrice)).to.equal(vacation.vacationPrice);
    });

    // Update vacation:
    it("Should update an existing vacation", async () => {
        // Hardcoded data for an updated vacation:
        const updatedVacation = {
            vacationDestination: "Madrid",
            vacationDescription: "Madrid city",
            vacationStartDate: "2024-01-01",
            vacationEndDate: "2024-11-10",
            vacationPrice: 9500
        };

        // Buffer with dummy image data:
        const imageBuffer = Buffer.from("image-test.jpg");

        // Create a temporary file to store the image:
        const tempImagePath = path.join(os.tmpdir(), "updatedMockImage.jpg");
        fs.writeFileSync(tempImagePath, imageBuffer);

        // Send request with the token variable
        const response = await supertest(router)
            .put("/api/vacations/71") // Provide a valid vacation ID
            .set("Authorization", token) // Use the token variable
            .field("vacationDestination", updatedVacation.vacationDestination)
            .field("vacationDescription", updatedVacation.vacationDescription)
            .field("vacationStartDate", updatedVacation.vacationStartDate)
            .field("vacationEndDate", updatedVacation.vacationEndDate)
            .field("vacationPrice", updatedVacation.vacationPrice)
            .attach("image", tempImagePath);

        // Expect the object to have a body & id:
        const updatedVacationResponse = response.body;
        // expect(updatedVacationResponse).to.haveOwnProperty("vacationId");

        console.log("updatedVacationResponse" + updatedVacationResponse);
        console.log("updatedVacation" + updatedVacation);

        // Verify that the parsed price from the response matches the updated price from the test data:
        expect(parseFloat(updatedVacationResponse.vacationPrice)).to.equal(updatedVacation.vacationPrice);

        // Clean up: Remove the temporary file
        fs.unlinkSync(tempImagePath);

    });


    // DELETE - existing vacation:
    it("Should delete an existing vacation", async () => {

        // Send DELETE request:
        const response = await supertest(app.server)
            .delete("/api/vacations/71") // Note to provide a valid id.
            .set("Authorization", token)

        // Expect 204 (No content):
        expect(response.status).to.equal(204);

    });

});


