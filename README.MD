# Requirements
- Nodejs

# Instalation from scratch
- npm init playwright@latest

# Get the project 
- git clone https://github.com/David-SanchezG/Playwright-test.git

# How to run
- In order to run locally, please add username and password to your environment variables (i.e. export TESTUSER='abcde')
### To run all specs for all the projects
`npx playwright test`
### To run a specific file
`npx playwright test tests/login.spec.ts`
### To run a specific test
`npx playwright test -g "See login page"`
### To run saving the trace
`npx playwright test --trace on`
### To run with headed browser
`npx playwright test --headed`
### To run with a specific project
`npx playwright test --project=chromium`

# See report
- If the execution had failing tests, it will automatically serve the report as a HTML website in the browser
### You can also see the report after running
`npx playwright show-report`

For more information about Playwright's API, please go to https://playwright.dev/
