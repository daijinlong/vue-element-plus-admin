import { faker } from '@faker-js/faker'
import { SUCCESS_CODE } from '@/constants'
import type { ExtractValueData } from '@/api/xingqiu/types'

const timeout = 1000

const List: ExtractValueData[] = []
for (let i = 0; i < 5; i++) {
  const curPrice = faker.number.int({ min: 100, max: 1000 })
  const curNum = faker.number.int({ min: 0, max: 10 })
  const curTotal = curPrice * curNum
  List.push({
    title: faker.string.sample({ min: 5, max: 20 }),
    id: faker.string.sample({ min: 2, max: 5 }),
    price: curPrice,
    num: curNum,
    total: curTotal
  })
}

const getExtractValueHistoryLineOption = () => {
  // mock data
  const titleText = faker.string.sample({ min: 5, max: 20 })
  const xAxisData = [
    faker.date.anytime().toDateString(),
    faker.date.anytime().toDateString(),
    faker.date.anytime().toDateString(),
    faker.date.anytime().toDateString(),
    faker.date.anytime().toDateString(),
    faker.date.anytime().toDateString(),
    faker.date.anytime().toDateString(),
    faker.date.anytime().toDateString(),
    faker.date.anytime().toDateString(),
    faker.date.anytime().toDateString(),
    faker.date.anytime().toDateString(),
    faker.date.anytime().toDateString()
  ]
  const legendData = ['extract']
  const seriesData = {
    extract: [
      faker.number.int({ min: 20, max: 200 }),
      faker.number.int({ min: 20, max: 200 }),
      faker.number.int({ min: 20, max: 200 }),
      faker.number.int({ min: 20, max: 200 }),
      faker.number.int({ min: 20, max: 200 }),
      faker.number.int({ min: 20, max: 200 }),
      faker.number.int({ min: 20, max: 200 }),
      faker.number.int({ min: 20, max: 200 }),
      faker.number.int({ min: 20, max: 200 }),
      faker.number.int({ min: 20, max: 200 }),
      faker.number.int({ min: 20, max: 200 }),
      faker.number.int({ min: 20, max: 200 })
    ]
  }

  return { titleText, xAxisData, legendData, seriesData }
}

export default [
  // 仓库信息
  {
    url: '/mock/xingqiu/get_extract/',
    method: 'post',
    timeout,
    response: () => {
      return {
        code: SUCCESS_CODE,
        data: {
          token: faker.string.sample({ min: 5, max: 20 }),
          extract: List,
          history: getExtractValueHistoryLineOption()
        }
      }
    }
  }
]
