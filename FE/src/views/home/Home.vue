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
import BaseLayout from "@/views/BaseLayout";
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
