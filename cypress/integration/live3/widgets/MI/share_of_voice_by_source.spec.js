/* eslint-disable */
/// <reference types="cypress" />

describe('The "Share of Voice by Source" widget', () => {
  beforeEach(() => {
    cy.loadDashboard();
    cy.get("#widget-mi-share-of-voice").as("widget");
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
    cy.get("@widget").contains("Share of Voice by Source");
    cy.get("@widget").contains("Nintendo");
  });

  it("displays error and toast warning if endpoint fails", () => {
    cy.intercept("POST", "/api/dashboard/tagsovbysourcetype", {
      statusCode: 500,
    }).as("tagsovbysourcetype");

    cy.get(".c-tag").click({ force: true });
    cy.wait("@tagsovbysourcetype");
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

    cy.intercept("POST", "/api/dashboard/tagsovbysourcetype", {
      fixture: "post/widgets/tagSovBySourceType.json",
    }).as("tagsovbysourcetype");

    cy.contains("Facebook").click();

    cy.wait("@topStories");
    cy.contains("Please wait while we are processing your request").should(
      "not.exist"
    );
    cy.contains("Show filters").click();

    cy.get("@widget").contains("Share of Voice by Source");
    cy.get("@widget").contains("Facebook");
    cy.get("@widget").contains("Nintendo");

    cy.intercept("POST", "/api/dashboard/tagsovbysourcetype", {
      fixture: "/post/dashboard/tagsovbysourcetype.json",
    }).as("tagsovbysourcetypeInit");

    cy.get(".c-filter-bar__clear-button").click({ force: true });
    cy.wait("@tagsovbysourcetypeInit");
    cy.contains("Please wait while we are processing your request").should(
      "not.exist"
    );

    cy.get("@widget").contains("Share of Voice by Source");
    cy.get("@widget").contains("Blog");
    cy.get("@widget").contains("Consumer");
    cy.get("@widget").contains("Wires");
    cy.get("@widget").contains("Nintendo");
  });

  it("is not available when search is updated, and available after clearing filters", () => {
    cy.contains("Show filters").click();
    cy.get('[placeholder="Select Tone"]').click();

    cy.intercept("POST", "/api/dashboard/tagsovbysourcetype", {
      fixture: "post/widgets/tagSovBySourceTypeEmpty.json",
    }).as("tagSovBySourceTypeEmpty");

    cy.get(".c-multiple-select__list-item-label").last().click();
    cy.wait("@tagSovBySourceTypeEmpty");
    cy.get("body").click("bottomLeft", { force: true });

    cy.get("@widget").contains("No data was obtained for this search");
    // cy.get("@widget").contains("Not available for this filter configuration");

    cy.intercept("POST", "/api/dashboard/tagsovbysourcetype", {
      fixture: "/post/dashboard/tagsovbysourcetype.json",
    }).as("tagsovbysourcetypeInit");

    cy.get(".c-filter-bar__clear-button").click({ force: true });
    cy.wait("@tagsovbysourcetypeInit");
    cy.contains("Please wait while we are processing your request").should(
      "not.exist"
    );

    cy.get("@widget").contains("Share of Voice by Source");
    cy.get("@widget").contains("Blog");
    cy.get("@widget").contains("Consumer");
    cy.get("@widget").contains("Wires");
    cy.get("@widget").contains("Nintendo");
  });

  it("downloads a image", () => {
    cy.get("@widget").find(".c-options-button").click();
    cy.get(
      ".c-option-button__option:contains('Download image'):visible"
    ).click();

    cy.wait(3000);
    cy.checkFile("Share-of*.png");
  });

  it("downloads a csv", () => {
    cy.get("@widget").find(".c-options-button").click();
    cy.get(
      ".c-option-button__option:contains('Download data'):visible"
    ).click();

    cy.wait(1000);
    cy.checkFile("Share-of*.csv");
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
    cy.wait(2000);
    cy.get("body").then(($body) => {
      if ($body.find(".introjs-tooltipReferenceLayer").length > 0) {
        cy.get("a.introjs-skipbutton").click();
      }
    });
    cy.contains("Show filters").click();
    cy.get(".c-multiple-select__tag:contains('Blog')").should("be.visible");
    cy.get(".c-tag--selected:contains('Nintendo')").should("be.visible");
  });

  it("updates filter and redirects to feed after clicking in series label", () => {
    cy.intercept("POST", /api\/feed\/articles/, {
      fixture: "/post/articles/articles.json",
    }).as("correctFeedPage");

    cy.intercept("POST", /api\/dashboard\/articlecount/, {
      fixture: "/post/articles/articleCount.json",
    }).as("counterArticles");

    cy.get("@widget").contains("Consumer").click({ force: true });
    cy.url().should("include", "/media-intelligence/feed");
    cy.wait(2000);
    cy.get("body").then(($body) => {
      if ($body.find(".introjs-tooltipReferenceLayer").length > 0) {
        cy.get("a.introjs-skipbutton").click();
      }
    });
    cy.contains("Show filters").click();
    cy.get(".c-multiple-select__tag:contains('Consumer')").should("be.visible");
  });

  it("updates focus with legend click", () => {
    cy.intercept("POST", /api\/feed\/articles/, {
      fixture: "/post/articles/articles.json",
    }).as("correctFeedPage");

    cy.intercept("POST", /api\/dashboard\/articlecount/, {
      fixture: "/post/articles/articleCount.json",
    }).as("counterArticles");

    cy.get("@widget").contains("Nintendo").click({ force: true });
    cy.wait(1000);
    cy.get("body").then(($body) => {
      if ($body.find(".introjs-tooltip").length > 0) {
        cy.get("a.introjs-skipbutton").click();
      }
    });
    cy.get(".c-tag--selected:contains('Nintendo')").should("be.visible");
  });
});
