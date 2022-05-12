<template>
  <section
    class="main-header"
    :class="[
      this.stickyNav ? 'fix' : 'fullHeader',
      this.mobileFilter ? '' : 'header-mobile-filter',
    ]"
  >
    <div class="flex space-between header-features">
      <div class="logo-container">
        <router-link to="/"
          ><img class="logo flex align-center" :src="getLogo"
        /></router-link>
      </div>
      <div class="mini-filter-container">
        <button
          class="mini-filter flex space-between align-center clickable"
          :class="this.openfilter ? 'hide' : 'fixed'"
          @click="toggle"
        >
          <span> {{ getFilter }}</span>

          <div class="search-btn">
            <button @click="setFilter">
              <svg
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
                style="
                  display: block;
                  fill: none;
                  height: 12px;
                  width: 12px;
                  stroke: white;
                  stroke-width: 5;
                  overflow: visible;
                "
                aria-hidden="true"
                role="presentation"
                focusable="false"
              >
                <g fill="none">
                  <path
                    d="m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 
          0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 9 9"
                  ></path>
                </g>
              </svg>
            </button>
          </div>
        </button>
      </div>
      <div
        class="flex align-center menu-btns"
        :class="this.stickyNav ? 'header-fix' : ''"
      >
        <router-link to="/stay" class="explore-details-header"
          >Explore
        </router-link>
        <router-link to="/">Become a host</router-link>
        <button class="world-btn">
          <svg
            class="world-svg"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="presentation"
            focusable="false"
            style="display: block; height: 16px; width: 16px"
          >
            <path
              d="m8.002.25a7.77 7.77 0 0 1 7.748 7.776 7.75 7.75 0 0 1 -7.521 7.72l-.246.004a7.75 7.75 0 0 1 -7.73-7.513l-.003-.245a7.75 7.75 0 0 1 7.752-7.742zm1.949 8.5h-3.903c.155 2.897 1.176 5.343 1.886 5.493l.068.007c.68-.002 1.72-2.365 1.932-5.23zm4.255 0h-2.752c-.091 1.96-.53 3.783-1.188 5.076a6.257 6.257 0 0 0 3.905-4.829zm-9.661 0h-2.75a6.257 6.257 0 0 0 3.934 5.075c-.615-1.208-1.036-2.875-1.162-4.686l-.022-.39zm1.188-6.576-.115.046a6.257 6.257 0 0 0 -3.823 5.03h2.75c.085-1.83.471-3.54 1.059-4.81zm2.262-.424c-.702.002-1.784 2.512-1.947 5.5h3.904c-.156-2.903-1.178-5.343-1.892-5.494l-.065-.007zm2.28.432.023.05c.643 1.288 1.069 3.084 1.157 5.018h2.748a6.275 6.275 0 0 0 -3.929-5.068z"
            ></path>
          </svg>
        </button>

        <label
          @click="toggleModalUser"
          class="relative"
          v-close="closeModalUser"
        >
          <button class="profile-btn flex">
            <svg
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="presentation"
              focusable="false"
              style="
                display: block;
                fill: none;
                height: 16px;
                width: 16px;
                stroke: currentcolor;
                stroke-width: 3;
                overflow: visible;
              "
            >
              <g fill="none" fill-rule="nonzero">
                <path d="m2 16h28"></path>
                <path d="m2 24h28"></path>
                <path d="m2 8h28"></path>
              </g>
            </svg>
            <svg
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="presentation"
              focusable="false"
              style="
                display: block;
                height: 30px;
                width: 30px;
                fill: #717171;
                margin-left: 12px;
              "
            >
              <path
                d="m16 .7c-8.437 0-15.3 6.863-15.3 15.3s6.863 15.3 15.3 15.3 15.3-6.863 15.3-15.3-6.863-15.3-15.3-15.3zm0 28c-4.021 0-7.605-1.884-9.933-4.81a12.425 12.425 0 0 1 6.451-4.4 6.507 6.507 0 0 1 -3.018-5.49c0-3.584 2.916-6.5 6.5-6.5s6.5 2.916 6.5 6.5a6.513 6.513 0 0 1 -3.019 5.491 12.42 12.42 0 0 1 6.452 4.4c-2.328 2.925-5.912 4.809-9.933 4.809z"
              ></path>
            </svg>
          </button>
        </label>
        <user-details-modal
          v-close="closeModalUser"
          v-if="modalUser"
          @openModalLogin="openModalLogin"
          @closeLoginModal="closeLoginModal"
          @closeModalDetails="closeModalUser"
        />
      </div>
    </div>

    <stay-filter :class="openfilter ? '' : 'hide'" @filterd="setMiniFilter" />
  </section>
  <section
    class="flex-col"
    :class="[
      this.mobileFilter ? 'filter-mobile' : 'none',
      this.stickyNav ? 'fix' : '',
    ]"
  >
    <div class="back-homepage flex">
      <label>
        <button @click="closeMobileModal">
          <svg
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Back"
            role="img"
            focusable="false"
            style="
              color: #222222;
              height: 11px;
              width: 16px;
              stroke: currentcolor;
              stroke-width: 4;
              overflow: visible;
            "
          >
            <g fill="none">
              <path
                d="m20 28-11.29289322-11.2928932c-.39052429-.3905243-.39052429-1.0236893 0-1.4142136l11.29289322-11.2928932"
              ></path>
            </g>
          </svg>
          <span class="back-to-home-span">Back • Airyny </span>
        </button>
      </label>
    </div>
    <div class="flex-row mobile-filter-container">
      <form @submit.prevent="setFilter">
        <input
          type="search"
          placeholder="Where are you going?"
          v-model="filter.country"
          list="destination"
        />
        <datalist id="destination" class="caret-hide">
          <option value="Porto"></option>
          <option value="Barcelona"></option>
          <option value="Istanbul"></option>
          <option value="New York"></option>
          <option value="Montreal"></option>
          <option value="Rio de Janeiro"></option>
        </datalist>
        <label @click="setFilter">
          <div class="search-btn">
            <button>
              <svg
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
                style="
                  display: block;
                  fill: none;
                  height: 12px;
                  width: 12px;
                  stroke: white;
                  stroke-width: 5.333333333333333;
                  overflow: visible;
                "
                aria-hidden="true"
                role="presentation"
                focusable="false"
              >
                <g fill="none">
                  <path
                    d="m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 
          0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 9 9"
                  ></path>
                </g>
              </svg>
            </button>
          </div>
        </label>
      </form>
    </div>
    <div class="info-mobile-filter">Go anywhere, anytime</div>
  </section>
</template>
<script>
import stayFilter from "./stay-filter.vue";
import userDetailsModal from "./user-deatils-modal.vue";

export default {
  name: "stay-header",
  data() {
    return {
      showNotification: false,
    };
  },
  components: {
    stayFilter,
    userDetailsModal,
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
    this.filter = this.$store.getters.filterBy;
    socketService.on("order-status-change", this.showNotification);
  },
  data() {
    return {
      stickyNav: false,
      openfilter: true,
      filter: null,
      modalUser: false,
      mobileFilter: false,
    };
  },

  methods: {
    showNotification() {
      this.isApprove = true;
    },
    handleScroll(event) {
      if (window.top.scrollY > 20) {
        this.stickyNav = true;
        this.openfilter = false;
      } else {
        this.stickyNav = false;
        this.openfilter = true;
      }
    },
    toggle() {
      this.openfilter = !this.openfilter;
      this.mobileFilter = !this.mobileFilter;
    },
    setMiniFilter(filterBy) {
      this.filter = filterBy;
    },
    openModalUser() {
      this.modalUser = true;
    },
    closeModalUser() {
      this.modalUser = false;
    },
    toggleModalUser() {
      this.modalUser = !this.modalUser;
    },
    openModalLogin() {
      this.modalUser = false;
      this.$emit("openModalLogin");
    },
    setFilter() {
      this.$store.dispatch({
        type: "setFilter",
        filterBy: JSON.parse(JSON.stringify(this.filter)),
      });
      this.mobileFilter = false;
      this.$router.push(`/stay`);
    },

    closeMobileModal() {
      this.mobileFilter = false;
    },
  },

  computed: {
    getLogo() {
      return this.stickyNav
        ? "https://res.cloudinary.com/yonatan-cajan22/image/upload/v1648055648/airyny/logo2.png"
        : "https://res.cloudinary.com/yonatan-cajan22/image/upload/v1648055648/airyny/logo1.png";
    },
    getFilter() {
      return this.filter.country ? `${this.filter.country}` : "Start to search";
    },
  },
  unmounted() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<style></style>
