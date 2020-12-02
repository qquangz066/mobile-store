<template>
  <div class="ads-grid py-1">
    <div class="container py-1" id="product-section">
      <h3 class="tittle-w3l text-center mb-3"><span>M</span>obiles</h3>
      <div class="row">
        <ProductFilter/>
        <ProductList/>
      </div>
    </div>
  </div>
</template>

<script>
import ProductFilter from "@/components/home/ProductFilter";
import ProductList from "@/components/home/ProductList";

export default {
  name: "Product",
  components: {
    ProductFilter,
    ProductList,
  }
}
</script>

<style scoped>

</style>