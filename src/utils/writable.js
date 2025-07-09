const fs = require('fs')
const path = require('path')

/**
 * Check if the directory is writable (cross-platform compatible)
 * @param {string} dirPath The path of the directory to check
 * @returns {Promise<{writable: boolean, error?: Error}>} A Promise that resolves to an object containing the result
 */
async function isDirectoryWritable(dirPath) {
  // Normalize the path, handle different platform path separators
  const normalizedPath = path.normalize(dirPath)

  // Check if the directory exists
  try {
    await fs.promises.access(normalizedPath, fs.constants.F_OK)
  } catch (err) {
    return { writable: false, error: new Error(`Directory does not exist: ${normalizedPath}`) }
  }

  // Check if it is a directory
  try {
    const stat = await fs.promises.stat(normalizedPath)
    if (!stat.isDirectory()) {
      return { writable: false, error: new Error(`Path is not a directory: ${normalizedPath}`) }
    }
  } catch (err) {
    return { writable: false, error: err }
  }

  // Try to actually write and delete the test file (the most reliable method)
  const testFileName = `.write-test-${Date.now()}-${Math.random().toString(36).substring(2)}`
  const testFilePath = path.join(normalizedPath, testFileName)

  try {
    // Try to write the file
    await fs.promises.writeFile(testFilePath, 'write test')

    // Try to read the file
    await fs.promises.readFile(testFilePath)

    // Try to delete the file
    await fs.promises.unlink(testFilePath)

    return { writable: true }
  } catch (err) {
    // If it fails, try to clean up the possibly created file
    try {
      await fs.promises.unlink(testFilePath).catch(() => {})
    } catch (cleanupErr) {
      // Ignore cleanup errors
    }
    return { writable: false, error: err }
  }
}

module.exports = {
  isDirectoryWritable,
}
