<template>
  <div id="app">
    <v-app id="inspire">
      <NavBar @input="toggleMenu" />
      <v-container>
        <NavigationDrawer :drawer="drawer" @input="toggleMenu" />
        <v-content>
          <router-view></router-view>
        </v-content>
      </v-container>
      <v-layout justify-end v-if="isShareSupported">
        <v-fab-transition>
          <v-btn color="primary" fab large dark bottom right class="share-icon">
            <v-icon> mdi-share</v-icon>
          </v-btn>
        </v-fab-transition>
      </v-layout>
      <Footer />
    </v-app>
  </div>
</template>

<script>
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";
import NavigationDrawer from "./components/NavigationDrawer";

export default {
  name: "App",
  data() {
    return {
      drawer: false
    };
  },
  computed: {
    isShareSupported() {
      return navigator.share;
    }
  },
  methods: {
    toggleMenu() {
      this.drawer = !this.drawer;
    },
    share() {
      let shareData = {
        title: "Mani kiran N",
        text:
          "Restorative | Deliberative | Learner | Achiever | Responsibility!",
        url: window.location.href
      };

      navigator
        .share(shareData)
        .then(() => console.log("MDN shared successfully"))
        .catch(console.log);
    }
  },
  components: {
    NavBar,
    NavigationDrawer,
    Footer
  }
};
</script>

<style lang="scss" scoped>
.v-content {
  min-height: 90vh;
}
.share-icon {
  margin: 20px;
}
</style>
