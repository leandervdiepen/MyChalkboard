<template>
  <div class="hero app" id="app">
    <Navbar></Navbar>
    <router-view />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Navbar from "@/components/Navbar.vue";
import { Auth, Hub } from "aws-amplify";
export default {
  components: {
    Navbar,
  },
  computed: {
    ...mapState({
      user: (state) => state.user,
    }),
  },
  methods: {
    ...mapActions(["userLoggedIn"]),
  },
  mounted() {
    Hub.listen("auth", ({ payload: { event, data } }) => {
      switch (event) {
        case "signIn":
          this.userLoggedIn(data);
          break;
        case "signOut":
          this.userLoggedIn(null);
          break;
      }
    });

    Auth.currentAuthenticatedUser()
      .then((user) => (this.user = user))
      .catch(() => console.log("Not signed in"));
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
