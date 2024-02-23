import request from '@/axios'
import { IS_MOCK } from '@/axios/service'
import type { UserType, SmsCodeParam } from './types'

interface RoleParams {
  roleName: string
}

export const loginApi = (data: UserType): Promise<IResponse<UserType>> => {
  if (IS_MOCK) {
    return request.post({ url: '/mock/user/login', data })
  } else {
    return request.post({ url: '/api/user/login/', data })
  }
}

export const loginOutApi = (): Promise<IResponse> => {
  if (IS_MOCK) {
    return request.get({ url: '/mock/user/loginOut' })
  } else {
    return request.get({ url: '/api/user/loginOut/' })
  }
}

export const getUserListApi = ({ params }: AxiosConfig) => {
  return request.get<{
    code: string
    data: {
      list: UserType[]
      total: number
    }
  }>({ url: '/mock/user/list', params })
}

export const getAdminRoleApi = (
  params: RoleParams
): Promise<IResponse<AppCustomRouteRecordRaw[]>> => {
  if (IS_MOCK) {
    return request.get({ url: '/mock/role/list', params })
  } else {
    return request.get({ url: '/api/user/role_list', params })
  }
}

export const getTestRoleApi = (params: RoleParams): Promise<IResponse<string[]>> => {
  if (IS_MOCK) {
    return request.get({ url: '/mock/role/list2', params })
  } else {
    return request.get({ url: '/api/user/role_list2', params })
  }
}

export const getSmsCodeApi = (data: SmsCodeParam) => {
  if (IS_MOCK) {
    return request.post({ url: '/mock/user/get_sms_code', data })
  } else {
    return request.post({ url: '/api/user/get_sms_code/', data })
  }
}
