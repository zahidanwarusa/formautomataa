// Excel export utility
const ExcelJS = require('exceljs');

class ExcelManager {
  static async saveDataToExcel(personData) {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Form Data');
    
    // Add headers
    sheet.columns = [
      { header: 'firstName', key: 'firstName', width: 20 },
      { header: 'lastName', key: 'lastName', width: 20 },
      { header: 'dob', key: 'dob', width: 15 },
      { header: 'passportNumber', key: 'passportNumber', width: 20 },
      { header: 'passportIssueDate', key: 'passportIssueDate', width: 20 },
      { header: 'passportExpiryDate', key: 'passportExpiryDate', width: 20 },
      { header: 'driverLicense', key: 'driverLicense', width: 20 },
      { header: 'aNumber', key: 'aNumber', width: 15 },
      { header: 'ssn', key: 'ssn', width: 15 },
      { header: 'height', key: 'height', width: 10 },
      { header: 'weight', key: 'weight', width: 10 }
    ];
    
    // Add data row
    sheet.addRow(personData);
    
    try {
      // Save to file (this will save in Cypress's working directory)
      await workbook.xlsx.writeFile('form_data.xlsx');
      console.log('Data saved to form_data.xlsx');
      
      // Save data to fixture for use in tests
      cy.writeFile('cypress/fixtures/person-data.json', personData);
      
      return true;
    } catch (error) {
      console.error('Error saving Excel file:', error);
      return false;
    }
  }
}

export default ExcelManager;