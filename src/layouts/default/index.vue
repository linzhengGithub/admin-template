<script setup lang="ts">
import Sidebar from './Sidebar/index.vue'
</script>

<template>
  <div>
    <el-container>
      <el-aside class="layout_aside">
        <Sidebar />
      </el-aside>
      <el-container>
        <el-header class="layout_header">
          Header
        </el-header>
        <el-main class="layout_main">
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
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped lang="scss">
.layout_aside{
  height: 100vh;
  border: 1px solid red;
}
.layout_header{
  border: 1px solid red;
}
.layout_main{
  border: 1px solid red
}
</style>
