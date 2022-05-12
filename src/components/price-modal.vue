<template>
  <div class="price-modal">
    <div class="flex-col higer-modal-section">
      <span class="type-header">
        The average nightly price is 100$
      </span>
      <div class="flex-col range space-between">
        <div class="price-container">
          <HistogramSlider
            v-model="filterByPrice"
            @change="setFilterPrice"
            :width="356"
            :bar-height="64"
            :data="pricesToShow"
            :drag-interval="true"
            :force-edges="false"
            :min="30"
            :max="150"
            primaryColor="#b0b0b0"
            barRadius="6"
          />
        </div>
        <div class="flex-row prices space-between">
          <div class="input-price">
            <div class="label">min price</div>
            <div class="price-change">
              <div class="dollar">$</div>
              <input
                type="text"
                v-model="filterByPrice.minPrice"
              />
            </div>
          </div>
          <h3 class="sep-min-max">–</h3>
          <div class="input-price">
            <div class="label">max price</div>
            <div class="price-change">
              <div class="dollar">$</div>
              <input
                type="text"
                v-model="filterByPrice.maxPrice"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="lower-modal-section flex space-between">
      <button class="clear-btn" @click="setSort('clear')">
        Clear
      </button>
      <button class="save-btn" @click="setSort('save')">
        Save
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    stays: {
      type: Array,
    },
  },
  data() {
    return {
      filterBy: null,

      filterByPrice: {
        maxPrice: 150,
        minPrice: 30,
      },
    };
  },
  methods: {
    setFilterPrice(ev) {
      this.filterByPrice.minPrice = ev.from;
      this.filterByPrice.maxPrice = ev.to;
    },
    setSort(type) {
      if (type === "clear") {
        this.filterByPrice = {
          maxPrice: 350,
          minPrice: 30,
        };
      }
      this.$emit(
        "filterByPrice",
        JSON.parse(JSON.stringify(this.filterByPrice))
      );
    },
  },
  computed: {
    pricesToShow() {
      var prices = [];
      prices = this.stays.map((stay) => stay.price);
      return prices;
    },
    minPrice() {
      return Math.min(this.pricesToShow);
    },
    maxPrice() {
      return Math.max(this.pricesToShow);
    },
  },
};
</script>
<style></style>
