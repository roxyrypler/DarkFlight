import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import AnotherPage from "../views/AnotherPage.vue";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/anotherpage',
        name: 'AnotherPage',
        component: AnotherPage
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
