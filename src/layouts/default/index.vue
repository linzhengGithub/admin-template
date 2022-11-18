<script setup lang="ts">
import Sidebar from './Sidebar/index.vue'
import Main from './Main/index.vue'
import Header from './Header/index.vue'
</script>

<template>
  <div>
    <el-container>
      <el-aside class="layout_sidebar">
        <Sidebar />
      </el-aside>
      <el-container>
        <el-header class="layout_header">
          <Header />
        </el-header>
        <el-main class="layout_main">
          <Main />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped lang="scss">
@import './index.scss';
</style>
