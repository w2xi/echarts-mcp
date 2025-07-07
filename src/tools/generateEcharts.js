const { z } = require("zod");
const { generateImage } = require("../utils/generateImage");

const registerTool = (server) => {
  server.tool(
    "generate-echarts",
    "Generate an echarts image from a given echarts configuration",
    {
      width: z.number().describe("The width of the chart, like 1000"),
      height: z.number().describe("The height of the chart, like 500"),
      echarts: z.string().describe("echarts configuration, like { backgroundColor: '#fff', title: {text: 'Stock financial data'}, tooltip: {}, legend: {data: ['sales']}, xAxis: {data: ['Shirts', 'Cardigans', 'Chiffons', 'Pants', 'Heels', 'Socks']}, yAxis: {}, series: [{name: 'sales', type: 'bar', data: [5, 20, 36, 10, 10, 20]}] }"),
    },
    async ({
      width,
      height,
      echarts,
    }) => {
      const { url, error } = await generateImage({ width, height, echartsConfigString: echarts });

      return {
        content: [{ type: "text", text: error || url }],
      };
    }
  );
};

module.exports = registerTool; 