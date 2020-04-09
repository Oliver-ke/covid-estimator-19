import { body } from 'express-validator';

const covidInputValidator = [
  body('region', 'Provide region details').not().isEmpty(),
  body('periodType', 'periodType must be a string').not().isEmpty().isString(),
  body('timeToElapse', 'timeToElapse must be a number').not().isEmpty().isNumeric(),
  body('reportedCases', 'provide valid reportedCases').not().isEmpty().isNumeric(),
  body('population', 'Provide valid population').not().isEmpty().isNumeric(),
  body('totalHospitalBeds', 'periodType valid total hospitalBeds').not().isEmpty().isNumeric()
];

export default covidInputValidator;
