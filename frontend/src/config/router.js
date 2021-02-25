import Vue from 'vue'
import VueRouter from 'vue-router'

import NotebooksByUser from '../components/notebook/NotebooksByUser.vue'
import Registers from '../components/register/Registers.vue'
import RegisterById from '../components/register/RegisterById.vue'
import Auth from '../components/auth/Auth.vue'

import { userKey } from '@/global'

Vue.use(VueRouter)

const routes = [{
    name: 'notebooksByUser',
    path: '/cadernos',
    component: NotebooksByUser,
    meta: { requiresLogin: true }
},{
    name: 'registers',
    path: '/cadernos/:notebookId',
    component: Registers,
    meta: { requiresLogin: true }
},{
    name: 'registerById',
    path: '/registros/:registerId',
    component: RegisterById,
    meta: { requiresLogin: true }
}, {
    name: 'auth',
    path: '/entrar',
    component: Auth,
    meta: { requiresNotLogged: true }
}]

const router = new VueRouter({
    mode: 'history',
    routes
})

router.beforeEach((to, from, next) => {
    const json = localStorage.getItem(userKey)
    const user = JSON.parse(json)

    if(to.matched.some(record => record.meta.requiresLogin)) {
        user ? next() : next({ path: '/entrar' })
    }
    else if(to.matched.some(record => record.meta.requiresNotLogged)){
        user ? next({ path: '/' }) : next()
    }
    else {
        next()
    }
})

export default router