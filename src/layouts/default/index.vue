<script setup lang="ts">
import { storeToRefs } from 'pinia'
import Sidebar from './Sidebar/index.vue'
import Main from './Main/index.vue'
import Header from './Header/index.vue'
import { useGlobalStatus } from '@/store/modules/globalStatus'

const globalStatus = useGlobalStatus()
const { isCollapse } = storeToRefs(globalStatus)
</script>

<template>
  <div>
    <el-container>
      <el-aside class="layout_sidebar" :class="{ xx: isCollapse, cc: !isCollapse }">
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
.cc{
  width: 300px;
}
.xx{
  width: 60px;
}
</style>
