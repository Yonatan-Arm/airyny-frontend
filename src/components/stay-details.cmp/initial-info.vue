<template>
  <section>
    <div class="lower-img-section flex space-between">
      <div class="initial-info">
        <h1 class="main-title">
          Entire rental unit hosted by
          <span>{{ stay.host.fullname }}</span>
        </h1>
        <div class="paragraph">
          <span>{{ stay.capacity }} guests</span> ·
          <span>{{ stay.bedrooms }} bedroom</span> ·
          <span>{{ stay.beds }} bed</span> ·
          <span>{{ stay.bathrooms }} baths</span>
        </div>
      </div>
      <div>
        <img class="host-img" :src="getHostImage" />
      </div>
    </div>
  </section>
</template>

<script>
import { utilService } from "../../services/util-service";

export default {
  name: "initial-info",
  props: {
    stay: {
      type: Object,
    },
  },
  computed: {
    getHostImage() {
      let key = utilService.getRandomInt(0, 50);
      this.stay.host.thumbnailUrl = key;
      if(this.stay.host.id === '35858044') key = 22
      return `https://i.pravatar.cc/150?img=${key}`;
    },
  },
};
</script>

<style></style>
