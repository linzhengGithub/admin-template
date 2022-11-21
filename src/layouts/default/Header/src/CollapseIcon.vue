<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useGlobalStatus } from '@/store/modules/globalStatus'
const globalStatus = useGlobalStatus()
const { setIsCollapse } = globalStatus

const { isCollapse } = storeToRefs(globalStatus)

const iconSize = 20
</script>

<template>
  <div class="collapse_icon" @click="setIsCollapse()">
    <el-icon v-if="isCollapse" :size="iconSize">
      <i-ep-fold />
    </el-icon>
    <el-icon v-else :size="iconSize">
      <i-ep-expand />
    </el-icon>
  </div>
</template>

<style lang="scss" scoped>
.collapse_icon{
  cursor: pointer;
}
</style>
