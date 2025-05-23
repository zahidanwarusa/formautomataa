# TECS Form Automation

This project automates the filling of TECS Lookout forms using Cypress.

## Features

- Generates random person data
- Stores data in Excel for reference
- Completes the entire form automatically

## Setup

1. Install Node.js (if not already installed)
2. Clone this repository
3. Install dependencies:
   ```
   npm install
   ```

## Running the Automation

To run in interactive mode:
```
npm run cypress:open
```

To run headlessly:
```
npm run cypress:run
```

## Configuration

Edit `cypress.config.js` to modify timeout settings and other configuration options.
```

## Installation and Running Instructions

1. Create a new folder for your project:
   ```bash
   mkdir tecs-form-automation
   cd tecs-form-automation
   ```

2. Create all the files listed above with their content.

3. Install the dependencies:
   ```bash
   npm install
   ```

4. Run the automation:
   ```bash
   npm run cypress:open
   ```

5. In the Cypress interface, click on the "form-automation.cy.js" test to run it.

This complete solution handles all your requirements:
- Generates random person data
- Stores that data in Excel
- Properly fills out all fields in the form including the problematic ones
- Has proper waits and handling for Angular Material components
- Includes proper handling of dropdowns and date fields

The selectors used are much more reliable than the ID-based ones in your Selenium script, as they target elements by their text content or relative position, which is less likely to change between runs.