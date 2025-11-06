import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify.js'
import router from '@/router/index.js'
import axios from 'axios'

const app = createApp(App);

// aios  요청 인터셉터 설정
axios.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, error => {
    // 인터셉터 무시 -> 사용자의 본 요청 화면으로 라우팅
    return Promise.reject(error);
});

app.use(vuetify);
app.use(router);
app.mount('#app');
