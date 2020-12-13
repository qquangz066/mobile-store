<template>
  <div class="row">
    <div class="col">
      <div class="card">
        <div class=" card-header border-0">
          <div class="row align-items-center">
            <div class="col-lg-6 col-7">
              <h6 class="h2 d-inline-block mb-0">Brands</h6>
            </div>
            <div class="col-lg-6 col-5 text-right">
              <a href="#" class="btn btn-sm btn-neutral">New</a>
              <a href="#" class="btn btn-sm btn-neutral">Filters</a>
            </div>
          </div>
        </div>

        <!-- Light table -->
        <div class="table-responsive">
          <table class="table align-items-center table-flush">
            <thead class="thead-light">
            <tr>
              <th scope="col">Name<i class="fas fa-sort text-right"/></th>
              <th scope="col">Text<i class="fas fa-sort text-right"/></th>
              <th scope="col">Status<i class="fas fa-sort text-right"/></th>
              <th scope="col"></th>
            </tr>
            </thead>
            <tbody class="list">
            <tr v-for="(brand, index) in brands" :key="index">
              <td>
                {{ brand.name }}
              </td>
              <td>
                {{ brand.text }}
              </td>
              <td>
                {{ brand.status }}
              </td>
              <td class="text-right">
                <div class="dropdown">
                  <a class="btn btn-sm btn-icon-only text-light" href="#" role="button" data-toggle="dropdown"
                     aria-haspopup="true" aria-expanded="false">
                    <i class="fas fa-ellipsis-v"></i>
                  </a>
                  <div class="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                    <router-link :to="{ name: 'AdminBrandDetail', params: { id: brand._id }}"
                                 class="dropdown-item">Edit
                    </router-link>
                    <button class="dropdown-item" @click="deleteBrand(brand._id)">Delete</button>

                  </div>
                </div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <div class="card-footer py-4">
          <Pagination v-if="page.data.length>0"
                      :total-pages="totalPages"
                      :total="page.total"
                      :current-page="activePage"
                      :is-valid-page="isValidPage"
                      @page-changed="onPageChange"
          />
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import Pagination from "@/components/Pagination";
import ListBrand from "@/mixins/page";

export default {
  name: "AdminBrandList",
  mixins: [ListBrand],
  components: {
    Pagination,
  },
  data() {
    return {
      page: {
        data: [],
        skip: 0,
        limit: 10,
        total: 0
      }
    }
  },
  watch: {
    activePage() {
      if (this.$route.name !== 'AdminBrandList' || !this.isValidPage) {
        return
      }
      this.getBrands();
    }
  },
  computed: {
    requestParams() {
      return this.getLimitAndSkip()
    },
    brands(){
      return this.page.data
    }
  },

  methods: {
    async getBrands() {
      this.page = await this.$services.admin.brand.list(this.requestParams);
    },
    onPageChange(page) {
      if (page !== this.activePage) {
        this.$router.push({
          name: 'AdminBrandList',
          query: {
            page: page
          }
        });
      }
    },
    async deleteBrand(id) {
      await this.$services.admin.brand.delete(id);
      await this.getBrands();
    }
  },

  created() {
    this.getBrands();
  },
}
</script>

<style scoped>

</style>