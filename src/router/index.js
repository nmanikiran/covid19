import Vue from "vue";
import VueRouter from "vue-router";
import Faq from "./../views/Faq.vue";
import Info from "./../views/Info.vue";
import WHO from "./../views/WHO.vue";
import Home from "./../views/Home.vue";
import LifeStyle from "./../views/LifeStyle.vue";
import Symptoms from "./../views/Symptoms.vue";
import Map from "./../views/Map.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: "Stats | Covid19 Info"
    }
  },
  {
    path: "/faq",
    name: "faq",
    component: Faq,
    meta: {
      title: "Questions & Answers | Covid19 Info"
    }
  },
  {
    path: "/symptoms",
    name: "Symptoms",
    component: Symptoms,
    meta: {
      title: "Symptoms Checklist | Covid19 Info"
    }
  },
  {
    path: "/info",
    name: "info",
    component: Info,
    meta: {
      title: "Information | Covid19 Info"
    }
  },
  {
    path: "/WHO",
    name: "WHO",
    component: WHO,
    meta: {
      title: "WHO | Covid19 Info"
    }
  },
  {
    path: "/life",
    name: "Life",
    component: LifeStyle
  },
  {
    path: "/map/:title",
    name: "Map",
    component: Map
  }
];

const router = new VueRouter({
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes,
  mode: "history"
});
router.beforeEach((to, from, next) => {
  const nearestWithTitle = to.matched
    .slice()
    .reverse()
    .find(r => r.meta && r.meta.title);
  if (nearestWithTitle) document.title = nearestWithTitle.meta.title;
  next();
});

export default router;
