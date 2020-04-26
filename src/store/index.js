import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import { fetchAllStats } from "@/services/api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isOpenBurger: false,
    isShowModal: false,
    modalData: null,
    infectedCountries: [],
    isDataLoading: false,
    stats: null,
    navLinks: [
      {
        icon: "mdi-alpha-w-circle-outline",
        path: "/WHO",
        name: "WHO"
      },
      {
        icon: "mdi-format-list-checkbox",
        path: "/symptoms",
        name: "Symptoms"
      },
      {
        icon: "mdi-information-outline",
        path: "/info",
        name: "Info"
      },
      {
        icon: "mdi-account-question-outline",
        path: "/faq",
        name: "FAQ"
      }
    ],
    socialIconLinks: [
      {
        icon: "mdi-fire",
        url: "https://www.freecodecamp.org/nmanikiran",
        label: "freecodecamp"
      },
      {
        icon: "mdi-linkedin",
        url: "https://www.linkedin.com/in/nmanikiran",
        label: "linkedin"
      },
      {
        icon: "mdi-twitter",
        url: "https://twitter.com/nmanikiran",
        label: "twitter"
      },
      {
        icon: "mdi-github-circle",
        url: "https://github.com/nmanikiran",
        label: "github"
      },
      {
        icon: "mdi-stackoverflow",
        url: "https://stackoverflow.com/users/2979100/nmanikiran",
        label: "stackoverflow"
      }
    ]
  },
  mutations: {
    toggleNavigationDrawer(state, payload) {
      if (payload === undefined) {
        payload = !state.isOpenBurger;
      }
      Vue.set(state, "isOpenBurger", payload);
    },
    toggleStatsModal(state, payload) {
      if (payload) {
        Vue.set(state, "modalData", payload);
      }
      Vue.set(state, "isShowModal", !state.isShowModal);
    },
    setInfectedCountriesData(state, payload) {
      Vue.set(state, "infectedCountries", payload);
    },
    setIsDataLoading(state, payload) {
      Vue.set(state, "isDataLoading", payload);
    },
    setStats(state, payload) {
      Vue.set(state, "stats", payload);
    }
  },
  actions: {
    async getCountrywiseData({ commit }) {
      try {
        commit("setIsDataLoading", true);
        const results = await axios.get(`${process.env.VUE_APP_API}/countries`);
        commit("setInfectedCountriesData", results.data || []);
        commit("setIsDataLoading", false);
      } catch (error) {
        commit("setIsDataLoading", false);
      }
    },
    async getAllStats({ commit }) {
      try {
        const stats = await fetchAllStats();
        const {
          cases,
          deaths,
          recovered,
          active,
          updated,
          todayCases,
          todayDeaths
        } = stats.data;
        const infected = {
          title: "Infected",
          color: "info",
          count: new Intl.NumberFormat(navigator.language).format(
            Number(cases)
          ),
          increase: Math.round((todayCases / cases) * 100)
        };
        this.updated = `Last updated on : ${new Date(updated).toDateString()}`;
        const deathscases = {
          title: "Deaths",
          color: "error",
          count: new Intl.NumberFormat(navigator.language).format(
            Number(deaths)
          ),
          increase: Math.round((todayDeaths / deaths) * 100)
        };
        const recoveredcases = {
          title: "Recovered",
          color: "success",
          count: new Intl.NumberFormat(navigator.language).format(
            Number(recovered)
          )
        };
        const activecases = {
          title: "Active",
          color: "orange",
          count: new Intl.NumberFormat(navigator.language).format(
            Number(active)
          )
        };

        const data = [
          { ...infected },
          { ...activecases },
          { ...deathscases },
          { ...recoveredcases }
        ];
        commit("setStats", data);
      } catch (error) {
        console.log(error);
      }
    }
  },
  getters: {
    isOpenBurger(state) {
      return state.isOpenBurger;
    },
    isShowModal(state) {
      return state.isShowModal;
    },
    navigationLinks(state) {
      return state.navLinks;
    },
    socialLinks(state) {
      return state.socialIconLinks;
    },
    statsData(state) {
      return state.modalData;
    },
    getCountriesData(state) {
      return state.infectedCountries;
    },
    isDataLoading(state) {
      return state.isDataLoading;
    },
    allStats(state) {
      return state.stats;
    }
  },
  modules: {}
});
