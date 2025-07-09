const echarts = require('echarts')
const { createCanvas } = require('canvas')
const fs = require('fs')
const path = require('path')
const { v4: uuid } = require('uuid')
const { HOME_DIR, DOWNLOAD_DIR } = require('../constants/path')
const { isDirectoryWritable } = require('./writable')
const { deepMerge } = require('./general')
let baseDir = HOME_DIR

const defaultEchartsConfig = {
  backgroundColor: '#fff',
  // Add default chart container configuration to prevent content overflow
  grid: {
    left: '10%',
    right: '10%',
    top: '15%',
    bottom: '15%',
    containLabel: true, // Ensure labels are not clipped
  },
  // Default title configuration to prevent folding and overflow
  title: {
    top: '2%',
    left: 'center',
    textStyle: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    // Auto wrap text if title is too long
    textWrap: 'break',
    textOverflow: 'breakAll',
  },
  // Default legend configuration to prevent folding and overflow
  legend: {
    top: '8%',
    left: 'center',
    type: 'scroll', // Show scrollbar when too many legend items
    pageButtonItemGap: 5,
    pageIconSize: 10,
    itemGap: 10,
    textStyle: {
      fontSize: 12,
    },
    // Limit maximum width of legend
    width: '80%',
  },
  // Default tooltip configuration
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985',
      },
    },
    // Prevent tooltip from exceeding boundaries
    confine: true,
    textStyle: {
      fontSize: 12,
    },
  },
  // Default X-axis configuration
  xAxis: {
    type: 'category',
    axisLabel: {
      interval: 0, // Show all labels
      rotate: 0, // Default no rotation, will be handled automatically if labels are too long
      fontSize: 11,
      // Handle long labels
      formatter: function (value) {
        if (value && value.length > 8) {
          return value.substring(0, 8) + '...'
        }
        return value
      },
    },
    axisTick: {
      alignWithLabel: true,
    },
  },
  // Default Y-axis configuration
  yAxis: {
    type: 'value',
    axisLabel: {
      fontSize: 11,
      // Format numbers to prevent displaying too long values
      formatter: function (value) {
        if (Math.abs(value) >= 1000000) {
          return (value / 1000000).toFixed(1) + 'M'
        } else if (Math.abs(value) >= 1000) {
          return (value / 1000).toFixed(1) + 'K'
        }
        return value
      },
    },
    // Ensure Y-axis has appropriate margins
    scale: true,
  },
  // Default series configuration
  series: [],
}

async function generateImage({ echartsConfig, width = 800, height = 600 }) {
  try {
    const { writable } = await isDirectoryWritable(DOWNLOAD_DIR)

    if (writable) {
      baseDir = DOWNLOAD_DIR
    }

    const canvas = createCanvas(width, height)
    const chart = echarts.init(canvas)

    // Deep merge configurations to ensure default configs are properly applied
    const finalConfig = deepMerge(defaultEchartsConfig, echartsConfig)

    // Dynamically adjust configuration to fit canvas dimensions
    adjustConfigForDimensions(finalConfig, width, height)

    chart.setOption(finalConfig)

    const buffer = canvas.toBuffer('image/png')

    const fileName = `${uuid()}.png`
    const filePath = path.join(baseDir, fileName)

    fs.writeFileSync(filePath, buffer)

    return {
      url: filePath,
    }
  } catch (error) {
    return {
      error: error.message,
    }
  }
}

// Dynamically adjust configuration based on canvas dimensions
function adjustConfigForDimensions(config, width, height) {
  // Adjust font sizes based on canvas size
  const scaleFactor = Math.min(width / 1000, height / 800)

  // Adjust title font size
  if (config.title && config.title.textStyle) {
    config.title.textStyle.fontSize = Math.max(12, Math.floor(16 * scaleFactor))
  }

  // Adjust legend font size
  if (config.legend && config.legend.textStyle) {
    config.legend.textStyle.fontSize = Math.max(10, Math.floor(12 * scaleFactor))
  }

  // Adjust axis label font sizes
  if (config.xAxis && config.xAxis.axisLabel) {
    config.xAxis.axisLabel.fontSize = Math.max(9, Math.floor(11 * scaleFactor))
  }

  if (config.yAxis && config.yAxis.axisLabel) {
    config.yAxis.axisLabel.fontSize = Math.max(9, Math.floor(11 * scaleFactor))
  }

  // Handle array form of axes as well
  if (Array.isArray(config.xAxis)) {
    config.xAxis.forEach(axis => {
      if (axis.axisLabel) {
        axis.axisLabel.fontSize = Math.max(9, Math.floor(11 * scaleFactor))
      }
    })
  }

  if (Array.isArray(config.yAxis)) {
    config.yAxis.forEach(axis => {
      if (axis.axisLabel) {
        axis.axisLabel.fontSize = Math.max(9, Math.floor(11 * scaleFactor))
      }
    })
  }

  // Auto rotate X-axis labels for small charts
  if (width < 600 && config.xAxis && config.xAxis.axisLabel) {
    config.xAxis.axisLabel.rotate = 45
  }
}

module.exports = { generateImage }
