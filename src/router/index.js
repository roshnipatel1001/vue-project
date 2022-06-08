import { createWebHistory, createRouter } from "vue-router";
import Parent from "../components/parent.vue";
import Child from "../components/child.vue";
import Signup from "../components/Signup.vue";
import Login from "../components/Login.vue";
import Autocomplete from "../components/Autocomplete.vue";
import Home from "../components/views/Home.vue";
import Shop from "../components/views/ShoppingCart.vue";
const routes = [
  {
    path: "/",
    name: "Parent",
    component: Parent,
  },
  {
    path: "/child",
    name: "Child",
    component: Child,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/autocomplete",
    name: "Autocomplete",
    component: Autocomplete,
  },
  {
    path: "/add-to-cart",
    name: "Home",
    component: Home,
  },
  {
    path: "/shop",
    name: "Shop",
    component: Shop,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
