<template  >
<section class=" stay-description">
  <h1>{{stay.name}} - description</h1>
  {{stay.summary}}
</section>
</template>

<script>


export default {
    name: "stayAdditinalInfo",
      props: {
    stay: {
      type: Object,
    },
  },
  data() {
    return {
     };
  },
  computed: {},
}
</script>

<style></style>
