import Vue from 'vue'
import VueRouter from 'vue-router'

import NotebooksByUser from '../components/notebook/NotebooksByUser.vue'
import NewNotebook from '../components/notebook/NewNotebook.vue'
import Registers from '../components/register/Registers.vue'

Vue.use(VueRouter)

const routes = [{
    name: 'notebooksByUser',
    path: '/cadernos',
    component: NotebooksByUser
},{
    name: 'newNotebook',
    path: '/cadernos/novo',
    component: NewNotebook
},{
    name: 'registers',
    path: '/cadernos/diario',
    component: Registers
}]

export default new VueRouter({
    mode: 'history',
    routes
})