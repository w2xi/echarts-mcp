# 📊 ECharts MCP 服务器

中文文档 | [English](./README.md)

一个模型上下文协议（MCP）服务器，可以从 ECharts 配置生成精美的图表图像。

## ✨ 特性

- 🎨 从 ECharts 配置生成高质量图表图像
- 🖼️ 支持多种图表类型（柱状图、折线图、饼图、散点图等）
- 📐 可自定义尺寸（宽度/高度）
- 🎯 通过 MCP 轻松集成到 AI 助手中

## ⚙️ 配置

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

## 本地开发

如果你想从源码运行：

```bash
# 克隆仓库
git clone https://github.com/w2xi/echarts-mcp.git
cd echarts-mcp

# 安装依赖
npm install

# 运行服务器
npm start
```

然后配置你的 MCP 客户端：

```json
{
  "mcpServers": {
    "echarts-mcp": {
      "command": "node",
      "args": ["/path/to/echarts-mcp/cli.js"],
    }
  }
}
```

## 📖 使用方法

配置完成后，你可以在 AI 助手中通过请求图表生成来使用 MCP 服务器：

### 示例提示：

- "生成一个显示过去6个月销售数据的柱状图"
- "创建一个显示市场份额分布的饼图"
- "制作一个显示温度随时间变化的折线图"

### 工具参数：

- `width`: 图表宽度（像素，例如 1000）
- `height`: 图表高度（像素，例如 500）
- `echarts`: ECharts 配置对象字符串

### ECharts 配置示例：

```javascript
{
  backgroundColor: '#fff',
  title: {
    text: '月度销售数据'
  },
  tooltip: {},
  legend: {
    data: ['销售额']
  },
  xAxis: {
    data: ['一月', '二月', '三月', '四月', '五月', '六月']
  },
  yAxis: {},
  series: [{
    name: '销售额',
    type: 'bar',
    data: [120, 200, 150, 80, 70, 110]
  }]
}
```

## 🛠️ 开发

### 脚本

- `npm start` - 启动 MCP 服务器
- `npm test` - 运行测试图表
- `npm run inspect` - 使用调试工具检查 MCP 服务器

### 依赖项

- **ECharts**: 图表生成库
- **Canvas**: 服务器端画布渲染
- **MCP SDK**: 模型上下文协议实现
- **Zod**: 模式验证

## 🤝 贡献

欢迎贡献！请随时提交 Pull Request。

## 📄 许可证

MIT 许可证

## 🔗 链接

- [ECharts 文档](https://echarts.apache.org/zh/index.html)
- [模型上下文协议](https://modelcontextprotocol.io/)

---

用 ❤️ 制作，作者：[w2xi](https://github.com/w2xi) 