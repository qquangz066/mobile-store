<template>
  <div class="banner-bootom-w3-agileits py-5">
    <div class="container py-xl-4 py-lg-2">
      <div class="row">
        <div class="col-lg-6 col-md-8 single-right-left ">
          <div class="grid images_3_of_2">
            <section class="slider">
              <div id="slider" class="flexslider">
                <ul class="slides">
                  <li v-for="(image,index) in data.gallery" :key="index">
                    <img :src="`data:image/jpg;base64, ${image}` "/>
                  </li>
                </ul>
              </div>
              <div id="carousel" class="flexslider">
                <ul class="slides">
                  <li v-for="(image,index) in data.gallery" :key="index">
                    <img :src="`data:image/jpg;base64, ${image}` "/>
                  </li>
                </ul>
              </div>
            </section>
          </div>
        </div>

        <div class="col-lg-6 single-right-left simpleCart_shelfItem">
          <h3 class="mb-3">{{ data.name }}</h3>
          <p class="mb-3">
            <span class="item_price">{{ data.price }}đ</span>
            <del class="mx-2 font-weight-light">{{ data.old_price }}đ</del>
          </p>
          <div class="single-infoagile">
            <ul>
              <li class="mb-3" v-for="(offer,index) in data.offers" :key="index">
                {{ offer.name }}
              </li>
            </ul>
          </div>
          <div class="product-single-w3l">
            <ul>
              <li class="mb-1" v-for="(attattribute,index) in data.specs" :key="index">
                <div class="row">
                  <div class="col-4">{{ attattribute.name }}:</div>
                  <div class="col-8">{{ attattribute.value }}</div>
                </div>
              </li>
            </ul>
          </div>
          <div class="occasion-cart mt-5">
            <div class="snipcart-details top_brand_home_details item_add single-item hvr-outline-out">
              <button class="btn-primary">Add to cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "ProductDetail",
  data() {
    return {
      data: {}
    }
  },
  methods: {
    async getProduct() {
      this.data = await this.$services.product.get(this.$route.params.id).catch(
          err => {
            console.log(err)
            this.$router.go(-1);
          }
      );
    },
    loadImages() {
      window.jQuery('#carousel').flexslider({
        animation: "slide",
        controlNav: false,
        animationLoop: false,
        slideshow: false,
        itemWidth: 210,
        itemMargin: 5,
        asNavFor: '#slider'
      });

      window.jQuery('#slider').flexslider({
        animation: "slide",
        controlNav: false,
        animationLoop: false,
        slideshow: false,
        sync: "#carousel"
      });
    }
  },

  created() {
    this.getProduct();
  },

  updated() {
    this.loadImages();
  }
}
</script>

<style scoped>

</style>