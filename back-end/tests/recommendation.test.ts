import supertest from "supertest";
import app from "../src/app.js";
import dotenv from "dotenv";
import { faker } from '@faker-js/faker';
import { prisma } from "../src/database.js";
dotenv.config();

const data = {
    name: faker.name.jobDescriptor(),
    youtubeLink: `https://www.youtube.com/${faker.name.suffix()}`
}

const data1 = {
    name: faker.name.jobDescriptor(),
    youtubeLink: `https://www.youtube.com/${faker.name.suffix()}`
}

const data2 = {
    name: faker.name.jobDescriptor(),
    youtubeLink: `https://www.youtube.com/${faker.name.suffix()}`
}

const dataWrong = {
    name: faker.name.jobDescriptor(),
    youtubeLink: faker.image.avatar()
}

const dataWrong1 = {
    name: "",
    youtubeLink: `https://www.youtube.com/${faker.name.suffix()}`
}

let id: number;

describe("recommendation test", () => {
    it("testing post...", async () => {
        await prisma.recommendation.deleteMany({});
        const response = await supertest(app).post("/recommendations").send(data);
        expect(response.statusCode).toBe(201);
        const response1 = await supertest(app).post("/recommendations").send(data1);
        expect(response1.statusCode).toBe(201);
        const response2 = await supertest(app).post("/recommendations").send(data2);
        expect(response2.statusCode).toBe(201);
    });

    it("testing post...", async () => {
        const response = await supertest(app).post("/recommendations").send(data);
        expect(response.statusCode).toBe(409);
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
        expect(response.body[0].score).toEqual(0);
        id = response.body[0].id;
    });
  
    it("testing get...", async () => {
        const response = await supertest(app).get("/recommendations/random");
        expect(response.statusCode).toBe(200);
    });

    it("testing get...", async () => {
        const response = await supertest(app).get("/recommendations/top/2");
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toEqual(2);
    });

    it("testing post...", async () => {
        const response = await supertest(app).post(`/recommendations/${id}/upvote`);
        expect(response.statusCode).toBe(200);
    });

    it("testing get...", async () => {
        const response = await supertest(app).get(`/recommendations/${id}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.score).toEqual(1);
    });

    it("testing post...", async () => {
        const response = await supertest(app).post(`/recommendations/${id}/downvote`);
        expect(response.statusCode).toBe(200);
    });

    it("testing get...", async () => {
        const response = await supertest(app).get(`/recommendations/${id}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.score).toEqual(0);
        await prisma.recommendation.deleteMany({});
    });
});