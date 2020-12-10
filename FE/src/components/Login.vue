<template>
  <div class="form-group">
    <label class="col-form-label">Email</label>
    <input
        type="text"
        class="form-control"
        v-model="email"
        @keyup.enter="login"
    />
  </div>
  <div class="form-group">
    <label class="col-form-label">Mật khẩu</label>
    <input
        type="password"
        class="form-control"
        v-model="password"
        @keyup.enter="login"
    />
  </div>
  <div class="right-w3l">
    <input @click="login" type="submit" class="form-control" value="Đăng nhập"/>
  </div>

</template>

<script>

import {LOGIN} from "@/store/actions.type";

export default {
  name: "Login",
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async login() {
      if (this.email !== '' && this.password !== '') {
        let result = await this.$store.dispatch(LOGIN, {email: this.email, password: this.password});
        if (result) {
          window.$('#loginModal').modal('hide');
        }
      }
    }
  }
}
</script>

<style scoped>

</style>