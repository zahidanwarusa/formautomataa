// Custom commands for the TECS form
import 'cypress-file-upload';

// Helper for Angular Material dropdowns
Cypress.Commands.add('selectMatOption', (selector, optionText) => {
  cy.get(selector).click()
  cy.wait(500)
  cy.get('mat-option').contains(optionText).scrollIntoView().click({force: true})
  cy.wait(300)
  cy.get('body').click(0, 0) // Close dropdown if it stays open
})

// Helper for date inputs
Cypress.Commands.add('fillDateInput', (selector, dateValue) => {
  cy.get(selector).clear().type(dateValue).blur()
})

// Helper for clicking buttons by text
Cypress.Commands.add('clickButtonByText', (buttonText) => {
  cy.contains('button', buttonText).scrollIntoView().click({force: true})
  cy.wait(1000)
})

// Wait for Angular to stabilize
Cypress.Commands.add('waitForAngular', () => {
  cy.wait(1000) // Simple wait for Angular
})

// Handle new tabs by removing target attribute
Cypress.Commands.add('clickWithoutNewTab', (selector) => {
  cy.get(selector).invoke('removeAttr', 'target').click()
})