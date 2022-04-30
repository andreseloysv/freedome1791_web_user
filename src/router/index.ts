import { createRouter, createWebHistory } from "vue-router";
import Feed from "../pages/Feed.vue";
import Profile from "../pages/Profile.vue";
import Post from "../pages/Post.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../pages/Feed.vue"),
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("../pages/Profile.vue"),
    },
    {
      path: "/post",
      name: "post",
      component: () => import("../pages/Post.vue"),
    },
  ],
});

export default router;
