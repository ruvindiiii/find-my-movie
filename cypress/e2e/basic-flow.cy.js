describe("basic flow", () => {
  it("page loads and goes to login page", () => {
    cy.visit("http://localhost:5173/");
    cy.get(`a[href="/user-login"]`).click();
    cy.get("input").should("be.visible");
  });

  it("page loads and goes to login page", () => {
    cy.visit("http://localhost:5173/");
    cy.get(`a[href="/user-login"]`).click();
    cy.get("#username").should("be.visible");
    cy.get("#password").should("be.visible");
    cy.get("#username").type("ruvi");
    cy.get("#password").type("abc");
    cy.get("#login-button").click();
  });
});
