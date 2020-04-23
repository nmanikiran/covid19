<template>
  <v-row justify="center">
    <v-dialog :value="isShowModal" @click:outside="toggleModal" max-width="500">
      <v-card class="pa-4" v-if="statsData">
        <v-row justify="center" align="center">
          <v-avatar size="80" class="elevation-4">
            <img :src="statsData.countryInfo.flag" alt="" />
          </v-avatar>
        </v-row>
        <v-list-item three-line>
          <v-list-item-content class="pb-0">
            <v-list-item-title class="title">
              {{ statsData.country }}
            </v-list-item-title>
            <v-layout column class="my-3">
              <v-row class="stats-grid px-3">
                <p>Cases: {{ statsData.cases }}</p>
                <p>Today Cases: {{ statsData.todayCases }}</p>
                <p class="red--text">Deaths: {{ statsData.deaths }}</p>
                <p class="red--text">
                  Today Deaths: {{ statsData.todayDeaths }}
                </p>
                <p>Active: {{ statsData.active }}</p>
                <p>Recovered: {{ statsData.recovered }}</p>
              </v-row>
            </v-layout>
          </v-list-item-content>
        </v-list-item>
        <v-card-actions class="pa-0">
          <v-list-item>
            <v-list-item-content class="pt-0">
              <p>{{ tests }}</p>
              <br />
              <p>{{ updated }}</p>
            </v-list-item-content>
          </v-list-item>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["isShowModal", "statsData"]),
    updated() {
      return `Last updated on : ${new Date(
        this.statsData.updated
      ).toDateString()}`;
    },
    tests() {
      const tests = new Intl.NumberFormat(navigator.language).format(
        Number(this.statsData.tests)
      );
      return `Number of tests conducted: ${tests}`;
    }
  },
  methods: {
    toggleModal() {
      this.$store.commit("toggleStatsModal");
    }
  }
};
</script>

<style lang="scss" scoped>
.stats-grid p {
  flex: 1 1 50%;
}
</style>
