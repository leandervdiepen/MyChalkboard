<template>
  <div class="hero app" id="app">
    <Navbar></Navbar>
    <router-view />
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
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
    ...mapActions("courses", ["getUserID"]),
    ...mapMutations(["setUser"]),
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
      .then((user) => {
        this.setUser(user);
        this.$router.push("/");
      })
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
body {
  background-color: rgb(235, 255, 230);
  margin: 0;
  padding: 0;
  height: 100vh;
  /* overflow: hidden; */
}
</style>
