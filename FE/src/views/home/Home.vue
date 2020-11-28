<template>
  <BaseLayout>
    <template #header>
      <Header/>
    </template>

    <template #default>
      <!-- top Products -->
      <div class="ads-grid py-1">
        <div class="container py-1">
          <h3 class="tittle-w3l text-center mb-3">
            <span>M</span>obiles
          </h3>
          <div class="row">
            <ProductFilter/>
            <ProductList/>
          </div>
        </div>
      </div>
      <!-- //top products -->
    </template>

    <template #footer>
      <Footer/>
    </template>
  </BaseLayout>
</template>

<script>
// @ is an alias to /src
import BaseLayout from '@/views/BaseLayout';
import Header from '@/views/home/Header';
import Footer from '@/views/home/Footer';
import ProductList from '@/components/home/ProductList';
import ProductFilter from '@/components/home/ProductFilter';

export default {
  name: 'Home',
  components: {
    ProductFilter,
    ProductList,
    Footer,
    Header,
    BaseLayout
  }
};
</script>
