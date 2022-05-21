/* eslint-disable */
import localStorage from "../fixtures/user/localStorage.json";
import cookies from "../fixtures/user/cookies.json";

/// <reference types="cypress" />

import "cypress-localstorage-commands";

Cypress.Commands.add("setupStorageAndCookies", () => {
  Object.entries(localStorage).forEach((item) => {
    const [key, value] = item;
    cy.setLocalStorage(key, JSON.stringify(value));
  });

  Object.entries(cookies).forEach((cookie) => {
    const [key, value] = cookie;
    cy.setCookie(key, value);
  });
});

Cypress.Commands.add("setupStorageAndCookiesNewUser", () => {
  Object.entries(localStorageNewUser).forEach((item) => {
    const [key, value] = item;
    cy.setLocalStorage(key, JSON.stringify(value));
  });

  Object.entries(cookies).forEach((cookie) => {
    const [key, value] = cookie;
    cy.setCookie(key, value);
  });
});

Cypress.Commands.add("setupStorageAndCookiesAlva3", () => {
  Object.entries(localStorageWithoutAlva2).forEach((item) => {
    const [key, value] = item;
    cy.setLocalStorage(key, JSON.stringify(value));
  });

  Object.entries(cookies).forEach((cookie) => {
    const [key, value] = cookie;
    cy.setCookie(key, value);
  });
});

Cypress.Commands.add(
  "loadDashboard",
  (localStorageFixture = null, cookiesFixture = null, intercepts = []) => {
    Object.entries(cookiesFixture ?? cookies).forEach((cookie) => {
      const [key, value] = cookie;
      cy.setCookie(key, value);
    });

    Object.entries(localStorageFixture ?? localStorage).forEach((item) => {
      const [key, value] = item;
      cy.setLocalStorage(key, JSON.stringify(value));
    });

    if (!intercepts.includes("savedSearchList")) {
      cy.intercept("GET", /api\/search\/savedSearchList/, {
        fixture: "/get/search/savedSearchList.json",
      }).as("savedSearchList");
    }

    if (!intercepts.includes("filters")) {
      cy.intercept("GET", /api\/filters/, {
        fixture: "/get/filters.json",
      }).as("filters");
    }

    if (!intercepts.includes("tone")) {
      cy.intercept("GET", /api\/search\/tone/, {
        fixture: "/get/search/tone.json",
      }).as("tone");
    }

    if (!intercepts.includes("searchPublication")) {
      cy.intercept("POST", /api\/search\/publication/, {
        fixture: "/post/search/publication.json",
      }).as("searchPublication");
    }

    if (!intercepts.includes("authors")) {
      cy.intercept("POST", /api\/search\/author/, {
        fixture: "/post/search/author.json",
      }).as("authors");
    }

    if (!intercepts.includes("sourceTypes")) {
      cy.intercept("POST", /api\/search\/sourcetype/, {
        fixture: "/post/search/sourcetype.json",
      }).as("sourceTypes");
    }

    if (!intercepts.includes("channels")) {
      cy.intercept("POST", /api\/search\/channel/, {
        fixture: "/post/search/channel.json",
      }).as("channels");
    }

    if (!intercepts.includes("countries")) {
      cy.intercept("POST", /api\/search\/country/, {
        fixture: "/post/search/country.json",
      }).as("countries");
    }
    if (!intercepts.includes("customTags")) {
      cy.intercept("POST", /api\/search\/custom-tag/, {
        fixture: "/post/search/custom-tag.json",
      }).as("customTags");
    }

    if (!intercepts.includes("tags")) {
      cy.intercept("POST", /api\/search\/tag/, {
        fixture: "/post/search/tag.json",
      }).as("tags");
    }

    if (!intercepts.includes("topToneTag")) {
      cy.intercept("POST", /api\/dashboard\/toptonetag/, {
        fixture: "/post/dashboard/toptonetag.json",
      }).as("topToneTag");
    }

    if (!intercepts.includes("tagOverTimeAnalysis")) {
      cy.intercept("POST", /api\/dashboard\/tagovertimeanalysis/, {
        fixture: "/post/dashboard/tagovertimeanalysis.json",
      }).as("tagOverTimeAnalysis");
    }

    if (!intercepts.includes("countryAnalysis")) {
      cy.intercept("POST", /api\/dashboard\/countryanalysis/, {
        fixture: "/post/dashboard/countryanalysis.json",
      }).as("countryAnalysis");
    }

    if (!intercepts.includes("toneByTag")) {
      cy.intercept("POST", /api\/dashboard\/tonebytag/, {
        fixture: "/post/dashboard/tonebytag.json",
      }).as("toneByTag");
    }

    if (!intercepts.includes("tagSOVBySourceType")) {
      cy.intercept("POST", /api\/dashboard\/tagsovbysourcetype/, {
        fixture: "/post/dashboard/tagsovbysourcetype.json",
      }).as("tagSOVBySourceType");
    }

    if (!intercepts.includes("patchUser")) {
      cy.intercept("PATCH", "/api/users/*", {
        fixture: "/patch/users.json",
      }).as("patchUser");
    }

    if (!intercepts.includes("topVolumeTag")) {
      cy.intercept("POST", /api\/dashboard\/topvolumetag/, {
        fixture: "/post/dashboard/topvolumetag.json",
      }).as("topVolumeTag");
    }

    if (!intercepts.includes("topStories")) {
      cy.intercept("POST", /api\/dashboard\/topstories/, {
        fixture: "/post/dashboard/topstories.json",
      }).as("topStories");
    }

    if (!intercepts.includes("summary")) {
      cy.intercept("POST", /api\/dashboard\/summary/, {
        fixture: "/post/dashboard/summary.json",
      }).as("summary");
    }

    cy.visit(`${Cypress.env("host")}/media-intelligence/dashboard`);

    cy.wait("@savedSearchList");
    cy.wait("@filters");
    cy.wait("@searchPublication");
    cy.wait("@authors");

    if (!intercepts.includes("newUser")) {
      cy.wait("@summary");
      cy.wait("@topToneTag");
      cy.wait("@tagOverTimeAnalysis");
      cy.wait("@countryAnalysis");
      cy.wait("@toneByTag");
      cy.wait("@tagSOVBySourceType");
      cy.wait("@topVolumeTag");
      cy.wait("@topStories");
    }
  }
);

Cypress.Commands.add("checkFile", (filePattern) => {
  const downloadsFolder = Cypress.config("downloadsFolder").replace("\\", "/");
  const mask = `${downloadsFolder}/${filePattern}`;
  cy.task("findFiles", mask).then((fileName) => {
    expect(fileName).to.be.a("string");
    cy.log(`found file ${fileName}`);
    cy.readFile(fileName, "binary", { timeout: 15000 }).should((buffer) => {
      expect(buffer.length).to.be.gt(0);
    });
  });
});

Cypress.Commands.add(
  "loadDashboardRISentiment",
  (localStorageFixture = null, cookiesFixture = null, intercepts = []) => {
    Object.entries(cookiesFixture ?? cookies).forEach((cookie) => {
      const [key, value] = cookie;
      cy.setCookie(key, value);
    });

    Object.entries(localStorageFixture ?? localStorage).forEach((item) => {
      const [key, value] = item;
      cy.setLocalStorage(key, JSON.stringify(value));
    });

    if (!intercepts.includes("savedSearchList")) {
      cy.intercept("GET", /api\/search\/savedSearchList/, {
        fixture: "/get/search/savedSearchList.json",
      }).as("savedSearchList");
    }

    if (!intercepts.includes("filters")) {
      cy.intercept("GET", /api\/filters/, {
        fixture: "/get/filters.json",
      }).as("filters");
    }

    if (!intercepts.includes("searchPublication")) {
      cy.intercept("POST", /api\/search\/publication/, {
        fixture: "/post/search/publication.json",
      }).as("searchPublication");
    }

    if (!intercepts.includes("authors")) {
      cy.intercept("POST", /api\/search\/author/, {
        fixture: "/post/search/author.json",
      }).as("authors");
    }

    if (!intercepts.includes("user648")) {
      cy.intercept("PATCH", /api\/users\/648/, {
        fixture: "/patch/users.json",
      }).as("user648");
    }

    if (!intercepts.includes("sentimentScore")) {
      cy.intercept(
        "POST",
        /api\/reputation-intelligence\/sentiment\/sentiment-score/,
        {
          fixture: "/post/widgets/ri/sentimentScore.json",
        }
      ).as("sentimentScore");
    }

    if (!intercepts.includes("sentimentPosition")) {
      cy.intercept(
        "POST",
        /api\/reputation-intelligence\/sentiment\/sentiment-position/,
        {
          fixture: "/post/widgets/ri/sentimentPosition.json",
        }
      ).as("sentimentPosition");
    }

    if (!intercepts.includes("topPositiveIssues")) {
      cy.intercept(
        "POST",
        /api\/reputation-intelligence\/sentiment\/top-positive-issues/,
        {
          fixture: "/post/widgets/ri/topPositiveIssues.json",
        }
      ).as("topPositiveIssues");
    }

    if (!intercepts.includes("topNegativeIssues")) {
      cy.intercept(
        "POST",
        /api\/reputation-intelligence\/sentiment\/top-negative-issues/,
        {
          fixture: "/post/widgets/ri/topNegativesIssues.json",
        }
      ).as("topNegativeIssues");
    }

    if (!intercepts.includes("dailySentimentAndTrend")) {
      cy.intercept(
        "POST",
        /api\/reputation-intelligence\/sentiment\/daily-sentiment-and-trend/,
        {
          fixture: "/post/widgets/ri/dailySentimentAndTrend.json",
        }
      ).as("dailySentimentAndTrend");
    }

    if (!intercepts.includes("sentimentScoreByCountry")) {
      cy.intercept(
        "POST",
        /api\/reputation-intelligence\/sentiment\/sentiment-score-by-country/,
        {
          fixture: "/post/widgets/ri/sentimentScoreByCountry.json",
        }
      ).as("sentimentScoreByCountry");
    }

    if (!intercepts.includes("sentimentPositionTable")) {
      cy.intercept(
        "POST",
        /api\/reputation-intelligence\/sentiment\/sentiment-position-table/,
        {
          fixture: "/post/widgets/ri/sentimentPositionTable.json",
        }
      ).as("sentimentPositionTable");
    }

    if (!intercepts.includes("sentimentOverTime")) {
      cy.intercept(
        "POST",
        /api\/reputation-intelligence\/sentiment\/sentiment-over-time/,
        {
          fixture: "/post/widgets/ri/sentimentOverTime.json",
        }
      ).as("sentimentOverTime");
    }

    cy.visit(`${Cypress.env("host")}/reputation-intelligence/sentiment`);

    cy.wait("@savedSearchList");
    cy.wait("@filters");
    cy.wait("@searchPublication");
    cy.wait("@authors");
    cy.wait("@user648");

    if (!intercepts.includes("newUser")) {
      cy.wait("@sentimentScore");
      cy.wait("@sentimentPosition");
      cy.wait("@topPositiveIssues");
      cy.wait("@topNegativeIssues");
      cy.wait("@dailySentimentAndTrend");
      cy.wait("@sentimentScoreByCountry");
      cy.wait("@sentimentPositionTable");
      cy.wait("@sentimentOverTime");
    }
  }
);

Cypress.Commands.add(
  "loadDashboardRIIssues",
  (localStorageFixture = null, cookiesFixture = null, intercepts = []) => {
    Object.entries(cookiesFixture ?? cookies).forEach((cookie) => {
      const [key, value] = cookie;
      cy.setCookie(key, value);
    });

    Object.entries(localStorageFixture ?? localStorage).forEach((item) => {
      const [key, value] = item;
      cy.setLocalStorage(key, JSON.stringify(value));
    });

    if (!intercepts.includes("savedSearchList")) {
      cy.intercept("GET", /api\/search\/savedSearchList/, {
        fixture: "/get/search/savedSearchList.json",
      }).as("savedSearchList");
    }

    if (!intercepts.includes("filters")) {
      cy.intercept("GET", /api\/filters/, {
        fixture: "/get/filters.json",
      }).as("filters");
    }

    if (!intercepts.includes("searchPublication")) {
      cy.intercept("POST", /api\/search\/publication/, {
        fixture: "/post/search/publication.json",
      }).as("searchPublication");
    }

    if (!intercepts.includes("authors")) {
      cy.intercept("POST", /api\/search\/author/, {
        fixture: "/post/search/author.json",
      }).as("authors");
    }

    if (!intercepts.includes("user648")) {
      cy.intercept("PATCH", /api\/users\/648/, {
        fixture: "/patch/users.json",
      }).as("user648");
    }

    if (!intercepts.includes("mostImpactfulIssues")) {
      cy.intercept(
        "POST",
        /api\/reputation-intelligence\/issues\/most-impactful-issues/,
        {
          fixture: "/post/widgets/ri/mostImpactfulIssues.json",
        }
      ).as("mostImpactfulIssues");
    }

    if (!intercepts.includes("mostVisibleIssuesVsPeers")) {
      cy.intercept(
        "POST",
        /api\/reputation-intelligence\/issues\/most-visible-issues-vs-peers/,
        {
          fixture: "/post/widgets/ri/mostVisibleIssuesVsPeers.json",
        }
      ).as("mostVisibleIssuesVsPeers");
    }

    if (!intercepts.includes("topIssuesByVolume")) {
      cy.intercept(
        "POST",
        /api\/reputation-intelligence\/issues\/top-issues-by-volume/,
        {
          fixture: "/post/widgets/ri/topIssuesByVolume.json",
        }
      ).as("topIssuesByVolume");
    }

    cy.visit(`${Cypress.env("host")}/reputation-intelligence/issues`);

    cy.wait("@savedSearchList");
    cy.wait("@filters");
    cy.wait("@searchPublication");
    cy.wait("@authors");
    cy.wait("@user648");

    if (!intercepts.includes("newUser")) {
      cy.wait("@mostImpactfulIssues");
      cy.wait("@mostVisibleIssuesVsPeers");
      cy.wait("@topIssuesByVolume");
    }
  }
);

Cypress.Commands.add(
  "loadDashboardRIReputation",
  (localStorageFixture = null, cookiesFixture = null, intercepts = []) => {
    Object.entries(cookiesFixture ?? cookies).forEach((cookie) => {
      const [key, value] = cookie;
      cy.setCookie(key, value);
    });

    Object.entries(localStorageFixture ?? localStorage).forEach((item) => {
      const [key, value] = item;
      cy.setLocalStorage(key, JSON.stringify(value));
    });

    if (!intercepts.includes("savedSearchList")) {
      cy.intercept("GET", /api\/search\/savedSearchList/, {
        fixture: "/get/search/savedSearchList.json",
      }).as("savedSearchList");
    }

    if (!intercepts.includes("filters")) {
      cy.intercept("GET", /api\/filters/, {
        fixture: "/get/filters.json",
      }).as("filters");
    }

    if (!intercepts.includes("searchPublication")) {
      cy.intercept("POST", /api\/search\/publication/, {
        fixture: "/post/search/publication.json",
      }).as("searchPublication");
    }

    if (!intercepts.includes("authors")) {
      cy.intercept("POST", /api\/search\/author/, {
        fixture: "/post/search/author.json",
      }).as("authors");
    }

    if (!intercepts.includes("user648")) {
      cy.intercept("PATCH", /api\/users\/648/, {
        fixture: "/patch/users.json",
      }).as("user648");
    }

    if (!intercepts.includes("reputationScore")) {
      cy.intercept(
        "POST",
        /api\/reputation-intelligence\/reputation\/reputation-score/,
        {
          fixture: "/post/widgets/ri/reputationScore.json",
        }
      ).as("reputationScore");
    }

    if (!intercepts.includes("reputationPosition")) {
      cy.intercept(
        "POST",
        /api\/reputation-intelligence\/reputation\/reputation-position/,
        {
          fixture: "/post/widgets/ri/reputationPosition.json",
        }
      ).as("reputationPosition");
    }

    if (!intercepts.includes("reputationScoreByCountry")) {
      cy.intercept(
        "POST",
        /api\/reputation-intelligence\/reputation\/reputation-score-by-country/,
        {
          fixture: "/post/widgets/ri/reputationScoreByCountry.json",
        }
      ).as("reputationScoreByCountry");
    }

    if (!intercepts.includes("reputationPositionTable")) {
      cy.intercept(
        "POST",
        /api\/reputation-intelligence\/reputation\/reputation-position-table/,
        {
          fixture: "/post/widgets/ri/reputationPositionTable.json",
        }
      ).as("reputationPositionTable");
    }

    if (!intercepts.includes("quarterlyReputationAndSentimentTrend")) {
      cy.intercept(
        "POST",
        /api\/reputation-intelligence\/reputation\/quarterly-reputation-and-sentiment-trend/,
        {
          fixture: "/post/widgets/ri/quarterlyReputationAndSentiment.json",
        }
      ).as("quarterlyReputationAndSentimentTrend");
    }

    if (!intercepts.includes("quarterlyReputationAndForecast")) {
      cy.intercept(
        "POST",
        /api\/reputation-intelligence\/reputation\/quarterly-reputation-forcast/,
        {
          fixture: "/post/widgets/ri/quarterlyReputationForecast.json",
        }
      ).as("quarterlyReputationAndForecast");
    }

    if (!intercepts.includes("reputationOvertTime")) {
      cy.intercept(
        "POST",
        /api\/reputation-intelligence\/reputation\/reputation-over-time/,
        {
          fixture: "/post/widgets/ri/reputationOverTime.json",
        }
      ).as("reputationOvertTime");
    }

    cy.visit(`${Cypress.env("host")}/reputation-intelligence/reputation`);

    cy.wait("@savedSearchList");
    cy.wait("@filters");
    cy.wait("@searchPublication");
    cy.wait("@authors");
    cy.wait("@user648");

    if (!intercepts.includes("newUser")) {
      cy.wait("@reputationScore");
      cy.wait("@reputationPosition");
      cy.wait("@reputationScoreByCountry");
      cy.wait("@reputationPositionTable");
      cy.wait("@quarterlyReputationAndSentimentTrend");
      cy.wait("@quarterlyReputationAndForecast");
      cy.wait("@reputationOvertTime");
    }
  }
);
