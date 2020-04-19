import Vue from "vue";
import VueRouter from "vue-router";
import Faq from "./../views/Faq.vue";
import Info from "./../views/Info.vue";
import WHO from "./../views/WHO.vue";
import Home from "./../views/Home.vue";
import LifeStyle from "./../views/LifeStyle.vue";
import Symptoms from "./../views/Symptoms.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/faq",
    name: "faq",
    component: Faq
  },
  {
    path: "/symptoms",
    name: "Symptoms",
    component: Symptoms
  },
  {
    path: "/info",
    name: "info",
    component: Info
  },
  {
    path: "/WHO",
    name: "WHO",
    component: WHO
  },
  {
    path: "/life",
    name: "Life",
    component: LifeStyle
  }
];

const router = new VueRouter({
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes,
  mode: "history"
});

export default router;
