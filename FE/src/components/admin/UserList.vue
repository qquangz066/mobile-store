<template>
  <div class="row">
    <div class="col">
      <div class="card">
        <div class=" card-header border-0">
          <div class="row align-items-center">
            <div class="col-lg-6 col-7">
              <h6 class="h2 d-inline-block mb-0">Users</h6>
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
              <th scope="col">Email<i class="fas fa-sort text-right"/></th>
              <th scope="col">Name<i class="fas fa-sort text-right"/></th>
              <th scope="col">Phone<i class="fas fa-sort text-right"/></th>
              <th scope="col">Status<i class="fas fa-sort text-right"/></th>
              <th scope="col"></th>
            </tr>
            </thead>
            <tbody class="list">
            <tr v-for="(user, index) in users" :key="index">
              <td>
                {{ user.email }}
              </td>
              <td>
                {{ user.name }}
              </td>
              <td>
                {{ user.phone_number }}
              </td>
              <td>
                {{ user.status }}
              </td>
              <td class="text-right">
                <div class="dropdown">
                  <a class="btn btn-sm btn-icon-only text-light" href="#" role="button" data-toggle="dropdown"
                     aria-haspopup="true" aria-expanded="false">
                    <i class="fas fa-ellipsis-v"></i>
                  </a>
                  <div class="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                    <router-link :to="{ name: 'AdminUserDetail', params: { id: user._id }}"
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
import ListUser from "@/mixins/page";

export default {
  name: "AdminUsersList",
  mixins: [ListUser],
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
      if (this.$route.name !== 'AdminUserList' || !this.isValidPage) {
        return
      }
      this.getUsers();
    }
  },
  computed: {
    requestParams() {
      return this.getLimitAndSkip()
    },
    users() {
      return this.page.data
    }
  },

  methods: {
    async getUsers() {
      this.page = await this.$services.admin.user.list(this.requestParams);
    },
    onPageChange(page) {
      if (page !== this.activePage) {
        this.$router.push({
          name: 'AdminUserList',
          query: {
            page: page
          }
        });
      }
    }
  },

  created() {
    this.getUsers();
  },
}
</script>

<style scoped>

</style>