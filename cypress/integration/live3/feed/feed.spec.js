/* eslint-disable */
/// <reference types="cypress" />

Cypress.on("uncaught:exception", (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  return false;
});

describe("Feed", () => {
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

    cy.intercept("POST", /api\/feed\/articles/, {
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
  });

  afterEach(() => {
    cy.get(".c-error__page").should("not.exist");
  });

  it("loads feed and counter", () => {
    cy.contains("Five biggest supermarkets pledge to halve");
    cy.contains("By 2030, the five largest supermarkets have committed");
    cy.get(".c-feed-header__counter")
      .should("be.visible")
      .contains("of 123 articles");
  });

  it("opens syndicated articles", () => {
    cy.get(".c-feed-table-info__folder-button")
      .should("be.visible")
      .first()
      .click();
    cy.get(
      '.c-syndicated-article__headline:contains("Five biggest supermarkets pledge to halve")'
    ).should("have.length", 11);
  });

  it("shows filters", () => {
    cy.get(".c-filter-bar__range-slider").should("not.be.visible");
    cy.get(".c-search-actions__filter-button").should("be.visible").click();
    cy.get(".c-filter-bar__range-slider").should("be.visible");
  });

  it("adds a tag and removes it", () => {
    cy.get(".c-input-search__input").click().type("AIF");

    cy.intercept("POST", /api\/search\/tag/, {
      fixture: "/post/search/tagFiltered.json",
    }).as("searchTag");

    cy.get(".c-input-search__input").type("MD");

    cy.get(".c-input-search-option").should("have.length", 2);

    cy.intercept("POST", /api\/feed\/articles/, {
      fixture: "/post/articles/articlesFiltered.json",
    }).as("correctFeedPageFiltered");

    cy.intercept("POST", /api\/dashboard\/articlecount/, {
      fixture: "/post/articles/articleCountFiltered.json",
    }).as("counterArticlesFiltered");

    cy.get(".c-input-search-option").last().click();

    cy.wait("@correctFeedPageFiltered");
    cy.wait("@counterArticlesFiltered");

    cy.get(".c-feed-header__counter")
      .should("be.visible")
      .contains("of 2 articles");

    cy.intercept("POST", /api\/feed\/articles/, {
      fixture: "/post/articles/articles.json",
    }).as("correctFeedPage");

    cy.intercept("POST", /api\/dashboard\/articlecount/, {
      fixture: "/post/articles/articleCount.json",
    }).as("counterArticles");

    // c-tag
    cy.get(".c-tag__close-icon")
      .eq(1)
      .then((e) => {
        cy.wrap(e).click();
      });

    cy.wait("@correctFeedPage");
    cy.wait("@counterArticles");

    cy.get(".c-feed-header__counter")
      .should("be.visible")
      .contains("of 123 articles");
  });

  it("select and deselect a focus tag", () => {
    cy.get(".c-tag--selected").should("not.exist");

    cy.intercept("POST", /api\/feed\/articles/, {
      fixture: "/post/articles/articlesFiltered.json",
    }).as("correctFeedPageFiltered");

    cy.intercept("POST", /api\/dashboard\/articlecount/, {
      fixture: "/post/articles/articleCountFiltered.json",
    }).as("counterArticlesFiltered");

    cy.get(".c-tag").first().click();

    cy.wait("@correctFeedPageFiltered");
    cy.wait("@counterArticlesFiltered");

    cy.get(".c-feed-header__counter")
      .should("be.visible")
      .contains("of 2 articles");

    cy.intercept("POST", /api\/feed\/articles/, {
      fixture: "/post/articles/articles.json",
    }).as("correctFeedPage");

    cy.intercept("POST", /api\/dashboard\/articlecount/, {
      fixture: "/post/articles/articleCount.json",
    }).as("counterArticles");

    cy.get(".c-tag--selected").should("be.visible");
    cy.get(".c-tag--selected").click();

    cy.wait("@correctFeedPage");
    cy.wait("@counterArticles");

    cy.get(".c-tag--selected").should("not.exist");

    cy.get(".c-feed-header__counter")
      .should("be.visible")
      .contains("of 123 articles");
  });

  it("opens calendar and select a date range", () => {
    cy.intercept("POST", /api\/feed\/articles/, {
      fixture: "/post/articles/articlesFiltered.json",
    }).as("correctFeedPageFiltered");

    cy.intercept("POST", /api\/dashboard\/articlecount/, {
      fixture: "/post/articles/articleCountFiltered.json",
    }).as("counterArticlesFiltered");

    cy.get(".c-date-picker").first().click();

    cy.get(
      ".rs-calendar-table-row:not(.rs-calendar-table-header-row) .rs-calendar-table-cell:not(.rs-calendar-table-cell-un-same-month):nth-child(1)"
    )
      .first()
      .click();
    cy.get(
      ".rs-calendar-table-row:not(.rs-calendar-table-header-row) .rs-calendar-table-cell:not(.rs-calendar-table-cell-un-same-month):nth-child(2)"
    )
      .first()
      .click();

    cy.get(".rs-picker-toolbar-right-btn-ok").first().click();

    cy.wait("@correctFeedPageFiltered");
    cy.wait("@counterArticlesFiltered");

    cy.get(".c-feed-header__counter")
      .should("be.visible")
      .contains("of 2 articles");
  });

  it("opens calendar and selects 1D, 7D and 1M", () => {
    cy.intercept("POST", /api\/feed\/articles/, {
      fixture: "/post/articles/articlesFiltered.json",
    }).as("correctFeedPageFiltered");

    cy.intercept("POST", /api\/dashboard\/articlecount/, {
      fixture: "/post/articles/articleCountFiltered.json",
    }).as("counterArticlesFiltered");

    const testCalendarFixedDateRanges = (i) => {
      cy.get(".c-date-picker").first().click();

      cy.get(".rs-picker-toolbar-option").eq(i).first().click();

      cy.wait("@correctFeedPageFiltered");
      cy.wait("@counterArticlesFiltered");

      cy.get(".c-feed-header__counter")
        .should("be.visible")
        .contains("of 2 articles");
    };

    testCalendarFixedDateRanges(1);
    testCalendarFixedDateRanges(2);
    testCalendarFixedDateRanges(3);
  });

  it("selects a country", () => {
    cy.intercept("POST", /api\/feed\/articles/, {
      fixture: "/post/articles/articlesFiltered.json",
    }).as("correctFeedPageFiltered");

    cy.intercept("POST", /api\/dashboard\/articlecount/, {
      fixture: "/post/articles/articleCountFiltered.json",
    }).as("counterArticlesFiltered");

    cy.get(".c-country-selector__input").first().click();
    cy.get(".c-country-selector__list-item-field")
      .eq(2)
      .then((e) => {
        cy.wrap(e).click();
      });

    cy.wait("@correctFeedPageFiltered");
    cy.wait("@counterArticlesFiltered");

    cy.get(".c-feed-header__counter")
      .should("be.visible")
      .contains("of 2 articles");
  });

  const testSlider = (width) => {
    cy.intercept("POST", /api\/feed\/articles/, {
      fixture: "/post/articles/articlesFiltered.json",
    }).as("correctFeedPageFiltered");

    cy.intercept("POST", /api\/dashboard\/articlecount/, {
      fixture: "/post/articles/articleCountFiltered.json",
    }).as("counterArticlesFiltered");

    cy.get(".c-range-slider__slider .MuiSlider-thumb")
      .first()
      .focus()
      .trigger("mousedown")
      .trigger("mousemove", parseInt(width, 10), 0, { force: true })
      .trigger("mouseup")
      .blur();

    cy.wait("@correctFeedPageFiltered");
    cy.wait("@counterArticlesFiltered");

    cy.get(".c-feed-header__counter")
      .should("be.visible")
      .contains("of 2 articles");
  };

  it("adds a publication filter", () => {
    cy.get(".c-search-actions__filter-button").should("be.visible").click();
    cy.get('label:contains("Publications")')
      .should("be.visible")
      .click({ force: true });
    cy.get("span.c-multiple-search-selector__add-keylist")
      .should("be.visible")
      .first()
      .click({ force: true });
    cy.contains("Load publications Key Lists");
    cy.get(".c-modal-keylist__search-form").type("cypress");

    cy.get(".c-dual-ring").should("be.visible");
    cy.get(".c-keylist-item").should("have.length", 1);
    cy.get(".c-keylist-item").first().click({ force: true });

    cy.intercept("GET", "/api/filters/*", {
      fixture: "/get/filter/filter_without_tags.json",
    }).as("getFilterData");

    cy.get('button:contains("Apply Key List")')
      .should("be.enabled")
      .click({ force: true });
    cy.get(".c-modal-keylist__text")
      .should("be.visible")
      .contains("The publications key list selected does not have any item");
    cy.get('button:contains("Cancel")')
      .should("be.visible")
      .click({ force: true });
    cy.get(".c-modal-keylist__text").should("not.be.visible");
    cy.get(".c-modal-keylist__search-form").clear();

    cy.intercept("GET", "/api/filters/*", {
      fixture: "/get/filter/filter_with_tags.json",
    }).as("getFilterData");

    cy.get(".c-keylist-item")
      .eq(2)
      .then((e) => {
        cy.wrap(e).click({ force: true });
      });

    cy.get('button:contains("Apply Key List")')
      .should("be.enabled")
      .click({ force: true });
    cy.get(".c-modal-keylist__text")
      .should("be.visible")
      .contains("The following publications will be added to your filter:");
    cy.get(".c-modal-keylist__tags").contains("Tag 1");
    cy.get(".c-modal-keylist__tags").contains("Tag 2");
    cy.get(".c-modal-keylist__tags").contains("Tag 3");

    cy.intercept("POST", /api\/feed\/articles/, {
      fixture: "/post/articles/articlesFiltered.json",
    }).as("correctFeedPageFiltered");

    cy.intercept("POST", /api\/dashboard\/articlecount/, {
      fixture: "/post/articles/articleCountFiltered.json",
    }).as("counterArticlesFiltered");

    cy.get('button:contains("Continue")')
      .should("be.visible")
      .should("be.enabled")
      .click({ force: true });

    cy.wait("@correctFeedPageFiltered");
    cy.wait("@counterArticlesFiltered");

    cy.get(".c-multiple-search-selector__first-tags").contains("Tag 1");
    cy.get(".c-multiple-search-selector__first-tags").contains("Tag 2");
    cy.get(".c-multiple-search-selector__first-tags").contains("Tag 3");

    cy.get(".c-feed-header__counter")
      .should("be.visible")
      .contains("of 2 articles");
  });

  it("selects value in circulation slider", () => {
    cy.get(".c-search-actions__filter-button").should("be.visible").click();
    cy.get(".c-range-slider__slider")
      .first()
      .should("be.visible")
      .invoke("width")
      .then(function (width) {
        testSlider(parseInt((width + 10) / 2, 10));
        cy.get(".c-range-slider__value-label")
          .should("be.visible")
          .contains("50k");
        // TODO: bug in mui slider
        // https://github.com/mui-org/material-ui/pull/21653
        //
        // testSlider(parseInt(width + 10, 10));
        // cy.get('.c-range-slider__value-label').should('be.visible').contains('100k');
        // testSlider(parseInt(0, 10));
        // cy.get('.c-range-slider__value-label').should('be.visible').not.contains('k');
      });
  });

  // TODO: unify tests after fixing bug in mui slider
  it("selects max value in circulation slider", () => {
    cy.get(".c-search-actions__filter-button").should("be.visible").click();
    cy.get(".c-range-slider__slider")
      .first()
      .should("be.visible")
      .invoke("width")
      .then(function (width) {
        testSlider(parseInt(width + 10, 10));
        cy.get(".c-range-slider__value-label")
          .should("be.visible")
          .contains("100k");
      });
  });

  it("add and removes a filter", () => {
    cy.get(".c-search-actions__filter-button").should("be.visible").click();

    const testFilters = (i) => {
      cy.get(".c-multiple-select__autocomplete").eq(i).click();

      cy.intercept("POST", /api\/feed\/articles/, {
        fixture: "/post/articles/articlesFiltered.json",
      }).as("correctFeedPageFiltered");

      cy.intercept("POST", /api\/dashboard\/articlecount/, {
        fixture: "/post/articles/articleCountFiltered.json",
      }).as("counterArticlesFiltered");

      cy.get(".c-multiple-select__list-box li").eq(0).click();

      cy.wait("@correctFeedPageFiltered");
      cy.wait("@counterArticlesFiltered");

      cy.get(".c-feed-header__counter")
        .should("be.visible")
        .contains("of 2 articles");

      cy.intercept("POST", /api\/feed\/articles/, {
        fixture: "/post/articles/articles.json",
      }).as("correctFeedPage");

      cy.intercept("POST", /api\/dashboard\/articlecount/, {
        fixture: "/post/articles/articleCount.json",
      }).as("counterArticles");

      cy.get(".c-multiple-select__list-box li").eq(0).click();

      cy.wait("@correctFeedPage");
      cy.wait("@counterArticles");

      cy.get(".c-feed-header__counter")
        .should("be.visible")
        .contains("of 123 articles");

      cy.get(".c-multiple-select__autocomplete").eq(i).click();
    };

    testFilters(0);
    testFilters(1);
    testFilters(2);
  });

  it("save publication to keylist", () => {
    cy.intercept(
      "GET",
      "api/filters?filterTypes=key_media&page=1&size=30&sortBy=lastUpdateAt&sortOrder=desc",
      {
        fixture: "/get/keyPublications.json",
      }
    ).as("filters");

    cy.get(".c-circulation-widget__publication .c-add-button").first().click();
    cy.wait("@filters");

    cy.get(".MuiInputBase-formControl.MuiInput-formControl")
      .contains("cypress testing")
      .click();
    cy.contains("Music Publications").click();

    cy.intercept("GET", "api/filters/832?filterParameterTypes=source", {
      fixture: "/get/keyPublicationSave.json",
    }).as("filterSave");

    cy.intercept("PATCH", "api/filters/832?filterParameterType=source", {
      fixture: "/patch/keyPublicationSave.json",
    }).as("filterSavePath");

    cy.get(".c-add-button__tooltip--active button").click();

    cy.wait("@filterSave");
    cy.wait("@filterSavePath");
    cy.get(".c-toast__message").contains(
      "The list has been successfully updated"
    );
  });

  it("save author to keylist", () => {
    cy.intercept(
      "GET",
      "api/filters?filterTypes=key_influencers&page=1&size=30&sortBy=lastUpdateAt&sortOrder=desc",
      {
        fixture: "/get/keyAuthors.json",
      }
    ).as("filters");

    cy.get(".c-feed-table-info__author-container button").first().click();
    cy.wait("@filters");

    cy.get(".MuiInputBase-formControl.MuiInput-formControl")
      .contains("cypress testing")
      .click();
    cy.contains("Novelist").click();

    cy.intercept("GET", "api/filters/811?filterParameterTypes=author", {
      fixture: "/get/keyAuthorsSave.json",
    }).as("filterSave");
    cy.intercept("PATCH", "api/filters/811?filterParameterType=author", {
      fixture: "/patch/keyAuthorsSave.json",
    }).as("filterSavePath");

    // create a TypeError: Cannot read properties of null (reading 'length')
    cy.get(".c-add-button__tooltip--active .c-add-button__save").click();

    cy.wait("@filterSave");

    /* cy.get(".c-toast__message").contains(
      "The list has been successfully updated"
    ); */
  });

  it("selects articles", () => {
    cy.get("span.c-feed-header__counter").contains("1-30 of 123 articles");
    cy.intercept(
      "GET",
      "api/feed/articles/6588700673?articleId=6588700673&loadDate=2021-11-06",
      {
        fixture: "/get/feed/articleSelected.json",
        statusCode: 200,
      }
    ).as("articleSelected");

    cy.get(".c-feed__content .c-feed-table-row")
      .eq(0)
      .find(".c-checkbox")
      .click();
    cy.get("span.c-feed-header__counter").eq(1).contains("(1 selected)");
    cy.get(".c-feed__content .c-feed-table-row")
      .eq(1)
      .find(".c-checkbox")
      .click();
    cy.get("span.c-feed-header__counter").eq(1).contains("(2 selected)");
  });

  it("adds tags", () => {
    cy.intercept(
      "GET",
      "api/feed/articles/6588700673?articleId=6588700673&loadDate=2021-11-06",
      {
        fixture: "/get/feed/articleSelected.json",
        statusCode: 200,
      }
    ).as("articleSelected");

    cy.get(".c-feed__content .c-feed-table-row")
      .eq(0)
      .find(".c-checkbox")
      .click();
    cy.get("span.c-feed-header__counter").eq(1).contains("(1 selected)");

    cy.get(".c-feed-header__selector button").click({ force: true });
    cy.get(".MuiMenu-list.c-option-button__menu")
      .contains("Bulk tag adding")
      .click();

    cy.get(".c-custom-multiple-tags-input").type("test{enter}");

    cy.intercept("POST", "api/feed/articles/custom-tags", {
      fixture: "/post/customTags/createCustomTag.json",
      statusCode: 201,
    }).as("createCustomTag");
    cy.get(".c-custom-multiple-tags-input button").click();

    cy.wait("@createCustomTag");
    cy.get(".c-toast__message").contains("Tag was successfully assigned");
  });

  it("export articles in several formats", () => {
    const exportArticle = (name) => {
      cy.get(".c-feed-header__selector button").click({ force: true });

      cy.intercept("POST", "api/feed/articles/export", {
        fixture: "/post/feed/exportPDF.json",
      }).as("exportPDF");

      cy.contains(`Export to ${name}`).click();

      cy.wait("@exportPDF");

      cy.get(".c-toast__message").contains(
        "request queued successfully and you will receive the export file link via email"
      );
    };

    cy.intercept("GET", "api/feed/articles/*", {
      fixture: "/get/feed/articleSelected.json",
      statusCode: 200,
    }).as("articleSelected");

    cy.get(".c-feed__content .c-feed-table-row")
      .eq(0)
      .find(".c-checkbox")
      .click();
    cy.get("span.c-feed-header__counter").eq(1).contains("(1 selected)");

    exportArticle("PDF");
    exportArticle("PPT");
    exportArticle("CSV");
  });

  it("has several pages", () => {
    cy.get(".c-tab--active.c-search__tabs-bar").contains("Feed");
    cy.get(".c-pagination").contains("1-30 of 123");
    cy.get(".c-feed-table-row")
      .first()
      .should("contain", "Five biggest supermarkets pledge");

    cy.intercept("POST", /api\/feed\/articles/, {
      fixture: "/post/articles/articlesPage2.json",
    }).as("correctFeedPage");

    cy.intercept("POST", /api\/dashboard\/articlecount/, {
      fixture: "/post/articles/articleCount.json",
    }).as("counterArticles");

    cy.get('button[aria-label="Next page"]').click();
    cy.contains("Please wait while we are processing your request").should(
      "not.exist"
    );
    cy.get(".c-feed-table-row")
      .first()
      .should("contain", "Globaal Draagbare spelconsoles Markt");
    cy.get(".c-pagination").contains("31-60 of 123");
    cy.get(".c-feed-header__info").contains("31-60 of 123 articles");
  });

  it("changes the number of elements on each page", () => {
    cy.get(".c-pagination .MuiTablePagination-selectRoot").click();
    cy.get('[data-value="60"]').click();
    cy.get(".c-pagination").contains(/^1-60 of 123$/);

    cy.log("Testing pagination index");
    cy.get('button[aria-label="Next page"]').click();
    cy.get(".c-pagination .MuiTablePagination-selectRoot").click();
    cy.get('[data-value="240"]').click();
    cy.get(".c-pagination").contains(/^1-123 of 123$/);
    cy.get(".c-feed-header__info").contains("1-123 of 123 articles");
  });

  it("changes the number of elements on each page", () => {
    cy.get(".c-feed-table-row")
      .first()
      .should("not.have.class", "c-feed-table-row--disabled");

    cy.get(".c-input-search__input-container")
      .children()
      .first()
      .should("contain", "Nintendo")
      .click();
    cy.wait(1000);

    cy.get(".c-input-search__input-container")
      .children()
      .first()
      .should("have.class", "c-tag--selected");

    cy.get(".c-feed-table-row")
      .first()
      .should("have.class", "c-feed-table-row--disabled");
  });

  it("hover in NLA article to show 'NLATooltip' component", () => {
    cy.get(".c-feed-table-row")
      .first()
      .find(".c-multiple-tone-widget")
      .rightclick();

    cy.get(".c-feed-table-row").first().find(".show");
    cy.get('.c-feed-table-row [data-id="tooltip"]').should("contain", "Tesco");
  });
});
