<template>
  <div v-if="totalPages > 1">
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item" v-for="(page, index) in pages" :key="index">
          <router-link
            :to="{ query: { page: page } }"
            class="page-link"
            href="#"
            >{{ page }}</router-link
          >
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    totalItems: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      per_page: 9
    };
  },
  computed: {
    pages() {
      const current = this.currentPage;
      const range = 9;
      const metadeRange = range / 2;
      const offset = Math.ceil(metadeRange);
      const total = this.totalPages;
      const pagesArray = [];
      for (let i = 1; i <= total; i++) {
        pagesArray.push(i);
      }

      pagesArray.splice(0, current - offset);
      pagesArray.splice(range, total);

      return pagesArray;
    },

    totalPages() {
      const total = this.totalItems / this.per_page;
      return total !== Infinity ? Math.ceil(total) : 0;
    },

    currentPage() {
      return Number(this.$route.query.page);
    }
  },
  methods: {},
  watch: {}
};
</script>

<style>
li a.router-link-exact-active {
  background: #007bff;
  color: #fff;
}
</style>
