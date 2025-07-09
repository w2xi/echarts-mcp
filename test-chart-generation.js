const { generateImage } = require('./src/utils/generateImage')

// Test case 1: Long title and multiple legend items
const testConfig1 = {
  title: {
    text: 'This is a very long title that might cause overflow issues in the chart',
    subtext: 'Subtitle with additional information',
  },
  legend: {
    data: [
      'Very Long Legend Item 1',
      'Very Long Legend Item 2',
      'Very Long Legend Item 3',
      'Item 4',
      'Item 5',
      'Item 6',
    ],
  },
  xAxis: {
    data: [
      'Very Long Category Name 1',
      'Very Long Category Name 2',
      'Very Long Category Name 3',
      'Category 4',
      'Category 5',
    ],
  },
  yAxis: {},
  series: [
    {
      name: 'Very Long Legend Item 1',
      type: 'bar',
      data: [1000000, 2000000, 3000000, 4000000, 5000000],
    },
    {
      name: 'Very Long Legend Item 2',
      type: 'line',
      data: [500000, 1500000, 2500000, 3500000, 4500000],
    },
  ],
}

// Test case 2: Small size chart
const testConfig2 = {
  title: {
    text: 'Small Chart Test',
  },
  legend: {
    data: ['Series 1', 'Series 2'],
  },
  xAxis: {
    data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  },
  yAxis: {},
  series: [
    {
      name: 'Series 1',
      type: 'line',
      data: [120, 132, 101, 134, 90, 230, 210, 182, 191, 234, 290, 330],
    },
    {
      name: 'Series 2',
      type: 'bar',
      data: [220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 90, 149],
    },
  ],
}

async function runTests() {
  console.log('Testing chart generation with layout improvements...')

  try {
    // Test 1: Standard size chart
    console.log('Test 1: Standard size chart with long content')
    const result1 = await generateImage({
      echartsConfig: testConfig1,
      width: 1000,
      height: 800,
    })
    console.log('Result 1:', result1)

    // Test 2: Small size chart
    console.log('Test 2: Small size chart')
    const result2 = await generateImage({
      echartsConfig: testConfig2,
      width: 600,
      height: 400,
    })
    console.log('Result 2:', result2)

    // Test 3: Large size chart
    console.log('Test 3: Large size chart')
    const result3 = await generateImage({
      echartsConfig: testConfig1,
      width: 1600,
      height: 1200,
    })
    console.log('Result 3:', result3)

    console.log('All tests completed!')
  } catch (error) {
    console.error('Test failed:', error)
  }
}

// Run tests if this file is executed directly
if (require.main === module) {
  runTests()
}

module.exports = { runTests }
