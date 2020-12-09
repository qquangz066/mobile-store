<template>
  <div class="row">
    <div class="col">
      <div class="card">
        <div class=" card-header border-0">
          <div class="row align-items-center">
            <div class="col-lg-6 col-7">
              <h6 class="h2 d-inline-block mb-0">Products</h6>
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
              <th scope="col">Image</th>
              <th scope="col">Name<i class="fas fa-sort text-right"/></th>
              <th scope="col">Brand<i class="fas fa-sort text-right"/></th>
              <th scope="col">Quality<i class="fas fa-sort text-right"/></th>
              <th scope="col">Status<i class="fas fa-sort text-right"/></th>
              <th scope="col"></th>
            </tr>
            </thead>
            <tbody class="list">
            <tr v-for="(product, index) in products" :key="index">
              <td>
                <img style="width: auto; height: 100px" :src="'data:image/jpg;base64,' + product.image">
              </td>
              <td class="budget">
                {{ product.name }}
              </td>
              <td>
                {{ product.brand?.name }}
              </td>
              <td>
                {{ product.quality }}
              </td>
              <td>
                {{ product.status }}
              </td>
              <td class="text-right">
                <div class="dropdown">
                  <a class="btn btn-sm btn-icon-only text-light" href="#" role="button" data-toggle="dropdown"
                     aria-haspopup="true" aria-expanded="false">
                    <i class="fas fa-ellipsis-v"></i>
                  </a>
                  <div class="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                    <button class="dropdown-item">Edit</button>
                    <button class="dropdown-item" @click="deleteProduct(product._id)">Delete</button>

                  </div>
                </div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <div class="card-footer py-4">
          <Pagination v-if="productPage.data.length>0"
                      :total-pages="totalPages"
                      :total="productPage.total"
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
import {reactive} from "vue";
import Pagination from "@/components/Pagination";
import ListProduct from "@/mixins/list_product";

export default {
  name: "AdminProductList",
  mixins: [ListProduct],
  components: {
    Pagination,
  },
  data() {
    return reactive({
      productPage: {
        data: [],
        skip: 0,
        limit: 6,
        total: 0
      }
    });
  },
  watch: {
    activePage() {
      if (this.$route.name !== 'AdminProductList' || !this.isValidPage) {
        return
      }
      this.getProducts();
    }
  },
  computed: {
    requestParams() {
      return {
        ...this.getLimitAndSkip(),
        '$populate[0]': 'brand',
        '$populate[1]': 'category'
      }
    },
  },

  methods: {
    async getProducts() {
      this.productPage = await this.$services.admin.product.list(this.requestParams);
    },
    onPageChange(page) {
      if (page !== this.activePage) {
        this.$router.push({
          name: 'AdminProductList',
          query: {
            page: page
          }
        });
      }
    },
    async deleteProduct(id) {
      await this.$services.admin.product.delete(id);
      await this.getProducts();
    }
  },

  created() {
    this.getProducts();
  },
}
</script>

<style scoped>

</style>