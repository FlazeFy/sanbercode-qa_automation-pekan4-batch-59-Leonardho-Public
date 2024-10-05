const { defineConfig } = require('cypress')

module.exports = defineConfig({
    e2e: {
        baseUrl: 'https://www.saucedemo.com',
        specPattern : "support/e2e",
        supportFile : false,
        chromeWebSecurity : false
    }
})