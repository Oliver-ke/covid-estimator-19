import logger from '../util/logger';

export default (req, res) => {
  logger.writeLog({
    method: 'GET', status: 200, uri: req.originalUrl, time: '8'
  });
  const logs = logger.readLogs();
  res.setHeader('Content-Type', 'text/plain');
  let response = '';
  logs.forEach((log, index) => {
    const {
      method, status, uri, time
    } = log;
    if (index === logs.length - 1) {
      response += `${method} \t\t ${uri} \t\t ${status} \t\t ${time}0ms`;
    } else {
      response += `${method} \t\t ${uri} \t\t ${status} \t\t ${time}0ms \n`;
    }
  });
  return res.send(response);
};
