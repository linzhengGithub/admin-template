<script setup lang="ts">
const props = defineProps({
  item: {
    type: Object,
    default: () => {},
  },
  path: {
    type: String,
    default: '',
  },
})

const haveChildren = (data) => {
  return data.children && data.children.length > 0
}
</script>

<template>
  <el-sub-menu v-if="haveChildren(item)" :index="path">
    <template #title>
      <Item :icon="item.meta.icon" :name="item.name" />
    </template>
    <SidebarItem
      v-for="(child, index) in item.children"
      :key="index"
      :item="child"
      :path="child.path"
    />
  </el-sub-menu>
  <Link v-else :to="path">
    <el-menu-item :index="path">
      <el-icon><setting /></el-icon>
      <span>{{ item.name }}</span>
    </el-menu-item>
  </Link>
</template>

<style scoped></style>
