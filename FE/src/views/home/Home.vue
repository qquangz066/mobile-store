<template>
  <BaseLayout>
    <template #header>
      <Header/>
    </template>

    <template #default>
      <router-view/>
    </template>

    <template #footer>
      <Footer/>
    </template>
  </BaseLayout>
</template>

<script>
// @ is an alias to /src
import BaseLayout from "@/views/home/BaseLayout";
import Header from "@/views/home/Header";
import Footer from "@/views/home/Footer";

export default {
  name: "Home",
  components: {
    Footer,
    Header,
    BaseLayout,
  },
};
</script>

<style scoped>
@import '../../assets/css/bootstrap.css';
@import '../../assets/css/style.css';
@import '../../assets/css/flexslider.css';
</style>