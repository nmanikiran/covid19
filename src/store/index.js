import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isOpenBurger: false,
    isShowModal: false,
    modalData: null,
    infectedCountries: [],
    isDataLoading: false,
    navLinks: [
      { title: "WHO", icon: "mdi-alpha-w-circle-outline", path: "WHO" },
      { title: "Symptoms", icon: "mdi-format-list-checkbox", path: "symptoms" },
      { title: "Info", icon: "mdi-information-outline", path: "info" },
      { title: "FAQ", icon: "mdi-account-question-outline", path: "faq" }
      // { title: "Life Style", icon: "mdi-help-box", path: "life" }
    ],
    socialIconLinks: [
      { icon: "mdi-fire", url: "https://www.freecodecamp.org/nmanikiran" },
      { icon: "mdi-linkedin", url: "https://www.linkedin.com/in/nmanikiran" },
      { icon: "mdi-twitter", url: "https://twitter.com/nmanikiran" },
      { icon: "mdi-github-circle", url: "https://github.com/nmanikiran" }
    ],
    words: [
      {
        label: "covid",
        description: "covid: Coronavirus Disease 2019",
        color: "#" + Math.floor(Math.random() * 16777215).toString(16)
      },
      {
        label: "corona",
        description:
          "corona: (SARS-CoV-2), a coronavirus responsible for the 2019–2020 outbreak",
        color: "#" + Math.floor(Math.random() * 16777215).toString(16)
      },
      {
        label: "social distance",
        description:
          "Social distancing includes any method to keep people physically separate from each other because physical proximity is how many pathogens go from one body to another. This includes isolating people who are infected, quarantining people who may have been infected, and keeping people separate from each other in general",
        color: "#" + Math.floor(Math.random() * 16777215).toString(16)
      },
      {
        label: "fomite",
        description:
          "Fomites are associated particularly with hospital-acquired infections (HAIs), as they are possible routes to pass pathogens between patients.",
        color: "#" + Math.floor(Math.random() * 16777215).toString(16)
      },
      {
        label: "pathogens",
        description:
          "pathogens is anything that can produce disease. A pathogen may also be referred to as an infectious agent, or simply a germ",
        color: "#" + Math.floor(Math.random() * 16777215).toString(16)
      },
      {
        label: "epidemic",
        description:
          "epidemic is the rapid spread of disease to a large number of people in a given population within a short period of time",
        color: "#" + Math.floor(Math.random() * 16777215).toString(16)
      },
      {
        label: "pandemic",
        description: "A pandemic is the worldwide spread of a new disease.",
        color: "#" + Math.floor(Math.random() * 16777215).toString(16)
      },
      {
        label: "outbreak",
        description:
          "an outbreak is a sudden increase in occurrences of a disease in a particular time and place. It may affect a small and localized group or impact upon thousands of people across an entire continent",
        color: "#" + Math.floor(Math.random() * 16777215).toString(16)
      },
      {
        label: "quarantine",
        description:
          "A quarantine is a restriction on the movement of people and goods which is intended to prevent the spread of disease or pests. It is often used in connection to disease and illness",
        color: "#" + Math.floor(Math.random() * 16777215).toString(16)
      },
      {
        label: "isolation",
        description:
          "isolation various measures taken to prevent contagious diseases from being sprea",
        color: "#" + Math.floor(Math.random() * 16777215).toString(16)
      },
      {
        label: "contagious",
        description:
          "contagious: transmissible diseases, which are transmitted to other persons, either by physical contact with the person suffering the disease, or by casual contact with their secretions or objects touched by them or airborne route among other routes",
        color: "#" + Math.floor(Math.random() * 16777215).toString(16)
      },
      {
        label: "infectious",
        description:
          "Infectious diseases are disorders caused by organisms — such as bacteria, viruses, fungi or parasites",
        color: "#" + Math.floor(Math.random() * 16777215).toString(16)
      },
      {
        label: "respirator",
        description:
          "respirator: An appliance fitting over the mouth and nose, used for the purpose of excluding dust, fumes, smoke, or other irritants",
        color: "#" + Math.floor(Math.random() * 16777215).toString(16)
      },
      {
        label: "ventilator",
        description:
          "ventilator: A mechanical device designed to perform breathe, i.e., of moving gas into and out of the lungs and make them function normally.",
        color: "#" + Math.floor(Math.random() * 16777215).toString(16)
      },
      {
        label: "asymptomatic",
        description:
          "asymptomatic: Persons who carry a disease and are usually capable of transmitting the disease but, who do not exhibit symptoms of the disease are said to be asymptomatic.",
        color: "#" + Math.floor(Math.random() * 16777215).toString(16)
      },
      {
        label: "chloroquine",
        description:
          "chloroquine: An antimalarial agent used for the treatment and suppression of Plasmodium vivax, P. malariae, and P. falciparum; also used for hepatic amebiasis and some skin diseases.",
        color: "#" + Math.floor(Math.random() * 16777215).toString(16)
      },
      {
        label: "communicable",
        description:
          "communicable: Capable of being communicated or transmitted; said especially of disease.",
        color: "#" + Math.floor(Math.random() * 16777215).toString(16)
      },
      {
        label: "novel",
        description:
          "novel: adjective Referring to that which is new and/or original",
        color: "#" + Math.floor(Math.random() * 16777215).toString(16)
      },
      {
        label: "exponential",
        description:
          "exponential: Mathematical models can project how infectious diseases progress to show the likely outcome of an epidemic and help inform public health interventions",
        color: "#" + Math.floor(Math.random() * 16777215).toString(16)
      },
      {
        label: "immunity",
        description:
          "immunity: Resistance of the body to infection by a disease-causing agent, such as a bacterium or virus",
        color: "#" + Math.floor(Math.random() * 16777215).toString(16)
      },
      {
        label: "furlough",
        description:
          "furlough: (Industrial Relations & HR Terms) US a temporary laying-off of employees, usually because there is insufficient work to occupy them",
        color: "#" + Math.floor(Math.random() * 16777215).toString(16)
      },
      {
        label: "incubation",
        description:
          "incubation: the period between the initial infection and the appearance of symptoms of a disease.",
        color: "#" + Math.floor(Math.random() * 16777215).toString(16)
      },
      {
        label: "mitigation",
        description:
          "Mitigation is the reduction of something harmful or the reduction of its harmful effects",
        color: "#" + Math.floor(Math.random() * 16777215).toString(16)
      },
      {
        label: "screening",
        description:
          "screening: A systematic examination or assessment, done especially to detect an unwanted substance or attribute.",
        color: "#" + Math.floor(Math.random() * 16777215).toString(16)
      },
      {
        label: "zoonotic",
        description:
          "zoonotic: A disease of animals, such as rabies or psittacosis, that can be transmitted to humans.",
        color: "#" + Math.floor(Math.random() * 16777215).toString(16)
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
    buzzWords(state) {
      return state.words;
    },
    statsData(state) {
      return state.modalData;
    },
    getInfectedCountriesData(state) {
      return state.infectedCountries;
    },
    isDataLoading(state) {
      return state.isDataLoading;
    }
  },
  modules: {}
});
