/* eslint-disable */
/// <reference types="cypress" />

describe('The "Comparative tone breakdown" widget', () => {
  beforeEach(() => {
    cy.loadDashboard();
    cy.get("#widget-mi-comparative-tone-breakdown").as("widget");
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
    cy.get("@widget").contains("Comparative Tone Breakdown");
    cy.get("@widget").contains("Positive");
    cy.get("@widget").contains("Nintendo");
  });

  it("displays error and toast warning if endpoint fails", () => {
    cy.intercept("POST", "/api/dashboard/tonebytag", {
      statusCode: 500,
    }).as("tonebytag");

    cy.get(".c-tag").click({ force: true });
    cy.wait("@tonebytag");
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

    cy.intercept("POST", "/api/dashboard/tonebytag", {
      fixture: "post/widgets/toneByTag.json",
    }).as("topToneTag");

    cy.contains("Facebook").click();

    cy.wait("@topToneTag");
    cy.contains("Please wait while we are processing your request").should(
      "not.exist"
    );
    cy.contains("Show filters").click();

    cy.get("@widget").contains("Comparative Tone Breakdown");
    cy.get("@widget").contains("Positive");
    cy.get("@widget").contains("Nintendo");

    cy.intercept("POST", "/api/dashboard/tonebytag", {
      fixture: "/post/dashboard/tonebytag.json",
    }).as("tonebytagInit");

    cy.get(".c-filter-bar__clear-button").click({ force: true });
    cy.wait("@tonebytagInit");
    cy.contains("Please wait while we are processing your request").should(
      "not.exist"
    );

    cy.get("@widget").contains("Comparative Tone Breakdown");
    cy.get("@widget").contains("Positive");
    cy.get("@widget").contains("Nintendo");
  });

  it("is not available when search is updated, and available after clearing filters", () => {
    cy.contains("Show filters").click();
    cy.get('[placeholder="Select Tone"]').click();

    cy.intercept("POST", "/api/dashboard/tonebytag", {
      statusCode: 500,
      fixture: "post/widgets/toneByTagEmpty.json",
    }).as("toneByTagEmpty");

    cy.get(".c-multiple-select__list-item-label").last().click();
    cy.wait("@toneByTagEmpty");
    cy.get("body").click("bottomLeft", { force: true });

    cy.get("@widget").contains("Not available for this filter configuration");

    cy.intercept("POST", /api\/dashboard\/tonebytag/, {
      fixture: "/post/dashboard/tonebytag.json",
    }).as("tonebytag");

    cy.get("body").click("bottomLeft", { force: true });
    cy.get(".c-filter-bar__clear-button").click({ force: true });
    cy.wait("@tonebytag");
    cy.contains("Please wait while we are processing your request").should(
      "not.exist"
    );

    cy.get("@widget").contains("Comparative Tone Breakdown");
    cy.get("@widget").contains("Positive");
    cy.get("@widget").contains("Nintendo");
  });

  it("downloads a image", () => {
    cy.get("@widget").find(".c-options-button").click();
    cy.get("@widget")
      .get(".c-option-button__option:contains('Download image'):visible")
      .click();

    cy.wait(3000);
    cy.checkFile("Comparative-Tone*.png");
  });

  it("downloads a csv", () => {
    cy.get("@widget").find(".c-options-button").click();
    cy.get(
      ".c-option-button__option:contains('Download data'):visible"
    ).click();

    cy.wait(1000);
    cy.checkFile("Comparative-Tone*.csv");
  });

  it("updates filter and redirects to feed after clicking in positive tone bar", () => {
    cy.intercept("POST", /api\/feed\/articles/, {
      fixture: "/post/articles/articles.json",
    }).as("correctFeedPage");

    cy.get("@widget").find(".highcharts-series.highcharts-series-0").click();

    cy.url().should("include", "/media-intelligence/feed");

    cy.get(".c-multiple-select__tag").contains("Positive");
    cy.get(".c-tag--selected:contains('Nintendo')").should("be.visible");
  });

  it("updates filter and redirects to feed after clicking in legend", () => {
    cy.intercept("POST", /api\/feed\/articles/, {
      fixture: "/post/articles/articles.json",
    }).as("correctFeedPage");

    cy.intercept("POST", /api\/dashboard\/articlecount/, {
      fixture: "/post/articles/articleCount.json",
    }).as("counterArticles");

    cy.get("@widget")
      .find(".c-legend__item-text:contains('Positive')")
      .click({ force: true });

    cy.url().should("include", "/media-intelligence/feed");
    cy.get(".c-multiple-select__tag").contains("Positive");
  });

  it("updates focus tag and redirects to feed after clicking in label", () => {
    cy.intercept("POST", /api\/feed\/articles/, {
      fixture: "/post/articles/articles.json",
    }).as("correctFeedPage");

    cy.intercept("POST", /api\/dashboard\/articlecount/, {
      fixture: "/post/articles/articleCount.json",
    }).as("counterArticles");

    cy.get("@widget")
      .find(".highcharts-xaxis-labels")
      .should("contain", "Nintendo")
      .click();

    cy.url().should("include", "/media-intelligence/feed");
    cy.get(".c-tag--selected").contains("Nintendo");
  });
});
