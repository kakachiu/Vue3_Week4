export default {
  data() {
    return {};
  },
  props: ["pagination"],
  template: `
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item" v-if="pagination.has_pre">
          <a class="page-link" href="#" aria-label="Previous" @click.prevent="changePage(pagination.current_page-1)">
          <span aria-hidden="true">«</span>
          </a>
        </li>
        <li class="page-item" v-for="(item,key) in pagination.total_pages" :key="key" :class="{'active':item == pagination.current_page}">
          <a class="page-link" href="#" @click.prevent="changePage(item)">{{ item }}</a>
        </li>
        <li class="page-item" v-if="pagination.has_next">
          <a class="page-link" href="#" aria-label="Next" @click.prevent="changePage(pagination.current_page+1)">
          <span aria-hidden="true">»</span>
          </a>
        </li>
      </ul>
    </nav>
  `,
  methods: {
    changePage(page) {
      this.$emit("changePage", page);
    }
  }
};
