<template>
  <nav class="sidenav navbar navbar-vertical  fixed-left  navbar-expand-xs navbar-light bg-white" id="sidenav-main">
    <div class="scrollbar-inner">
      <!-- Brand -->
      <div class="sidenav-header  align-items-center">
        <a class="navbar-brand" href="javascript:void(0)">
          <img src="@/assets/images/brand/blue.png" class="navbar-brand-img" alt="...">
        </a>
      </div>
      <div class="navbar-inner">
        <!-- Collapse -->
        <div class="collapse navbar-collapse" id="sidenav-collapse-main">
          <!-- Nav items -->
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link :to="{ name: 'AdminProductList'}"
                           :class="'nav-link ' + ($route.name==='AdminProductList'? 'active' : '')">
                <span class="nav-link-text">Products</span>
              </router-link>

            </li>
            <li class="nav-item">
              <a :class="'nav-link ' + ($route.name==='AdminBrandList'? 'active' : '')" href="javascript:void(0)">

                <span class="nav-link-text">Brands</span>
              </a>
            </li>
          </ul>

        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "SideNav",
};
</script>

<style scoped>
</style>