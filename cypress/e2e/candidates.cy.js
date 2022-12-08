// For the purpose of testing the set of data in the api.json
// is assumed to be in a constant environment- no new records would be added, making records shift.

const COMMENT = "I like that answer";
const USER_WITH_APPLICATION_1 = "Sara Marshall";
const USER_WITH_APPLICATION_2 = "Olessia Anderson";
const USER_WITHOUT_APPLICATION = "Karina Fraser";

const candidateSelector = '[data-cy-testid="candidate"]';
const detailsSelector = '[data-cy-testid="details"]';
const applicationSelector = '[data-cy-testid="application"]';
const videoSelector = '[data-cy-testid="video"]';
const commentFieldSelector = '[data-cy-testid="comment-field"]';
const commentBtnSelector = '[data-cy-testid="comment-btn"]';

describe("Candidates List", () => {
  it("lets add comment", () => {
    // Start from the index page
    cy.visit("http://localhost:3000/");

    cy.contains("Select candidate to preview details.");

    // can  see details about candidate when clicked
    cy.contains(USER_WITH_APPLICATION_1).click();
    cy.get(detailsSelector).contains(USER_WITH_APPLICATION_1);

    // can see answer to question
    cy.get(applicationSelector)
      .first()
      .click()
      .within(($applicaiton) => {
        // can see video
        cy.get(videoSelector).should("be.visible");
        // can add comment
        cy.get(commentFieldSelector).clear().type(COMMENT);
        cy.get(commentBtnSelector).click();
      });

    // can see saved comment after page reloads
    cy.reload();
    cy.contains(USER_WITH_APPLICATION_1).click();

    // can see answer to question
    cy.get(applicationSelector)
      .first()
      .click()
      .within(($question) => {
        // comment was saved
        cy.get(commentFieldSelector).contains(COMMENT).clear();
        cy.get(commentBtnSelector).click();
      });

    // can change candidate selection anytime and see their details
    cy.contains(USER_WITH_APPLICATION_2).click();
    cy.get(detailsSelector).contains(USER_WITH_APPLICATION_2);

    // can see candidate without applicaiton
    cy.contains(USER_WITHOUT_APPLICATION).click();
    cy.get(detailsSelector).contains(USER_WITHOUT_APPLICATION);
    cy.get(detailsSelector).contains(
      "Candidate didn't submit application yet."
    );
  });
});
