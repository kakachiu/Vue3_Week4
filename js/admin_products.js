import productModals from "./product_modal.js";
import delModal from "./del_modal.js";
import pagination from "./pagination.js";

const url = "https://vue3-course-api.hexschool.io/v2";
const path = "kakachiu";

const app = {
  data() {
    return {
      products: [],
      temp: {},
      pagination: {},
      productModal: "", // 使用 ref 取得 dom 元素，先定義資料
      delModel: "" // 使用 ref 取得 dom 元素，先定義資料
    };
  },
  components: {
    productModals,
    delModal,
    pagination
  },
  methods: {
    judgeModal(isNew, item) {
      switch (isNew) {
        case "new":
          this.temp = {};
          this.productModal.show();
          break;
        case "edit":
          this.temp = { ...item };
          this.productModal.show();
          break;
        case "showDetail":
          this.temp = { ...item };
          break;
        case "delete":
          this.temp = { ...item };
          this.delModel.show();
          break;
        default:
          break;
      }
    },
    getProducts(page = 1) {
      axios
        .get(`${url}/api/${path}/admin/products?page=${page}`)
        .then(res => {
          this.products = res.data.products;
          this.pagination = res.data.pagination;
        })
        .catch(error => {
          alert(error.response.data.message);
        });
    },
    checkAuth() {
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/,
        "$1"
      );
      axios.defaults.headers.common["Authorization"] = token;

      axios
        .post(`${url}/api/user/check`)
        .then(res => {})
        .catch(error => {
          if (error.response.data.success === false) {
            alert(error.response.data.message);
            location.href = "index.html";
          }
        });
    }
  },
  created() {
    this.checkAuth();
    this.getProducts();
  },
  mounted() {
    // 使用 this.$refs 取得 dom 元素
    this.productModal = new bootstrap.Modal(this.$refs.productModal, {
      keyboard: false,
      backdrop: "static"
    });
    this.delModel = new bootstrap.Modal(this.$refs.delProductModal, {
      keyboard: false,
      backdrop: "static"
    });
  }
};
Vue.createApp(app).mount("#app");
