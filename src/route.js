import {createRouter, createWebHistory} from 'vue-router'

export const methods = ['bubble', 'selection', 'insertion']

export function registerRouter(app) {
  const router = createRouter({
    history: createWebHistory(),
    routes: [
      {
        path: '/',
        children: [
          {
            path: '',
            redirect: 'bubble'
          },
          ...methods.map(v=>{
            return {
              path: v,
              name: 'sort-'+v,
              component: () => import('@/views/sort/'+v)
            }
          }),
        ],
        component: () => import('@/views/sort')
      },
    ]
  });
  app.use(router)
}
