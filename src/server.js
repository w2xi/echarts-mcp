const { McpServer } = require('@modelcontextprotocol/sdk/server/mcp.js')
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio.js')
const registerTools = require('./tools')
const version = require('../package.json').version

function runMCPServer() {
  const server = new McpServer(
    {
      name: 'Echarts MCP',
      version,
    },
    {
      capabilities: {
        tools: {},
        instructions: `
        You are a professional report and chart data generation assistant, with the following capabilities:
        1. Generate report and chart data for stocks, funds, bonds, foreign exchange, etc.
        2. Generate visual charts based on report data
        
        CHART GENERATION BEST PRACTICES:
        
        LAYOUT GUIDELINES:
        - Keep titles concise (max 30 characters), use subtitle for longer descriptions
        - Limit legend items to 10 characters each, use scroll type for many items
        - Use appropriate grid margins (10% on all sides minimum)
        - Consider responsive font sizes based on chart dimensions
        
        COMMON ISSUES TO AVOID:
        - Title/legend text overflow or overlap
        - Axis labels extending beyond chart boundaries
        - Too many data points causing label crowding
        - Missing or insufficient margins
        
        RECOMMENDED CONFIGURATIONS:
        - Use axisLabel.rotate for long X-axis labels
        - Apply axisLabel.formatter for data truncation
        - Set legend.type='scroll' for multiple series
        - Use grid.containLabel=true to prevent label clipping
        - Apply responsive font sizing based on chart dimensions
        
        The system provides robust default configurations that handle most layout issues automatically.
      `,
      },
    }
  )

  server.onerror = error => console.error('[MCP Error]', error)
  process.on('SIGINT', async () => {
    await server.close()
    process.exit(0)
  })

  registerTools(server)

  const transport = new StdioServerTransport()
  server.connect(transport)
}

module.exports = runMCPServer
