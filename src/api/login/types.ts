export interface UserLoginType {
  username: string
  password: string
}

export interface UserType {
  username: string
  password: string
  role: string
  roleId: string
}

export interface SmsCodeParam {
  username: string
}

export interface UserRegisterType {
  username: string
  code: string
  password: string
  check_password: string
}
