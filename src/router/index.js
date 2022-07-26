import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import Guard from "@/service/middleware";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    beforeEnter: Guard.redirectIfAutheticated,
    component: () =>
      import(/* webpackChunkName: "todos" */ "../layouts/NotLogged.vue"),
    children: [
      {
        path: "",
        name: "home",
        component: () =>
          import(/* webpackChunkName: "todos" */ "../views/HomeView.vue"),
      },
    ],
  },
  {
    path: "/login",

    beforeEnter: Guard.redirectIfAutheticated,
    component: () =>
      import(/* webpackChunkName: "login" */ "../layouts/NotLogged.vue"),
    children: [
      {
        path: "",
        name: "login",
        component: () =>
          import(/* webpackChunkName: "todos" */ "../views/Login.vue"),
      },
    ],
  },
  {
    path: "/register",
    beforeEnter: Guard.redirectIfAutheticated,
    component: () =>
      import(/* webpackChunkName: "todos" */ "../layouts/NotLogged.vue"),
    children: [
      {
        path: "",
        name: "register",
        component: () =>
          import(/* webpackChunkName: "todos" */ "../views/Register.vue"),
      },
    ],
  },
  {
    path: "/todos",
    beforeEnter: Guard.redirectIfNotAuthenticated,
    component: () =>
      import(/* webpackChunkName: "todos" */ "../layouts/Logged.vue"),
    children: [
      {
        path: "",
        name: "todos",
        component: () =>
          import(/* webpackChunkName: "todos" */ "../views/Todos.vue"),
      },
    ],
  },
  {
    path: "/todo/:id/tasks",
    beforeEnter: Guard.redirectIfNotAuthenticated,
    component: () =>
      import(/* webpackChunkName: "todo" */ "../layouts/Logged.vue"),   
    children: [
      {
        path: "",
        name: "todo",
        component: () =>
          import(/* webpackChunkName: "todo" */ "../views/Todo.vue"),
        props: true,
      },
    ],
  },
  {
    path: "/admin",
    beforeEnter: Guard.redirectIfNotAuthenticated,
    component: () =>
      import(/* webpackChunkName: "adm.todos" */ "../layouts/Logged.vue"),   
    children: [
      {
        path: "todos",
        name: "admin.todos",
        component: () =>
          import(/* webpackChunkName: "adm.todos" */ "../views/admin/Todos.vue"),
        props: true,
      },
      {
        path: "tasks",
        name: "admin.tasks",
        component: () =>
          import(/* webpackChunkName: "adm" */ "../views/admin/Task.vue"),
        props: true,
      },
    ],
  },
  {
    path: "/profile",
    beforeEnter: Guard.redirectIfNotAuthenticated,
    component: () =>
      import(/* webpackChunkName: "profile" */ "../layouts/Logged.vue"),   
    children: [
      {
        path: "",
        name: "profile",
        component: () =>
          import(/* webpackChunkName: "profile" */ "../views/Profile.vue"),
        props: true,
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return window.scrollTo({ top: 0, behavior: "smooth" });
  },
});

export default router;
