import modules from './modules/index'
const routes = [
    {
        path: '/',
        component: () => import('layouts/MyLayout.vue'),
        children: [
            { path: 'start', component: () => import('pages/Index.vue') },
            { path: 'login', component: () => import('pages/Login.vue') },
            { path: 'register', component: () => import('pages/Register.vue') },
            {
                path: 'home', component: () => import('pages/Home.vue'), meta: {
                    requireLogin: true, tab: 'recharge'
                }
            },
            { path: '', redirect: 'home' }
        ]
    },
    // 分模块路由
    ...modules
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
    routes.push({
        path: '*',
        component: () => import('pages/Error404.vue')
    })
}

export default routes
