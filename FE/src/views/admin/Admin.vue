<template>
  <base-layout>
    <template #header>
      <h1>Admin header</h1>
    </template>

    <template #default>
      <p>body</p>
    </template>

    <template #footer>
      <p>footer</p>
    </template>
  </base-layout>
</template>

<script>
import BaseLayout from '@/views/BaseLayout';
export default {
name: "Admin",
  components: {BaseLayout}
}
</script>

<style scoped>

</style>