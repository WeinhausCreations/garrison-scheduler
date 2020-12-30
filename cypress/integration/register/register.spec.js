/* eslint-disable jest/valid-expect-in-promise */
/* eslint-disable no-undef */

describe("Home Page", () => {
    beforeEach(() => {
        cy.visit("/register");
    });
    it("has a form with fields for first name, last name, DoD ID number, email, and phone number on the first page and a button to go to the next page", () => {
        expect(cy.get('input[name="firstName"]')).toExist();
        expect(cy.get('input[name="lastName"]')).toExist();
        expect(cy.get('input[name="dodin"]')).toExist();
        expect(cy.get('input[name="email"]')).toExist();
        expect(cy.get('input[name="phone"]')).toExist();
        cy.get('button').contains("Next Page");
    });
    
});
