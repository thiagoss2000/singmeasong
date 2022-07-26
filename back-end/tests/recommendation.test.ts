import supertest from "supertest";
import app from "../src/app.js";
import dotenv from "dotenv";
import { faker } from '@faker-js/faker';
import { prisma } from "../src/database";
dotenv.config();

const data = {
    name: faker.name.suffix(),
    youtubeLink: `https://www.youtube.com/${faker.name.suffix}`
}

const dataWrong = {
    name: faker.name.suffix(),
    youtubeLink: faker.image.avatar()
}

const dataWrong1 = {
    name: "",
    youtubeLink: `https://www.youtube.com/${faker.name.suffix}`
}

describe("recommendation test", () => {
    it("testing post...", async () => {
        const response = await supertest(app).post("/recommendations").send(data);
        expect(response.statusCode).toBe(201);
    });

    it("testing post...", async () => {
        const response = await supertest(app).post("/recommendations").send(dataWrong);
        expect(response.statusCode).toBe(422);
    });

    it("testing post...", async () => {
        const response = await supertest(app).post("/recommendations").send(dataWrong1);
        expect(response.statusCode).toBe(422);
    });
    
    it("testing get...", async () => {
        const response = await supertest(app).get("/recommendations");
        expect(response.statusCode).toBe(200);
    });
  
    it("testing get...", async () => {
        const response = await supertest(app).get("/recommendations/random");
        expect(response.statusCode).toBe(200);
    });

    it("testing get...", async () => {
        const response = await supertest(app).get("/recommendations/top/3");
        expect(response.statusCode).toBe(200);
    });

    it("testing get...", async () => {
        const response = await supertest(app).get("/recommendations/1");
        expect(response.statusCode).toBe(200);
    });

    it("testing post...", async () => {
        const response = await supertest(app).post("/recommendations/1/upvote");
        expect(response.statusCode).toBe(200);
    });

    it("testing post...", async () => {
        const response = await supertest(app).post("/recommendations/1/downvote");
        expect(response.statusCode).toBe(200);
    });
});
