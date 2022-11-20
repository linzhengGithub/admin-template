<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import SidebarItem from './SidebarItem.vue'
import { usePermissionStore } from '@/store/modules/permission'
import variable from '@/styles/variable.module.scss'
import { useGlobalStatus } from '@/store/modules/globalStatus'

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

    const activeTextColor = variable.sidebarActiveTextColor
    const backgroundColor = variable.sidebarBackground
    const sidebarTextColor = variable.sidebarTextColor

    const globalStatus = useGlobalStatus()
    const { isCollapse } = storeToRefs(globalStatus)

    return {
      backMenuList,
      activeMenu,
      activeTextColor,
      backgroundColor,
      sidebarTextColor,
      isCollapse,
    }
  },
})
</script>

<template>
  <el-scrollbar wrap-style="width: 301px;">
    <el-menu
      :active-text-color="activeTextColor"
      :background-color="backgroundColor"
      class="sidebar-menu"
      :collapse="isCollapse"
      :text-color="sidebarTextColor"
      :default-active="activeMenu"
    >
      <SidebarItem
        v-for="route in backMenuList"
        :key="route.path"
        :item="route"
        :path="route.path"
      />
    </el-menu>
  </el-scrollbar>
</template>

<style lang="scss" scoped>
</style>
