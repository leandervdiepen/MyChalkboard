<template>
  <div class="container">
    <button
      class="button signInBtn"
      @click="signInWithGoogle"
    >
    <span class="icon mr-4"><i class="fab fa-google"></i></span>Sign In with Google
    </button>
  </div>
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
.signInBtn {
  transform: scale(2, 2);
  margin-top: 150px;
}
</style>