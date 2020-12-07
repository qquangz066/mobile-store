<template>

  <slot name="side-nav"></slot>

  <div class="main-content" id="panel">
    <slot name="header"></slot>

    <slot></slot>

    <slot name="footer"></slot>
  </div>
</template>

<script>
export default {
  name: "AdminLayout",
};
</script>

<style scoped>
</style>