const generateEcharts = require('./generateEcharts.js');

function registerTools(server) {
  [generateEcharts].forEach(tool => tool(server));
}

module.exports = registerTools; 