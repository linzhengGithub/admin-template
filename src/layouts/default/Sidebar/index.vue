<script lang="ts">
import { defineComponent } from 'vue'
import MenuContainer from '@/components/SidebarContainer/index.vue'

export default defineComponent({
  name: 'LayoutMenu',
  components: { MenuContainer },
  setup() {
  },
})
</script>

<template>
  <MenuContainer />
</template>

<style scoped>

</style>
