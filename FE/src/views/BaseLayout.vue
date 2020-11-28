<template>
  <div class="container-fluid pl-0 pr-0">
    <header>
      <slot name="header"></slot>
    </header>

    <main>
      <slot></slot>
    </main>

    <footer>
      <slot name="footer"></slot>
    </footer>


  </div>
</template>

<script>
export default {
  name: 'BaseLayout'
};
</script>

<style scoped>

</style>