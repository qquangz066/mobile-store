<template>
  <div class="ads-grid py-1">
    <div class="container py-1" id="product-section">
      <h3 class="tittle-w3l text-center mb-3"><span>M</span>obiles</h3>
      <div class="row">
        <div class="col-lg-3 mt-lg-0 mt-4 p-lg-0">
          <div class="side-bar p-sm-4 p-3">
            <div class="search-hotel border-bottom py-2">
              <h3 class="agileits-sear-head mb-3">Brand</h3>
              <div class="left-side py-2">
                <ul v-for="(brand, index) in brands" :key="index">
                  <li>
                    <input type="checkbox" class="checked" :value="brand._id" v-model="checkedBrands"/>
                    <span class="span">{{ brand.text }}</span>
                  </li>
                </ul>
              </div>
            </div>
            <!-- ram -->
            <div class="left-side border-bottom py-2">
              <h3 class="agileits-sear-head mb-3">Ram</h3>
              <ul>
                <li>
                  <input type="checkbox" class="checked"/>
                  <span class="span">Less than 512 MB</span>
                </li>
                <li>
                  <input type="checkbox" class="checked"/>
                  <span class="span">512 MB - 1 GB</span>
                </li>
                <li>
                  <input type="checkbox" class="checked"/>
                  <span class="span">1 GB</span>
                </li>
                <li>
                  <input type="checkbox" class="checked"/>
                  <span class="span">2 GB</span>
                </li>
                <li>
                  <input type="checkbox" class="checked"/>
                  <span class="span">3 GB</span>
                </li>
                <li>
                  <input type="checkbox" class="checked"/>
                  <span class="span">5 GB</span>
                </li>
                <li>
                  <input type="checkbox" class="checked"/>
                  <span class="span">6 GB</span>
                </li>
                <li>
                  <input type="checkbox" class="checked"/>
                  <span class="span">6 GB & Above</span>
                </li>
              </ul>
            </div>
            <!-- //ram -->
            <!-- price -->
            <div class="range border-bottom py-2">
              <h3 class="agileits-sear-head mb-3">Price</h3>
              <div class="w3l-range">
                <ul>
                  <li>
                    <a href="#">Under $1,000</a>
                  </li>
                  <li class="my-1">
                    <a href="#">$1,000 - $5,000</a>
                  </li>
                  <li>
                    <a href="#">$5,000 - $10,000</a>
                  </li>
                  <li class="my-1">
                    <a href="#">$10,000 - $20,000</a>
                  </li>
                  <li>
                    <a href="#">$20,000 $30,000</a>
                  </li>
                  <li class="mt-1">
                    <a href="#">Over $30,000</a>
                  </li>
                </ul>
              </div>
            </div>
            <!-- //price -->
          </div>
        </div>

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
                          :src="product.image"
                      />
                      <div class="men-cart-pro">
                        <div class="inner-men-cart-pro">

                          <router-link :to="{ name: 'ProductDetail', params: { id: product._id }}"
                                       class="link-product-add-cart">Quick View
                          </router-link>
                        </div>
                      </div>
                    </div>
                    <div class="item-info-product text-center border-top mt-4">
                      <h4 class="pt-1">
                        <a href="single.html">{{ product.name }}</a>
                      </h4>
                      <div class="info-product-price my-2">
                        <span class="item_price">{{ $money_format(product.price) }}</span>
                        <del>{{ $money_format(product.old_price) }}</del>
                      </div>
                      <div
                          class="snipcart-details top_brand_home_details item_add single-item hvr-outline-out"
                      >
                        <button @click="addToCart(product)" class="btn-primary">Add to cart</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Pagination v-if="page.data.length>0"
                        :total-pages="totalPages"
                        :total="page.total"
                        :current-page="activePage"
                        :is-valid-page="isValidPage"
                        @page-changed="onPageChange"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import ListProduct from "@/mixins/page";
import {ADD_TO_CART} from "@/store/actions.type";
import {POSITION} from "vue-toastification";


export default {
  name: "ProductList",
  mixins: [ListProduct],
  components: {
    Pagination,
  },
  data() {
    return {
      page: {
        data: [],
        skip: 0,
        limit: 6,
        total: 0
      },
      brandPage: {},
      checkedBrands: []
    }
  },
  watch: {
    async '$store.state.home.search'() {
      this.checkedBrands.length = 0
      await this.resetState()
      await this.getProducts()
    },
    activePage() {
      if (this.$route.name !== 'ProductList' || !this.isValidPage) {
        return
      }
      this.getProducts();
      document.getElementById('product-section').scrollIntoView({behavior: 'smooth'});
    },
    checkedBrands: {
      async handler() {
        await this.$router.replace({'query': null});
        this.page = await this.$services.product.list(this.requestParams);
      }
    }
  },
  computed: {
    requestParams() {
      let searchParam = this.$store.state.home.search ? {'name[$search]': this.$store.state.home.search} : {}

      return {...this.getLimitAndSkip(), 'brand_id[$in]': this.checkedBrands, ...searchParam}
    },
    products() {
      if (this.page.data === undefined) {
        return [];
      }

      let products = [...this.page.data];
      let partitionProducts = [],
          size = 3;
      while (products.length > 0)
        partitionProducts.push(products.splice(0, size));
      return partitionProducts;
    },
    brands() {
      return this.brandPage.data;
    },
  },

  methods: {
    async addToCart(product) {
      await this.$store.dispatch(ADD_TO_CART, {product, quantity: 1})
      this.$toast.success("Added to cart", {timeout: 3000, position: POSITION.TOP_CENTER});
    },
    async getProducts(params = {}) {
      this.page = await this.$services.product.list({...this.requestParams, ...params});
    },
    async getBrands() {
      this.brandPage = await this.$services.brand.list();
    },
    onPageChange(page) {
      if (page !== this.activePage) {
        this.$router.push({
          name: 'ProductList',
          query: {
            page: page
          }
        });
      }
    },
  },

  created() {
    console.log('created')
    this.getBrands();
    this.getProducts();
  },
};
</script>

<style scoped>
</style>