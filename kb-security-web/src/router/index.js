import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'

Vue.use(Router)

const router = new Router({
  mode: 'hash',
  base: '/',
  routes
})

router.beforeEach((to, from, next) => {
  next()
})

export default router;
export const cache_route = {};
