<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useGlobalStatus } from '@/store/modules/globalStatus'
const globalStatus = useGlobalStatus()
const { setIsCollapse } = globalStatus

const { isCollapse } = storeToRefs(globalStatus)

const iconSize = 20
</script>

<template>
  <div class="header_content">
    <div class="collapse_icon" @click="setIsCollapse()">
      <el-icon v-if="isCollapse" :size="iconSize">
        <i-ep-fold />
      </el-icon>
      <el-icon v-else :size="iconSize">
        <i-ep-expand />
      </el-icon>
    </div>
    <div> 123 </div>
  </div>
</template>

<style lang="scss" scoped>
.header_content {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
}
.collapse_icon{
  cursor: pointer;
}
</style>
