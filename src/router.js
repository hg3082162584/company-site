import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let oneidearouter = new Router({
  routes: [{
    path: '/',
    name: 'home',
    component: () => import('./views/Home.vue')
  },
  {
    path: '/news',
    name: 'news',
    component: () => import('./views/News.vue'),
  },
  {
    path: '/newsdetails/:id',
    name: 'newsdetails',
    component: () => import('./views/NewsDetails.vue'),
  },
  {
    path: '/products',
    name: 'products',
    component: () => import('./views/Products.vue'),
  },
  {
    path: '/productlist',
    name: 'productlist',
    component: () => import('./views/ProductList.vue')
  },
  // {
  //   path: '/case',
  //   name: 'case',
  //   component: () => import('./views/Case.vue')
  // },
  // {
  //   path: '/casedetails/:id',
  //   name: 'casedetails',
  //   component: () => import('./views/CaseDetails.vue')
  // },
  {
    path: '/about',
    name: 'about',
    component: () => import('./views/About.vue')
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('./views/Contact.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('./views/Login.vue')
  },
  {
    path: '/wstore',
    name: 'wstore',
    component: () => import('./views/Store/Wstore.vue')
  },
  {
    path: '/fstore',
    name: 'fstore',
    component: () => import('./views/Store/Fstore.vue')
  },
  {
    path: '/pstore',
    name: 'pstore',
    component: () => import('./views/Store/Pstore.vue')
  },
  {
    path: '/storelist',
    name: 'storelist',
    component: () => import('./views/StoreList.vue')
  },
  {
    path: '/adminIndex',
    name: 'adminIndex',
    component: () => import('./views/Admin/Index.vue')
  },
  {
    path: '/adminNews',
    name: 'adminNews',
    component: () => import('./views/Admin/News.vue')
  },
  {
    path: '/adminProducts',
    name: 'adminProducts',
    component: () => import('./views/Admin/Products.vue')
  },
  {
    path: '/adminStoreList',
    name: 'adminStoreList',
    component: () => import('./views/Admin/Storelist.vue')
  }


  ]
})

export default oneidearouter