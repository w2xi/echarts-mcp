const generateChart = require('./generateChart.js')

function registerTools(server) {
  ;[generateChart].forEach(tool => tool(server))
}

module.exports = registerTools
