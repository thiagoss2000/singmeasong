// < reference types="cypress" />

import { faker } from "@faker-js/faker";

describe("teste ...", () => {
    it("first test", () => {
        const data = {
            name: faker.name.jobDescriptor(),
            link: `https://www.youtube.com/${faker.name.suffix()}`
        }

        cy.visit("http://localhost:3000/");
        cy.get("#name").type(data.name);
        cy.get("#link").type(data.link);

        cy.get("#submit").click();

        cy.get("#top").click();
        cy.url().should("equal", "http://localhost:3000/top")
        cy.get("#random").click();
        cy.url().should("equal", "http://localhost:3000/random")
    })
})