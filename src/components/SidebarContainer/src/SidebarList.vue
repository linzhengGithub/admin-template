<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import SidebarItem from './SidebarItem.vue'
import { usePermissionStore } from '@/store/modules/permission'

export default defineComponent({
  name: 'SidebarList',
  components: { SidebarItem },
  setup() {
    const permissionStore = usePermissionStore()
    const { backMenuList } = permissionStore

    const activeMenu = computed(() => {
      const router = useRouter()
      const { path } = toRaw(router).currentRoute.value
      return path
    })

    return {
      backMenuList,
      activeMenu,
    }
  },
})
</script>

<template>
  <el-menu
    :default-active="activeMenu"
  >
    <SidebarItem v-for="route in backMenuList" :key="route.path" :item="route" :path="route.path" />
  </el-menu>
</template>

<style scoped></style>
