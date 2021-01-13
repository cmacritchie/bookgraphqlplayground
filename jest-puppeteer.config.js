module.exports = {
    launch: {
      dumpio: true,
      headless: true,
    },
    browser: 'chromium',
    browserContext: 'default',
    server: {
        command: `npm run dev`,
        // port: 3000,
        launchTimeout: 20000,
        debug: true,
      },
  }