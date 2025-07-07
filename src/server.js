const { McpServer } = require("@modelcontextprotocol/sdk/server/mcp.js");
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio.js');
const registerTools = require("./tools");
const version = require("../package.json").version;

function runMCPServer() {
  const server = new McpServer(
    {
      name: "Echarts MCP",
      version,
    },
    {
      capabilities: {
        tools: {},
      },
    }
  );

  server.onerror = (error) => console.error("[MCP Error]", error);
  process.on("SIGINT", async () => {
    await server.close();
    process.exit(0);
  });

  registerTools(server);

  const transport = new StdioServerTransport();
  server.connect(transport);
}

module.exports = runMCPServer;
