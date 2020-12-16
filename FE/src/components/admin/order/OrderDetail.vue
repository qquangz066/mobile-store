<template>
  <div class="row">
    <div class="col">
      <div class="card">
        <div class=" card-header border-0">
          <div class="row align-items-center">
            <div class="col-lg-6 col-7">
              <h6 class="h2 d-inline-block mb-0">Order Detail</h6>
            </div>
          </div>
        </div>
        <hr class="mt-2 mb-1"/>
        <div class="p-5">
          <section class="shopping-cart">
            <div class="container">
              <div class="content">
                <div class="items">
                  <div class="product" v-for="(item,index) in order.detail" :key="index">
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
                              <label>Quantity: </label>
                              <span>{{ item.quantity }}</span>
                            </div>
                            <div class="col-3 price ">
                              <span>{{ $money_format(item.product.price) }}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="modal-body">
                  <div class="form-group">
                    <label class="col-form-label">Name</label>
                    <input
                        readonly
                        :value="order.name"
                        type="text"
                        class="form-control"
                    />
                  </div>
                  <div class="form-group">
                    <label class="col-form-label">Email</label>
                    <input
                        readonly
                        :value="order.email"
                        type="text"
                        class="form-control"
                    />
                  </div>
                  <div class="form-group">
                    <label class="col-form-label">Phone</label>
                    <input
                        readonly
                        :value="order.phone_number"
                        type="email"
                        class="form-control"
                    />

                  </div>
                  <div class="form-group">
                    <label class="col-form-label">Address</label>
                    <input
                        readonly
                        :value="order.address"
                        class="form-control"
                    />

                  </div>
                  <div class="summary">
                    <h3>Summary</h3>
                    <div class="summary-item"><span class="text">Discount</span><span class="price">0đ</span></div>
                    <div class="summary-item"><span class="text">Shipping</span><span class="price">0đ</span></div>
                    <div class="summary-item"><span class="text">Total</span><span class="price">{{
                        $money_format(order.total)
                      }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div class="text-right">
            <div class="form-group d-flex align-items-center">
              <label class="form-control-label mr-2">Status</label>
              <select :class="[ 'form-control', errors.status && 'is-invalid' ]" size="1" style="width: 100px"
                      @change="changeStatus($event.target.value)"
                      :value="order.status">
                <option value="pending"
                        :selected="order.status==='pending'">Pending
                </option>
                <option value="approve"
                        :selected="order.status==='approve'">Approve
                </option>
                <option value="delivering"
                        :selected="order.status==='delivering'">Delivering
                </option>
                <option value="done"
                        :selected="order.status==='done'">Done
                </option>
              </select>
              <p class="text-danger" v-if="errors.status">
                {{ errors.status }}
              </p>
            </div>
            <button @click="$router.push({name: 'AdminOrderList'})" type="button" class="btn btn-danger">Back</button>
          </div>
          <div v-if="form.submitted" class="text-right mt-4">
            <div class="alert alert-success d-inline-block">
              Saved successfully.
              <button @click="()=>form.submitted=false" type="button" class="close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as yup from "yup";

const schema = yup.object({
  status: yup.string().matches(/(pending|approve|delivering|done)/)
});

export default {
  name: "AdminOrderDetail",
  data() {
    return {
      errors: {},
      order: {
        status: '',
      },
      form: {
        submitted: false
      }
    }
  },
  methods: {
    changeStatus(status) {
      schema.validate({status}, {abortEarly: false})
          .then(async () => {
            this.order = await this.$services.admin.order.patch(this.$route.params.id, {status})
            if (this.order) {
              this.form.submitted = true
            }
          })
          .catch(err => {
            err?.inner?.forEach(error => {
              this.errors[error.path] = error.message;
            });
          });
    },
    onSubmit() {
      schema.validate({...this.order}, {abortEarly: false})
          .then(async () => {
            this.errors = {};
            this.order = await this.$services.admin.order.update(this.$route.params.id, this.order)
            this.form.submitted = true
          })
          .catch(err => {
            err?.inner?.forEach(error => {
              this.errors[error.path] = error.message;
            });
          });
    },
    async getOrder() {
      this.order = await this.$services.admin.order.get(this.$route.params.id)
    },

  },

  created() {
    this.getOrder();
  },

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