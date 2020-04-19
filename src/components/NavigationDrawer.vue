<template>
  <v-navigation-drawer :value="drawer" color="primary" temporary app dark>
    <v-layout column justify-space-between class="drawer-container">
      <div>
        <v-layout justify-center class="pa-5 my-5">
          <v-btn to="/" icon> <img :src="logo" height="56"/></v-btn>
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
        <v-list-item
          two-line
          :class="miniVariant && 'px-0'"
          href="https://github.com/nmanikiran"
          target="_blank"
        >
          <v-list-item-avatar>
            <img
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
      logo: `${process.env.VUE_APP_IMAGE_URL_PREFIX}v1587286951/covid-19/covid19.png`
    };
  },
  computed: {
    ...mapGetters(["navigationLinks"])
  },
  methods: {}
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
