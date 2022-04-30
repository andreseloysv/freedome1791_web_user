import { createRouter, createWebHistory } from "vue-router";
import Feed from "../pages/FeedPage.vue";
import Profile from "../pages/ProfilePage.vue";
import Post from "../pages/PostPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../pages/FeedPage.vue"),
    },
    {
      path: "/profile/:id",
      name: "profile",
      component: () => import("../pages/ProfilePage.vue"),
    },
    {
      path: "/post/:id",
      props: true,
      name: "post",
      component: () => import("../pages/PostPage.vue"),
    },
  ],
});

export default router;
