const url = "https://vue3-course-api.hexschool.io/v2";
const path = "kakachiu";

const app = {
  data() {
    return {
      userMail: "",
      userPassword: ""
    };
  },
  methods: {
    login() {
      const username = this.userMail;
      const password = this.userPassword;
      if (username === "" || password === "") {
        alert("請輸入帳號或密碼");
        return;
      }
      const info = {
        username,
        password
      };
      axios
        .post(`${url}/admin/signin`, info)
        .then(res => {
          alert(res.data.message);
          const { expired, token } = res.data;
          document.cookie = `token=${token}; expires=${new Date(expired)}`;
          location.href = "admin_products.html";
        })
        .catch(error => {
          if (error.response.data.success === false) {
            alert(error.response.data.message);
            this.userMail = "";
            this.userPassword = "";
            return;
          }
        });
    }
  }
};

Vue.createApp(app).mount("#app");
