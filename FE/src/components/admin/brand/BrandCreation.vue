<template>
  <div class="row">
    <div class="col">
      <div class="card">
        <div class=" card-header border-0">
          <div class="row align-items-center">
            <div class="col-lg-6 col-7">
              <h6 class="h2 d-inline-block mb-0">Create brand</h6>
            </div>
          </div>
        </div>
        <hr class="mt-2 mb-1"/>
        <div class="p-5">
          <div class="form-group">
            <label class="form-control-label">Name</label>
            <input :class="[ 'form-control', errors.name && 'is-invalid' ]" type="text" v-model="brand.name">
            <p class="text-danger" v-if="errors.name">
              {{ errors.name }}
            </p>
          </div>
          <div class="form-group">
            <label class="form-control-label">Text</label>
            <input :class="[ 'form-control', errors.text && 'is-invalid' ]" type="text" v-model="brand.text">
            <p class="text-danger" v-if="errors.text">
              {{ errors.text }}
            </p>
          </div>
          <div class="form-group">
            <label class="form-control-label">Status</label>
            <select :class="[ 'form-control', errors.status && 'is-invalid' ]" size="1"
                    v-model="brand.status">
              <option value="enable"
                      :selected="brand.status==='enable'">Enable
              </option>
              <option value="disable"
                      :selected="brand.status==='disable'">Disable
              </option>
            </select>
            <p class="text-danger" v-if="errors.status">
              {{ errors.status }}
            </p>
          </div>

          <div class="text-right">
            <button @click="onSubmit" type="button" class="btn btn-success">Save</button>
            <button @click="$router.push({name: 'AdminBrandList'})" type="button" class="btn btn-danger">Back</button>
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
  text: yup.string().required(),
  status: yup.string().matches(/(enable|disable)/)
});

const initialState = {
  name: '',
  text: '',
  status: 'enable',
}

export default {
  name: "AdminBrandCreation",
  data() {
    return {
      errors: {},
      brand: initialState,
      form: {
        submitted: false
      }
    }
  },
  methods: {
    onSubmit() {
      schema.validate({...this.brand}, {abortEarly: false})
          .then(async () => {
            this.errors = {};
            await this.$services.admin.brand.create(this.brand)
            this.brand = {...initialState}
            this.form.submitted = true
          })
          .catch(err => {
            this.errors = {};
            err?.inner?.forEach(error => {
              this.errors[error.path] = error.message;
            });
          });
    },
  },

}
</script>

<style scoped>

</style>