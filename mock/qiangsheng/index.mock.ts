import { faker } from '@faker-js/faker'
import { SUCCESS_CODE } from '@/constants'
import type { ExtractValueData } from '@/api/qiangsheng/types'

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

export default [
  // 仓库信息
  {
    url: '/mock/qiangsheng/get_extract',
    method: 'post',
    timeout,
    response: () => {
      return {
        code: SUCCESS_CODE,
        data: {
          extract: List
        }
      }
    }
  }
]
