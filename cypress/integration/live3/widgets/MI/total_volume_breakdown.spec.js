/* eslint-disable */
/// <reference types="cypress" />

describe('The "Total Volume Tone Breakdown" widget', () => {
  beforeEach(() => {
    cy.loadDashboard();
    cy.get("#widget-mi-total-volume-tone-breakdown").as("widget");
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
    cy.get("@widget").contains("Total Volume Tone Breakdown");
  });

  it("is loaded with focus tag selected", () => {
    cy.get(".c-tag").click({ force: true });
    cy.get("@widget").contains("Nintendo");
  });

  it("displays error and toast warning if endpoint fails", () => {
    cy.intercept("POST", "/api/dashboard/summary", {
      statusCode: 500,
    }).as("summary");

    cy.get(".c-tag").click({ force: true });
    cy.wait("@summary");

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

  it("refreshes after adding and removing filter", () => {
    cy.contains("Show filters").click();
    cy.get('[placeholder="Select Source Type"]').click();

    cy.intercept("POST", "/api/dashboard/summary", {
      fixture: "post/widgets/summaryTonePositive.json",
    }).as("summary");

    cy.contains("Facebook").click();

    cy.wait("@summary");
    cy.contains("Please wait while we are processing your request").should(
      "not.exist"
    );
    cy.contains("Show filters").click();

    cy.get("@widget").contains("Total Volume Tone Breakdown");
    cy.get("@widget").find(".highcharts-title").contains(/^22k$/);
    cy.get("@widget").contains(/^63/);

    cy.intercept("POST", "/api/dashboard/summary", {
      fixture: "/post/dashboard/summary.json",
    }).as("summaryInit");

    cy.get(".c-filter-bar__clear-button").click({ force: true });
    cy.wait("@summaryInit");
    cy.contains("Please wait while we are processing your request").should(
      "not.exist"
    );

    cy.get("@widget").contains("Total Volume Tone Breakdown");
    cy.get("@widget").find(".highcharts-title").contains(/^22k$/);
    cy.get("@widget").contains(/^16k$/);
  });

  it("has empty data when search is updated, and available after clearing filters", () => {
    cy.contains("Show filters").click();
    cy.get('[placeholder="Select Tone"]').click();

    cy.intercept("POST", "/api/dashboard/summary", {
      fixture: "post/widgets/summaryZeroData.json",
    }).as("summaryPost");

    cy.get(".c-multiple-select__list-item-label").last().click();
    cy.wait("@summaryPost");
    cy.get("body").click("bottomLeft", { force: true });

    cy.get("@widget").contains("Total Volume Tone Breakdown");
    cy.get("@widget").find(".highcharts-title").contains(/^0$/);

    cy.intercept("POST", /api\/dashboard\/summary/, {
      fixture: "/post/dashboard/summary.json",
    }).as("summary");

    cy.get(".c-filter-bar__clear-button").click({ force: true });
    cy.wait("@summary");
    cy.contains("Please wait while we are processing your request").should(
      "not.exist"
    );

    cy.get("@widget").contains("Total Volume Tone Breakdown");
    cy.get("@widget").find(".highcharts-title").contains("+25k");
    cy.get("@widget").contains("+16k");
  });

  it("downloads a image", () => {
    cy.get("@widget").find(".c-options-button").click();
    cy.get(
      ".c-option-button__option:contains('Download image'):visible"
    ).click();

    cy.wait(3000);
    cy.checkFile("Total-Volume*.png");
  });

  it("downloads a csv", () => {
    cy.get("@widget").find(".c-options-button").click();
    cy.get(
      ".c-option-button__option:contains('Download data'):visible"
    ).click();

    cy.wait(1000);
    cy.checkFile("Total-Volume*.csv");
  });

  it("updates filter and redirects to feed after clicking in positive tone", () => {
    cy.intercept("POST", /api\/feed\/articles/, {
      fixture: "/post/articles/articles.json",
    }).as("correctFeedPage");

    cy.intercept("POST", /api\/dashboard\/articlecount/, {
      fixture: "/post/articles/articleCount.json",
    }).as("counterArticles");

    cy.get("@widget").find(".highcharts-point.highcharts-color-0").click();

    cy.url().should("include", "/media-intelligence/feed");

    cy.get(".c-multiple-select__tag").contains("Positive");
  });
});
