import {createRouter, createWebHistory} from 'vue-router'

import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import TodoListView from "../views/TodoListView.vue";
import {useAuthStore} from "../stores/authStore.js";
import AdminPanel from "../views/AdminPanel.vue";


const routes = [
    {
        path: "/",
        name: "default",
        component: LoginView,
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
    {
        path: "/adminpanel",
        name: "adminpanel",
        component: AdminPanel,
        meta: {
            requiresAuth: true,
            requiresAdmin: true,
        }
    }

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(async (to, from, next) => {
    const auth = useAuthStore()

    if (!auth.isLogged && !auth.user) {
        await auth.fetchUser()
    }

    if (
        ['login', 'register'].includes(to.name) &&
        to.name !== from.name
    ) {
        auth.error = null
    }

    if ((to.name === 'login' || to.name === 'register') && auth.isLogged) {
        next({ name: 'todos' })
    }

    else if (to.meta.requiresAuth) {
        if (!auth.isLogged) {
            next({ name: 'login' })
        } else if (to.meta.requiresAdmin && auth.user?.role !== 'admin') {
            next({ name: 'todos' }) // lub `/unauthorized`
        } else {
            next()
        }
    }

    // Trasa publiczna
    else {
        next()
    }
})


export default router