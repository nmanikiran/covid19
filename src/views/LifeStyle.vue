<template>
  <div class="about">
    <h1>The Buzz in the internet</h1>
    <p class="note" v-if="isSpeachSupported">
      Tap on each buzz word to know more
    </p>
    <div>
      <v-chip
        class="ma-1"
        v-for="(word, index) in buzzWords"
        :key="index"
        :color="word.color"
        @click="speak(word)"
        >{{ word.label }}</v-chip
      >
    </div>
  </div>
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
