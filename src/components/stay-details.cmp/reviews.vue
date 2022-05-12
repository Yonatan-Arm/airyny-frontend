<template>
  <section id="reviews" v-if="stay" class="stay-details-reviews">
      <div class="flex">
            <svg class="star"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="presentation"
            focusable="false"
            style="display: block; height: 16px; width: 16px; fill: #ff385c; align-self: baseline;"
          >
            <path
              d="M15.094 1.579l-4.124 8.885-9.86 1.27a1 1 0 0 0-.542 1.736l7.293 6.565-1.965
           9.852a1 1 0 0 0 1.483 1.061L16 25.951l8.625 4.997a1 1 0 0 0 1.482-1.06l-1.965-9.853
            7.293-6.565a1 1 0 0 0-.541-1.735l-9.86-1.271-4.127-8.885a1 1 0 0 0-1.814 0z"
              fill-rule="evenodd"
            ></path>
          </svg>
        <div class="rating">{{ getRating.toFixed(1) }}</div> ·
        <button class="review-btn">
          <span> {{ stay.numOfReviews }}</span>
          reviews
        </button>

        </div>
        <div class="reviews-categories flex" >
        <div class="categories flex space-between" v-for="(value,name,index) in stay.reviewScores" :key="value"  >
          <div class="main-div flex"  v-if="index != Object.keys(stay.reviewScores).length-1">
          <div >{{name}}</div>

          <div class="visual flex">
          <div class="grey-line"><span class="black-line" :style="{width:(value *10)+'%'}"></span></div>
           <span v-if="value !== stay.reviewScores.length - 1" class="rate">{{(value/2).toFixed(1)}} </span>
        </div>
       </div>
        </div>
        </div>
        <review-list :stay="stay"></review-list>
        </section>
</template>
// :width="`${value}/2/5`"
<script>
import reviewList from "../stay-details.cmp/review-list.vue"
export default {
  name: "reviews",
  props: {
    stay: {
      type: Object,
    },
  },
  createad() {
  },
  data() {
    return {};
  },
  components:{
      reviewList
  },

  computed: {
    getRating() {
      return this.stay.reviewScores.rating / 10/2;
    },

  },
};
</script>

<style></style>
