<template>
  <div class="col-lg-3 mt-lg-0 mt-4 p-lg-0">
    <div class="side-bar p-sm-4 p-3">
      <div class="search-hotel border-bottom py-2">
        <h3 class="agileits-sear-head mb-3">Brand</h3>
        <div class="left-side py-2">
          <ul v-for="(brand, index) in brands" :key="index">
            <li>
              <input type="checkbox" class="checked" />
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
            <input type="checkbox" class="checked" />
            <span class="span">Less than 512 MB</span>
          </li>
          <li>
            <input type="checkbox" class="checked" />
            <span class="span">512 MB - 1 GB</span>
          </li>
          <li>
            <input type="checkbox" class="checked" />
            <span class="span">1 GB</span>
          </li>
          <li>
            <input type="checkbox" class="checked" />
            <span class="span">2 GB</span>
          </li>
          <li>
            <input type="checkbox" class="checked" />
            <span class="span">3 GB</span>
          </li>
          <li>
            <input type="checkbox" class="checked" />
            <span class="span">5 GB</span>
          </li>
          <li>
            <input type="checkbox" class="checked" />
            <span class="span">6 GB</span>
          </li>
          <li>
            <input type="checkbox" class="checked" />
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
</template>

<script>
export default {
  name: "ProductFilter",

  data() {
    return {
      page: {},
    };
  },
  computed: {
    brands() {
      return this.page.data;
    },
  },

  methods: {
    async getBrands() {
      this.page = await this.$services.brand.list();
    },
  },

  created() {
    this.getBrands();
  },
};
</script>

<style scoped>
</style>