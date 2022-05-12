import { createRouter, createWebHashHistory } from 'vue-router'
import homePage from '../views/home-page.vue'
import explorePage from '../views/explore-app.vue'
import stayDetails from '../views/stay-details.vue'
import userDashboard from '../views/user-dashboard.vue'
import userWishList from '../views/user-wish-list.vue'

const router = createRouter({
    history: createWebHashHistory(),
    linkActiveClass: 'active',

    routes: [{
        path: '/',
        name: 'home',
        component: homePage
    },
    {
        path: '/stay',
        name: 'explore-page',
        component: explorePage
    },
    {
        path: '/stay/:id',
        name: 'stay-details',
        component: stayDetails
    },
    {
        path: '/dashboard',
        name: 'user-dashboard',
        component: userDashboard,
    },
    {
        path: '/wishList',
        name: 'user-wish-list',
        component: userWishList,
    },
    ]
})

export default router