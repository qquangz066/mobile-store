<template>
  <div class="form-group">
    <label class="col-form-label">Email</label>
    <input
        type="text"
        class="form-control"
        v-model="email"
    />
  </div>
  <div class="form-group">
    <label class="col-form-label">Mật khẩu</label>
    <input
        type="password"
        class="form-control"
        v-model="password"
    />
  </div>
  <div class="right-w3l">
    <input @click="login" type="submit" class="form-control" value="Đăng nhập"/>
  </div>

</template>

<script>
import {reactive} from "vue";

export default {
  name: "Login",
  data() {
    return reactive({
      email: '',
      password: ''
    })
  },
  methods: {
    async login() {
      if (this.email !== '' && this.password !== '') {
        let result = await this.$services.auth.login(this.email, this.password)
        if (result) {
          await this.$router.push({
            name: 'Home'
          });
        }
      }
    }
  }
}
</script>

<style scoped>

</style>