// Main test file for TECS form automation
import DataGenerator from '../support/utils/dataGenerator';
import ExcelManager from '../support/utils/excelManager';

describe('TECS Lookout Form Automation', () => {
  let personData;

  before(() => {
    // Generate random data before tests
    personData = DataGenerator.generatePersonData();
    
    // Save to Excel
    ExcelManager.saveDataToExcel(personData);
  });

  it('Fills out the search form and creates TECS Lookout', () => {
    // Visit the site
    cy.visit('/person?query=person');
    cy.wait(3000);
    
    // Click on CBP Users Windows Login
    cy.contains('CBP Users').click();
    cy.wait(3000);
    
    // Fill the search form
    cy.get('#lastName').type(personData.lastName);
    cy.get('#firstName').type(personData.firstName);
    cy.get('#dob').type(personData.dob);
    
    // Click search and wait for results
    cy.contains('button', 'Search').click();
    cy.wait(5000); // Wait for search results
    
    // Click Create TECS Lookout
    cy.contains('Create TECS Lookout').click();
    
    // Wait for new page to load
    cy.wait(8000);
  });
  
  it('Fills out the TECS Lookout form with all required fields', () => {
    // ===== MAIN FORM SECTIONS =====
    
    // 1. Record Status dropdown
    cy.get('mat-select[aria-labelledby*="form-field-label"]').eq(0).click();
    cy.get('mat-option').contains('OB - OUTBOUND SUBJECT').click({force: true});
    cy.wait(1000);
    
    // 2. Query Notification dropdown
    cy.get('mat-select[aria-labelledby*="form-field-label"]').eq(1).click();
    cy.get('mat-option').contains('0 - NO NOTIFICATION').click({force: true});
    cy.wait(1000);
    
    // 3. Primary Action dropdown
    cy.get('mat-select[aria-labelledby*="form-field-label"]').eq(2).click();
    cy.get('mat-option').contains('4 - REFER TO PASSPORT CONTROL').click({force: true});
    cy.wait(1000);
    
    // 4. Primary Start & End Dates
    cy.get('input[mask="00/00/0000"]').eq(0).type(personData.primaryStartDate);
    cy.get('input[mask="00/00/0000"]').eq(1).type(personData.primaryEndDate);
    
    // 5. Category dropdown
    cy.get('mat-select[aria-labelledby*="form-field-label"]').eq(3).click();
    cy.get('mat-option').contains('AB - AG/BIO COUNTERMEASURES').click({force: true});
    cy.wait(1000);
    
    // 6. Exclusions dropdown (multiple select)
    cy.get('mat-select[aria-labelledby*="form-field-label"]').eq(4).click();
    cy.get('mat-option').contains('ANCX - NIV EXEMPTION').click({force: true});
    cy.get('body').click(0, 0); // Close dropdown
    cy.wait(1000);
    
    // 7. Exclusion Site dropdown
    cy.get('mat-select[aria-labelledby*="form-field-label"]').eq(5).click();
    cy.get('mat-option').contains('PRS - PARIS').click({force: true});
    cy.wait(1000);
    
    // 8. Remarks field
    cy.get('textarea[maxlength="3000"]').type(personData.remarks);
    
    // ===== PHYSICAL DESCRIPTIONS =====
    
    // 9. Hispanic dropdown
    cy.get('mat-form-field.add-field mat-select').first().click();
    cy.get('mat-option').contains('Y - YES').click({force: true});
    cy.wait(1000);
    
    // 10. Height dropdown
    cy.get('mat-form-field.add-field mat-select').eq(1).click();
    // Find the closest height option
    cy.get('mat-option').contains(`${personData.height.split("'")[0]}'`).click({force: true});
    cy.wait(1000);
    
    // 11. Weight field
    cy.get('input[mask="0*"][maxlength="4"]').type(personData.weight);
    
    // ===== ADD SEX =====
    cy.contains('button', 'Add Sex').click();
    cy.wait(2000);
    // Find most recently added select
    cy.get('mat-select').last().click();
    cy.get('mat-option').contains('M - MALE').click({force: true});
    cy.wait(1000);
    
    // ===== ADD RACE =====
    cy.contains('button', 'Add Race').click();
    cy.wait(2000);
    cy.get('mat-select').last().click();
    cy.get('mat-option').contains('A - ASIAN').click({force: true});
    cy.wait(1000);
    
    // ===== ADD EYE COLOR =====
    cy.contains('button', 'Add Eye Color').click();
    cy.wait(2000);
    cy.get('mat-select').last().click();
    cy.get('mat-option').contains('BL - BLUE').click({force: true});
    cy.wait(1000);
    
    // ===== ADD HAIR COLOR =====
    cy.contains('button', 'Add Hair Color').click();
    cy.wait(2000);
    cy.get('mat-select').last().click();
    cy.get('mat-option').contains('BR - BROWN').click({force: true});
    cy.wait(1000);
    
    // ===== ADD NAME =====
    cy.contains('button', 'Add Name').click();
    cy.wait(2000);
    
    // Identify last name and first name fields by their labels
    cy.contains('Last Name').parent().find('input').type(personData.lastName);
    cy.contains('First Name').parent().find('input').type(personData.firstName);
    
    // ===== ADD DOB =====
    cy.contains('button', 'Add DOB').click();
    cy.wait(2000);
    cy.get('input[mask="00/00/0000"]').last().type(personData.dob);
    
    // ===== ADD CITIZENSHIP =====
    cy.contains('button', 'Add Citizenship').click();
    cy.wait(2000);
    cy.get('mat-select').last().click();
    cy.get('mat-option').contains('USA - UNITED STATES').click({force: true});
    cy.wait(1000);
    
    // ===== ADD PASSPORT =====
    cy.contains('button', 'Add Passport').click();
    cy.wait(2000);
    
    // Target all new input fields in sequence
    cy.get('mat-select').last().click(); // Passport Type
    cy.get('mat-option').contains('P - Regular').click({force: true});
    cy.wait(1000);
    
    // Target newest visible text input for passport number
    cy.get('input.mat-input-element').last().type(personData.passportNumber);
    
    // Target country dropdown (should now be the last one)
    cy.get('mat-select').last().click();
    cy.get('mat-option').contains('USA - UNITED STATES').click({force: true});
    cy.wait(1000);
    
    // Target date inputs for passport dates
    const dateInputs = cy.get('input[mask="00/00/0000"]');
    dateInputs.eq(-2).type(personData.passportIssueDate);
    dateInputs.last().type(personData.passportExpiryDate);
    
    // ===== ADD A# =====
    cy.contains('button', 'Add A#').click();
    cy.wait(2000);
    cy.get('input[mask="0*"][maxlength="9"]').type(personData.aNumber);
    
    // ===== ADD DRIVER'S LICENSE =====
    cy.contains('button span', 'Add Driver').click();
    cy.wait(2000);
    
    // License number
    cy.get('input.mat-input-element').last().type(personData.driverLicense);
    
    // License state
    cy.get('mat-select').last().click();
    cy.get('mat-option').contains('VA - VIRGINIA').click({force: true});
    cy.wait(1000);
    
    // ===== ADD SSN =====
    cy.contains('button', 'Add SSN').click();
    cy.wait(2000);
    cy.get('input[mask="000-00-0000"]').type(personData.ssn);
    
    // ===== ADD MISC NUMBER =====
    cy.contains('button span', 'Add Misc').click();
    cy.wait(2000);
    
    // Misc type
    cy.get('mat-select').last().click();
    cy.get('mat-option').first().click({force: true});
    cy.wait(1000);
    
    // Misc number
    cy.get('input.mat-input-element').last().type('MISC' + Math.floor(Math.random() * 100000));
    
    // ===== ADD PHONE NUMBER =====
    cy.contains('button', 'Add Phone Number').click();
    cy.wait(2000);
    
    // Phone type
    cy.get('mat-select').eq(-2).click();
    cy.get('mat-option').first().click({force: true});
    cy.wait(1000);
    
    // Phone country
    cy.get('mat-select').last().click();
    cy.get('mat-option').first().click({force: true});
    cy.wait(1000);
    
    // Phone number
    cy.get('input[mask="0*"]').last().type('2025551234');
    
    // ===== ADD ALTERNATIVE COMMUNICATION =====
    cy.contains('button span', 'Add Alter').click();
    cy.wait(2000);
    
    // Communication type
    cy.get('mat-select').last().click();
    cy.get('mat-option').first().click({force: true});
    cy.wait(1000);
    
    // Communication value
    cy.get('input.mat-input-element').last().type(`test.${Date.now()}@example.com`);
    
    // ===== ADD ADDRESS =====
    cy.contains('button', 'Add Address').click();
    cy.wait(2000);
    
    // Complete sequence for address fields with proper identification
    
    // Address type
    cy.get('mat-select').last().click();
    cy.get('mat-option').first().click({force: true});
    cy.wait(1000);
    
    // After address type is selected, target the street field
    cy.contains('Street').parent().find('input').type('123 Test Street');
    
    // City field
    cy.contains('City').parent().find('input').type('Washington');
    
    // State field (only appears after country is USA)
    cy.get('mat-select').last().click();
    cy.get('mat-option').contains('VA - VIRGINIA').click({force: true});
    cy.wait(1000);
    
    // Country field
    cy.get('mat-select').last().click();
    cy.get('mat-option').contains('USA').click({force: true});
    cy.wait(1000);
    
    // Postal code
    cy.get('input[mask="0*"]').last().type('20001');
    
    // ===== ADD FINANCIAL ACCOUNT =====
    cy.contains('button', 'Add Financial Account').click();
    cy.wait(2000);
    
    // Get all visible input fields
    const allInputs = cy.get('input.mat-input-element:visible');
    
    // Institution
    allInputs.eq(-7).type('Test Bank');
    
    // Branch
    allInputs.eq(-6).type('Main Branch');
    
    // Officer Name
    allInputs.eq(-5).type('John Officer');
    
    // Account Number
    allInputs.eq(-4).type('ACC' + Math.floor(Math.random() * 1000000));
    
    // Account Type
    allInputs.eq(-3).type('Checking');
    
    // Financial ID
    allInputs.eq(-2).type('FIN' + Math.floor(Math.random() * 10000));
    
    // Date
    cy.get('input[mask="00/00/0000"]').last().type(personData.primaryStartDate);
    
    // Force close any open dropdowns
    cy.get('body').click(0, 0);
    cy.wait(2000);
    
    // ===== SUBMIT FORM =====
    // Uncomment to actually submit
    // cy.contains('button', 'SUBMIT').click();
    
    cy.log('✅ Form automation completed successfully');
  });
});