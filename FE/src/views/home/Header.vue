<template>
  <!-- top-header -->
  <div class="agile-main-top">
    <div class="container-fluid">
      <div class="row main-top-w3l py-2">
        <div class="col-lg-12 header-right mt-lg-0 mt-2 text-right">
          <ul>
            <li v-if="auth?.user" class="nav-item dropdown ">
              <a class="nav-link pr-0" href="#" role="button" data-toggle="dropdown" aria-haspopup="true"
                 aria-expanded="false">
                <span class="media text-left text-white align-items-center">
                  <i class="fas fa-user-circle" style="font-size: 22px;"></i>
                  <div class="media-body">
                    <span class="font-weight-bold pl-1 ">{{ auth.user.name }}</span>
                  </div>
                </span>
              </a>
              <div class="dropdown-menu  dropdown-menu-left ">
                <a href="#!" class="dropdown-item">
                  <i class="ni ni-single-02"></i>
                  <span>My profile</span>
                </a>
                <a href="#!" class="dropdown-item">
                  <i class="ni ni-settings-gear-65"></i>
                  <span>Settings</span>
                </a>
                <router-link :to="{ name: 'AdminProductList'}"
                             class="dropdown-item">
                  <i class="ni ni-single-02"></i>
                  <span class="ni ni-calendar-grid-58">Admin page</span>
                </router-link>
                <div class="dropdown-divider"></div>
                <button class="dropdown-item" @click="logout" style="cursor: pointer">
                  <i class="ni ni-user-run"></i>
                  <span>Logout</span>
                </button>
              </div>
            </li>
            <li class="text-center border-right text-white" v-if="!auth?.user">
              <a
                  href="#"
                  data-toggle="modal"
                  data-target="#loginModal"
                  class="text-white"
              >
                <i class="fas fa-sign-in-alt mr-2"></i>Đăng nhập
              </a>
            </li>
            <li class="text-center text-white" v-if="!auth?.user">
              <a
                  href="#"
                  data-toggle="modal"
                  data-target="#registerModal"
                  class="text-white"
              >
                <i class="fas fa-sign-out-alt mr-2"></i>Đăng ký
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <!-- modals -->
  <!-- log in -->
  <div
      class="modal fade"
      id="loginModal"
      tabindex="-1"
      role="dialog"
      aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title text-center">Đăng nhập</h5>
          <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <Login/>
        </div>
      </div>
    </div>
  </div>
  <!-- register -->
  <div
      class="modal fade"
      id="registerModal"
      tabindex="-1"
      role="dialog"
      aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Đăng ký</h5>
          <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form action="#" method="post">
            <div class="form-group">
              <label class="col-form-label">Tên</label>
              <input
                  type="text"
                  class="form-control"
                  placeholder=" "
                  name="Name"
                  required=""
              />
            </div>
            <div class="form-group">
              <label class="col-form-label">Email</label>
              <input
                  type="email"
                  class="form-control"
                  placeholder=" "
                  name="Email"
                  required=""
              />
            </div>
            <div class="form-group">
              <label class="col-form-label">Mật khẩu</label>
              <input
                  type="password"
                  class="form-control"
                  placeholder=" "
                  name="Password"
                  id="password1"
                  required=""
              />
            </div>
            <div class="form-group">
              <label class="col-form-label">Nhập lại mật khẩu</label>
              <input
                  type="password"
                  class="form-control"
                  placeholder=" "
                  name="Confirm Password"
                  id="password2"
                  required=""
              />
            </div>
            <div class="right-w3l">
              <input type="submit" class="form-control" value="Đăng ký"/>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <!-- //modal -->
  <!-- //top-header -->

  <!-- header-bottom-->
  <div class="header-bot">
    <div class="container">
      <div class="row header-bot_inner_wthreeinfo_header_mid">
        <!-- logo -->
        <div class="col-md-3 logo_agile">
          <h1 class="text-center">
            <router-link :to="{ name: 'ProductList'}"
                         class="font-weight-bold font-italic">Mobile Store
            </router-link>
          </h1>
        </div>
        <!-- //logo -->
        <!-- header-bot -->
        <div class="col-md-9 header mt-auto mb-auto">
          <div class="row">
            <!-- search -->
            <div class="col-10 agileits_search">
              <div class="form-inline h-100 m-auto">
                <input
                    class="form-control mr-sm-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    v-model="search"
                    required
                    @keyup.enter="onSearch"
                />
                <button @click="onSearch" class="btn my-2 my-sm-0" type="submit">Search
                </button>
              </div>
            </div>
            <!-- //search -->
            <!-- cart details -->
            <div class="col-2 top_nav_right text-center mt-sm-0 mt-2">
              <div id="cart">
                <span @click="showCart" class="p1 fa-stack fa-2x has-badge"
                      :data-count="$store.state.home.cart.length"
                      style="cursor: pointer">
                  <i class="p3 fa fa-shopping-cart fa-stack-1x xfa-inverse"></i>
                </span>
              </div>
            </div>
            <!-- //cart details -->
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- banner-2 -->
  <div class="page-head_agile_info_w3l"></div>
</template>

<script>
import Login from "@/components/Login";
import {mapGetters} from "vuex";
import {HOME_SEARCH, LOGOUT} from '@/store/actions.type';

export default {
  name: "Header",
  components: {Login},
  data() {
    return {
      search: this.$store.state.home.search
    }
  },
  computed: {
    ...mapGetters(['auth']),
  },
  methods: {
    logout() {
      this.$store.dispatch(LOGOUT);
    },
    onSearch() {
      this.$store.dispatch(HOME_SEARCH, this.search);
    },
    showCart() {
      if (this.$store.state.home.cart.length > 0) {
        this.$router.push({name: 'Cart'})
      }
    }
  }
};
</script>

<style scoped>
#cart .p1[data-count]:after {
  position: absolute;
  right: 10%;
  top: 8%;
  content: attr(data-count);
  font-size: 40%;
  padding: .2em;
  border-radius: 50%;
  line-height: 1em;
  color: white;
  background: rgba(255, 0, 0, .85);
  text-align: center;
  min-width: 1em;
}
</style>