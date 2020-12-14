<template>
  <div class="navbar-inner">
    <nav class="navbar navbar-expand-lg navbar-light" style="padding: 0; background-color: #FED101">
      <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav text-center mr-xl-5">
          <li class="nav-item mr-lg-2 mb-lg-0 mb-2 active">
            <a class="nav-link" href="index.html">Cart</a>
          </li>
          <li class="nav-item mr-lg-2 mb-lg-0 mb-2">
            <a class="nav-link" href="index.html">Orders</a>
          </li>
        </ul>
      </div>
    </nav>

    <slot></slot>

  </div>
</template>

<script>
export default {
  name: "OrderLayout"
}
</script>

<style scoped>
.nav-item.active, .nav-item:hover {
  background-color: #f5f5f5;
}

a.nav-link {
  min-width: 100px;
}

@media (min-width: 768px) {
  #navbarSupportedContent {
    padding-left: 100px;
  }
}

</style>