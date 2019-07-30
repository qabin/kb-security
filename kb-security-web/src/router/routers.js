import left from '../layouts/left-menu'
import header from '../layouts/header-menu'
import footer from '../layouts/footer-menu'

export default [
  {
    path: '',
    component: () => import('../layouts/index'),
    children: [
      {
        path: '/',
        components: {
          left, header, footer,
          page: () => import('../pages/home')
        }
      },
      {
        path: '/home',
        components: {
          left, header, footer,
          page: () => import('../pages/home')
        }
      },
      {
        path: '/chat_room',
        components: {
          left, header, footer,
          page: () => import('../pages/chat_room/index')
        }
      },
      {
        path: '/chat_list',
        components: {
          left, header, footer,
          page: () => import('../pages/chat_list/view_chatlist_catalog')
        }
      },
      {
        path: '/chat_list_admin',
        components: {
          left, header, footer,
          page: () => import('../pages/chat_list/view_chatlist_catalog_admin')
        }
      },
      {
        path: '/xss_platform',
        components: {
          left, header, footer,
          page: () => import('../pages/xss_platform/index')
        }
      },
      {
        path: '/blog',
        components: {
          left, header, footer,
          page: () => import('../pages/blog/index')
        }
      },
      {
        path: '/ueditor',
        components: {
          left, header, footer,
          page: () => import('../pages/blog/comp_blog_editor')
        }
      },
    ]
  },
  {
    path: '/login',
    component: () => import('../pages/user/login')
  },
  {
    path: '/register',
    component: () => import('../pages/user/register')
  },
]
