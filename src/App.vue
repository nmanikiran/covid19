<template>
  <div id="app">
    <v-app id="inspire">
      <NavBar />
      <v-container>
        <NavigationDrawer />
        <v-content>
          <router-view></router-view>
        </v-content>
      </v-container>
      <v-layout justify-end v-if="isShareSupported">
        <v-fab-transition>
          <v-btn
            color="primary"
            fab
            large
            dark
            bottom
            right
            class="share-icon"
            @click="shareLink"
          >
            <v-icon> mdi-share</v-icon>
          </v-btn>
        </v-fab-transition>
      </v-layout>
      <Footer />
      <v-snackbar v-if="notification.message" v-model="showSnackbar">
        {{ notification.message }}
        <v-btn text @click="closeNotification">Ok</v-btn>
      </v-snackbar>
    </v-app>
  </div>
</template>

<script>
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";
import NavigationDrawer from "./components/NavigationDrawer";

export default {
  name: "App",
  data() {
    return {
      notification: {},
      showSnackbar: false
    };
  },
  computed: {
    isShareSupported() {
      return window.navigator.share;
    }
  },
  methods: {
    closeNotification() {
      this.showSnackbar = false;
      this.notification = {};
      window.location.reload(true);
    },
    async shareLink() {
      let shareData = {
        title: "Covid19 Info",
        text:
          "gocovid19 site will provide stats relate to coronavirus cases, information that WHO provided to finght aganist covoid19 in pictorial reprasentation, symptoms checklist and many more",
        url: "https://gocovid19.netlify.app"
      };

      try {
        await navigator.share(shareData);
        console.log("gocovid19 shared successfully");
      } catch (error) {
        this.notification = {
          message:
            "If You found this site informative please share with your friends & family"
        };
        this.showSnackbar = true;
        console.log(error);
        console.log("Error while sharing");
      }
    }
  },
  mounted() {
    window["isUpdateAvailable"].then((isAvailable) => {
      if (isAvailable) {
        this.notification = {
          message:
            "New Update available! Reload the webapp to see the latest juicy changes."
        };
      }
    });
  },
  components: {
    NavBar,
    NavigationDrawer,
    Footer
  }
};
</script>

<style lang="scss" scoped>
.v-content {
  min-height: 90vh;
}
.share-icon {
  margin: 20px;
}
</style>
