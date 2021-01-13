import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../views/Login"
import Main from "../views/Main"
import firebase from "../database/firebase"

Vue.use(VueRouter)

    const routes = [
        {
            path: '/',
            name: 'Main',
            component: Main,
            meta: { requiresAuth: true }
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
    ]

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const isAuthenticated = firebase.auth().currentUser;
    
    if (requiresAuth && !isAuthenticated) {
        next("/login");
    } else {
        next();
    }
});

export default router

