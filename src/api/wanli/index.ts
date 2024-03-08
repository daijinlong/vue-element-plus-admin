import request from '@/axios'
import { IS_MOCK } from '@/axios/service'
import type { AccountType } from './types'

// 获取仓库价值
export const getExtractApi = (data: AccountType) => {
  if (IS_MOCK) {
    return request.post({
      url: '/mock/wanli/get_extract/',
      data
    })
  } else {
    return request.post({
      url: '/api/wanli/get_extract/',
      data
    })
  }
}
