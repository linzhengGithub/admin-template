<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useGlobalStatus } from '@/store/modules/globalStatus'

const globalStatus = useGlobalStatus()
const { isCollapse } = storeToRefs(globalStatus)
</script>

<template>
  <div class="sidebar_logo">
    <SvgIcon name="logo" size="24" />
    <span :class="{ 'hide-logo': isCollapse }">
      <h2 class="sidebar_logo-title">
        Admin-Template
      </h2>
    </span>
  </div>
</template>

<style lang="scss" scoped>
@import '@/styles/variable.scss';
.sidebar_logo {
  display: flex;
  align-items: center;
  justify-content: center;
  height: $sidebar-logo-height;
  &-title {
    margin-left: 5px;
  }
}
.hide-logo{
  display: none;
}
</style>
