<template>
  <ul v-if="isValidPage" class="text-center">
    <li class="pagination-item mr-2">
      <button
          class="snipcart-button"
          type="button"
          @click="onClickFirstPage"
          :disabled="isInFirstPage"
          aria-label="Go to first page"
      >
        First
      </button>
    </li>

    <li class="pagination-item pr-1">
      <button
          class="snipcart-button"
          type="button"
          @click="onClickPreviousPage"
          :disabled="isInFirstPage"
          aria-label="Go to previous page"
      >
        Previous
      </button>
    </li>

    <li
        v-for="(page, index) in pages"
        :key="index"
        class="pagination-item pr-1"
    >
      <button
          class="snipcart-button"
          type="button"
          @click="onClickPage(page.name)"
          :disabled="page.isDisabled"
          :class="{ active: isPageActive(page.name) }"
          :aria-label="`Go to page number ${page.name}`"
      >
        {{ page.name }}
      </button>
    </li>

    <li class="pagination-item mr-2">
      <button
          class="snipcart-button"
          type="button"
          @click="onClickNextPage"
          :disabled="isInLastPage"
          aria-label="Go to next page"
      >
        Next
      </button>
    </li>

    <li class="pagination-item mr-2">
      <button
          class="snipcart-button"
          type="button"
          @click="onClickLastPage"
          :disabled="isInLastPage"
          aria-label="Go to last page"
      >
        Last
      </button>
    </li>
  </ul>
</template>

<script>
export default {
  name: "Pagination",
  emits:["pageChanged"],
  props: {
    maxVisibleButtons: {
      type: Number,
      required: false,
      default: 3,
    },
    totalPages: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
    isValidPage: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    startPage() {
      if (this.currentPage === 1) {
        return 1;
      }

      if (this.currentPage === this.totalPages) {
        return Math.max(this.totalPages - this.maxVisibleButtons + 1, 1);
      }

      return this.currentPage - 1;
    },
    endPage() {
      return Math.min(
          this.startPage + this.maxVisibleButtons - 1,
          this.totalPages
      );
    },
    pages() {
      const range = [];

      for (let i = this.startPage; i <= this.endPage; i += 1) {
        range.push({
          name: i,
          isDisabled: i === this.currentPage,
        });
      }

      return range;
    },
    isInFirstPage() {
      return this.currentPage === 1;
    },
    isInLastPage() {
      return this.currentPage === this.totalPages;
    },
  },
  methods: {
    onClickFirstPage() {
      this.$emit("page-changed", 1);
    },
    onClickPreviousPage() {
      this.$emit("page-changed", this.currentPage - 1);
    },
    onClickPage(page) {
      this.$emit("page-changed", page);
    },
    onClickNextPage() {
      this.$emit("page-changed", this.currentPage + 1);
    },
    onClickLastPage() {
      this.$emit("page-changed", this.totalPages);
    },
    isPageActive(page) {
      return this.currentPage === page;
    },
  },
};
</script>

<style scoped>
.pagination-item {
  display: inline-block;
}

.active {
  background-color: #4aae9b;
  color: #ffffff;
}
</style>