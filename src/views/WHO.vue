<template>
  <div class="info-page" :class="$vuetify.breakpoint.mdAndDown ? '' : 'pa-3'">
    <h1 class="my-3">
      This Information is from WHO (World health orgaization)
    </h1>

    <p>
      Coronavirus disease (COVID-19) is an infectious disease caused by a newly
      discovered coronavirus.
    </p>
    <p>
      Most people infected with the COVID-19 virus will experience mild to
      moderate respiratory illness and recover without requiring special
      treatment. Older people, and those with underlying medical problems like
      cardiovascular disease, diabetes, chronic respiratory disease, and cancer
      are more likely to develop serious illness.
    </p>
    <p>
      The best way to prevent and slow down transmission is be well informed
      about the COVID-19 virus, the disease it causes and how it spreads.
      Protect yourself and others from infection by washing your hands or using
      an alcohol based rub frequently and not touching your face.
    </p>
    <p>
      The COVID-19 virus spreads primarily through droplets of saliva or
      discharge from the nose when an infected person coughs or sneezes, so it’s
      important that you also practice respiratory etiquette (for example, by
      coughing into a flexed elbow).
    </p>
    <p>
      At this time, there are no specific vaccines or treatments for COVID-19.
      However, there are many ongoing clinical trials evaluating potential
      treatments. WHO will continue to provide updated information as soon as
      clinical findings become available.
    </p>

    <h1>Myth Busters</h1>
    <div class="slider">
      <div class="item" v-for="(item, i) in mythImages" :key="i">
        <v-img eager :src="item" contain />
      </div>
    </div>
    <v-layout column class="my-5">
      <h1>Home Care for people with suspected or confirmed with COVID-19</h1>
      <v-divider class="py-3"></v-divider>
      <v-carousel height="auto">
        <v-carousel-item
          v-for="(item, i) in homeCareImages"
          :key="i"
          :src="item"
          reverse-transition="fade-transition"
          transition="fade-transition"
        ></v-carousel-item>
      </v-carousel>
    </v-layout>
    <v-layout class="my-3">
      <v-row>
        <v-col :xs="12" :sm="12" :md="6" :xl="6" :lg="6">
          <h1 class="my-3">Protect Yourself</h1>
          <v-card elevation="24" class="pa-0">
            <v-carousel
              continuous
              show-arrows-on-hover
              hide-delimiter-background
              delimiter-icon="mdi-minus"
              height="auto"
            >
              <v-carousel-item v-for="(slide, i) in protectImages" :key="i">
                <v-img eager :src="slide" contain />
              </v-carousel-item>
            </v-carousel>
          </v-card>
        </v-col>
        <v-col :xs="12" :sm="12" :md="6" :xl="6" :lg="6">
          <h1 class="my-3">Practice food safety</h1>
          <v-card elevation="24" class="pa-0">
            <v-carousel
              continuous
              show-arrows-on-hover
              hide-delimiter-background
              delimiter-icon="mdi-minus"
              height="auto"
            >
              <v-carousel-item v-for="(slide, i) in foodImages" :key="i">
                <v-img eager :src="slide" contain />
              </v-carousel-item>
            </v-carousel>
          </v-card>
        </v-col>
        <v-col :xs="12" :sm="12" :md="6" :xl="6" :lg="6">
          <h1 class="my-3">Shopping/Working in wet markets</h1>
          <v-card elevation="24" class="pa-0">
            <v-carousel
              continuous
              show-arrows-on-hover
              hide-delimiter-background
              delimiter-icon="mdi-minus"
              height="auto"
            >
              <v-carousel-item v-for="(slide, i) in safetyImages" :key="i">
                <v-img eager :src="slide" contain />
              </v-carousel-item>
            </v-carousel>
          </v-card>
        </v-col>
        <v-col :xs="12" :sm="12" :md="6" :xl="6" :lg="6">
          <h1 class="my-3">Stay healthy while travelling</h1>
          <v-card elevation="24" class="pa-0">
            <v-carousel
              continuous
              show-arrows-on-hover
              hide-delimiter-background
              delimiter-icon="mdi-minus"
              height="auto"
            >
              <v-carousel-item v-for="(slide, i) in healthImages" :key="i">
                <v-img eager :src="slide" contain />
              </v-carousel-item>
            </v-carousel>
          </v-card>
        </v-col>
      </v-row>
    </v-layout>
  </div>
</template>

<script>
const imgUrl = `${process.env.VUE_APP_IMAGE_URL_PREFIX}v1587222567/covid-19`;

export default {
  data() {
    return {
      mythImages: Array.from(Array(10)).map(
        (_, i) => `${imgUrl}/myths/covid-myth${i + 1}.png`
      ),
      protectImages: Array.from(Array(4)).map(
        (_, i) => `${imgUrl}/protect/py${i + 1}.png`
      ),

      foodImages: [
        `${imgUrl}/food/pf1.png`,
        `${imgUrl}/food/pf2.png`,
        `${imgUrl}/food/pf2.png`
      ],
      safetyImages: [
        `${imgUrl}/safety/ps1.png`,
        `${imgUrl}/safety/ps2.png`,
        `${imgUrl}/safety/ps3.png`
      ],
      healthImages: Array.from(Array(5)).map(
        (_, i) => `${imgUrl}/health/ph${i + 1}.png`
      ),
      homeCareImages: [
        "01-ill-people-a4.png",
        "02-everyone-a4.png",
        "03-caregivers-a4.png",
        "04-ill-people.png",
        "05-everyone.png",
        "06-caregivers.png"
      ].map((path) => `${imgUrl}/home/${path}`)
    };
  }
};
</script>

<style lang="scss" scoped>
.row {
  width: 100%;
}
.slider {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  overflow: auto;
  scrollbar-width: 0;
  .item {
    max-width: 80vw;
    margin: 0 10px;
    &:first-child {
      margin-left: 0;
    }
    &:last-child {
      margin-right: 0;
    }
    img {
      width: 100%;
      max-height: 500px;
    }
  }
}
</style>
