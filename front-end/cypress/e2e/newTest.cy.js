/* eslint-disable no-undef */
/// <reference types="cypress" />

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

        cy.intercept('POST', 'http://localhost:3000/recommendations', {
            body: {
              name: data.name,
              youtubeLink: data.link
            },
          }).as("postData");

        cy.get("#submit").click();

        cy.wait("@postData").then(e => {
         expect(e.response.statusCode).to.eq(201);
        })

        // cy.request("POST", "http://localhost:5000/recommendations", false, {
        //   name: data.name,
        //   youtubeLink: data.link
        // }).as("conflict");

        // cy.wait("@conflict").should(e => {
        //   expect(e.response.statusCode).to.eq(409);
        //  })

        cy.get("#top").click();
        cy.url().should("equal", "http://localhost:3000/top")
        cy.get("#random").click();
        cy.url().should("equal", "http://localhost:3000/random")

        cy.request("DELETE", "http://localhost:5000/reset");
    })
})