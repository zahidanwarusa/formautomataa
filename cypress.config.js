const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://sasq-sat.cbp.dhs.gov',
    defaultCommandTimeout: 15000,
    pageLoadTimeout: 30000,
    viewportWidth: 1280,
    viewportHeight: 900,
    chromeWebSecurity: false,
    experimentalModifyObstructiveThirdPartyCode: true,
    experimentalInteractiveRunEvents: true,
    video: true,
    retries: {
      runMode: 2,
      openMode: 0
    }
  },
})