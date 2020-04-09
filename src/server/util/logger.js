import fs from 'fs';
import path from 'path';

const writeLog = (data) => {
  // before writing we need to read inital input then write;
  data.time = parseInt(data.time, 10);
  const filePath = path.join(__dirname, 'logs.json');
  const buffer = fs.readFileSync(filePath);
  const rowData = JSON.parse(buffer);
  rowData.logs.push(data);
  fs.writeFileSync(filePath, JSON.stringify(rowData));
};

const readLogs = () => {
  const filePath = path.join(__dirname, 'logs.json');
  const buffer = fs.readFileSync(filePath);
  const data = JSON.parse(buffer);
  return data.logs;
};

const logger = {
  writeLog,
  readLogs
};

export default logger;
