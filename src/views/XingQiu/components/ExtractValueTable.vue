<script setup lang="tsx">
import { reactive } from 'vue'
import { useI18n } from '@/hooks/web/useI18n'
import { ContentWrap } from '@/components/ContentWrap'
import { useTable } from '@/hooks/web/useTable'
import { Table, TableColumn } from '@/components/Table'
import { getExtractApi } from '@/api/xingqiu'
import { AccountType } from '@/api/xingqiu/types'

const { t } = useI18n()

const props = defineProps({
  token: { type: String, default: () => '' },
  username: { type: String, default: () => '' },
  password: { type: String, default: () => '' },
  onReceiveHistory: Function
})

const { tableRegister, tableMethods, tableState } = useTable({
  fetchDataApi: async () => {
    const accountType: AccountType = {
      token: props.token,
      username: props.username,
      password: props.password
    }
    const res = await getExtractApi(accountType)
    if (res.data.history && props.onReceiveHistory) {
      props.onReceiveHistory(res.data.history)
    }

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
    label: t('wanLi.title')
  },
  {
    field: 'price',
    label: t('wanLi.price')
  },
  {
    field: 'num',
    label: t('wanLi.num')
  },
  {
    field: 'total',
    label: t('wanLi.total')
  }
])

const getSummaries = (param) => {
  console.log(param)
  const { columns, data } = param
  const sums: string[] = []

  columns.forEach((column, index) => {
    if (index === 0) {
      sums[index] = t('common.summary')
      return
    }
    const values = data.map((item) => Number(item[column.property]))
    if (!values.every((value) => Number.isNaN(value)) && column.property === 'total') {
      sums[index] = `${values.reduce((prev, curr) => {
        const value = Number(curr)
        if (!Number.isNaN(value)) {
          return prev + curr
        } else {
          return prev
        }
      }, 0)}`
    } else {
      sums[index] = 'N/A'
    }
  })

  return sums
}
</script>

<template>
  <ContentWrap :title="t('wanLi.extract')" :message="t('wanLi.extractMessage')">
    <Table
      :columns="columns"
      :data="dataList"
      :loading="loading"
      @register="tableRegister"
      @refresh="refresh"
      :show-summary="true"
      :summary-method="getSummaries"
    />
  </ContentWrap>
</template>
