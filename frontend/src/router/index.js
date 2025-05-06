import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import About from '../views/About.vue';
import Contacts from '../views/Contacts.vue';
import Devices from '../views/Devices.vue';
import Services from '../views/Services.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import store from '../store';

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/about', name: 'About', component: About },
    { path: '/contacts', name: 'Contacts', component: Contacts },

    {
        path: '/devices',
        name: 'Devices',
        component: Devices,
        meta: { requiresAuth: true }
    },
    {
        path: '/services',
        name: 'Services',
        component: Services,
        meta: { requiresAuth: true }
    },
    { path: '/login', name: 'Login', component: Login },
    { path: '/register', name: 'Register', component: Register }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const isAuthenticated = store.getters.isAuthenticated;
    if (to.meta.requiresAuth && !isAuthenticated) {
        next('/login');
    } else {
        next();
    }
});

export default router;