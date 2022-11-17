<script setup lang="ts">
const props = defineProps({
  name: {
    type: String,
    default: '',
  },
  icon: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <el-icon>
    <SvgIcon :name="icon" />
  </el-icon>
  <span>{{ name }}</span>
</template>

<style scoped>

</style>
