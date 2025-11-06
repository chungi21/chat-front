import { createRouter, createWebHistory } from "vue-router"
import MemberCreate from "@/views/MemberCreate.vue"

const routes = [{
    path: '/member/create',
    name: 'MemberCreate',
    component : MemberCreate
}]

const router = createRouter({
    routes,
    history: createWebHistory()
});

export default router;