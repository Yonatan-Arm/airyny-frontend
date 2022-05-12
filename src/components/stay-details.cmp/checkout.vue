<template>
  <section
    v-if="filterBy"
    class="checkout"
    :class="checkoutPos"
    v-close="closeModal"
  >
    <section :style="getFlexRow" class="checkout-section">
      <div class="flex-col lower-checkout-section">
        <div class="checkout-title flex space-between" :style="getFlexColumn">
          <div class="checkout-title-left">
            <h1 class="title">
              <span class="price">${{ stay.price }}</span>
              <span class="night"> / night</span>
            </h1>
          </div>
          <div class="checkout-title-right flex">
            <div class="flex card-rate" :style="getZeroMargin">
              <svg
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="presentation"
                focusable="false"
                style="display: block; height: 14px; width: 14px; fill: #ff385c"
              >
                <path
                  d="M15.094 1.579l-4.124 8.885-9.86 1.27a1 1 0 0 0-.542 1.736l7.293 6.565-1.965
           9.852a1 1 0 0 0 1.483 1.061L16 25.951l8.625 4.997a1 1 0 0 0 1.482-1.06l-1.965-9.853
            7.293-6.565a1 1 0 0 0-.541-1.735l-9.86-1.271-4.127-8.885a1 1 0 0 0-1.814 0z"
                  fill-rule="evenodd"
                ></path>
              </svg>
            </div>
            <span class="rating">{{ getRating.toFixed(1) }}</span>
            <span class="period">·</span>
            <button class="review-btn">
              <span> {{ stay.numOfReviews }}</span>
              reviews
            </button>
          </div>
        </div>

        <div class="date-input-container">
          <div class="check-container">
            <span class="check-in">CHECK-IN</span>
            <span class="check-out">CHECKOUT</span>
          </div>

          <el-date-picker
            class="date-input-checkout"
            v-model="this.filterBy.stayTime"
            type="daterange"
            range-separator=""
            start-placeholder="Add date"
            end-placeholder="Add date"
            text="12"
          >
          </el-date-picker>
        </div>

        <div class="guests-input flex" @click="openModal">
          <div class="flex-col">
            <label class="guests-label"> Guests </label>
            <span class="guests"> {{ getGuests }}</span>
          </div>
          <div class="guest-arrow">
            <svg
              :class="guestModal ? 'rotate' : ''"
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="presentation"
              focusable="false"
              style="
                display: block;
                fill: none;
                height: 12px;
                width: 12px;
                stroke: currentcolor;
                stroke-width: 5.33333;
                overflow: visible;
                margin-left: 9.5px;
              "
            >
              <g fill="none">
                <path
                  d="m28 12-11.2928932 11.2928932c-.3905243.3905243-1.0236893.3905243-1.4142136 0l-11.2928932-11.2928932"
                ></path>
              </g>
            </svg>
          </div>
        </div>

        <div v-if="guestModal" class="checkout-guests-modal modal flex-col">
          <div>
            <ul>
              <li class="flex space-between align-center">
                <span class="flex-col"
                  >Adults
                  <span class="guide-age">Ages 13 or above </span>
                </span>
                <span>
                  <button class="guests-btn" @click="incAdults(-1)">-</button>
                  {{ filterBy.guests.adults }}
                  <button class="guests-btn" @click="incAdults(1)">+</button>
                </span>
              </li>
              <li class="flex space-between align-center">
                <span class="flex-col category">
                  Children
                  <span class="guide-age"> Ages 2-12 </span>
                </span>
                <span>
                  <button class="guests-btn" guests-btn @click="incKids(-1)">-</button>
                  {{ filterBy.guests.kids }}
                  <button class="guests-btn" guests-btn @click="incKids(1)">+</button>
                </span>
              </li>
              <li class="flex space-between align-center">
                <span class="flex-col">
                  Infants
                  <span class="guide-age">Under 2 </span>
                </span>
                <span>
                  <button class="guests-btn" @click="incInfants(-1)">-</button>
                  {{ filterBy.guests.Infants }}
                  <button class="guests-btn" @click="incInfants(1)">+</button>
                </span>
              </li>
            </ul>
          </div>

          <div class="flex close-btn-div">
            <button @click="openModal" class="close-btn">Close</button>
          </div>
        </div>
        <button
          ref="myRef"
          :class="guestModal? 'hide':'reserve-btn'"
          @click="setOrder"
          @mousemove="calcMouse"
          :style="mousePos"
        >
          {{ getReserveButton }}
        </button>
        <div class="pricing" v-if="fullDetailsOrder">
          <p>You won't be charged yet</p>
          <p class="flex space-between">
            <span>Price</span><span>${{ getPrice }} </span>
          </p>
          <p class="flex space-between">
            <span>Service fee</span> <span>$25</span>
          </p>
          <p class="flex space-between">
            <span>Total</span><span>${{ getPrice + 25 }}</span>
          </p>
        </div>
      </div>
      <div class="nav-bar-section">
        <nav class="checkout-nav">
          <ul class="nav-list">
            <a class="link" @click="scrollMeTo('gallery')">Photos</a>
            <a class="link" @click="scrollMeTo('amentiy-section')">Amenities</a>
            <a class="link" @click="scrollMeTo('reviews')">Reviews</a>
            <a class="link" @click="scrollMeTo('map')">Location</a>
          </ul>
        </nav>
      </div>
    </section>
  </section>
</template>
<script>
export default {
  name: "checkout",
  props: {
    stay: {
      type: Object,
    },
  },
  data() {
    return {
      guestModal: false,
      pos: "",
      x: 0,
      y: 0,
      filterBy: null,
      fullDetailsOrder: false,
    };
  },
  async created() {
    window.addEventListener("scroll", this.handleScroll);
    this.filterBy = await JSON.parse(JSON.stringify(this.$store.getters.filterBy));
    if(this.filterBy.stayTime) this.filterBy.stayTime = this.filterBy.stayTime.map(time => new Date(time))
    this.getElInputClass();
    window.addEventListener(
      "click",
      function (event) {
        // If user either clicks X button OR clicks outside the modal window, then close modal by calling closeModal()
        if (
          event.target.matches(".button-close-modal") ||
          !event.target.closest(".modal")
        ) {
          this.closeModal;
        }
      },
      false
    );
  },
  unmounted() {
    window.removeEventListener("scroll", this.handleScroll);
    this.filterBy = null;
  },

  computed: {
    checkin() {
      return `checkout hello`;
    },
    getRating() {
      return this.stay.reviewScores.rating / 10 / 2;
    },
    getPrice() {
      const days = Math.abs(
        this.filterBy.stayTime[1] - this.filterBy.stayTime[0]
      );
      const diffDays = Math.ceil(days / (1000 * 60 * 60 * 24));
      return diffDays * this.stay.price;
    },
    getReserveButton() {
      return this.fullDetailsOrder ? "Reserve" : "  Check availability";
    },
    mousePos() {
      return {
        "background-position": `calc((100 - (${this.x}))*1%) calc((100 - (${this.y}))*1%)`,
      };
    },

    checkoutPos() {
      if (this.pos === "a") {
        return "static";
      } else if (this.pos === "b") {
        return "fixed";
      } else if (this.pos === "d") {
        return "fixed-top";
      }
    },

    getFlexRow() {
      if (this.pos === "d") {
        return "display:flex;align-items: center;";
      }
    },
    getFlexColumn() {
      if (this.pos === "d") {
        return "flex-direction: column;margin-right: 16px;";
      }
    },
    getZeroMargin() {
      if (this.pos === "d") {
        return "margin-left: 0rem;";
      }
    },
    getGuests() {
      if (
        (this.filterBy.guests.adults === 0 || !this.filterBy.guests.adults) &&
        this.filterBy.guests.kids === 0 &&
        this.filterBy.guests.Infants === 0
      ) {
        return `Add guests`;
      } else {
        const count =
          this.filterBy.guests.adults +
          this.filterBy.guests.kids +
          this.filterBy.guests.Infants;
        this.fullDetailsOrder = true;
        return `${count} guests`;
      }
    },
  },
  methods: {
    closeModal() {
      return (document.querySelector(".modal").style.display = 'none');
    },
    getElInputClass() {
      const elInput = document.querySelectorAll(".el-range-input");
    },
    handleScroll(event) {
      if (window.top.scrollY < 555) {
        this.pos = "a";
      } else if (window.top.scrollY < 1380) {
        this.pos = "b";
      } else {
        this.pos = "d";
      }
    },

    scrollMeTo(id) {
      var element = document.getElementById(id);
      var top = element.offsetTop;

      window.scrollTo(0, top);
    },

    openModal() {
      this.guestModal = !this.guestModal;
    },

    calcMouse(e) {
      const div = this.$refs.myRef;
      this.x = e.clientX - div.offsetLeft;
      this.y = e.pageY - div.offsetTop;
    },
    incAdults(val) {
      this.filterBy.guests.adults = this.filterBy.guests.adults + val;
      if (this.filterBy.guests.adults === -1) this.filterBy.guests.adults = 0;
    },
    incKids(val) {
      this.filterBy.guests.kids = this.filterBy.guests.kids + val;
      if (this.filterBy.guests.kids === -1) this.filterBy.guests.kids = 0;
    },
    incInfants(val) {
      this.filterBy.guests.Infants = this.filterBy.guests.Infants + val;
      if (this.filterBy.guests.Infants === -1) this.filterBy.guests.Infants = 0;
    },
    setOrder() {
      // console.log('check', this.filterBy);
      this.$emit("setOrder", this.filterBy);
    },
  },
};
</script>
<style>
</style>
