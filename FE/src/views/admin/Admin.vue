<template>
  <AdminLayout>
    <template #side-nav>
      <SideNav/>
    </template>

    <template #header>
      <Header/>
    </template>

    <template #default>
      <div class="header bg-primary pb-6">
        <div class="container-fluid">
          <div class="header-body">
            <div class="row align-items-center py-4">
              <div class="col-lg-6 col-7">
                <h6 class="h2 text-white d-inline-block mb-0">Tables</h6>
              </div>
              <div class="col-lg-6 col-5 text-right">
                <a href="#" class="btn btn-sm btn-neutral">New</a>
                <a href="#" class="btn btn-sm btn-neutral">Filters</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="container-fluid mt--6">

        <router-view/>

      </div>
    </template>

    <template #footer>
      <Footer/>
    </template>

  </AdminLayout>
</template>

<script>
import AdminLayout from "@/views/admin/AdminLayout";
import SideNav from "@/views/admin/SideNav";
import Footer from "@/views/admin/Footer";
import Header from "@/views/admin/Header";

export default {
  name: "Admin",
  components: {Header, Footer, SideNav, AdminLayout},
};
</script>

<style scoped>
@import '../../assets/css/argon.css';
</style>