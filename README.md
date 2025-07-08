# 📊 ECharts MCP Server

[中文文档](./README.zh-cn.md) | English

A Model Context Protocol (MCP) server that generates beautiful chart images from ECharts configurations.

## ✨ Features

- 🎨 Generate high-quality chart images from ECharts configurations
- 🖼️ Support for various chart types (bar, line, pie, scatter, etc.)
- 📐 Customizable dimensions (width/height)
- 🎯 Easy integration with AI assistants via MCP

## ⚙️ Configuration

`.cursor/mcp.json`

```json
{
  "mcpServers": {
    "echarts-mcp": {
      "command": "npx",
      "args": ["echarts-mcp"],
    }
  }
}
```

## 🔧 Local Development

If you want to run from source:

```bash
# Clone the repository
git clone https://github.com/w2xi/echarts-mcp.git
cd echarts-mcp

# Install dependencies
npm install

# Run the server
npm start
```

Then configure your MCP client:

```json
{
  "mcpServers": {
    "echarts-mcp": {
      "command": "node",
      "args": ["/path/to/echarts-mcp/cli.js"],
      "env": {}
    }
  }
}
```

## 📖 Usage

Once configured, you can use the MCP server in your AI assistant by requesting chart generation:

### Example Prompts:

- "Generate a bar chart showing sales data for the last 6 months"
- "Create a pie chart displaying market share distribution"
- "Make a line chart with temperature data over time"

### Tool Parameters:

- `width`: Chart width in pixels (e.g., 1000)
- `height`: Chart height in pixels (e.g., 500)
- `echarts`: ECharts configuration object as string

### Example ECharts Configuration:

```javascript
{
  backgroundColor: '#fff',
  title: {
    text: 'Monthly Sales Data'
  },
  tooltip: {},
  legend: {
    data: ['Sales']
  },
  xAxis: {
    data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
  },
  yAxis: {},
  series: [{
    name: 'Sales',
    type: 'bar',
    data: [120, 200, 150, 80, 70, 110]
  }]
}
```

## 🛠️ Development

### Scripts

- `npm start` - Start the MCP server
- `npm test` - Run test charts
- `npm run inspect` - Inspect the MCP server with debugging tools

### Dependencies

- **ECharts**: Chart generation library
- **Canvas**: Server-side canvas rendering
- **MCP SDK**: Model Context Protocol implementation
- **Zod**: Schema validation

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License

## 🔗 Links

- [ECharts Documentation](https://echarts.apache.org/en/index.html)
- [Model Context Protocol](https://modelcontextprotocol.io/)
---

Made with ❤️ by [w2xi](https://github.com/w2xi) 