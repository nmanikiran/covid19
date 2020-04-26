import Vue from "vue";
import VueRouter from "vue-router";
import Home from "./../views/Home.vue";
import WHO from "./../views/WHO.vue";

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
    name: "FAQ",
    component: () => import(/* webpackChunkName: "Faq" */ "./../views/Faq.vue"),
    meta: {
      title: "Questions & Answers | Covid19 Info"
    }
  },
  {
    path: "/symptoms",
    name: "Symptoms",
    component: () =>
      import(/* webpackChunkName: "Symptoms" */ "./../views/Symptoms.vue"),
    meta: {
      title: "Symptoms Checklist | Covid19 Info"
    }
  },
  {
    path: "/info",
    name: "Info",
    component: () =>
      import(/* webpackChunkName: "Info" */ "./../views/Info.vue"),
    meta: {
      title: "Info | Covid19 Info"
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
    path: "/map/:title",
    name: "Map",
    component: () => import(/* webpackChunkName: "Map" */ "./../views/Map.vue"),
    meta: {
      title: "Map View | Covid19 Info"
    }
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
    .find((r) => r.meta && r.meta.title);
  if (nearestWithTitle) document.title = nearestWithTitle.meta.title;
  next();
});

export default router;
