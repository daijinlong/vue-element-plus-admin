<script setup lang="tsx">
import { reactive } from 'vue'
import { useI18n } from '@/hooks/web/useI18n'
import { ContentWrap } from '@/components/ContentWrap'
import { useTable } from '@/hooks/web/useTable'
import { Table, TableColumn } from '@/components/Table'
import { getExtractApi } from '@/api/qiangsheng'
import { AccountType } from '@/api/qiangsheng/types'

const { t } = useI18n()

const props = defineProps({
  token: { type: String, default: () => '' },
  username: { type: String, default: () => '' },
  password: { type: String, default: () => '' }
})

const { tableRegister, tableMethods, tableState } = useTable({
  fetchDataApi: async () => {
    const accountType: AccountType = {
      token: props.token,
      username: props.username,
      password: props.password
    }
    const res = await getExtractApi(accountType)

    return {
      list: res.data.extract,
      total: res.data.extract
    }
  }
})

const { loading, dataList } = tableState
const { refresh } = tableMethods

const columns = reactive<TableColumn[]>([
  {
    field: 'title',
    label: t('qiangSheng.title')
  },
  {
    field: 'price',
    label: t('qiangSheng.price')
  },
  {
    field: 'num',
    label: t('qiangSheng.num')
  },
  {
    field: 'total',
    label: t('qiangSheng.total')
  }
])
</script>

<template>
  <ContentWrap :title="t('qiangSheng.extract')" :message="t('qiangSheng.extractMessage')">
    <Table
      :columns="columns"
      :data="dataList"
      :loading="loading"
      @register="tableRegister"
      @refresh="refresh"
    />
  </ContentWrap>
</template>
