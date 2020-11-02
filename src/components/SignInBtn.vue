<template>
  <button class="button signInBtn" @click="signInWithGoogle">
    <span class="icon mr-4 has-background-green"
      ><i class="fab fa-google"></i></span
    >Sign In with Google
  </button>
</template>

<script>
import { Auth } from "aws-amplify";
export default {
  methods: {
    signInWithGoogle() {
      Auth.federatedSignIn({ provider: "Google" });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
}
.icon {
  background-color: hsl(141, 53%, 53%);
}
.button:hover {
  background-color: hsl(141, 53%, 53%);
}
</style>