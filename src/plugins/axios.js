import axios from "axios";
import router from "@/router";

const api = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  withCredentials: false,
});

// 응답 인터셉터
api.interceptors.response.use(
  (response) => response, 
  (error) => {
    const status = error.response ? error.response.status : null;

    if (status === 401) {
      alert("로그인이 필요합니다.");
      localStorage.clear();
      router.push("/login");
    }

    if (status === 403) {
      alert("접근 권한이 없습니다.");
      router.push("/");
    }

    if (!status) {
      // 서버 자체가 죽었거나 네트워크 오류
      alert("서버와 통신할 수 없습니다.");
    }

    // 다른 곳에서도 catch 할 수 있도록 반환
    return Promise.reject(error);
  }
);

export default api;
