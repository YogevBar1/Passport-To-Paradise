import { describe, it } from "mocha";
import { expect } from "chai";
import supertest from "supertest";
import app from "../app";

describe("Testing the auth controller", () => {

    // POST - register:
    it("Should add a new user to the database", async () => {

        // Hardcoded data for a new user:
        const user = {
            firstName: "Test",
            lastName: "User",
            email: "testuser@example.com",
            password: "password123",
            roleId: 2
        };

        // Send request:
        const response = await supertest(app)
            .post("/auth/register")
            .send(user);

        // Expectations:
        expect(response.status).to.equal(201); // Created
        expect(response.body).to.have.property("token");
    });

    // POST - login:
    it("Should verify user credentials and provide a token", async () => {

        // Hardcoded data for user credentials:
        const credentials = {
            email: "testuser@example.com",
            password: "password123",
        };

        // Send request:
        const response = await supertest(app)
            .post("/auth/login")
            .send(credentials);

        // Expectations:
        expect(response.status).to.equal(200); // OK
        expect(response.body).to.have.property("token");
    });
});
