<template>
<div class="row">
    <div class="col">
      <div class="card">
        <div class=" card-header border-0">
          <div class="row align-items-center">
            <div class="col-lg-6 col-7">
              <h6 class="h2 d-inline-block mb-0">Product Detail</h6>
            </div>
          </div>
        </div>
        <hr class="mt-2 mb-1"/>
        <div class="p-5">
          <div class="form-group">
            <label class="form-control-label">Name</label>
            <input :class="[ 'form-control', errors.name && 'is-invalid' ]" type="text" v-model="product.name">
            <p class="text-danger" v-if="errors.name">
              {{ errors.name }}
            </p>
          </div>
          <div class="form-group">
            <label>Brand</label>
            <select :class="[ 'form-control', errors.brand_id && 'is-invalid' ]" size="1"
                    v-model="product.brand_id">
              <option v-for="(brand,index) in brands" :key="index" :value="brand._id"
                      :selected="product?.brand_id===brand._id">{{ brand.text }}
              </option>
            </select>
            <p class="text-danger" v-if="errors.brand_id">
              {{ errors.brand_id }}
            </p>
          </div>
          <div class="form-group">
            <label class="form-control-label">Details</label>
            <template v-for="(item,index) in product.specs" :key="index">
              <div class="row ml-4">
                <div class="col-3">
                  <span @click="removeSpecs(index)" style="cursor: pointer; color: red;padding-right: 5px;">X</span>
                  {{ item.name }}
                </div>
                <div class="col-1">:</div>
                <div class="col-8">
                  {{ item.value }}
                </div>
              </div>
              <hr class="m-1 ml-4"/>
            </template>
            <p class="text-danger" v-if="errors.specs">
              {{ errors.specs }}
            </p>
            <div class="row mt-3 ml-4">
              <div class="col-4 ">
                <label>Key</label>
                <input class="form-control" v-model="form.specs.name">
              </div>
              <div class="col-7">
                <label>Value</label>
                <input class="form-control" v-model="form.specs.value">
              </div>
              <div class="col-1 d-flex">
                <button @click="addSpecs" class="btn btn-primary align-self-end">Add</button>
              </div>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label">Offers</label>
            <template v-for="(item,index) in product.offers" :key="index">
              <div class="ml-4">
                <span @click="removeOffer(index)" style="cursor: pointer; color: red;padding-right: 5px;">X</span>
                {{ item.name }}
              </div>
              <hr class="m-1 ml-4"/>
            </template>
            <p class="text-danger" v-if="errors.offers">
              {{ errors.offers }}
            </p>
            <div class="row mt-3 ml-4">
              <div class="col-11">
                <label>Value</label>
                <input class="form-control" v-model="form.offer.name">
              </div>
              <div class="col-1 d-flex">
                <button @click="addOffer" class="btn btn-primary align-self-end">Add</button>
              </div>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label">Price</label>
            <input :class="[ 'form-control', errors.price && 'is-invalid' ]" type="number"
                   v-model.number="product.price">
            <p class="text-danger" v-if="errors.price">
              {{ errors.price }}
            </p>
          </div>
          <div class="form-group">
            <label class="form-control-label">Old Price</label>
            <input :class="[ 'form-control', errors.old_price && 'is-invalid' ]" type="number"
                   v-model.number="product.old_price">
            <p class="text-danger" v-if="errors.old_price">
              {{ errors.old_price }}
            </p>
          </div>
          <div class="form-group">
            <label class="form-control-label">Quantity</label>
            <input :class="[ 'form-control', errors.quantity && 'is-invalid' ]" type="number"
                   v-model.number="product.quantity">
            <p class="text-danger" v-if="errors.quantity">
              {{ errors.quantity }}
            </p>
          </div>
          <div class="form-group">
            <label class="form-control-label">Status</label>
            <select :class="[ 'form-control', errors.status && 'is-invalid' ]" size="1"
                    v-model="product.status">
              <option value="enable"
                      :selected="product?.status==='enable'">Enable
              </option>
              <option value="disable"
                      :selected="product?.status==='disable'">Disable
              </option>
            </select>
            <p class="text-danger" v-if="errors.status">
              {{ errors.status }}
            </p>
          </div>
          <div class="form-group">
            <label class="form-control-label">Image</label>
            <div class="m-3">
              <div v-if="product?.image" class="d-inline-flex">
                <span @click="removeImage" class="pr-1" style="cursor: pointer; color: red;">X</span>
                <img class=" border border-light"
                     style=" height: 200px; "
                     :src="product.image"
                />
              </div>
              <p class="text-danger" v-if="errors.image">
                {{ errors.image }}
              </p>
              <p v-else>No image found</p>

            </div>
            <div class="custom-file">
              <input @change="addImage" type="file" accept="image/*" class="custom-file-input" lang="en">
              <label class="custom-file-label">Select file</label>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label">Gallery</label>
            <template v-if="product?.gallery&&product.gallery.length>0">
              <div class="m-0">
                <span class="d-inline-flex pr-5" v-for="(image,index) in product.gallery" :key="index">
                  <span @click="removeGallery(index)" class="pr-1" style="cursor: pointer; color: red;">X</span>
                  <img class="border border-light mb-5"
                       style="width: content-box; height: 200px; object-fit: cover"
                       :src="image"
                  >
                </span>
              </div>
            </template>
            <p class="text-danger" v-if="errors.gallery">
              {{ errors.gallery }}
            </p>
            <p v-else class="m-3">No image found</p>
            <div class="custom-file">
              <input @change="addGallery" accept="image/*" type="file" class="custom-file-input" lang="en">
              <label class="custom-file-label">Select file</label>
            </div>
          </div>
          <div class="text-right">
            <button @click="onSubmit" type="button" class="btn btn-success">Save</button>
            <button @click="$router.push({name: 'AdminProductList'})" type="button" class="btn btn-danger">Back</button>
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
  name: yup.string().required(),
  brand_id: yup.string().required(),
  specs: yup.array(yup.object({
    name: yup.string().required(),
    value: yup.string().required()
  })).min(1),
  offers: yup.array(yup.object({
    name: yup.string().required()
  })).min(1),
  image: yup.string().required(),
  gallery: yup.array(yup.string()).min(1),
  price: yup.number().min(0).required(),
  old_price: yup.number().min(0).required(),
  quantity: yup.number().min(0).required(),
  status: yup.string().matches(/(enable|disable)/)
});

export default {
  name: "AdminProductDetail",
  data() {
    return {
      errors: {},
      product: {
        name: '',
        brand_id: '',
        specs: [
          {
            name: '',
            value: ''
          }
        ],
        offers: [],
        image: '',
        gallery: [],
        price: 0,
        old_price: 0,
        quantity: 0,
        status: 'enable',
      },
      brands: {},
      form: {
        specs: {
          name: '',
          value: ''
        },
        offer: {
          name: ''
        },
        submitted: false
      }
    }
  },
  methods: {
    onSubmit() {
      schema.validate({...this.product}, {abortEarly: false})
          .then(async () => {
            this.errors = {};
            this.product = await this.$services.admin.product.update(this.$route.params.id, this.product)
            this.form.submitted = true
          })
          .catch(err => {
            err?.inner?.forEach(error => {
              this.errors[error.path] = error.message;
            });
          });
    },
    async getProduct() {
      this.product = await this.$services.admin.product.get(this.$route.params.id)
    },
    async getBrands() {
      this.brands = await this.$services.admin.brand.list({$limit: 1000}).then(res => res.data)
    },
    addSpecs() {
      if (this.product.specs.filter(item => item.name === this.form.specs.name).length === 0) {
        this.product.specs.push({
          name: this.form.specs.name,
          value: this.form.specs.value
        })
      }
      this.form.specs.name = ''
      this.form.specs.value = ''
    },
    addOffer() {
      if (this.product.offers.filter(item => item.name === this.form.offer.name).length === 0) {
        this.product.offers.push({name: this.form.offer.name})
      }
      this.form.offer.name = ''
    },
    async addImage(event) {
      this.product.image = await new Promise((resolve) => {
        let reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result);
        };
        reader.readAsDataURL(event.target.files[0]);
      })
    },
    async addGallery(event) {
      this.product.gallery.push(
          await new Promise((resolve) => {
            let reader = new FileReader();
            reader.onloadend = () => {
              resolve(reader.result);
            };
            reader.readAsDataURL(event.target.files[0]);
          })
      )
    },
    removeSpecs(index) {
      this.product.specs.splice(index, 1)
    },
    removeOffer(index) {
      this.product.offers.splice(index, 1)
    },
    removeImage() {
      this.product.image = ''
    },
    removeGallery(index) {
      this.product.gallery.splice(index, 1)
    }
  },

  created() {
    this.getProduct();
    this.getBrands();
  },

}
</script>

<style scoped>

</style>