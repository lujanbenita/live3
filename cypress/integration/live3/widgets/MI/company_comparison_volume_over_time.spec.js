/* eslint-disable */
/// <reference types="cypress" />

describe('The "Company Comparison Volume" widget', () => {
  beforeEach(() => {
    cy.loadDashboard();
    cy.get("#widget-mi-company-comparison-bars").as("widget");
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
    cy.get("@widget").contains("Company Comparison - Volume Over Time");
    cy.get("@widget").contains("Nintendo");
  });

  it("displays error and toast warning if endpoint fails", () => {
    cy.intercept("POST", "/api/dashboard/tagovertimeanalysis", {
      statusCode: 500,
    }).as("tagovertimeanalysis");

    cy.get(".c-tag").click({ force: true });
    cy.wait("@tagovertimeanalysis");

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

    cy.intercept("POST", "/api/dashboard/tagovertimeanalysis", {
      fixture: "post/widgets/tagOvertimeAnalysisEmpty.json",
    }).as("tagOvertimeAnalysisEmpty");

    cy.get(".c-multiple-select__list-item-label").last().click();
    cy.wait("@tagOvertimeAnalysisEmpty");
    cy.get("body").click("bottomLeft", { force: true });

    cy.get("@widget").contains("No data was obtained for this search");
    //cy.get("@widget").contains("Not available for this filter configuration");

    cy.intercept("POST", /api\/dashboard\/tagovertimeanalysis/, {
      fixture: "/post/dashboard/tagovertimeanalysis.json",
    }).as("tagovertimeanalysis");

    cy.get(".c-filter-bar__clear-button").click({ force: true });
    cy.wait("@tagovertimeanalysis");
    cy.contains("Please wait while we are processing your request").should(
      "not.exist"
    );

    cy.get("@widget").contains("Company Comparison - Volume Over Time");
  });

  it("refreshes after adding and removing filter", () => {
    cy.contains("Show filters").click();
    cy.get('[placeholder="Select Source Type"]').click();

    cy.intercept("POST", "/api/dashboard/tagovertimeanalysis", {
      fixture: "post/widgets/tagOvertimeAnalysis.json",
    }).as("tagOvertimeAnalysis");

    cy.contains("Facebook").click();

    cy.wait("@tagOvertimeAnalysis");
    cy.contains("Please wait while we are processing your request").should(
      "not.exist"
    );
    cy.contains("Show filters").click();

    cy.get("@widget").contains("Company Comparison - Volume Over Time");
    cy.get("@widget").contains("Nintendo");
    cy.get("@widget").contains("60k");

    cy.intercept("POST", "/api/dashboard/tagovertimeanalysis", {
      fixture: "/post/dashboard/tagovertimeanalysis.json",
    }).as("tagovertimeanalysisInit");

    cy.get(".c-filter-bar__clear-button").click({ force: true });
    cy.wait("@tagovertimeanalysisInit");
    cy.contains("Please wait while we are processing your request").should(
      "not.exist"
    );

    cy.get("@widget").contains("Company Comparison - Volume Over Time");
    cy.get("@widget").contains("Nintendo");
    cy.get("@widget").contains("6k");
  });

  it("downloads a image", () => {
    cy.get("@widget").find(".c-options-button").click();
    cy.get(
      ".c-option-button__option:contains('Download image'):visible"
    ).click();

    cy.wait(3000);
    cy.checkFile("Company-Comparison*.png");
  });

  it("downloads a csv", () => {
    cy.get("@widget").find(".c-options-button").click();
    cy.get(
      ".c-option-button__option:contains('Download data'):visible"
    ).click();

    cy.wait(1000);
    cy.checkFile("Company-Comparison*.csv");
  });

  it("updates filter and redirects to feed after clicking in first bar", () => {
    cy.intercept("POST", /api\/feed\/articles/, {
      fixture: "/post/articles/articles.json",
    }).as("correctFeedPage");

    cy.intercept("POST", /api\/dashboard\/articlecount/, {
      fixture: "/post/articles/articleCount.json",
    }).as("counterArticles");

    cy.get("@widget")
      .find(".highcharts-point.highcharts-color-0")
      .first()
      .click();

    cy.url().should("include", "/media-intelligence/feed");
    cy.get("body").then(($body) => {
      if ($body.find(".introjs-tooltipReferenceLayer").length > 0) {
        cy.get("a.introjs-skipbutton").click();
      }
    });

    cy.get(".rs-picker-toggle").click({ force: true });
    cy.get(".rs-calendar-table-cell-selected").contains("19");
    cy.get(".c-tag--selected:contains('Nintendo')").should("be.visible");
  });

  it("updates focus tag and redirects to feed after clicking in legend", () => {
    cy.intercept("POST", /api\/feed\/articles/, {
      fixture: "/post/articles/articles.json",
    }).as("correctFeedPage");

    cy.intercept("POST", /api\/dashboard\/articlecount/, {
      fixture: "/post/articles/articleCount.json",
    }).as("counterArticles");

    cy.get("@widget")
      .find(".c-legend__item-text:contains('Nintendo')")
      .click({ force: true });

    cy.url().should("include", "/media-intelligence/feed");

    cy.get(".c-tag--selected:contains('Nintendo')").should("be.visible");
  });

  // TODO: series label click not working
  /* it.only("updates filter and redirects to feed after clicking in series label", () => {
    cy.intercept("POST", /api\/feed\/articles/, {
      fixture: "/post/articles/articles.json",
    }).as("correctFeedPage");

    cy.intercept("POST", /api\/dashboard\/articlecount/, {
      fixture: "/post/articles/articleCount.json",
    }).as("counterArticles");

    cy.get("@widget")
      .find(".highcharts-xaxis-labels")
      .contains("10-19")
      .click({ force: true });

    cy.url().should("include", "/media-intelligence/search/feed");

    cy.get(".c-date-picker").click();
    cy.get(".rs-calendar-table-cell-selected").should("contain", "19");
  }); */
});
