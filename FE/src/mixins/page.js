export default {
    data() {
        return {
            page: {
                data: [],
                skip: 0,
                limit: 6,
                total: 0
            }
        };
    },
    computed: {
        totalPages() {
            if (this.page.total % this.page.limit === 0) {
                return this.page.total / this.page.limit
            }
            return Math.floor(this.page.total / this.page.limit) + 1
        },
        activePage() {
            return parseInt(this.$route.query.page || 1)
        },
        isValidPage() {
            return this.activePage > 0 && this.activePage <= this.totalPages
        }
    },
    methods: {
        getLimitAndSkip() {
            let offset = (this.activePage - 1) * this.page.limit;
            if (this.page.total && offset > this.page.total) {
                offset = this.page.total;
            }
            return {$limit: this.page.limit, $skip: offset}
        }
    }
}