<template>

  <OrderLayout>
    <div class="p-5">
      <section class="shopping-cart dark">
        <div class="container">
          <div class="content">
            <div class="items">
              <div class="product" v-for="(item,index) in carts" :key="index">
                <div class="row">
                  <div class="col-2">
                    <img class="img-fluid mx-auto d-block image" :src="item.product.image">
                  </div>
                  <div class="col-10">
                    <div class="info">
                      <div class="row">
                        <div class="col-4 product-name">
                          <div class="product-name">
                            <a href="#">{{ item.product.name }}</a>
                          </div>
                        </div>
                        <div class="col-3 quantity">
                          <label>Quantity:</label>
                          <input
                              @input="$store.dispatch('SET_CART_QUALITY',{...item,quality:parseInt($event.target.value)})"
                              type="number"
                              :value="item.quality" min="1" class="form-control quantity-input">
                        </div>
                        <div class="col-3 price ">
                          <span>{{ $money(item.product.price) }}</span>
                        </div>
                        <div class="col-1 price">
                          <button @click="$store.dispatch('DELETE_FROM_CART',item)" class="btn btn-danger"
                                  style="cursor: pointer">delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="carts.length>0" class="modal-body">
              <div class="form-group">
                <label class="col-form-label">Name</label>
                <input
                    v-model="form.name"
                    :class="[ 'form-control', errors.name && 'is-invalid' ]"
                    type="text"
                    class="form-control"
                />
                <p class="text-danger" v-if="errors.name">
                  {{ errors.name }}
                </p>
              </div>
              <div class="form-group">
                <label class="col-form-label">Phone</label>
                <input
                    v-model="form.phone_number"
                    :class="[ 'form-control', errors.phone_number && 'is-invalid' ]"
                    type="email"
                    class="form-control"
                />
                <p class="text-danger" v-if="errors.phone_number">
                  {{ errors.phone_number }}
                </p>
              </div>
              <div class="form-group">
                <label class="col-form-label">Address</label>
                <input
                    v-model="form.address"
                    :class="[ 'form-control', errors.address && 'is-invalid' ]"
                    type="password"
                    class="form-control"
                />
                <p class="text-danger" v-if="errors.address">
                  {{ errors.address }}
                </p>
              </div>
              <div class="summary">
                <h3>Summary</h3>
                <div class="summary-item"><span class="text">Discount</span><span class="price">0đ</span></div>
                <div class="summary-item"><span class="text">Shipping</span><span class="price">0đ</span></div>
                <div class="summary-item"><span class="text">Total</span><span class="price">{{ $money(total) }}</span>
                </div>
                <button @click="checkOut" type="button" class="btn btn-primary btn-lg btn-block">Checkout</button>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  </OrderLayout>

</template>

<script>
import OrderLayout from "@/components/home/order/OrderLayout";
import {mapState} from "vuex";
import {CHECK_OUT} from "@/store/actions.type";
import * as yup from "yup";

const schema = yup.object({
  name: yup.string().required(),
  phone_number: yup.string().required(),
  address: yup.string().required()
});

export default {
  name: "Cart",
  components: {OrderLayout},
  data() {
    return {
      errors: {},
      form: {
        name: this.$store.state.auth?.auth?.user?.name,
        phone_number: this.$store.state.auth?.auth?.user?.phone_number,
        address: '',
      }
    }
  },
  computed: {
    total() {
      return this.carts
          .map(item => item.product.price * item.quality)
          .reduce((prev, curr) => prev + curr, 0)
    },
    ...mapState({
      carts: state => state.home.carts,
    })
  },
  methods: {
    checkOut() {
      schema.validate({...this.form}, {abortEarly: false})
          .then(async () => {
            this.errors = {};
            const result = await this.$store.dispatch(CHECK_OUT, {...this.form, total: this.total, detail: this.carts})
            if (result) {
              this.$toast('Oder successfully. We will contact you soon!')
            }
          })
          .catch(err => {
            err?.inner?.forEach(error => {
              this.errors[error.path] = error.message;
            });
          });

    }
  }
}
</script>

<style scoped>

.shopping-cart {
  padding-bottom: 50px;
  font-family: 'Montserrat', sans-serif;
}

.shopping-cart.dark {
  background-color: #f6f6f6;
}

.shopping-cart .content {
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.075);
  background-color: white;
}

.shopping-cart .block-heading {
  padding-top: 50px;
  margin-bottom: 40px;
  text-align: center;
}

.shopping-cart .block-heading p {
  text-align: center;
  max-width: 420px;
  margin: auto;
  opacity: 0.7;
}

.shopping-cart .dark .block-heading p {
  opacity: 0.8;
}

.shopping-cart .block-heading h1,
.shopping-cart .block-heading h2,
.shopping-cart .block-heading h3 {
  margin-bottom: 1.2rem;
  color: #3b99e0;
}

.shopping-cart .items {
  margin: auto;
}

.shopping-cart .items .product {
  margin-bottom: 20px;
  padding-top: 20px;
  padding-bottom: 20px;
}

.shopping-cart .items .product .info {
  padding-top: 0px;
  text-align: center;
}

.shopping-cart .items .product .info .product-name {
  font-weight: 600;
}

.shopping-cart .items .product .info .product-name .product-info {
  font-size: 14px;
  margin-top: 15px;
}

.shopping-cart .items .product .info .product-name .product-info .value {
  font-weight: 400;
}

.shopping-cart .items .product .info .quantity .quantity-input {
  margin: auto;
  width: 80px;
}

.shopping-cart .items .product .info .price {
  margin-top: 15px;
  font-weight: bold;
  font-size: 22px;
}

.shopping-cart .summary {
  border-top: 2px solid #5ea4f3;
  background-color: #f7fbff;
  height: 100%;
  padding: 30px;
}

.shopping-cart .summary h3 {
  text-align: center;
  font-size: 1.3em;
  font-weight: 600;
  padding-top: 20px;
  padding-bottom: 20px;
}

.shopping-cart .summary .summary-item:not(:last-of-type) {
  padding-bottom: 10px;
  padding-top: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.shopping-cart .summary .text {
  font-size: 1em;
  font-weight: 600;
}

.shopping-cart .summary .price {
  font-size: 1em;
  float: right;
}

.shopping-cart .summary button {
  margin-top: 20px;
}

@media (min-width: 768px) {
  .shopping-cart .items .product .info {
    padding-top: 25px;
    text-align: left;
  }

  .shopping-cart .items .product .info .price {
    font-weight: bold;
    font-size: 22px;
    top: 17px;
  }

  .shopping-cart .items .product .info .quantity {
    text-align: center;
  }

  .shopping-cart .items .product .info .quantity .quantity-input {
    padding: 4px 10px;
    text-align: center;
  }
}

</style>