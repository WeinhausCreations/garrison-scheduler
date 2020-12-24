/* eslint-disable jest/valid-expect-in-promise */
/* eslint-disable no-undef */

describe("Home Page", () => {
    beforeEach(() => {
        cy.visit("/");
    });
    it("header contains welcome message when not logged in", () => {
        cy.get(".App-header").should("contain", "Garisson Scheduler System");
        cy.get("p").should("contain", "Welcome!");
    });
});
