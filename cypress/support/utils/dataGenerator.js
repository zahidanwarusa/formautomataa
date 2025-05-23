// Data generator utility
const faker = require('faker');
const moment = require('moment');

class DataGenerator {
  static generatePersonData() {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    
    // Generate date of birth (18-80 years ago)
    const dobDate = faker.date.past(faker.datatype.number({ min: 18, max: 80 }));
    const dob = moment(dobDate).format('MM/DD/YYYY');
    
    // Generate passport number (letter followed by 8 digits)
    const passportNumber = 'P' + faker.datatype.number({ min: 10000000, max: 99999999 });
    
    // Generate passport issue date (1-5 years ago)
    const passportIssueDate = moment()
      .subtract(faker.datatype.number({ min: 1, max: 5 }), 'years')
      .format('MM/DD/YYYY');
    
    // Generate passport expiry date (3-8 years from issue date)
    const passportExpiryDate = moment(passportIssueDate, 'MM/DD/YYYY')
      .add(faker.datatype.number({ min: 3, max: 8 }), 'years')
      .format('MM/DD/YYYY');
    
    // Generate driver's license number
    const dlLength = faker.datatype.number({ min: 7, max: 12 });
    let driverLicense = 'DL';
    for (let i = 0; i < dlLength; i++) {
      driverLicense += faker.datatype.number({ min: 0, max: 9 });
    }
    
    // Generate A-Number (9 digits)
    let aNumber = '';
    for (let i = 0; i < 9; i++) {
      aNumber += faker.datatype.number({ min: 0, max: 9 });
    }
    
    // Generate SSN (xxx-xx-xxxx format)
    const ssn = faker.datatype.number({ min: 100, max: 999 }) + '-' +
                faker.datatype.number({ min: 10, max: 99 }) + '-' +
                faker.datatype.number({ min: 1000, max: 9999 });
    
    // Generate height
    const feet = faker.datatype.number({ min: 5, max: 6 });
    const inches = faker.datatype.number({ min: 0, max: 11 });
    const height = `${feet}' ${inches}"`;
    
    // Generate weight
    const weight = faker.datatype.number({ min: 100, max: 250 }).toString();
    
    const personData = {
      firstName,
      lastName,
      dob,
      passportNumber,
      passportIssueDate,
      passportExpiryDate,
      driverLicense,
      aNumber,
      ssn,
      height,
      weight,
      // Additional fields for the form
      primaryStartDate: moment().format('MM/DD/YYYY'),
      primaryEndDate: moment().add(1, 'year').format('MM/DD/YYYY'),
      remarks: `Automated test entry - Subject under review - Generated at ${Date.now()}`
    };
    
    // Log the generated data
    console.log('Generated person data:', personData);
    
    return personData;
  }
}

export default DataGenerator;