<template>
  <button class="button signOutBtn has-background-grey-light" @click="signOut">Sign Out</button>
</template>

<script>
import { Auth } from "aws-amplify";

export default {
  methods: {
    async signOut() {
      try {
        await Auth.signOut();
      } catch (error) {
        console.log("error signing out: ", error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>