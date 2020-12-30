/* eslint-disable jest/valid-expect-in-promise */
/* eslint-disable no-undef */

describe("Home Page", () => {
    beforeEach(() => {
        cy.visit("/");
    });
    //logged out page version
    it("header contains welcome message when not logged in", () => {
        cy.get(".App-header").should("contain", "Garisson Scheduler System");
        cy.get(".intro-text").should("contain", "Welcome!");
        cy.get(".disclaimer").should("contain", "Disclaimer:");
    });
    it("contains links to login and registration pages when not logged in", () => {
        cy.get("#homeLoginLink").contains("Login");
        cy.get("#homeRegisterLink").contains("Register");
    });
    it("routes to the login page when clicked from home page", () => {
        cy.get("#homeLoginLink").click();
        cy.get("h2").contains("Login");
    })
    it("routes to the registration page when clicked from home page", () => {
        cy.get("#homeRegisterLink").click();
        cy.get("h2").contains("Registration");
    })
    //logged in page version
});
