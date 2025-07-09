const echarts = require('echarts')
const { createCanvas } = require('canvas')
const fs = require('fs')
const path = require('path')
const { v4: uuid } = require('uuid')
const { HOME_DIR, DOWNLOAD_DIR } = require('../constants/path')
const { isDirectoryWritable } = require('./writable')

let baseDir = HOME_DIR

const defaultEchartsConfig = {
  backgroundColor: '#fff',
}

const generateImage = async ({ echartsConfigString, width = 800, height = 600 }) => {
  try {
    const { writable } = await isDirectoryWritable(DOWNLOAD_DIR)

    if (writable) {
      baseDir = DOWNLOAD_DIR
    }

    const canvas = createCanvas(width, height)
    const chart = echarts.init(canvas)

    const echartsConfig = parseJsonWithFunctions(echartsConfigString || '{}')

    chart.setOption({ ...defaultEchartsConfig, ...echartsConfig })

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

function parseJsonWithFunctions(jsonString) {
  return Function(`"use strict"; return ${jsonString}`)()
}

module.exports = { generateImage }
