export default {
  data() {
    return {};
  },
  props: ["temp"],
  template: `
    <div class="modal fade" id="productModal" ref="productModal" tabindex="-1" aria-labelledby="productModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-xl">
        <div class="modal-content border-0">
          <div class="modal-header bg-info text-white">
            <h5 class="modal-title" id="productModalLabel"><span v-if="temp.id">編輯產品</span><span v-else>新增產品</span></h5>
            <button class="btn-close" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div class="mb-2">
                  <div class="mb-3">
                    <label class="form-label" for="imageUrl">輸入圖片網址</label>
                    <input class="form-control" type="text" placeholder="請輸入圖片連結" v-model="temp.imageUrl" />
                  </div><img class="img-fluid" :src="temp.imageUrl" alt="" />
                </div>
                <div v-if="temp.imagesUrl">
                  <!-- 跑 v-for 印出陣列內容-->
                  <h2 v-if="temp.imagesUrl.length">更多圖片</h2>
                  <div class="mb-1" v-for="(image, index) in temp.imagesUrl" :key="index">
                    <div class="mb-3">
                      <label class="form-label" for="imageUrl">圖片網址</label>
                      <input class="form-control mb-2" v-model="temp.imagesUrl[index]" type="text" placeholder="請輸入圖片連結" />
                    </div><img class="img-fluid mb-2" :src="image" />
                    <input class="btn btn-outline-danger w-100" type="button" value="刪除圖片" @click="delImage(index)" />
                  </div>
                  <!-- 如果陣列為空或是當前陣列長度-1就顯示新增圖片按鈕-->
                  <div v-if="!temp.imagesUrl.length || temp.imagesUrl[temp.imagesUrl.length - 1]">
                    <button class="btn btn-outline-primary btn-sm d-block w-100" @click="temp.imagesUrl.push('')">新增圖片</button>
                  </div>
                </div>
                <!-- 當沒有 imagesUrl 陣列時顯示新增圖片按鈕-->
                <div v-else>
                  <button class="btn btn-outline-primary btn-sm d-block w-100" @click="createImages">新增圖片</button>
                </div>
              </div>
              <div class="col-sm-8">
                <div class="mb-3">
                  <label class="form-label" for="title">標題</label>
                  <input class="form-control" id="title" type="text" placeholder="請輸入標題" v-model="temp.title" />
                </div>
                <div class="row">
                  <div class="mb-3 col-md-6">
                    <label class="form-label" for="category">分類</label>
                    <input class="form-control" id="category" type="text" placeholder="請輸入分類" v-model="temp.category" />
                  </div>
                  <div class="mb-3 col-md-6">
                    <label class="form-label" for="price">單位</label>
                    <input class="form-control" id="unit" type="text" placeholder="請輸入單位" v-model="temp.unit" />
                  </div>
                </div>
                <div class="row">
                  <div class="mb-3 col-md-6">
                    <label class="form-label" for="origin_price">原價</label>
                    <input class="form-control" id="origin_price" type="number" min="0" placeholder="請輸入原價" v-model.number="temp.origin_price" />
                  </div>
                  <div class="mb-3 col-md-6">
                    <label class="form-label" for="price">售價</label>
                    <input class="form-control" id="price" type="number" min="0" placeholder="請輸入售價" v-model.number="temp.price" />
                  </div>
                </div>
                <hr />
                <div class="mb-3">
                  <label class="form-label" for="description">產品描述</label>
                  <textarea class="form-control" id="description" type="text" placeholder="請輸入產品描述" v-model="temp.description">                    </textarea>
                </div>
                <div class="mb-3">
                  <label class="form-label" for="content">說明內容</label>
                  <textarea class="form-control" id="description" type="text" placeholder="請輸入說明內容" v-model="temp.content">                    </textarea>
                </div>
                <div class="mb-3">
                  <div class="form-check">
                    <input class="form-check-input" id="is_enabled" type="checkbox" :true-value="1" :false-value="0" v-model="temp.is_enabled" />
                    <label class="form-check-label" for="is_enabled">是否啟用</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-outline-secondary" type="button" data-bs-dismiss="modal">取消</button>
            <button class="btn btn-primary" type="button" @click="checkEdit">確認</button>
          </div>
        </div>
      </div>
    </div>
  `,
  methods: {
    checkEdit() {
      this.$emit("checkEdit");
    },
    createImages() {
      this.$emit("createImages");
    },
    delImage(id) {
      this.$emit("delImage", id);
    }
  }
};
