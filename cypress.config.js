const { defineConfig } = require("cypress");
const mochawesomeMerge = require('mochawesome-merge');
const reportGenerator = require('mochawesome-report-generator');

const fs = require('fs');
const path = require('path');

 
module.exports = defineConfig({
  e2e: {
    pageLoadTimeout: 120000, 
    experimentalStudio: true,
    chromeWebSecurity: false,
    failOnStatusCode: true,
    video: false,
    screenshotOnRunFailure: false,
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',

    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/results',
      overwrite: true,
      html: false,
      json: true  
    },
  },
});
