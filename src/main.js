import { createApp } from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify.js';
import router from '@/router/index.js';
import axios from 'axios';
import '@/assets/basic.css';

const app = createApp(App);

// 글로벌 Axios 등록
app.config.globalProperties.$axios = axios;

// 요청(Request) 인터셉터
axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem("token");
    if (token) {
      // 모든 요청에 JWT 자동 포함
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 응답(Response) 인터셉터
axios.interceptors.response.use(
  response => response,

  error => {
    const status = error.response?.status;

    // 401 Unauthorized → 로그인 만료 등
    if (status === 401) {
      alert("로그인 세션이 만료되었습니다. 다시 로그인해주세요.");
      localStorage.clear();
      router.push("/login");
    }

    // 403 Forbidden → 권한 없음
    else if (status === 403) {
      alert("접근 권한이 없습니다.");
      router.push("/");
    }

    // 500 / 서버 오류
    else if (status >= 500) {
      alert("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }

    // 그 외 모든 에러
    else {
      alert(error.response?.data?.message || "요청 처리 중 오류가 발생했습니다.");
    }

    return Promise.reject(error);
  }
);

app.use(vuetify);
app.use(router);
app.mount("#app");
