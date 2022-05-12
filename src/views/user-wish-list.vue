<template>
  <app-header class="header-details" />
  <section class="main-layout2 wish-list">
    <h1>Wish list</h1>

    <stay-list
      :stays="stays"
      v-if="stays"
      @stayLiked="setLiked"
    >
    </stay-list>
  </section>
</template>
<script>
import stayList from "../components/stay-list.vue";
import appHeader from "../components/app-header.vue";
import { Share } from "@element-plus/icons-vue";

export default {
  data() {
    return {
      likedStays: [],
      user: "",
      stays: [],
    };
  },
  async created() {
    this.user = this.$store.getters.user;
    this.stays = await this.$store.dispatch({
      type: "loadStaysLikedUser",
      likedStays: this.user.likedStays,
    });
  },
  methods: {
    setLiked(stay) {
      this.$store.dispatch({
        type: "setLikedStay",
        stayId: JSON.parse(JSON.stringify(stay)),
      });
    },
  },

  computed: {},
  components: {
    stayList,
    appHeader,
  },
};
</script>

<style>
.item {
  margin-top: 10px;
  margin-right: 40px;
}
</style>
