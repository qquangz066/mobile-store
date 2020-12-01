<template>
  <BaseLayout>
    <template #header>
      <Header/>
    </template>

    <template #default>
      <Product/>
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
import Product from "@/components/home/Product";

export default {
  name: "Home",
  components: {
    Product,
    Footer,
    Header,
    BaseLayout,
  },
};
</script>
