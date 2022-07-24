<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#">NavBar</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item to="/">Home</b-nav-item>
          <b-nav-item to="/login">Login</b-nav-item>
          <b-nav-item to="/register">Register</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <transition mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("user", ["user", "userLogged"]),
  },
  methods: {
    logout() {
      Cookie.deleteToken();

      store.commit("user/UPDATE_USERLOGGED", false);

      this.$router.push({ name: "login" });
    },
  },
};
</script>

<style></style>
