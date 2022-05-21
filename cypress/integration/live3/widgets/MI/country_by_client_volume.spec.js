/* eslint-disable */
/// <reference types="cypress" />

describe('The "Country by Client Volume" widget', () => {
  beforeEach(() => {
    cy.loadDashboard();
    cy.get("#widget-mi-country-by-client").as("widget");
    cy.contains("Please wait while we are processing your request").should(
      "not.exist"
    );
    cy.get("body").then(($body) => {
      if ($body.find(".introjs-tooltipReferenceLayer").length > 0) {
        cy.get("a.introjs-skipbutton").click();
      }
    });
  });

  afterEach(() => {
    cy.get(".c-error__page").should("not.exist");
  });

  it("is loaded", () => {
    cy.get("@widget").contains("Country by Client Volume");
  });

  it("is loaded with focus tag selected", () => {
    cy.get(".c-tag").click({ force: true });
    cy.get("@widget").contains("Nintendo");
  });

  it("displays error and toast warning if endpoint fails", () => {
    cy.intercept("POST", "/api/dashboard/countryanalysis", {
      statusCode: 500,
    }).as("countryanalysis");

    cy.get(".c-tag").click({ force: true });
    cy.wait("@countryanalysis");
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
    // cy.contains("Something went wrong. Please reload alva Live and try again");
  });

  it("is not available when search is updated, and available after clearing filters", () => {
    cy.contains("Show filters").click();
    cy.get('[placeholder="Select Tone"]').click();

    cy.intercept("POST", "/api/dashboard/countryanalysis", {
      fixture: "post/widgets/countryAnalysisEmpty.json",
    }).as("summaryPost");

    cy.get(".c-multiple-select__list-item-label").last().click();
    cy.wait("@summaryPost");
    cy.get("body").click("bottomLeft", { force: true });

    cy.get("@widget").contains("No data was obtained for this search");

    /*  cy.intercept("POST", /api\/dashboard\/countryanalysis/, {
      fixture: "/post/dashboard/summary.json",
    }).as("summary"); */

    cy.get(".c-filter-bar__clear-button").click({ force: true });
    // cy.wait("@summary");
    cy.contains("Please wait while we are processing your request").should(
      "not.exist"
    );

    cy.get("@widget").contains("Country by Client Volume");
  });

  it("refreshes after adding and removing filter", () => {
    cy.contains("Show filters").click();
    cy.get('[placeholder="Select Source Type"]').click();

    cy.intercept("POST", "/api/dashboard/countryanalysis", {
      fixture: "post/widgets/countryAnalysis.json",
    }).as("countryanalysis");

    cy.contains("Facebook").click();

    cy.wait("@countryanalysis");
    cy.contains("Please wait while we are processing your request").should(
      "not.exist"
    );
    cy.contains("Show filters").click();

    cy.get("@widget").contains("60");

    cy.intercept("POST", "/api/dashboard/countryanalysis", {
      fixture: "/post/dashboard/countryanalysis.json",
    }).as("countryanalysisInit");

    cy.get(".c-filter-bar__clear-button").click({ force: true });
    cy.wait("@countryanalysisInit");
    cy.contains("Please wait while we are processing your request").should(
      "not.exist"
    );

    cy.get("@widget").contains("7.5k");
  });

  it("downloads a image", () => {
    cy.get("@widget").find(".c-options-button").click();
    cy.get(
      ".c-option-button__option:contains('Download image'):visible"
    ).click();

    cy.wait(3000);
    cy.checkFile("Country-by*.png");
  });

  it("downloads a csv", () => {
    cy.get("@widget").find(".c-options-button").click();
    cy.get(
      ".c-option-button__option:contains('Download data'):visible"
    ).click();

    cy.wait(1000);
    cy.checkFile("Country-by*.csv");
  });

  it("updates filter and redirects to feed after clicking in country", () => {
    cy.intercept("POST", /api\/feed\/articles/, {
      fixture: "/post/articles/articles.json",
    }).as("correctFeedPage");

    cy.intercept("POST", /api\/dashboard\/articlecount/, {
      fixture: "/post/articles/articleCount.json",
    }).as("counterArticles");

    cy.get("@widget").get(".highcharts-key-ca").click({ force: true });

    cy.url().should("include", "/media-intelligence/feed");

    cy.get(".c-country-selector__list-item-flag")
      .find("img")
      .should("have.attr", "alt")
      .and("include", "CA Flag");
  });
});
