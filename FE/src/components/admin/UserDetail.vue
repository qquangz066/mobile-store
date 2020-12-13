<template>
  <div class="row">
    <div class="col">
      <div class="card">
        <div class=" card-header border-0">
          <div class="row align-items-center">
            <div class="col-lg-6 col-7">
              <h6 class="h2 d-inline-block mb-0">User Detail</h6>
            </div>
          </div>
        </div>
        <hr class="mt-2 mb-1"/>
        <div class="p-5">
          <div class="form-group">
            <label class="form-control-label">Email</label>
            <input :class="[ 'form-control', errors.email && 'is-invalid' ]" type="text" v-model="user.email">
            <p class="text-danger" v-if="errors.email">
              {{ errors.email }}
            </p>
          </div>
          <div class="form-group">
            <label class="form-control-label">Name</label>
            <input :class="[ 'form-control', errors.name && 'is-invalid' ]" type="text" v-model="user.name">
            <p class="text-danger" v-if="errors.name">
              {{ errors.name }}
            </p>
          </div>
          <div class="form-group">
            <label class="form-control-label">Phone</label>
            <input :class="[ 'form-control', errors.phone_number && 'is-invalid' ]" type="text" v-model="user.phone_number">
            <p class="text-danger" v-if="errors.phone_number">
              {{ errors.phone_number }}
            </p>
          </div>
          <div class="form-group">
            <label class="form-control-label">Status</label>
            <select :class="[ 'form-control', errors.status && 'is-invalid' ]" size="1"
                    v-model="user.status">
              <option value="enable"
                      :selected="user.status==='enable'">Enable
              </option>
              <option value="disable"
                      :selected="user.status==='disable'">Disable
              </option>
            </select>
            <p class="text-danger" v-if="errors.status">
              {{ errors.status }}
            </p>
          </div>

          <div class="text-right">
            <button @click="onSubmit" type="button" class="btn btn-success">Save</button>
            <button @click="$router.push({name: 'AdminUserList'})" type="button" class="btn btn-danger">Back</button>
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
  email: yup.string().required(),
  name: yup.string().required(),
  phone: yup.string(),
  status: yup.string().matches(/(enable|disable)/)
});

export default {
  name: "AdminUserDetail",
  data() {
    return {
      errors: {},
      user: {
        email: '',
        name: '',
        phone: '',
        status: 'enable',
      },
      form: {
        submitted: false
      }
    }
  },
  methods: {
    onSubmit() {
      schema.validate({...this.user}, {abortEarly: false})
          .then(async () => {
            this.errors = {};
            this.user = await this.$services.admin.user.update(this.$route.params.id, this.user)
            this.form.submitted = true
          })
          .catch(err => {
            err?.inner?.forEach(error => {
              this.errors[error.path] = error.message;
            });
          });
    },
    async getUser() {
      this.user = await this.$services.admin.user.get(this.$route.params.id)
    },

  },

  created() {
    this.getUser();
  },

}
</script>

<style scoped>

</style>