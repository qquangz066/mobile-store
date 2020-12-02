<template>
  <div class="agileinfo-ads-display col-lg-9">
    <div class="wrapper">
      <div
          v-for="(productArray, index) in products"
          :key="index"
          class="product-sec1 px-sm-4 px-3 py-sm-5 py-3 mb-4"
      >
        <div class="row">
          <div
              v-for="(product, index) in productArray"
              :key="index"
              class="col-md-4 product-men"
          >
            <div class="men-pro-item simpleCart_shelfItem">
              <div class="men-thumb-item text-center">
                <img
                    style="width: auto; height: 200px"
                    :src="'data:image/jpg;base64,' + product.image"
                />
                <div class="men-cart-pro">
                  <div class="inner-men-cart-pro">
                    <a href="single.html" class="link-product-add-cart"
                    >Quick View</a
                    >
                  </div>
                </div>
              </div>
              <div class="item-info-product text-center border-top mt-4">
                <h4 class="pt-1">
                  <a href="single.html">{{ product.name }}</a>
                </h4>
                <div class="info-product-price my-2">
                  <span class="item_price">{{ product.price }}đ</span>
                  <del>{{ product.old_price }}đ</del>
                </div>
                <div
                    class="snipcart-details top_brand_home_details item_add single-item hvr-outline-out"
                >
                  <button class="btn-primary">Add to cart</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Pagination
          :total-pages="totalPages"
          :total="data.total"
          :current-page="activePage"
          :is-valid-page="isValidPage"
          @page-changed="onPageChange"
      />
    </div>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import {reactive} from "vue";

export default {
  name: "ProductList",
  components: {
    Pagination,
  },
  data() {
    return reactive({
      data: {
        data: [],
        skip: 0,
        limit: 6,
        total: 0
      }
    });
  },
  watch: {
    activePage() {
      if (!this.isValidPage) {
        return
      }
      this.getProducts();
      document.getElementById('product-section').scrollIntoView({behavior: 'smooth'});
    }
  },
  computed: {
    totalPages() {
      return Math.floor(this.data.total / this.data.limit) + 1
    },
    activePage() {
      return parseInt(this.$route.query.page || 1)
    },
    isValidPage() {
      return this.activePage > 0 && this.activePage <= this.totalPages
    },
    products() {
      if (this.data.data === undefined) {
        return [];
      }

      let products = [...this.data.data];
      let partitionProducts = [],
          size = 3;
      while (products.length > 0)
        partitionProducts.push(products.splice(0, size));
      return partitionProducts;
    },
  },

  methods: {
    async getProducts() {
      let offset = (this.activePage - 1) * this.data.limit;
      if (this.data.total && offset > this.data.total) {
        offset = this.data.total;
      }
      this.data = await this.$services.product.list({$limit: this.data.limit, $skip: offset});
    },
    onPageChange(page) {
      if (page !== this.activePage) {
        this.$router.push({
          name: 'Product',
          query: {
            page: page
          }
        });
      }
    },
  },

  created() {
    this.getProducts();
  },
};
</script>

<style scoped>
</style>