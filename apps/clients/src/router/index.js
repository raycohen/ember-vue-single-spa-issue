import Vue from "vue";
import VueRouter from "vue-router";
import ClientList from "../components/ClientList.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/clients",
    name: "clients",
    component: ClientList
  },

  {
    path: "/dashboard/clients",
    name: "clients",
    component: ClientList
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
