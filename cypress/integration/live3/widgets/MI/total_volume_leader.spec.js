/* eslint-disable */
/// <reference types="cypress" />

describe('The "Total Volume (leader)" widget', () => {
  beforeEach(() => {
    cy.loadDashboard();
    cy.get("#widget-mi-volume").as("widget");
    cy.contains("Please wait while we are processing your request").should(
      "not.exist"
    );
  });

  afterEach(() => {
    cy.get(".c-error__page").should("not.exist");
  });

  it("is loaded", () => {
    cy.get("@widget").contains("Total Volume");
    cy.get("@widget").contains("-21");
    cy.get("@widget").contains("Nintendo");
  });

  it("displays error and toast warning if endpoint fails", () => {
    cy.intercept("POST", "/api/dashboard/topvolumetag", {
      statusCode: 500,
    }).as("topvolumetag");

    cy.get(".c-tag").click({ force: true });
    cy.wait("@topvolumetag");
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

    cy.intercept("POST", "/api/dashboard/topvolumetag", {
      fixture: "post/widgets/topVolumeTag.json",
    }).as("topVolumeTag");

    cy.get(".c-multiple-select__list-item-label").last().click();
    cy.wait("@topVolumeTag");
    cy.contains("Please wait while we are processing your request").should(
      "not.exist"
    );
    cy.contains("Show filters").click();

    cy.get("@widget").contains("Total Volume");
    cy.get("@widget").contains("-8");

    cy.intercept("POST", "/api/dashboard/topvolumetag", {
      fixture: "/post/dashboard/topVolumeTag.json",
    }).as("topVolumeTagInit");

    cy.get(".c-filter-bar__clear-button").click({
      force: true,
    });
    cy.wait("@topVolumeTagInit");
    cy.contains("Please wait while we are processing your request").should(
      "not.exist"
    );

    cy.get("@widget").contains("Total Volume");
    cy.get("@widget").contains("Nintendo");
    cy.get("@widget").contains("-21");
  });

  it("is not available when search is updated, and available after clearing filters", () => {
    cy.get("body").then(($body) => {
      if ($body.find(".introjs-tooltipReferenceLayer").length > 0) {
        cy.get("a.introjs-skipbutton").click();
      }
    });
    cy.contains("Show filters").click();
    cy.get('[placeholder="Select Tone"]').click();

    cy.intercept("POST", "/api/dashboard/topvolumetag", {
      statusCode: 500,
      fixture: "post/widgets/topVolumeTagEmpty.json",
    }).as("topVolumeTagEmpty");

    cy.get(".c-multiple-select__list-item-label").last().click();
    cy.wait("@topVolumeTagEmpty");

    cy.get("@widget").contains(
      "No data could be retrieved for this widget. Please try again or check the search parameters."
    );

    cy.intercept("POST", /api\/dashboard\/topvolumetag/, {
      fixture: "/post/dashboard/topvolumetag.json",
    }).as("topvolumetag");

    cy.get("body").click("bottomLeft", { force: true });
    cy.get(".c-filter-bar__clear-button").click({
      force: true,
    });
    cy.wait("@topvolumetag");
    cy.contains("Please wait while we are processing your request").should(
      "not.exist"
    );

    cy.get("@widget").contains("Total Volume");
    cy.get("@widget").contains("Nintendo");
    cy.get("@widget").contains("-21");
  });
});
