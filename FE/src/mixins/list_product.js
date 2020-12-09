import {reactive} from "vue";

export default {
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
    computed: {
        totalPages() {
            if (this.productPage.total % this.productPage.limit === 0) {
                return this.productPage.total / this.productPage.limit
            }
            return Math.floor(this.productPage.total / this.productPage.limit) + 1
        },
        activePage() {
            return parseInt(this.$route.query.page || 1)
        },
        isValidPage() {
            return this.activePage > 0 && this.activePage <= this.totalPages
        },
        products() {
            return this.productPage.data || [];
        },
    },
    methods: {
        getLimitAndSkip() {
            let offset = (this.activePage - 1) * this.productPage.limit;
            if (this.productPage.total && offset > this.productPage.total) {
                offset = this.productPage.total;
            }
            return {$limit: this.productPage.limit, $skip: offset}
        }
    }
}