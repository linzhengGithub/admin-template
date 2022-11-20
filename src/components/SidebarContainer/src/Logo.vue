<script setup lang="ts"></script>

<template>
  <div class="sidebar_logo">
    <SvgIcon name="logo" size="24" />
    <h2 class="sidebar_logo-title">
      Admin-Template
    </h2>
  </div>
</template>

<style lang="scss" scoped>
.sidebar_logo {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  &-title {
    margin-left: 5px;
  }
}
</style>
