<template>
  <router-view />
  <app-footer />
</template>

<script>
import appFooter from "./components/app-footer.vue";

export default {
  name: "app",
  components: {
    appFooter,
  },
  created() {
    this.$store.dispatch({ type: "loadStays" });
  },
};
</script>
