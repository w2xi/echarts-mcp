// Helper function for deep merging objects
function deepMerge(target, source) {
  const result = { ...target }

  for (const key in source) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      result[key] = deepMerge(result[key] || {}, source[key])
    } else {
      result[key] = source[key]
    }
  }

  return result
}

function parseJsonWithFunctions(jsonString) {
  return Function(`"use strict"; return ${jsonString}`)()
}

module.exports = {
  deepMerge,
  parseJsonWithFunctions,
}
