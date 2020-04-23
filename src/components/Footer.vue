<template>
  <v-footer dark padless class="footer-container">
    <v-card
      flat
      tile
      class="primary lighten-1 white--text text-center"
      min-width="100%"
    >
      <v-card-text>
        <v-btn
          v-for="link in socialLinks"
          :key="link.icon"
          class="mx-4 white--text"
          :href="link.url"
          icon
          target="_blank"
        >
          <v-icon size="24px">{{ link.icon }}</v-icon>
        </v-btn>
      </v-card-text>

      <v-card-text class="white--text pt-0">
        Need to thank few people here. The APIs are powered by
        <a
          href="https://corona.lmao.ninja/docs/#/"
          target="_blank"
          rel="noreferrer noopener"
        >
          lmao.ninja
        </a>
        , images are hosted on
        <a href="cloudinary.com" target="_blank" rel="noreferrer noopener">
          cloudinary
        </a>
        , app is hosted on <a href="https://app.netlify.com/">netlify</a>
        and the icons are from
        <a
          href="https://www.flaticon.com/home"
          target="_blank"
          rel="noreferrer noopener"
        >
          Flaticon
        </a>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="white--text">
        <p>
          Made with &#10084; by
          <a
            class="myprofile pr-2"
            href="https://github.com/nmanikiran"
            target="_blank"
            >Mani Kiran
          </a>
          -<span class="pl-2">{{ new Date().getFullYear() }}</span>
        </p>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["socialLinks"])
  }
};
</script>

<style lang="scss" scoped>
.footer-container {
  a {
    color: white;
    font-weight: bold;
  }
}
</style>
