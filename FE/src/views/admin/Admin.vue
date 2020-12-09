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