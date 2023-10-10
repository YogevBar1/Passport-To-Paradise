import { describe, it } from "mocha";
import { expect } from "chai";
import supertest from "supertest";
import app from "../app";

describe("Testing the vacation controller", () => {

    // Add vacation:
    it("Should add a new vacation to the database", async () => {

        // Hardcoded data for a new vacation:
        const vacation = {
            vacationDestination: "Paris",
            vacationDescription: "The city of lights",
            vacationStartDate: "2023-10-28",
            vacationEndDate: "2023-11-28",
            vacationPrice: 6500
        };

        // Send request:
        const response = await supertest(app)
            .post("/vacations/vacations")
            .send(vacation);

        // Expectations:
        expect(response.status).to.equal(201); // Created
        expect(response.body).to.have.property("vacationId");
    });

    // Update vacation:
    it("Should update an existing vacation", async () => {

        // Hardcoded data for an updated vacation:
        const updatedVacation = {
            vacationDestination: "London",
            vacationDescription: "The city of Harry Potter",
            vacationStartDate: "2024-01-01",
            vacationEndDate: "2024-01-10",
            vacationPrice: 9500
        };

        // Send request:
        const response = await supertest(app)
            .put("/vacations/vacations/30") // Provide a valid vacation ID
            .send(updatedVacation);

        // Expectations:
        expect(response.status).to.equal(200); // OK
        expect(response.body).to.have.property("vacationId");
    });

    // Delete vacation:
    it("Should delete an existing vacation", async () => {
        // Send DELETE request:
        const response = await supertest(app)
            .delete("/vacations/vacations/30"); // Provide a valid vacation ID

        // Expectations:
        expect(response.status).to.equal(204); // No Content
    });
});
