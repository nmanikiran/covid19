<template>
  <v-layout column class="symptoms-page">
    <h1>COVID-19 Symptoms Checklist</h1>
    <p class="text--secondary">Score 1 to 3 points for each question</p>
    <v-list rounded>
      <v-list-item
        v-for="(item, index) in symptomsChecklist"
        :key="index"
        @click="toggle(index)"
      >
        <v-list-item-action class="mr-3">
          <v-checkbox
            :value="item.active"
            color="primary"
            @click.stop.native
            @change="toggle(index)"
          ></v-checkbox>
        </v-list-item-action>

        <v-list-item-avatar class="mr-3">
          <v-img :src="item.img" contain />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>

        <v-list-item-action>
          <v-list-item-action-text class="title">
            {{ item.points }}pt
          </v-list-item-action-text>
        </v-list-item-action>
      </v-list-item>
    </v-list>
    <div class="results my-5">
      <h1>Score Results</h1>

      <v-alert class="my-3" v-if="results.text" :type="results.type">
        <p>Your Covid19 Symptoms results as follows</p>
        <p v-html="results.text"></p>
      </v-alert>

      <p class="text--secondary" v-else>
        No Result yet! Please select the above symptoms to check the score
      </p>
    </div>
    <div class="text-center mt-5">
      <img :src="poweredBy" class="ma-3" height="100" alt="doh" />
      <div>
        <h1>Adopted from DOH guidelines</h1>
        <a href="https://www.doh.gov.ph/" target="_blank">doh.gov.ph</a>
      </div>
    </div>
  </v-layout>
</template>

<script>
const ImageUrl = `${process.env.VUE_APP_IMAGE_URL_PREFIX}v1587218998/covid-19`;
export default {
  data() {
    return {
      snackbar: false,
      symptomsChecklist: [
        {
          img: `${ImageUrl}/symptoms/01-cough.svg`,
          title: "Do you have caught?",
          points: 1,
          active: false
        },
        {
          img: `${ImageUrl}/symptoms/02-cold.svg`,
          title: "Do you have a cold?",
          points: 1,
          active: false
        },
        {
          img: `${ImageUrl}/symptoms/03-diarrhea.svg`,
          title: "Are you having Diarrhea?",
          points: 1,
          active: false
        },
        {
          img: `${ImageUrl}/symptoms/04-sore-throat.svg`,
          title: "Do you have a sore throat?",
          points: 1,
          active: false
        },
        {
          img: `${ImageUrl}/symptoms/05-myalgia.svg`,
          title: "Are you expressing MYALGIA or Body Aches?",
          points: 1,
          active: false
        },
        {
          img: `${ImageUrl}/symptoms/06-headache.svg`,
          title: "Do you have a headache?",
          points: 1,
          active: false
        },
        {
          img: `${ImageUrl}/symptoms/07-fever.svg`,
          title: "Do you have a fever (Temp 37.8 C / 100 F above)?",
          points: 1,
          active: false
        },
        {
          img: `${ImageUrl}/symptoms/08-difficulty-breathing.svg`,
          title: "Do you have difficulty in breathing?",
          points: 2,
          active: false
        },
        {
          img: `${ImageUrl}/symptoms/09-fatigue.svg`,
          title: "Are you expressing Fatigue?",
          points: 2,
          active: false
        },
        {
          img: `${ImageUrl}/symptoms/10-travelling.svg`,
          title: "Have you traveled recently during the past 14 days?",
          points: 3,
          active: false
        },
        {
          img: `${ImageUrl}/symptoms/11-no-flight.svg`,
          title: "Do you have travel history to a COVID-19 infected Area?",
          points: 3,
          active: false
        },
        {
          img: `${ImageUrl}/symptoms/12-patient.svg`,
          title:
            "Do you have direct contact or are taking care of a positive COVID-19 PATIENT??",
          points: 3,
          active: false
        }
      ],
      poweredBy: `${ImageUrl}/doh.png`,
      results: {}
    };
  },
  methods: {
    toggle(index) {
      this.symptomsChecklist[index].active = !this.symptomsChecklist[index]
        .active;
      const totalPoints = this.symptomsChecklist
        .filter((s) => s.active)
        .reduce((sum, acc) => {
          return sum + acc.points;
        }, 0);
      if (totalPoints > 0 && totalPoints < 3) {
        this.results.type = "success";
        this.results.text = `<b> 0 - 2</b> May be stress realted or observe`;
      }
      if (totalPoints >= 3 && totalPoints < 6) {
        this.results.type = "info";
        this.results.text = `<b> 3 - 5 </b> Hydrate properly with personal hygiene Observe and Re-evaluate afte 2 days`;
      }
      if (totalPoints >= 6 && totalPoints < 13) {
        this.results.type = "warning";
        this.results.text = `<b> 6 - 12</b> seek a consultation with doctor`;
      }
      if (totalPoints >= 12 && totalPoints <= 20) {
        this.snackbar = true;
        this.results.type = "error";
        this.results.text = `<b> 12 - 20</b> Call the DOH helpline <a href="tel:02-8-651-7800">02-8-651-7800</a>`;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.symptoms-page {
  .v-list-item__title,
  .v-list-item__subtitle {
    white-space: normal !important;
  }
}
</style>
