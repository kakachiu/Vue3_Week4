export default {
  data() {
    return {};
  },
  props: ["temp", "delModel"],
  template: `
    <div class="modal-dialog">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5 class="modal-title" id="delProductModalLabel"><span>刪除產品</span></h5>
          <button class="btn-close" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body"> 是否刪除<strong class="text-danger"> {{ temp.title }}</strong> 商品(刪除後將無法恢復)。</div>
        <div class="modal-footer">
          <button class="btn btn-outline-secondary" type="button" data-bs-dismiss="modal">取消</button>
          <button class="btn btn-danger" type="button" @click="delProduct(temp.id)">確認刪除</button>
        </div>
      </div>
    </div>
  `,
  methods: {
    delProduct(id) {
      const url = "https://vue3-course-api.hexschool.io/v2";
      const path = "kakachiu";

      axios
        .delete(`${url}/api/${path}/admin/product/${id}`)
        .then(res => {
          alert(res.data.message);
          this.delModel.hide();
          this.$emit("getProducts");
        })
        .catch(error => {
          alert(error.response.data.message);
        });
    }
  }
};
