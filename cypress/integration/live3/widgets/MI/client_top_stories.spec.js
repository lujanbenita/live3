/* eslint-disable */
/// <reference types="cypress" />

describe('The "Client Top Stories" widget', () => {
  beforeEach(() => {
    cy.loadDashboard();
    cy.get("#widget-mi-top-stories").as("widget");
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
    cy.get("@widget").contains("Client Top Stories");
    cy.get("@widget").contains("Can a game become too influent");
    cy.get("@widget").contains("Financial Times ");
  });

  /*
   it("is loaded with focus tag selected", () => {
    cy.get(".c-tag").click({ force: true });
    cy.get("@widget").contains("Nintendo");
  }); 
  */

  it("displays error and toast warning if endpoint fails", () => {
    cy.intercept("POST", "/api/dashboard/topstories", {
      statusCode: 500,
    }).as("topstories");

    cy.get(".c-tag").click({ force: true });
    cy.wait("@topstories");
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

    cy.intercept("POST", "/api/dashboard/topstories", {
      fixture: "post/widgets/topStories.json",
    }).as("topStories");

    cy.contains("Facebook").click();

    cy.wait("@topStories");
    cy.contains("Please wait while we are processing your request").should(
      "not.exist"
    );
    cy.contains("Show filters").click();

    cy.get("@widget").contains("Client Top Stories");
    cy.get("@widget").contains("The best Cyber Monday Nintendo");
    cy.get("@widget").contains("Centro de Informes ");

    cy.intercept("POST", "/api/dashboard/topstories", {
      fixture: "/post/dashboard/topstories.json",
    }).as("topstoriesInit");

    cy.get(".c-filter-bar__clear-button").click({ force: true });
    cy.wait("@topstoriesInit");
    cy.contains("Please wait while we are processing your request").should(
      "not.exist"
    );

    cy.get("@widget").contains("Client Top Stories");
    cy.get("@widget").contains("Can a game become too influent");
    cy.get("@widget").contains("Financial Times ");
  });

  it("is not available when search is updated, and available after clearing filters", () => {
    cy.intercept("POST", "/api/dashboard/topstories", {
      fixture: "/post/widgets/resultsEmpty.json",
    }).as("topstoriesEmpty");

    cy.contains("Show filters").click();
    cy.get('[placeholder="Select Tone"]').click();

    cy.get(".c-multiple-select__list-item-label").last().click();
    cy.wait("@topstoriesEmpty");

    cy.get("body").click("bottomLeft", { force: true });

    cy.get("@widget").contains("No data was obtained for this search");

    cy.intercept("POST", "/api/dashboard/topstories", {
      fixture: "/post/dashboard/topstories.json",
    }).as("topstoriesInit");

    cy.get(".c-filter-bar__clear-button").click({ force: true });
    cy.wait("@topstoriesInit");
    cy.contains("Please wait while we are processing your request").should(
      "not.exist"
    );

    cy.get("@widget").contains("Client Top Stories");
    cy.get("@widget").contains("Can a game become too influent");
    cy.get("@widget").contains("Financial Times ");
  });

  it("shows article in modal if story is clicked", () => {
    cy.intercept("GET", "/api/feed/articles/*", {
      fixture: "/get/article/article.json",
      statusCode: 200,
    }).as("selectArticle");

    cy.get("@widget").contains("Metroid Dread review").click();
    cy.wait("@selectArticle");
    cy.contains("Nintendo Switch Black Friday deals 2021: Best offers on");
    cy.contains("It’s the day all eager shoppers have been waiting for");
  });
});
