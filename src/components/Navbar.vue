<template>
  <v-app-bar app temporary color="primary" dark>
    <div class="d-flex align-center">
      <v-btn icon @click="toggleMenu" aria-label="menu">
        <v-icon>mdi-menu</v-icon></v-btn
      >
      <v-spacer v-if="!$vuetify.breakpoint.mdAndUp"></v-spacer>
      <v-btn to="/" icon>
        <img :src="logo" height="56" alt="covid19 logo" />
      </v-btn>
    </div>

    <v-spacer></v-spacer>
    <v-btn icon exact to="/" class="mr-2" aria-label="home">
      <v-icon>mdi-home</v-icon>
    </v-btn>
    <div v-if="$vuetify.breakpoint.mdAndUp">
      <v-btn
        v-for="(link, index) in navigationLinks"
        text
        exact
        :to="link.path"
        :key="index"
      >
        <span class="mr-2">{{ link.name }}</span>
      </v-btn>
    </div>
  </v-app-bar>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Navbar",
  data() {
    return {
      logo: `${process.env.VUE_APP_IMAGE_URL_PREFIX}v1587286951/covid-19/covid19.png`
    };
  },
  computed: {
    ...mapGetters(["navigationLinks"])
  },
  methods: {
    toggleMenu() {
      this.$store.commit("toggleNavigationDrawer");
      this.$gtag.event("toggleMenu", { route: this.$route.name });
    }
  }
};
</script>

<style lang="scss" scoped></style>
