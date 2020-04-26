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
        >{{ word.label }}
      </v-chip>
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
              @click="trackDonaion('WHO')"
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
              @click="trackDonaion('India')"
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
              @click="trackDonaion('UK')"
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
      ],
      synth: window.speechSynthesis,
      buzzWords: [
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
    };
  },
  computed: {
    isSpeachSupported() {
      return window.speechSynthesis;
    }
  },
  methods: {
    speak(word) {
      if (!window.speechSynthesis || !this.synth) return;
      if (this.synth.speaking) {
        this.synth.cancel();
      }
      const msg = new SpeechSynthesisUtterance(word.description);
      msg.pitch = 0.6;
      msg.rate = 0.8;
      this.synth.speak(msg);
    },
    trackDonaion(name) {
      this.$gtag.event("donations", { name });
    }
  },
  mounted() {
    document.onvisibilitychange = () => {
      if (this.synth.speaking && !this.synth.paused) {
        this.synth.pause();
      } else if (this.synth.paused) {
        this.synth.resume();
      }
    };
  }
};
</script>

<style lang="scss" scoped></style>
