<template>
  <div class="map-with-item-scroll">
    <gmap-map
      ref="map"
      :center="center"
      :zoom="zoom"
      :options="option"
      style="width: 100%; height: 100vh;"
    >
      <gmap-cluster zoom-on-click>
        <gmap-marker
          v-for="(marker, index) in computedMarkers"
          :key="index"
          :position="marker.position"
          :clickable="true"
          :icon="icon"
          @click="onMarkerClick(marker, index)"
        />
      </gmap-cluster>
    </gmap-map>
    <vue-horizontal-list
      class="horizontalList"
      :items="computedMarkers"
      :options="options"
    >
      <template v-slot:default="{ item }">
        <v-card @click="onListItemClick(item)" class="mx-auto item" outlined>
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline mb-4">{{ item.country }}</div>
              <v-list-item-subtitle>{{ currentTitle }}</v-list-item-subtitle>
              <v-list-item-title class="headline mb-1">{{
                item[currentTitle]
              }}</v-list-item-title>
            </v-list-item-content>

            <v-list-item-avatar tile size="100" color="grey"
              ><v-img :src="item.countryInfo.flag"></v-img
            ></v-list-item-avatar>
          </v-list-item>
        </v-card>
      </template>
    </vue-horizontal-list>
  </div>
</template>

<script>
import GmapCluster from "vue2-google-maps/dist/components/cluster";
import VueHorizontalList from "vue-horizontal-list";
import { mapGetters } from "vuex";
const imgUrl = `${process.env.VUE_APP_IMAGE_URL_PREFIX}v1587818870/covid-19`;

export default {
  data() {
    return {
      zoom: 5,
      map: null,
      center: { lat: 51.5072, lng: 0.1275 },
      option: { maxZoom: 15 },
      currentTitle: "active",
      icon: `${imgUrl}/blue-dot.png`,
      options: {
        responsive: [
          { end: 576, size: 1 },
          { start: 576, end: 768, size: 2 },
          { start: 768, end: 992, size: 3 },
          { size: 3 }
        ],
        list: {
          // css class for the parent of item
          class: "horizontalScrollList"
        }
      }
    };
  },
  computed: {
    ...mapGetters({
      infectedCountries: "getInfectedCountriesData"
    }),
    size() {
      if (this.$vuetify.breakpoint.smAndDown) return 1;
      if (
        this.$vuetify.breakpoint.smAndUp &&
        this.$vuetify.breakpoint.mdAndDown
      )
        return 2;
      return 3;
    },
    computedMarkers() {
      // by default this.markers has infected countries
      if (this.currentTitle !== "Infected") {
        return this.markers.filter(item => item[this.currentTitle] > 0);
      }
      return this.markers;
    },
    markers() {
      return this.infectedCountries
        .filter(
          item =>
            !!item.countryInfo.lat && !!item.countryInfo.long && item.cases > 0
        )
        .map(item => {
          item.position = {
            lat: item.countryInfo.lat,
            lng: item.countryInfo.long
          };
          return item;
        });
    }
  },
  methods: {
    onMarkerClick(country, index) {
      this.icon = `${imgUrl}/red-dot.png`;
      const ele = document.querySelector(".horizontalScrollList");
      const { width } = ele.getBoundingClientRect();
      ele.scrollLeft = index * ((width - 10) / this.size);
    },
    onListItemClick(markerToBeCentered) {
      this.icon = `${imgUrl}/red-dot.png`;
      this.center = markerToBeCentered.position;
    }
  },
  mounted() {
    this.currentTitle = this.$route.params.title.toLowerCase() || "active";
    this.$store.dispatch("getCountrywiseData");
    setTimeout(() => {
      this.$refs.map.$mapPromise.then(m => {
        this.map = m;
      });
    }, 500);
  },
  components: {
    GmapCluster,
    VueHorizontalList
  }
};
</script>

<style lang="scss">
.horizontalList {
  margin-top: -200px !important;
}
.map-with-item-scroll {
  min-height: 100vh !important;
}
.item {
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14),
    0 1px 10px 0 rgba(0, 0, 0, 0.12) !important;
}
</style>
