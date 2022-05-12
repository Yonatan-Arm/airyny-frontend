<template>
  <div @click="readMore">
    description: {{ getTextForDisplay }}
    <p class="read-more-paragraph">
      <span v-if="!isReadingMore" class="read-more">
        Show more <span class="arrow">></span></span
      >
      <span v-if="isReadingMore" class="read-more">
        Show less</span
      >
    </p>
  </div>
</template>
<script>
export default {
  props: {
    review: {
      type: Object,
    },
  },
  data() {
    return {
      isReadingMore: false,
    };
  },
  methods: {
    readMore() {
      this.isReadingMore = !this.isReadingMore;
    },
  },
  computed: {
    getTextForDisplay() {
      if (this.isReadingMore) return this.review.txt;
      else
        return (
          this.review.txt.slice(0, 150) +
          (this.review.txt.length > 50 ? "..." : "")
        );
    },
  },
};
</script>
