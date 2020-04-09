
import { validationResult } from 'express-validator';
import { performance } from 'perf_hooks';
import logger from '../util/logger';

import rules from '../util/validationRules';

export default () => [
  ...rules,
  (req, res, next) => {
    const p1 = performance.now();
    req.log = { p1 };
    const errors = validationResult(req);
    const resErrorMsg = {};
    errors.array().forEach((error) => {
      resErrorMsg[error.param] = error.msg;
    });
    if (!errors.isEmpty()) {
      const p2 = performance.now();
      logger.writeLog({
        method: 'POST', status: 400, uri: req.originalUrl, time: `${p2 - p1}`
      });
      return res.status(400).json({ errors: resErrorMsg });
    }
    return next();
  }
];
