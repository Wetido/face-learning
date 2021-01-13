import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../views/Login"
import Main from "../views/Main"

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        {
            path: '/',
            name: 'Main',
            component: Main
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
    ]
})


