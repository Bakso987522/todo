import {createRouter, createWebHistory} from 'vue-router'

import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import TodoListView from "../views/TodoListView.vue";
import {useAuthStore} from "@/stores/authStore.js";

const routes = [
    {
        path: "/",
        name: "home",
        component: TodoListView,
    },
    {
        path: "/login",
        name: "login",
        component: LoginView,
    },
    {
        path: "/register",
        name: "register",
        component: RegisterView,
    },
    {
        path: "/todos",
        name: "todos",
        component: TodoListView,
        meta: {
            requiresAuth: true
        }
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(async (to, from, next) => {
    if ((to.name === 'login' || to.name === 'register') && useAuthStore().isLogged) {
        next({name: 'todos'})
    }
    else if (to.meta.requiresAuth) {
        if (!useAuthStore().isLogged) {
            next({name: 'login'})
        } else {
            next()
        }
    } else {
        next()
    }
})

export default router