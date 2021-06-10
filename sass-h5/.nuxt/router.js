import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _429c7784 = () => interopDefault(import('../pages/layout' /* webpackChunkName: "" */))
const _7ee21a1a = () => interopDefault(import('../pages/home' /* webpackChunkName: "" */))
const _5187b3d5 = () => interopDefault(import('../pages/login' /* webpackChunkName: "" */))
const _30de39d6 = () => interopDefault(import('../pages/profile' /* webpackChunkName: "" */))
const _c868df92 = () => interopDefault(import('../pages/settings' /* webpackChunkName: "" */))
const _5a3a2afe = () => interopDefault(import('../pages/editor' /* webpackChunkName: "" */))
const _6349b33c = () => interopDefault(import('../pages/article' /* webpackChunkName: "" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/",
    component: _429c7784,
    children: [{
      path: "",
      component: _7ee21a1a,
      name: "home"
    }, {
      path: "/login",
      component: _5187b3d5,
      name: "login"
    }, {
      path: "/register",
      component: _5187b3d5,
      name: "register"
    }, {
      path: "/profile/:username",
      component: _30de39d6,
      name: "profile"
    }, {
      path: "/settings",
      component: _c868df92,
      name: "settings"
    }, {
      path: "/editor",
      component: _5a3a2afe,
      name: "editor"
    }, {
      path: "/article/:slug",
      component: _6349b33c,
      name: "article"
    }]
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
