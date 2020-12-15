<template>
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
    <label class="col-form-label">Email</label>
    <input
        v-model="form.email"
        :class="[ 'form-control', errors.email && 'is-invalid' ]"
        type="email"
        class="form-control"
    />
    <p class="text-danger" v-if="errors.email">
      {{ errors.email }}
    </p>
  </div>
  <div class="form-group">
    <label class="col-form-label">Password</label>
    <input
        v-model="form.password"
        :class="[ 'form-control', errors.password && 'is-invalid' ]"
        type="password"
        class="form-control"
    />
    <p class="text-danger" v-if="errors.password">
      {{ errors.password }}
    </p>
  </div>
  <div class="form-group">
    <label class="col-form-label">Password Confirmation</label>
    <input
        v-model="form.passwordConfirmation"
        :class="[ 'form-control', errors.passwordConfirmation && 'is-invalid' ]"
        type="password"
        class="form-control"
    />
    <p class="text-danger" v-if="errors.passwordConfirmation">
      {{ errors.passwordConfirmation }}
    </p>
  </div>
  <div class="right-w3l">
    <input @click="onSubmit" type="submit" class="form-control" value="Đăng ký"/>
  </div>

</template>

<script>
import * as yup from "yup";
import {REGISTER} from "@/store/actions.type";

const schema = yup.object({
  name: yup.string().required(),
  email: yup.string().required(),
  password: yup.string().required('Password is required'),
  passwordConfirmation: yup.string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
});

export default {
  name: "Register",
  data() {
    return {
      errors: {},
      form: {
        name: '',
        email: '',
        password: '',
        passwordConfirmation: '',
      }
    }
  },
  methods: {
    onSubmit() {
      schema.validate({...this.form}, {abortEarly: false})
          .then(async () => {
            this.errors = {};
            const result = this.$store.dispatch(REGISTER, {...this.form})
            if (result) {
              window.$('#registerModal').modal('hide');
            }
          })
          .catch(err => {
            err?.inner?.forEach(error => {
              this.errors[error.path] = error.message;
            });
          });
    },
  }
}
</script>

<style scoped>

</style>