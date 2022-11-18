<script lang="ts">
import { defineComponent } from 'vue'
import Logo from '@/components/SidebarContainer/src/Logo.vue'
import SidebarList from '@/components/SidebarContainer/src/SidebarList.vue'

export default defineComponent({
  name: 'MenuContainer',
  setup() {
  },
})
</script>

<template>
  <div>
    <Logo />
    <SidebarList class="sidebar-container" />
  </div>
</template>

<style scoped>
</style>
