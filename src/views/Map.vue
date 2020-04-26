<template>
  <div class="map-with-item-scroll">
    <gmap-map
      ref="map"
      :center="center"
      :zoom="zoom"
      :options="option"
      style="width: 100%; height: 90vh;"
    >
      <gmap-cluster zoom-on-click>
        <gmap-marker
          v-for="(marker, index) in computedMarkers"
          :key="index"
          :position="marker.position"
          :clickable="true"
          :icon="marker.icon"
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
              <div class="overline mb-2">{{ item.country }}</div>
              <v-list-item-subtitle class="my-1">{{
                currentTitle
              }}</v-list-item-subtitle>
              <v-list-item-title class="headline ">{{
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
    <v-speed-dial
      v-model="fab"
      direction="bottom"
      top
      right
      fixed
      transition="slide-x-transition"
      class="fab-speed-dial"
      :style="{ 'margin-top': marginTop }"
    >
      <template v-slot:activator>
        <v-btn v-model="fab" color="blue darken-2" dark fab>
          <v-icon v-if="fab">mdi-close</v-icon>
          <v-icon v-else>mdi-settings</v-icon>
        </v-btn>
      </template>
      <v-btn fab dark small color="success" @click="zoom = zoom + 1">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <v-btn fab dark small color="warning" @click="zoom = zoom - 1">
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-btn fab dark small color="error" @click="zoom = 5">
        <v-icon>mdi-reload</v-icon>
      </v-btn>
    </v-speed-dial>
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
      fab: false,
      zoom: 5,
      map: null,
      center: { lat: 51.5072, lng: 0.1275 },
      option: { maxZoom: 15 },
      currentTitle: "active",
      options: {
        list: {
          class: "horizontal-scroll-list"
        }
      }
    };
  },
  computed: {
    ...mapGetters({
      infectedCountries: "getCountriesData"
    }),
    marginTop() {
      return `${(window.innerHeight - 56) / 2}px`;
    },
    size() {
      const {
        smAndDown,
        smAndUp,
        mdAndDown,
        mdAndUp,
        lgAndDown
      } = this.$vuetify.breakpoint;
      if (smAndDown) return 1;
      if (smAndUp && mdAndDown) return 2;
      if (mdAndUp && lgAndDown) return 4;
      return 5;
    },
    computedMarkers() {
      // by default this.markers has infected countries
      return this.markers.filter((item) => item[this.currentTitle] > 0);
    },
    markers() {
      const markerList = this.infectedCountries
        .filter((item) => {
          if (item.countryInfo.lat && item.countryInfo.long && item.cases > 0) {
            return item;
          }
        })
        .map((item) => {
          item.position = {
            lat: item.countryInfo.lat,
            lng: item.countryInfo.long
          };
          item.icon = `${imgUrl}/blue-dot.png`;
          return item;
        });
      return [...markerList];
    }
  },
  methods: {
    onMarkerClick(country /*, index*/) {
      this.$store.commit("toggleStatsModal", country);
      // this.computedMarkers.forEach((element, idx) => {
      //   element.icon =
      //     idx === index ? `${imgUrl}/red-dot.png` : `${imgUrl}/blue-dot.png`;
      // });
      // const ele = document.querySelector(".horizontal-scroll-list");
      // const { width } = ele.getBoundingClientRect();
      // ele.scrollLeft = index * ((width - 10) / this.size);
    },
    onListItemClick(markerToBeCentered) {
      const index = this.computedMarkers.findIndex(
        (e) => e.country == markerToBeCentered.country
      );
      this.computedMarkers.forEach((element, idx) => {
        element.icon =
          idx === index ? `${imgUrl}/red-dot.png` : `${imgUrl}/blue-dot.png`;
      });
      this.zoom = 10;
      this.center = markerToBeCentered.position;
    }
  },
  mounted() {
    const type = this.$route.params.title.toLowerCase() || "active";
    this.currentTitle = type === "infected" ? "cases" : type;
    if (!this.infectedCountries || this.infectedCountries.length === 0) {
      this.$store.dispatch("getCountrywiseData");
    }
    setTimeout(() => {
      this.$refs.map.$mapPromise.then((m) => {
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
.fab-speed-dial {
  z-index: 10000;
  display: inline-block;
}
.horizontalList {
  margin-top: -182px !important;
}
.map-with-item-scroll {
  min-height: 90vh !important;
  margin: 0 calc(100% - 100vw);
}
.item {
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14),
    0 1px 10px 0 rgba(0, 0, 0, 0.12) !important;
}
</style>
