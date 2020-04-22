<template>
  <v-layout column>
    <h1 class="my-3">What you need todo</h1>
    <v-row wrap justify="space-around">
      <v-tooltip bottom v-for="(item, index) in todos" :key="index">
        <template v-slot:activator="{ on }">
          <v-avatar size="80" v-on="on" class="elevation-5 ma-5">
            <img :src="item.src" alt="John" />
          </v-avatar>
        </template>
        {{ item.title }}
      </v-tooltip>
    </v-row>
    <v-divider class="my-5"></v-divider>
    <h1>The Buzz in the internet</h1>
    <p class="text--secondary" v-if="isSpeachSupported">
      Tap on each buzz word to know more
    </p>
    <div class="my-3">
      <v-chip
        class="ma-1"
        v-for="(word, index) in buzzWords"
        :key="index"
        :color="word.color"
        @click="speak(word)"
        >{{ word.label }}</v-chip
      >
    </div>
    <v-divider class="my-5"></v-divider>
    <h1 class="text-center">Donations</h1>
    <v-layout dark>
      <v-row wrap justify="space-around">
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <a
              rel="noreferrer noopener"
              target="_blank"
              href="https://covid19responsefund.org/"
              @click="recordClick('WHO')"
            >
              <v-avatar size="80" v-on="on" class="elevation-5 ma-5">
                <img
                  src="https://res.cloudinary.com/nmanikiran/image/upload/v1587536766/covid-19/who.png"
                  alt="WHO"
                />
              </v-avatar>
            </a>
          </template>
          <span>WHO</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <a
              rel="noreferrer noopener"
              target="_blank"
              href="https://www.bhimupi.org.in/donation-digitized-with-bhim-upi"
              @click="recordClick('India')"
            >
              <v-avatar size="80" v-on="on" class="elevation-5 ma-5">
                <img
                  src="https://res.cloudinary.com/nmanikiran/image/upload/v1587536613/covid-19/in.png"
                  alt="India"
                />
              </v-avatar>
            </a>
          </template>
          <span>India</span>
        </v-tooltip>

        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <a
              rel="noreferrer noopener"
              target="_blank"
              href="https://www.nhscharitiestogether.co.uk/donate/"
              @click="recordClick('UK')"
            >
              <v-avatar size="80" v-on="on" class="elevation-5 ma-5">
                <img
                  src="https://res.cloudinary.com/nmanikiran/image/upload/v1587536613/covid-19/uk.png"
                  alt="UK"
                />
              </v-avatar>
            </a>
          </template>
          <span>UK</span>
        </v-tooltip>
      </v-row>
    </v-layout>
    <v-divider class="my-5"></v-divider>
    <h1 class="mt-5">The Coronavirus Explained & What You Should Do</h1>
    <v-divider class="my-3"></v-divider>
    <iframe
      class="mb-5"
      frameborder="0"
      scrolling="no"
      marginheight="0"
      marginwidth="0"
      height="443"
      type="text/html"
      src="https://www.youtube.com/embed/BtN-goy9VOY?autoplay=0&fs=1&iv_load_policy=3&showinfo=0&rel=0&cc_load_policy=0&start=0&end=0&origin=https://youtubeembedcode.com"
    ></iframe>
    <h1 class="mt-5">How wildlife trade is linked to coronavirus</h1>
    <v-divider class="my-3"></v-divider>
    <iframe
      class="mb-5"
      frameborder="0"
      scrolling="no"
      marginheight="0"
      marginwidth="0"
      height="443"
      type="text/html"
      src="https://www.youtube.com/embed/TPpoJGYlW54?autoplay=0&fs=1&iv_load_policy=3&showinfo=0&rel=0&cc_load_policy=0&start=0&end=0&origin=https://youtubeembedcode.com"
    ></iframe>
  </v-layout>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      todos: [
        {
          src: `${process.env.VUE_APP_IMAGE_URL_PREFIX}v1587353316/covid-19/007-medical-mask.svg`,
          title: "Mask"
        },
        {
          src: `${process.env.VUE_APP_IMAGE_URL_PREFIX}v1587222013/covid-19/008-washing-hands.svg`,
          title: "Wash Hands"
        },
        {
          src: `${process.env.VUE_APP_IMAGE_URL_PREFIX}v1587222013/covid-19/009-distance.svg`,
          title: "Social Distance"
        },
        {
          src: `${process.env.VUE_APP_IMAGE_URL_PREFIX}v1587353302/covid-19/002-spray.svg`,
          title: "Sanitize"
        },
        {
          src: `${process.env.VUE_APP_IMAGE_URL_PREFIX}v1587222013/covid-19/006-sneeze.svg`,
          title: "Cover"
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["buzzWords"]),
    isSpeachSupported() {
      return window.speechSynthesis;
    }
  },
  methods: {
    speak(word) {
      if (!window.speechSynthesis) return;
      const synth = window.speechSynthesis;
      const msg = new SpeechSynthesisUtterance(word.description);
      msg.pitch = 0.6;
      msg.rate = 0.8;
      synth.speak(msg);
    },
    recordClick(d) {
      this.$gtag.event("donations", { link: d });
    }
  }
};
</script>

<style lang="scss" scoped></style>
