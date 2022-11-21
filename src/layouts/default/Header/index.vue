<script setup lang="ts">
import CollapseIcon from './src/CollapseIcon.vue'
import UserBar from './src/userBar.vue'
</script>

<template>
  <div class="header_content">
    <CollapseIcon />
    <UserBar />
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
</style>
