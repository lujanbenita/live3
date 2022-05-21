/* eslint-disable */
/// <reference types="cypress" />

describe("The article detail", () => {
  beforeEach(() => {
    cy.setupStorageAndCookies();

    cy.intercept("GET", /api\/search\/savedSearchList/, {
      fixture: "/get/search/savedSearchList.json",
    }).as("getSavedSearches");

    cy.intercept("GET", /api\/filters/, { fixture: "/get/filters.json" }).as(
      "getFilters"
    );

    cy.intercept("POST", /api\/search\/publication/, {
      fixture: "/post/search/publication.json",
    }).as("searchPublication");

    cy.intercept("POST", /api\/search\/author/, {
      fixture: "/post/search/author.json",
    }).as("searchAuthor");

    cy.intercept("PATCH", /api\/users/, { fixture: "/patch/users.json" }).as(
      "updateUserData"
    );

    cy.intercept("POST", "/api/feed/articles", {
      fixture: "/post/articles/articles.json",
    }).as("correctFeedPage");

    cy.intercept("POST", /api\/dashboard\/articlecount/, {
      fixture: "/post/articles/articleCount.json",
    }).as("counterArticles");

    cy.intercept("POST", /api\/search\/tag/, {
      fixture: "/post/search/tag.json",
    }).as("searchTag");

    cy.visit(`${Cypress.env("host")}/media-intelligence/search/feed`);
    cy.wait("@correctFeedPage");
    cy.wait("@counterArticles");

    cy.intercept("GET", "/api/feed/articles/*", {
      fixture: "/get/feed/articles/article_1.json",
    }).as("articleDetail");

    cy.get(".c-feed-table-info__title")
      .eq(2)
      .then((e) => {
        cy.wrap(e).click();
      });

    cy.wait("@articleDetail");
  });

  afterEach(() => {
    cy.get(".c-error__page").should("not.exist");
  });

  it("adds an removes a custom tag", () => {
    cy.get(".c-article-detail-tags__add-button").should("be.visible").click();
    cy.wait(500);
    cy.get(".c-feed-modal-tags")
      .should("be.visible")
      .contains("Add Custom Tags");

    cy.intercept("POST", /api\/search\/custom-tag/, {
      fixture: "/post/search/custom-tag-search-no-results.json",
    }).as("customTagSearch");

    cy.get(".c-custom-multiple-tags-input__input").type("test tag 1");

    cy.wait("@customTagSearch");

    cy.get(".c-feed-modal-tags__no-results").should("be.visible");

    cy.get(".c-custom-multiple-tags-input__input").type("{enter}");

    cy.intercept("POST", "/api/feed/articles/custom-tags", {
      fixture: "/post/feed/articles/customTags.json",
      statusCode: 201, // ¡!
    }).as("addCustomTag");

    cy.get(".c-custom-multiple-tags-input__button")
      .should("be.enabled")
      .click();

    cy.wait("@addCustomTag");

    cy.get(".c-feed-modal-tags__tags")
      .should("be.visible")
      .contains("test tag 1");
    cy.contains("Tag was successfully assigned");
    cy.wait(500);

    cy.get(".c-modal__backdrop").last().click(0, 0, { force: true });
    cy.wait(500);

    cy.get(".c-feed-modal-tags").should("not.exist");
    cy.get(".c-article-detail-tags__tags-container")
      .should("be.visible")
      .contains("test tag 1");
    cy.wait(500);

    cy.get(".c-article-detail-tags__add-button").should("be.visible").click();
    cy.wait(500);

    cy.get(".c-feed-modal-tags")
      .should("be.visible")
      .contains("Add Custom Tags");

    cy.intercept("DELETE", "/api/feed/articles/custom-tags", {
      fixture: "/delete/feed/articles/customTags.json",
    }).as("deleteCustomTag");

    cy.get(".c-feed-modal-tags__tags .c-tag__close-icon").first().click();

    cy.wait("@deleteCustomTag");

    cy.get(".c-feed-modal-tags__tags")
      .should("be.visible")
      .contains("test tag 1")
      .should("not.exist");
    cy.contains("Tag was successfully unassigned");

    cy.get(".c-modal__backdrop").last().click(0, 0, { force: true });
    cy.get(".c-feed-modal-tags").should("not.exist");

    cy.get(".c-article-detail-tags__tags-container")
      .should("be.visible")
      .contains("test tag 1")
      .should("not.exist");
  });

  it("can be translated in several languages", () => {
    cy.get(".c-translate-button").should("be.visible").click();

    cy.intercept("GET", "/api/feed/articles/*/translate*", {
      fixture: "/get/feed/articles/article_1_italian.json",
    }).as("getLanguage");
    cy.get(".c-option-button__option").contains("Italian").click();
    cy.wait("@getLanguage");

    cy.contains("ITALIAN TRANSLATION");

    cy.get(".c-translate-button").should("be.visible").click();

    cy.intercept("GET", "/api/feed/articles/*/translate*", {
      fixture: "/get/feed/articles/article_1_spanish.json",
    }).as("getLanguage");
    cy.get(".c-option-button__option").contains("Spanish").click();
    cy.wait("@getLanguage");
    cy.contains("SPANISH TRANSLATION");
  });

  it("highlights tags", () => {
    cy.intercept("GET", "/services/tagKeywords?tagId=2691", {
      fixture: "/get/feed/articles/tag.json",
    }).as("keyword");

    cy.get(".c-article-detail-tags__tags-container")
      .contains("Nintendo")
      .click();
    cy.wait("@keyword");

    cy.get(
      ".c-article-detail__description .c-feed-table-info__highlight"
    ).should("have.length", 2);
  });

  it("adds author to key list", () => {
    cy.get(".c-article-detail__body .c-add-button__button").as(
      "addPublicationButton"
    );
    cy.get("@addPublicationButton").should("be.visible").click();

    cy.wait("@getFilters");

    cy.get("label:contains('Save Author to Keylist'):visible").should("exist");

    cy.get(".c-article-detail__body")
      .contains("cypress testing")
      .should("be.visible")
      .click();
    cy.get(".single-selector-menu")
      .contains("Music Publications")
      .should("be.visible")
      .click();
    cy.get(".c-article-detail__body")
      .contains("cypress testing")
      .should("not.exist");
    cy.get(".c-article-detail__body")
      .contains("Music Publications")
      .should("be.visible");

    cy.intercept("GET", "/api/filters/*", {
      fixture: "/get/filter/filter_with_tags.json",
    }).as("getFilterDetail");

    cy.intercept("PATCH", "/api/filters/*", {
      fixture: "/patch/filter/filterUpdated.json",
    }).as("patchFilter");

    cy.get(".c-article-detail__body .c-add-button__save")
      .contains("Save")
      .should("be.visible")
      .click();
    cy.wait("@getFilterDetail");
    cy.wait("@patchFilter");
    cy.contains("The list has been successfully updated").should("be.visible");
  });

  it("adds publication to key list", () => {
    cy.get(".c-article-detail-sidebar .c-add-button").as(
      "addPublicationButton"
    );
    cy.get("@addPublicationButton").should("be.visible").click();

    cy.wait("@getFilters");

    cy.get(".c-add-button__modal-backdrop")
      .contains("Save Publication to Keylist")
      .should("be.visible");
    cy.get(".c-add-button__modal-backdrop")
      .contains("cypress testing")
      .should("be.visible")
      .click();
    cy.get(".single-selector-menu")
      .contains("Music Publications")
      .should("be.visible")
      .click();
    cy.get(".c-add-button__modal-backdrop")
      .contains("cypress testing")
      .should("not.exist");
    cy.get(".c-add-button__modal-backdrop")
      .contains("Music Publications")
      .should("be.visible");

    cy.intercept("GET", "/api/filters/*", {
      fixture: "/get/filter/filter_with_tags.json",
    }).as("getFilterDetail");

    cy.intercept("PATCH", "/api/filters/*", {
      fixture: "/patch/filter/filterUpdated.json",
    }).as("patchFilter");

    cy.get(".c-add-button__save--modal")
      .contains("Save")
      .should("be.visible")
      .click();
    cy.wait("@getFilterDetail");
    cy.wait("@patchFilter");
    cy.contains("The list has been successfully updated").should("be.visible");
  });

  it("show syndicated articles in article detail", () => {
    cy.get(
      ".c-article-detail-header__actions .c-feed-table-info__folder-button"
    ).click();

    cy.get(".c-article-detail-syndicated")
      .contains("Syndicated articles")
      .should("exist");
    cy.get(".c-article-detail-syndicated__container").contains("World News");
  });
});
