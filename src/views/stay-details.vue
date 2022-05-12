<template>
  <section class="upper-section-header-details main-header fix">
    <app-header
      class="header-details details-layout"
      @openModalLogin="openModalLogin"
    />
  </section>
  <section v-if="stay" class="details-layout">
    <imgs-comp :stay="stay"></imgs-comp>
    <main class="flex main-details-comp space-between">
      <section class="flex-col">
        <initial-info :stay="stay"></initial-info>
        <main-amenities :stay="stay"></main-amenities>
        <stay-description :stay="stay"></stay-description>
        <amenities :stay="stay"></amenities>
      </section>

      <section class="checkout-area">
        <checkout
          :stay="stay"
          @setOrder="setOrder"
        ></checkout>
      </section>
    </main>
    <reviews :stay="stay"></reviews>
    <details-map :stay="stay"></details-map>
    <host :stay="stay"></host>
    <login-modal
      v-if="modalLoginIsOpen"
      @login="setLogin"
      @closeLoginModal="closeLoginModal"
    />
  </section>
      <section v-else>
      <img class="loading-img" src="../assets/loader.gif" />
    </section>
</template>

<script>
import appHeader from "../components/app-header.vue";
import { stayService } from "../services/stay-service.js";
import { orderService } from "../services/order-service.js";
import { userService } from "../services/user-service.js";
import ImgsComp from "../components/stay-details.cmp/imgs-comp.vue";
import initialInfo from "../components/stay-details.cmp/initial-info.vue";
import mainAmenities from "../components/stay-details.cmp/main-amenities.vue";
import stayDescription from "../components/stay-details.cmp/stay-description.vue";
import amenities from "../components/stay-details.cmp/amenities.vue";
import checkout from "../components/stay-details.cmp/checkout.vue";
import reviews from "../components/stay-details.cmp/reviews.vue";
import detailsMap from "../components/stay-details.cmp/details-map.vue";
import host from "../components/stay-details.cmp/host.vue";
import loginModal from "../components/login-modal.vue";
import { socketService } from "../services/socket.service.js";
import { ElNotification } from "element-plus";

export default {
  data() {
    return {
      stay: null,
      modalLoginIsOpen: false,
      userOrder: false,
      fullDetailsOrder: false,
      orderStatus: false,
      msg: "",
    };
  },

  async created() {
    const id = this.$route.params.id;
    const stay = await stayService.getById(id);
    this.stay = stay;
    socketService.emit("host topic", stay.host.id);
    socketService.on(
      "order-status-change",
      this.changeOrderStatus
    );
  },
  components: {
    appHeader,
    ImgsComp,
    initialInfo,
    stayDescription,
    mainAmenities,
    amenities,
    reviews,
    host,
    checkout,
    detailsMap,
    loginModal,
  },
  computed: {},
  methods: {
    openModalLogin() {
      this.modalLoginIsOpen = true;
    },
    closeLoginModal() {
      this.modalLoginIsOpen = false;
    },
    setLogin(user) {
      userService.login(user);
      this.modalLoginIsOpen = false;
    },
    changeOrderStatus(msg) {
      this.msg = msg;

      ElNotification({
        title: " We wish you an enjoyable experience",
        message:
          "Your booking has been confirmed by your host",
        position: "top-left",
      });

    },
    async setOrder(filterBy) {
      console.log(filterBy);
      const order = orderService.getEmptyOrder();
      order.name = this.stay.name;
      order.country = this.stay.address.country;
      order.stay_id = this.stay.id;
      order.hostId = this.stay.host.id;
      order.pricePerNight = this.stay.price;
      order.guests = filterBy.guests;
      order.stayTime = filterBy.stayTime;
      const totalPrice = await orderService.getTotalPrice(
        order
      );
      order.total = totalPrice;
      const orderToSave = JSON.parse(JSON.stringify(order));
      if (!order.stayTime) {

        ElNotification({
          title: "Missing information",
          message: "Please fill in the required details",
          type: "warning",
        });
        return;
      }

      try {
        const newOrder = await this.$store.dispatch({
          type: "addNewOrder",
          orderToSave,
        });

        ElNotification({
          title: "Success",
          message:
            "Your booking request has been sent to the host",
          type: "success",
        });

        socketService.emit("addOrder", orderToSave);
      } catch {
        console.error;
      }
    },
  },

  unmounted() {
    socketService.off("order-status-change", this.changeOrderStatus)
  },
};
</script>

<style>
</style>
