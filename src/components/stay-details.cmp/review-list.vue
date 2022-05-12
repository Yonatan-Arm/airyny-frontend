<template>
  <section class="reviews flex">
    <div
      class="review"
      v-for="review in stay.reviews"
      :key="review"
    >
      <review-preview :review="review"></review-preview>
    </div>
  </section>
</template>

<script>
import reviewPreview from "./review-preview.vue";
export default {
  name: "reviews",
  props: {
    stay: {
      type: Object,
    },
  },
  createad() {},
  data() {
    return {};
  },
  components: {
    reviewPreview,
  },
  computed: {},
};
</script>

<style></style>
