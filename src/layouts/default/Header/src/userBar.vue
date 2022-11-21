<script setup lang="ts">
import { useMessage } from '@/hooks/useMessage/index'
import { useUserStoreWithOut } from '@/store/modules/user'

const { resetLogin } = useUserStoreWithOut()
const { createMessageBox } = useMessage()

const username = 'admin'
const loginOut = () => {
  const options = {
    title: '温馨提醒',
    message: '是否确认退出系统?',
    showCancelButton: true,
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    type: 'warning',
  }
  const successFn = () => {
    resetLogin()
  }
  const errorFn = () => {
  }
  createMessageBox(
    options,
    successFn,
    errorFn,
  )
}
const dropdownList = [{ title: '登出', click: loginOut }]
</script>

<template>
  <div class="user_bar">
    <el-dropdown trigger="click">
      <div class="user_info">
        <span class="user_icon">
          <i-ep-user-filled />
        </span>
        {{ username }}
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item v-for="(item, index) in dropdownList" :key="index" @click="item.click()">
            {{ item.title }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style lang="scss" scoped>
.user_bar {
  cursor: pointer;
  display: flex;
}
.user_info{
  display: flex;
  justify-content: center;
  align-items: center;
}
.user_icon {
  margin-right: 5px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid #dcf2e7;
  background-color: #dcf2e7;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
