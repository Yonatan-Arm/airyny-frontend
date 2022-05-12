<template>
  <hr class="hr-border" />
  <section id="map" class="map-container main-layout">
    <h2>Where you’ll be</h2>
    <p>
      {{ stay.address.street }}
      <span>{{ stay.address.street.country }}</span>
    </p>

    <GMapMap
      :center="center"
      :zoom="15"
      map-type-id="terrain"
    >
      <GMapCluster>
        <GMapMarker
          :key="index"
          v-for="(m, index) in markers"
          :position="m.position"
          @click="center = m.position"
          :icon="'https://res.cloudinary.com/yonatan-cajan22/image/upload/v1648371973/airyny/MAPS.gif'"
        />
      </GMapCluster>
    </GMapMap>
  </section>
</template>

<script>
export default {
  name: "mapDetails",
  props: {
    stay: {
      type: Object,
    },
  },
  data() {
    return {
      center: {
        lat: this.stay.address.location.lan,
        lng: this.stay.address.location.lat,
      },
      markers: [
        {
          position: {
            lat: this.stay.address.location.lan,
            lng: this.stay.address.location.lat,
          },
          icon: {},
        },
      ],
    };
  },
  created() {
    this.icon = {
      fillColor: "#FF0000",
      fillOpacity: 0.8,
      strokeWeight: 0,

      scale: 1,
    };
  },
  methods: {},
};
</script>

<style></style>
