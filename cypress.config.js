const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {

    pageLoadTimeout: 120000, 
    experimentalStudio: true,
    chromeWebSecurity: false,
    failOnStatusCode: true,
    video: false,
    screenshotOnRunFailure: false,
      specPattern:'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    setupNodeEvents(on, config) {
     
     
    },
  },
});
