<template>
  <div class="row">
    <div class="col">
      <div class="card">
        <div class=" card-header border-0">
          <div class="row align-items-center">
            <div class="col-lg-6 col-7">
              <h6 class="h2 d-inline-block mb-0">Orders</h6>
            </div>
            <div class="col-lg-6 col-5 text-right">
            </div>
          </div>
        </div>

        <!-- Light table -->
        <div class="table-responsive">
          <table class="table align-items-center table-flush">
            <thead class="thead-light">
            <tr>
              <th scope="col">Date<i class="fas fa-sort text-right"/></th>
              <th scope="col">Email<i class="fas fa-sort text-right"/></th>
              <th scope="col">Name<i class="fas fa-sort text-right"/></th>
              <th scope="col">Phone<i class="fas fa-sort text-right"/></th>
              <th scope="col">Status<i class="fas fa-sort text-right"/></th>
              <th scope="col"></th>
            </tr>
            </thead>
            <tbody class="list">
            <tr v-for="(order, index) in orders" :key="index">
              <td>
                {{ (new Date(order.createdAt)).toLocaleString() }}
              </td>
              <td>
                {{ order.email }}
              </td>
              <td>
                {{ order.name }}
              </td>
              <td>
                {{ order.phone_number }}
              </td>
              <td>
                {{ order.status }}
              </td>
              <td class="text-right">
                <div class="dropdown">
                  <a class="btn btn-sm btn-icon-only text-light" href="#" role="button" data-toggle="dropdown"
                     aria-haspopup="true" aria-expanded="false">
                    <i class="fas fa-ellipsis-v"></i>
                  </a>
                  <div class="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                    <router-link :to="{ name: 'AdminOrderDetail', params: { id: order._id }}"
                                 class="dropdown-item">Edit
                    </router-link>

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
import ListOrder from "@/mixins/page";

export default {
  name: "AdminOrdersList",
  mixins: [ListOrder],
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
      if (this.$route.name !== 'AdminOrderList' || !this.isValidPage) {
        return
      }
      this.getOrders();
    }
  },
  computed: {
    requestParams() {
      return this.getLimitAndSkip()
    },
    orders() {
      return this.page.data
    }
  },

  methods: {
    async getOrders() {
      this.page = await this.$services.admin.order.list(this.requestParams);
    },
    onPageChange(page) {
      if (page !== this.activePage) {
        this.$router.push({
          name: 'AdminOrderList',
          query: {
            page: page
          }
        });
      }
    }
  },

  created() {
    this.getOrders();
  },
}
</script>

<style scoped>

</style>