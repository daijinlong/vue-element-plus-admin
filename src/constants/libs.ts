import { EChartsOption } from 'echarts'

export const makeLineOption = (titleText, xAxisData, legendData, seriesData) => {
  // make series
  const seriesList = new Array(legendData.length)
  let i = 0
  for (const _legend of legendData) {
    seriesList[i] = {
      name: _legend,
      smooth: true,
      type: 'line',
      data: seriesData[_legend],
      animationDuration: 2800,
      animationEasing: 'quadraticOut'
    }
    i++
  }

  const lineOptions: EChartsOption = {
    title: {
      text: titleText,
      left: 'center'
    },
    xAxis: {
      data: xAxisData,
      boundaryGap: false,
      axisTick: {
        show: false
      }
    },
    grid: {
      left: 20,
      right: 20,
      bottom: 20,
      top: 80,
      containLabel: true
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      },
      padding: [5, 10]
    },
    yAxis: {
      axisTick: {
        show: false
      }
    },
    legend: {
      data: legendData,
      top: 50
    },
    series: seriesList
  }

  return lineOptions
}
