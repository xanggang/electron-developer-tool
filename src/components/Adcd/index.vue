<template>
  <Cascader
    v-model:value="bindValue"
    :options="options"
    :field-names=" {
      label: 'name',
      value: 'id',
      children: 'children'
    }"
    placeholder="请选择"
    change-on-select
    :allow-clear="allowClear"
    v-bind="$attrs"
    @change="handleChange"
  ></Cascader>
</template>

<script lang="ts">
import {
  computed, defineComponent, onMounted, ref,
} from 'vue'
import { Cascader } from 'ant-design-vue'
import { filter, findNode } from '@/utils/treeHelper'
import region from './region'

export default defineComponent({
  name: 'DcRegion',
  components: { Cascader },
  props: {
    topAd: { type: String, default: '33' }, // 从哪里开始向下选择
    allowClear: { type: Boolean, default: false }, // 允许清除
    level: { type: Number, default: 3 }, // 最多选中到哪个级别
    include: { type: Boolean, default: false }, // 是否包含市本级之类的
    value: { type: String, default: '' }, // 当前选中
    defaultValue: { type: String, default: '33' }, // 当前选中
  },
  emits: ['change', 'update:value'],
  setup(props, { emit }) {
    const bindValue = computed({
      get: () => {
        return getBindAdcdValue(splitAdcd(props.value))
      },
      set: (v) => {
        if (!v) {
          emit('update:value', undefined)
          return
        }
        emit('update:value', v[v.length - 1])
      },
    })

    const options = ref<any>([])
    onMounted(async () => {
      let option = await getOptions()
      option = getOptionTree(props.topAd, option)
      options.value = [option]
    })

    function handleChange(value:string[], option: any) {
      if (!option) {
        emit('change', undefined, undefined)
        return
      }
      emit('change', value[value.length - 1], option[option.length - 1])
    }

    async function getOptions() {
      const data = region

      // level 1 ad的length 2
      const length = props.level * 2
      return props.include
        ? data.filter(data, (item: Recordable) => item.id.length <= length)
        : filter(data, (item) => !['1', '2'].includes(item.tag) && item.id.length <= length)
    }

    function getOptionTree(adValue:string, treeList: Recordable[]) {
      return findNode(treeList, (item) => item.id === adValue)
    }

    function splitAdcd(str: string) {
      if (!str) return []
      const list: string[] = []
      str.split('').forEach((i, index) => {
        const instIndex = Math.floor(index / 2)
        const base = instIndex > 0 ? list[instIndex - 1] : ''
        if (list[instIndex]) {
          list[instIndex] += i.toString()
        } else {
          list[instIndex] = base + i.toString()
        }
      })

      return list
    }

    // 如果限制了范围， 则需要将绑定的初始值也处理掉 33 [33, 3305]
    function getBindAdcdValue(value: string[]) {
      if (!props.topAd) return value
      const index = value.findIndex((st) => st === props.topAd)
      return value.slice(index)
    }

    return {
      bindValue,
      options,
      handleChange,
    }
  },
})
</script>
