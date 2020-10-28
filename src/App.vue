<template>
  <div class="hero app" id="app">
    <Navbar></Navbar>
    <router-view />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import { Auth, Hub } from "aws-amplify";
export default {
  components: {
    Navbar,
  },
  data() {
    return {
      user: null,
    };
  },
  mounted() {
    Hub.listen("auth", ({ payload: { event, data } }) => {
      switch (event) {
        case "signIn":
          this.user = data;
          break;
        case "signOut":
          this.user = null;
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
