/* eslint-disable */
/// <reference types="cypress" />

describe('The "Tone (leader)" widget', () => {
  beforeEach(() => {
    cy.loadDashboard();
    cy.get("#widget-mi-tone").as("widget");
    cy.contains("Please wait while we are processing your request").should(
      "not.exist"
    );
  });

  afterEach(() => {
    cy.get(".c-error__page").should("not.exist");
  });

  it("is loaded", () => {
    cy.get("@widget").contains("Tone");
    cy.get("@widget").contains("Leader");
    cy.get("@widget").contains("Nintendo");
  });

  it("displays error and toast warning if endpoint fails", () => {
    cy.intercept("POST", "/api/dashboard/toptonetag", {
      statusCode: 500,
    }).as("toptonetag");

    cy.get(".c-tag").click({ force: true });
    cy.wait("@toptonetag");
    cy.contains("Please wait while we are processing your request").should(
      "not.exist"
    );
    cy.wait(1000);

    cy.get("@widget")
      .should("be.visible")
      .contains(
        "No data could be retrieved for this widget. Please try again or check the search parameters."
      )
      .should("be.visible");

    //TODO: Toast should show
    //  cy.contains("Something went wrong. Please reload alva Live and try again");
  });

  it("refreshes after adding and removing filter", () => {
    cy.get("body").then(($body) => {
      if ($body.find(".introjs-tooltipReferenceLayer").length > 0) {
        cy.get("a.introjs-skipbutton").click();
      }
    });
    cy.contains("Show filters").click();
    cy.get('[placeholder="Select Source Type"]').click();
    cy.contains("Facebook").click();

    cy.intercept("POST", "/api/dashboard/toptonetag", {
      fixture: "post/widgets/topToneTag.json",
    }).as("topToneTag");

    cy.get(".c-multiple-select__list-item-label").last().click();
    cy.wait("@topToneTag");
    cy.contains("Please wait while we are processing your request").should(
      "not.exist"
    );
    cy.contains("Show filters").click();

    cy.get("@widget").contains("Tone");
    cy.get("@widget").contains("Nintendo");
    cy.get("@widget").contains("-20");

    cy.intercept("POST", "/api/dashboard/toptonetag", {
      fixture: "/post/dashboard/toptonetag.json",
    }).as("topToneTagInit");

    cy.get(".c-filter-bar__clear-button").click({ force: true });
    cy.wait("@topToneTagInit");
    cy.contains("Please wait while we are processing your request").should(
      "not.exist"
    );

    cy.get("@widget").contains("Tone");
    cy.get("@widget").contains("Nintendo");
    cy.get("@widget").contains("-2");
  });

  it("is not available when search is updated, and available after clearing filters", () => {
    cy.get("body").then(($body) => {
      if ($body.find(".introjs-tooltipReferenceLayer").length > 0) {
        cy.get("a.introjs-skipbutton").click();
      }
    });
    cy.contains("Show filters").click();
    cy.get('[placeholder="Select Tone"]').click();

    cy.intercept("POST", "/api/dashboard/toptonetag", {
      statusCode: 500,
      fixture: "post/widgets/topToneTagEmpty.json",
    }).as("topToneTagEmpty");

    cy.get(".c-multiple-select__list-item-label").last().click();
    cy.wait("@topToneTagEmpty");
    cy.get("body").click("bottomLeft", { force: true });

    cy.get("@widget").contains(
      "No data could be retrieved for this widget. Please try again or check the search parameters."
    );

    cy.intercept("POST", /api\/dashboard\/toptonetag/, {
      fixture: "/post/dashboard/toptonetag.json",
    }).as("toptonetag");

    cy.get("body").click("bottomLeft", { force: true });
    cy.get(".c-filter-bar__clear-button").click({ force: true });
    cy.wait("@toptonetag");
    cy.contains("Please wait while we are processing your request").should(
      "not.exist"
    );

    cy.get("@widget").contains("Tone");
    cy.get("@widget").contains("Nintendo");
    cy.get("@widget").contains("-2");
  });
});
