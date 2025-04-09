import {createRouter, createWebHistory} from 'vue-router'

import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import TodoListView from "../views/TodoListView.vue";

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
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});
export default router