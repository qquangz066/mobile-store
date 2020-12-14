const initialPageState = {
    data: [],
    skip: 0,
    limit: 6,
    total: 0
}

export default {
    data() {
        return {
            page: initialPageState
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
        async resetState() {
            await this.$router.replace({'query': null});
            this.page = {...initialPageState}
        },
        getLimitAndSkip() {
            let offset = (this.activePage - 1) * this.page.limit;
            if (this.page.total && offset > this.page.total) {
                offset = this.page.total;
            }
            return {$limit: this.page.limit, $skip: offset}
        }
    }
}