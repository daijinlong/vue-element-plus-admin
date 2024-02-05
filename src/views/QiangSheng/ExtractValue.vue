<script setup lang="tsx">
import { Form } from '@/components/Form'
import { useForm } from '@/hooks/web/useForm'
import { reactive, ref } from 'vue'
import { useI18n } from '@/hooks/web/useI18n'
import { ContentWrap } from '@/components/ContentWrap'
import { FormSchema } from '@/components/Form'
import { BaseButton } from '@/components/Button'
import { AccountType } from '@/api/qiangsheng/types'
import { ExtractValueTable } from './components'

const { t } = useI18n()

const { formRegister, formMethods } = useForm()
const { getFormData } = formMethods

const loading = ref(false)
let account = ref<AccountType | null>(null)

// 表单信息
const schema = reactive<FormSchema[]>([
  {
    field: 'field1',
    label: t('qiangSheng.token'),
    component: 'Divider'
  },
  {
    field: 'token',
    component: 'Input',
    colProps: {
      span: 24
    },
    componentProps: {
      placeholder: t('qiangSheng.inputQiangShengToken')
    }
  },
  {
    field: 'field2',
    label: t('qiangSheng.orAccountAndPwd'),
    component: 'Divider'
  },
  {
    field: 'username',
    label: t('login.username'),
    component: 'Input',
    colProps: {
      span: 24
    },
    componentProps: {
      placeholder: t('qiangSheng.inputQiangShengAccount')
    }
  },
  {
    field: 'password',
    label: t('login.password'),
    component: 'InputPassword',
    colProps: {
      span: 24
    },
    componentProps: {
      style: {
        width: '100%'
      },
      placeholder: t('qiangSheng.inputQiangShengPassword')
    }
  },
  {
    field: 'query_extract',
    colProps: { span: 24 },
    formItemProps: {
      slots: {
        default: () => {
          return (
            <>
              <div>
                <BaseButton loading={loading.value} type="primary" onClick={queryExtract}>
                  {t('common.query')}
                </BaseButton>
              </div>
            </>
          )
        }
      }
    }
  }
])

const queryExtract = async () => {
  console.log('queryExtract')
  account.value = await getFormData<AccountType>()
}
</script>

<template>
  <ContentWrap :title="t('router.qiangSheng')" :message="t('formDemo.qiangShengArt')">
    <Form :schema="schema" label-width="auto" label-position="top" @register="formRegister" />
  </ContentWrap>
  <div v-if="account != null">
    <ExtractValueTable
      :token="account.token"
      :username="account.username"
      :password="account.password"
    />
  </div>
</template>

<style lang="less">
.cell {
  height: 30px;
  padding: 3px 0;
  box-sizing: border-box;

  .text {
    position: absolute;
    left: 50%;
    display: block;
    width: 24px;
    height: 24px;
    margin: 0 auto;
    line-height: 24px;
    border-radius: 50%;
    transform: translateX(-50%);
  }

  &.current {
    .text {
      color: #fff;
      background: #626aef;
    }
  }

  .holiday {
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 6px;
    height: 6px;
    background: var(--el-color-danger);
    border-radius: 50%;
    transform: translateX(-50%);
  }
}

.transfer-footer {
  padding: 6px 5px;
  margin-left: 15px;
}

.el-upload {
  position: relative;
  overflow: hidden;
  cursor: pointer;
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  transition: var(--el-transition-duration-fast);
}

.el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  width: 178px;
  height: 178px;
  font-size: 28px;
  color: #8c939d;
  text-align: center;
}
</style>
