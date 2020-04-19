<template>
  <v-layout column>
    <h1>The Buzz in the internet</h1>
    <p class="note" v-if="isSpeachSupported">
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
    <v-divider></v-divider>
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
    return {};
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
      const voices = synth.getVoices();
      const msg = new SpeechSynthesisUtterance(word.description);
      msg.voice = Array.from(voices)[1];
      synth.speak(msg);
    }
  }
};
</script>

<style lang="scss" scoped></style>
