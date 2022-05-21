/* eslint-disable */
/// <reference types="cypress" />

describe('The "Total Volume" widget', () => {
  beforeEach(() => {
    cy.loadDashboard();
    cy.get("#widget-mi-total-volume").as("widget");
    cy.contains("Please wait while we are processing your request").should(
      "not.exist"
    );
  });

  afterEach(() => {
    cy.get(".c-error__page").should("not.exist");
  });

  it("is loaded", () => {
    cy.get("@widget").contains("25k");
    cy.get("@widget").contains("-21");
  });

  it("is loaded with focus tag selected", () => {
    cy.get(".c-tag").click({ force: true });
    cy.get("@widget").find("h5").contains("Nintendo");
  });

  it("displays error and toast warning if endpoint fails", () => {
    cy.intercept("POST", "/api/dashboard/summary", {
      statusCode: 500,
    }).as("summaryPost");

    cy.get(".c-tag").click({ force: true });
    cy.wait("@summaryPost");
    cy.contains("Please wait while we are processing your request").should(
      "not.exist"
    );

    cy.get("@widget")
      .should("be.visible")
      .contains(
        "No data could be retrieved for this widget. Please try again or check the search parameters."
      )
      .should("be.visible");

    //TODO: Toast should show
    // cy.contains("Something went wrong. Please reload alva Live and try again");
  });

  it("is loaded with empty or zero data", () => {
    cy.get("body").then(($body) => {
      if ($body.find(".introjs-tooltipReferenceLayer").length > 0) {
        cy.get("a.introjs-skipbutton").click();
      }
    });
    cy.contains("Show filters").click();
    cy.contains("Source Type").should("be.visible");
    cy.get('[placeholder="Select Source Type"]').click();

    cy.intercept("POST", "/api/dashboard/summary", {
      fixture: "post/widgets/summaryZeroData.json",
    }).as("summaryPost");

    cy.contains("Facebook").click();
    cy.wait("@summaryPost");
    cy.contains("Please wait while we are processing your request").should(
      "not.exist"
    );

    cy.contains("Show filters").click();
    cy.contains("Source Type").should("not.be.visible");
    cy.get("@widget").should("be.visible").contains("0");
  });

  it("refreshes after adding and removing filter", () => {
    cy.get("body").then(($body) => {
      if ($body.find(".introjs-tooltipReferenceLayer").length > 0) {
        cy.get("a.introjs-skipbutton").click();
      }
    });
    cy.contains("Show filters").click();
    cy.get('[placeholder="Select Tone"]').click();

    cy.intercept("POST", "/api/dashboard/summary", {
      fixture: "post/widgets/summaryTonePositive.json",
    }).as("summaryPost");

    cy.get(".c-multiple-select__list-item-label").last().click();
    cy.wait("@summaryPost");
    cy.contains("Please wait while we are processing your request").should(
      "not.exist"
    );

    cy.get("@widget").contains("16k");
    cy.get("@widget").contains("1456");

    cy.intercept("POST", /api\/dashboard\/summary/, {
      fixture: "/post/dashboard/summary.json",
    }).as("summary");

    cy.get(".c-filter-bar__clear-button").click({ force: true });
    cy.wait("@summary");
    cy.contains("Please wait while we are processing your request").should(
      "not.exist"
    );

    cy.get("@widget").contains("25k");
    cy.get("@widget").contains("-21");
  });
});
