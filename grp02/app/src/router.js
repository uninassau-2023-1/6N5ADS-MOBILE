import { createRouter, createWebHistory } from '@ionic/vue-router';
import TabsPage from './app/view/TabsPage.vue';

const routes = [
  {
    path: '/',
    redirect: '/tabs/ficha'
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/ficha'
      },
      {
        path: 'ficha',
        component: () => import('@/app/view/FichaView.vue')
      },
      {
        path: 'tab2',
        component: () => import('@/app/view/Tab2Page.vue')
      },
      {
        path: 'tab3',
        component: () => import('@/app/view/Tab3Page.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
