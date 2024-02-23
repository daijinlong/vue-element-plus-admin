<script setup lang="tsx">
import { Form, FormSchema } from '@/components/Form'
import { reactive, ref } from 'vue'
import { useI18n } from '@/hooks/web/useI18n'
import { useForm } from '@/hooks/web/useForm'
import { ElInput, FormRules, ElMessage } from 'element-plus'
import { useValidator } from '@/hooks/web/useValidator'
import { BaseButton } from '@/components/Button'
import { getSmsCodeApi } from '@/api/login'
import { SmsCodeParam } from '@/api/login/types'

const emit = defineEmits(['to-login'])

const { formRegister, formMethods } = useForm()
const { getFormData, getElFormExpose } = formMethods

const { t } = useI18n()

const { required, lengthRange, phoneValidator, smsCodeValidator } = useValidator()

let isSendingCode = ref(false)
let countdown = ref(0)

const schema = reactive<FormSchema[]>([
  {
    field: 'title',
    colProps: {
      span: 24
    },
    formItemProps: {
      slots: {
        default: () => {
          return <h2 class="text-2xl font-bold text-center w-[100%]">{t('login.register')}</h2>
        }
      }
    }
  },
  {
    field: 'username',
    label: t('login.username'),
    value: '',
    component: 'Input',
    colProps: {
      span: 24
    },
    componentProps: {
      placeholder: t('login.usernamePlaceholder')
    }
  },
  {
    field: 'code',
    label: t('login.code'),
    colProps: {
      span: 24
    },
    formItemProps: {
      slots: {
        default: (formData) => {
          return (
            <div class="w-[100%] flex">
              <ElInput
                class="w-[70%]"
                v-model={formData.code}
                placeholder={t('login.codePlaceholder')}
              />
              <BaseButton
                type="primary"
                class="w-[30%]"
                onClick={getCode}
                disabled={isSendingCode.value || countdown.value > 0}
              >
                {isSendingCode.value || countdown.value > 0
                  ? countdown.value + t('login.resendCountDown')
                  : t('login.getCode')}
              </BaseButton>
            </div>
          )
        }
      }
    }
  },
  {
    field: 'password',
    label: t('login.password'),
    value: '',
    component: 'InputPassword',
    colProps: {
      span: 24
    },
    componentProps: {
      style: {
        width: '100%'
      },
      strength: true,
      placeholder: t('login.passwordPlaceholder')
    }
  },
  {
    field: 'check_password',
    label: t('login.checkPassword'),
    value: '',
    component: 'InputPassword',
    colProps: {
      span: 24
    },
    componentProps: {
      style: {
        width: '100%'
      },
      strength: true,
      placeholder: t('login.passwordPlaceholder')
    }
  },
  {
    field: 'register',
    colProps: {
      span: 24
    },
    formItemProps: {
      slots: {
        default: () => {
          return (
            <>
              <div class="w-[100%]">
                <BaseButton
                  type="primary"
                  class="w-[100%]"
                  loading={loading.value}
                  onClick={loginRegister}
                >
                  {t('login.register')}
                </BaseButton>
              </div>
              <div class="w-[100%] mt-15px">
                <BaseButton class="w-[100%]" onClick={toLogin}>
                  {t('login.hasUser')}
                </BaseButton>
              </div>
            </>
          )
        }
      }
    }
  }
])

const rules: FormRules = {
  username: [required(), lengthRange({ min: 11, max: 11 }), phoneValidator()],
  code: [required(), lengthRange({ min: 6, max: 6 }), smsCodeValidator()],
  password: [required(), lengthRange({ min: 8, max: 20 })],
  check_password: [required(), lengthRange({ min: 8, max: 20 })]
}

const toLogin = () => {
  emit('to-login')
}

const loading = ref(false)

const loginRegister = async () => {
  const formRef = await getElFormExpose()
  formRef?.validate(async (valid) => {
    if (valid) {
      try {
        loading.value = true
        toLogin()
      } finally {
        loading.value = false
      }
    }
  })
}

const getCode = async () => {
  const formData = await getFormData<SmsCodeParam>()
  const reg = /^1[3|4|5|6|7|8|9][0-9]\d{8}(,1[3|4|5|6|7|8|9][0-9]\d{8})*$/
  if (!reg.test(formData.username)) {
    ElMessage.error(`err phone: ${formData.username}`)
    return
  }

  const res = await getSmsCodeApi(formData)
  if (res.code == 20000) {
    ElMessage.success(t('login.sendSmsCodeSucceed'))
  } else {
    ElMessage.error(`err code: ${res.code}`)
    return
  }

  isSendingCode.value = true
  countdown.value = 10

  // 倒计时效果
  const countdownInterval = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(countdownInterval)
      isSendingCode.value = false
    }
  }, 1000)
}
</script>

<template>
  <Form
    :schema="schema"
    :rules="rules"
    label-position="top"
    hide-required-asterisk
    size="large"
    class="dark:(border-1 border-[var(--el-border-color)] border-solid)"
    @register="formRegister"
  />
</template>
