<script setup lang="ts">

</script>

<template>
  <RouterView>
    <template #default="{ Component, route }">
      <transition
        mode="out-in"
        appear
      >
        <component :is="Component" :key="route.fullPath" />
      </transition>
    </template>
  </RouterView>
</template>

<style scoped>

</style>
