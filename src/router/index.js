import { createRouter, createWebHistory } from "vue-router";
// import HomeView from "../views/HomeView.vue";
import Registration from "../views/Registration.vue"
import Login from "../views/Login.vue"
import Blog from "../views/Blog.vue"
import Showdata from "../views/Showdata.vue"

const routes = [
  {
    path: "/registration",
    name: "registration",
    component: Registration,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/blog",
    name: "Blog",
    component: Blog,
  },
  {
    path: "/showdata/:id",
    name: "Showdata",
    component: Showdata,
    props:true
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
