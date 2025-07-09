const { z } = require('zod')
const { generateImage } = require('../utils/generateImage')
const { parseJsonWithFunctions } = require('../utils/general')
const registerTool = server => {
  server.tool(
    'generate-chart',
    'Generate a chart image based on the echarts configuration',
    {
      width: z.number().describe('The width of the chart, like 1000'),
      height: z.number().describe('The height of the chart, like 500'),
      echarts: z.string().describe(
        `ECharts configuration object. IMPORTANT LAYOUT GUIDELINES:
          
          1. TITLE: Use concise titles (max 30 characters). For longer titles, consider subtitle property.
          2. LEGEND: Keep legend items short (max 10 characters each). Use legend.type='scroll' for many items.
          3. AXIS LABELS: Keep axis labels concise. For long labels, use axisLabel.rotate or axisLabel.formatter.
          4. GRID: Use appropriate margins - grid: {left: '10%', right: '10%', top: '15%', bottom: '15%'}.
          5. RESPONSIVE: Consider chart dimensions when setting font sizes and spacing.
          
          Example structure:
          {
            title: {text: 'Stock Data', left: 'center', top: '2%'},
            legend: {data: ['Price', 'Volume'], top: '8%', type: 'scroll'},
            xAxis: {
              data: ['Jan', 'Feb', 'Mar'],
              axisLabel: {rotate: 45, fontSize: 11}
            },
            yAxis: {
              axisLabel: {fontSize: 11}
            },
            series: [{
              name: 'Price',
              type: 'line',
              data: [100, 120, 110]
            }]
          }
          
          AVOID: Extremely long titles, too many legend items without scrolling, overlapping labels, missing grid margins.`
      ),
    },
    async ({ width, height, echarts }) => {
      const echartsConfig = parseJsonWithFunctions(echarts || '{}')
      const { url, error } = await generateImage({ width, height, echartsConfig })

      return {
        content: [{ type: 'text', text: error || url }],
      }
    }
  )
}

module.exports = registerTool
