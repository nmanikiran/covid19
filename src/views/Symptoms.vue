<template>
  <v-layout column class="symptoms-page">
    <h1>COVID-19 Symptoms Checklist</h1>
    <p class="note">Score 1 to 3 points for each question</p>
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
            {{ item.points }}pt</v-list-item-action-text
          >
        </v-list-item-action>
      </v-list-item>
    </v-list>
    <div class="results my-5">
      <h1>Score Results</h1>
      <div v-html="result" v-if="result"></div>
      <p class="note" v-else>
        No Result yet! Please select the above symptoms to check the score
      </p>
    </div>
    <div class="text-center mt-5">
      <img :src="poweredBy" class="ma-3" height="100" />
      <div>
        <h1>Adopted from DOH guidelines</h1>
        <a href="https://www.doh.gov.ph/">doh.gov.ph</a>
      </div>
    </div>
    <v-snackbar v-model="snackbar" color="error" right :timeout="22500" top>
      <p v-html="result"></p>
      <v-btn dark icon @click="snackbar = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-snackbar>
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
          title: "Do you have cought ?",
          points: 1,
          active: false
        },
        {
          img: `${ImageUrl}/symptoms/02-cold.svg`,
          title: "Do you have cold ?",
          points: 1,
          active: false
        },
        {
          img: `${ImageUrl}/symptoms/03-diarrhea.svg`,
          title: "Are you having Diarrhea ?",
          points: 1,
          active: false
        },
        {
          img: `${ImageUrl}/symptoms/04-sore-throat.svg`,
          title: "Do you have sore throat ?",
          points: 1,
          active: false
        },
        {
          img: `${ImageUrl}/symptoms/05-myalgia.svg`,
          title: "Are you expressing MYALGIA or Body Aches ?",
          points: 1,
          active: false
        },
        {
          img: `${ImageUrl}/symptoms/06-headache.svg`,
          title: "Do you have headache ?",
          points: 1,
          active: false
        },
        {
          img: `${ImageUrl}/symptoms/07-fever.svg`,
          title: "Do you have feaver (Teamp 37.8 C / 100 F above) ?",
          points: 1,
          active: false
        },
        {
          img: `${ImageUrl}/symptoms/08-difficulty-breathing.svg`,
          title: "Do you have difficulty in breathing ?",
          points: 2,
          active: false
        },
        {
          img: `${ImageUrl}/symptoms/09-fatigue.svg`,
          title: "Are you expressing Fatigue ?",
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
          title: "Do you have travel history to a COVID-19 infected Area ?",
          points: 3,
          active: false
        },
        {
          img: `${ImageUrl}/symptoms/12-patient.svg`,
          title:
            "Do you have a direct contact or is taking care of a positive COVID-19 PATIENT ?",
          points: 3,
          active: false
        }
      ],
      poweredBy: `${ImageUrl}/doh.png`,
      result: ""
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
      console.log(totalPoints);
      if (totalPoints > 0 && totalPoints < 3) {
        this.result = `<b> 0 - 2</b> May be stress realted or observe`;
      }
      if (totalPoints >= 3 && totalPoints < 6) {
        this.result = `<b> 3 - 5 </b> Hydrate properly with personal hygiene Observe and Re-evaluate afte 2 days`;
      }
      if (totalPoints >= 6 && totalPoints < 13) {
        this.result = `<b> 6 - 12</b> seek a consultation with doctor`;
      }
      if (totalPoints >= 12 && totalPoints <= 20) {
        this.snackbar = true;
        this.result = `<b> 12 - 20</b> Call the DOH helpline <a href="tel:02-8-651-7800">02-8-651-7800</a>`;
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
