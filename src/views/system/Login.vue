<script setup lang="ts">
import { reactive } from 'vue'
import { useUserStore } from '@/store/modules/user'
import { getAppEnvConfig } from '@/utils/env'

const userStore = useUserStore()

const userForm = reactive({
  username: '',
  password: '',
})
const login = async () => {
  getAppEnvConfig()
  await userStore.login(userForm)
}
</script>

<template>
  <div class="login_from">
    <span>
      username: <input v-model="userForm.username" type="text">
    </span>
    <span>
      password: <input v-model="userForm.password" type="text">
    </span>
    <button @click="login()">
      登录
    </button>
    {{ userForm }}
  </div>
</template>

<style>
.login_from{
  display: flex;
  flex-direction: column;
}
</style>
