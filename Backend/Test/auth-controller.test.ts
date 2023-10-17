import { expect } from "chai";
import { describe, it } from "mocha";
import supertest from "supertest";
import app from "../src/app";

describe("Testing the auth controller", () => {

    // POST - register:
    it("Should add a new user to the database", async () => {

        // Hardcoded data for a new user:
        const user = {
            firstName: "Yogev",
            lastName: "Bar",
            email: "Test5@gmail.com", // Note to provide a valid & unique email.(change it after each test!)
            password: "BeitarJersulamWinners1936",
            roleId: 2
        };

        // Send request:
        const response = await supertest(app.server)
            .post("/api/register")
            .send(user);


        // Expectations:
        expect(response.status).to.equal(201); // Created

        expect(Object.values(response.body).some(value => typeof value === 'string')).to.be.true;

    });

    // POST - login:
    it("Should verify user credentials and provide a token", async () => {

        // Hardcoded data for user credentials:
        const credentials = {
            email: "yogevBar20241@gmail.com",
            password: "BeitarJersulamWinners1936",
        };

        // Send request:
        const response = await supertest(app.server)
            .post("/api/login")
            .send(credentials);

        // Expectations:
        expect(response.status).to.equal(200); // OK

        expect(Object.values(response.body).some(value => typeof value === 'string')).to.be.true;
    });
});
