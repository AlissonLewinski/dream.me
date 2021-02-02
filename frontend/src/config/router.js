import Vue from 'vue'
import VueRouter from 'vue-router'

import NotebooksByUser from '../components/notebook/NotebooksByUser.vue'
import NewNotebook from '../components/notebook/NewNotebook.vue'

Vue.use(VueRouter)

const routes = [{
    name: 'notebooksByUser',
    path: '/cadernos',
    component: NotebooksByUser
},{
    name: 'newNotebook',
    path: '/cadernos/novo',
    component: NewNotebook
}]

export default new VueRouter({
    mode: 'history',
    routes
})