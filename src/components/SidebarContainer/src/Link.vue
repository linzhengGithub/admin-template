<script setup lang="ts">
const props = defineProps({
  to: {
    type: String,
    default: '',
  },
})

const type = 'router-link'

const linkProps = (to) => {
  return {
    to,
  }
}
</script>

<template>
  <component :is="type" v-bind="linkProps(to)">
    <slot />
  </component>
</template>

<style scoped>

</style>
