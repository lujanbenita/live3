/// <reference types="cypress" />

const glob = require("tiny-glob");

// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  require("@cypress/code-coverage/task")(on, config);

  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config

  on("task", {
    // a task to find one file matching the given mask
    // returns just the first matching file
    async findFiles(mask) {
      if (!mask) {
        throw new Error("Missing a file mask to search");
      }
      const list = await glob(mask);
      if (!list.length) {
        return null;
      }
      return list[0];
    },
  });

  return config;
};
