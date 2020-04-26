<template>
  <v-container fluid>
    <p class="text--secondary ma-0">{{ updated }}</p>
    <v-row v-if="stats">
      <v-col
        cols="12"
        :xs="12"
        :sm="12"
        :md="6"
        :xl="4"
        :lg="4"
        v-for="n in stats"
        :key="n.title"
      >
        <v-card
          @click="onCardClick(n.title)"
          class="pa-1"
          dark
          :color="n.color"
        >
          <v-list-item three-line>
            <v-list-item-content class="pb-0">
              <div class="overline mb-3 font-weight-bold	">{{ n.title }}</div>
              <v-list-item-title class="headline mb-1">
                {{ n.count }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-card-actions class="pa-0">
            <v-list-item>
              <v-list-item-content class="pt-0">
                {{ `Number of ${n.title} cases` }}
              </v-list-item-content>
              <v-list-item-action v-if="n.increase">
                <v-btn color="#fff" class="ma-0 pa-0 red--text">
                  <v-icon>mdi-chart-line-variant</v-icon>
                  {{ n.increase }}%
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-divider class="my-5"></v-divider>
    <v-layout>
      <v-row justify="start" align="center" class="px-2">
        <v-switch
          @change="showAllToggle"
          v-model="showAll"
          color="success"
          id="pagination"
        ></v-switch>
        <label for="pagination"> Show all data</label>
      </v-row>
    </v-layout>

    <v-card>
      <v-card-title>
        <h1>Country wise list</h1>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :loading="isLoading"
        loading-text="Loading... Please wait"
        :headers="headers"
        :items="desserts"
        :search="search"
        :options.sync="dataTableOptions"
        @click:row="onItemRowclick"
      >
        <template v-slot:item.countryInfo="{ item }">
          <v-avatar :size="36" class="elevation-4">
            <img :src="item.countryInfo.flag" :alt="item.countryInfo.iso2" />
          </v-avatar>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      dataTableOptions: {
        sortBy: ["cases"],
        sortDesc: [true],
        itemsPerPage: 10
      },
      data: [],
      updated: "",
      search: "",
      headers: [
        {
          text: "#",
          align: "start",
          sortable: false,
          value: "countryInfo"
        },
        { text: "Country", value: "country" },
        { text: "Cases", value: "cases" },
        { text: "Deaths", value: "deaths" },
        { text: "Active", value: "active" },
        { text: "Recovered", value: "recovered" }
      ]
    };
  },
  computed: {
    ...mapGetters({
      desserts: "getCountriesData",
      isLoading: "isDataLoading",
      stats: "allStats"
    }),
    itemsPerPageOptions() {
      return this.showAll ? [-1] : [5, 10, 15, -1];
    },
    showAll() {
      return this.dataTableOptions.itemsPerPage === -1;
    }
  },

  methods: {
    onItemRowclick(e) {
      const data = this.desserts.find((d) => d.country === e.country);
      this.$store.commit("toggleStatsModal", data);
      this.$gtag.event("toggleStatsModal", { country: data.country });
    },
    onCardClick(title) {
      this.$router.push({
        name: "Map",
        params: { title: title.toLowerCase() }
      });
    },

    async getCountrywiseDate() {
      try {
        this.isLoading = true;
        const results = await axios.get(`${process.env.VUE_APP_API}/countries`);
        this.desserts = results.data;
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
      }
    },
    showAllToggle(val) {
      this.$gtag.event("showAllToggle", { pagination: this.showAll });
      this.dataTableOptions.itemsPerPage = val ? -1 : 10;
    }
  },
  mounted() {
    this.$store.dispatch("getCountrywiseData");
    if (!this.stats) this.$store.dispatch("getAllStats");
  }
};
</script>

<style lang="scss" scoped></style>
