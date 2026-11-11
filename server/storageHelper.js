const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

function saveLocalRecord(filename, item) {
  const filePath = path.join(dataDir, filename);
  let list = [];
  try {
    if (fs.existsSync(filePath)) {
      list = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }
  } catch (err) {
    list = [];
  }
  list.unshift(item);
  fs.writeFileSync(filePath, JSON.stringify(list, null, 2), 'utf8');
}

function readLocalRecords(filename) {
  const filePath = path.join(dataDir, filename);
  try {
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }
  } catch (err) {
    return [];
  }
  return [];
}

module.exports = {
  saveLocalRecord,
  readLocalRecords,
};
