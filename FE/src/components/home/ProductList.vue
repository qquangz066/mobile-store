<template>
  <div class="agileinfo-ads-display col-lg-9">
    <div class="wrapper">
      <div v-for="(productArray,index) in products" :key="index" class="product-sec1 px-sm-4 px-3 py-sm-5  py-3 mb-4">
        <div class="row">
          <div v-for="(product,index) in productArray" :key="index" class="col-md-4 product-men">
            <div class="men-pro-item simpleCart_shelfItem">
              <div class="men-thumb-item text-center">
                <img style="width: auto;height: 200px;" :src="'data:image/jpg;base64,' + product.image">
                <div class="men-cart-pro">
                  <div class="inner-men-cart-pro">
                    <a href="single.html" class="link-product-add-cart">Quick View</a>
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
                <div class="snipcart-details top_brand_home_details item_add single-item hvr-outline-out">
                  <button class="btn-primary">Add to cart</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ProductList',

  data() {
    return {
      page: {}
    };
  },
  computed: {
    products() {
      if (this.page.data === undefined) {
        return [];
      }

      let products = [...this.page.data];
      let partitionProducts = [], size = 3;
      while (products.length > 0)
        partitionProducts.push(products.splice(0, size));
      return partitionProducts;
    }
  },

  methods: {
    async getProducts() {
      this.page = await this.$services.product.list();
    }
  },

  created() {
    this.getProducts();
  }
};
</script>

<style scoped>

</style>