import Vue from "vue";
import VueRouter from "vue-router";
import TicketBooking from "../views/TicketBooking";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "TicketBooking",
    component: TicketBooking,
  },
  {
    path: "/my-ticket",
    name: "MyTicket",
    component: () =>
      import("../views/MyTicket.vue"),
  },
  {
    path: "/profile",
    name: "Profile",
    component: () =>
      import("../views/Profile.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
