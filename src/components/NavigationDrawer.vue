<template>
  <v-navigation-drawer
    v-model="isOpen"
    color="primary"
    temporary
    app
    dark
    :stateless="!isOpen"
  >
    <v-layout column justify-space-between class="drawer-container">
      <div>
        <v-layout justify-center class="pa-5 my-5">
          <v-btn to="/" icon> <img :src="logo" height="56" alt="logo"/></v-btn>
        </v-layout>
        <v-list dense nav class="py-0">
          <v-list-item
            v-for="item in navigationLinks"
            :key="item.title"
            :to="item.path"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </div>
      <v-spacer></v-spacer>
      <div>
        <v-row justify="center" align="center">
          <v-switch
            :light="mode === 'dark'"
            v-model="mode"
            true-value="dark"
            false-value="light"
            id="mode"
            color="success"
          >
          </v-switch
          ><label for="mode" class="white--text"> {{ mode }}</label>
        </v-row>
        <v-list-item
          two-line
          href="https://github.com/nmanikiran"
          target="_blank"
        >
          <v-list-item-avatar>
            <img
              alt="nmanikiran"
              src="https://avatars1.githubusercontent.com/u/3726349?s=460&u=217d532a8d6c1e4a2038ecead0b028605836c18d&v=4"
            />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Mani Kiran N</v-list-item-title>
            <v-list-item-subtitle>nmanikiran</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </div>
    </v-layout>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "NavigationDrawer",
  props: {
    drawer: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      mode: "light",
      logo: `${process.env.VUE_APP_IMAGE_URL_PREFIX}v1587286951/covid-19/covid19.png`
    };
  },
  computed: {
    ...mapGetters(["navigationLinks", "isOpenBurger"]),
    isOpen: {
      get() {
        return this.isOpenBurger;
      },
      set(val) {
        this.$store.commit("toggleNavigationDrawer", val);
      }
    }
  },
  methods: {
    changeTheme(mode) {
      console.log(this.$vuetify.theme);
      this.$vuetify.theme.isDark = mode === "dark";
      if (mode === "dark") {
        this.$vuetify.theme.themes.dark.primary = "#000000";
      } else {
        this.$vuetify.theme.themes.dark.primary = "#1976D2";
      }
    }
  },
  watch: {
    mode: {
      immediate: true,
      deep: true,
      handler(newValue) {
        this.changeTheme(newValue);
      }
    }
  },
  mounted() {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    let mode = mq.matches ? "dark" : "light";
    this.changeTheme(mode);
    mq.addEventListener("change", (e) => {
      mode = e.matches ? "dark" : "light";
      this.changeTheme(mode);
    });
  }
};
</script>

<style lang="scss" scoped>
.drawer-container {
  box-sizing: border-box;
  height: 100vh;
  a {
    text-decoration: none;
    color: #fff;
  }
}
</style>
