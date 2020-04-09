import xml from 'xml-js';
import { performance } from 'perf_hooks';
import covidEstimator from '../../estimator';
import logger from '../util/logger';

// eslint-disable-next-line consistent-return
const CovidController = async (req, res) => {
  const { p1 } = req.log;
  const { resType } = req.params;
  res.set('X-developer', 'Oliver-Ke');
  // eslint-disable-next-line no-console
  console.log(req.body);
  try {
    const estimatePayload = covidEstimator(req.body);
    if (!resType || resType === 'json') {
      const p2 = performance.now();
      logger.writeLog({
        method: 'POST', status: 200, uri: req.originalUrl, time: `${p2 - p1}`
      });
      return res.status(200).json(estimatePayload);
    }
    if (resType === 'xml') {
      const options = { compact: true, spaces: 4 };
      const response = xml.js2xml(estimatePayload, options);
      res.type('application/xml');
      // send xml response
      const p2 = performance.now();
      logger.writeLog({
        method: 'POST', status: 200, uri: req.originalUrl, time: `${p2 - p1}`
      });
      return res.status(200).send(response);
    }
    const p2 = performance.now();
    logger.writeLog({
      method: 'POST', status: 200, uri: req.originalUrl, time: `${p2 - p1}`
    });
    return res.status(400).json({ error: 'Unknow response type' });
  } catch (error) {
    const p2 = performance.now();
    logger.writeLog({
      method: 'POST', status: 200, uri: req.originalUrl, time: `${p2 - p1}`
    });
    return res.status(500).json({ error: 'Server error' });
  }
};


export default CovidController;
