<template>
  <div class="hero">
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <router-link to="/">
          <h3 class="has-text-black mt-1 ml-3 mr-6 has-text-bold is-size-3">
            MyCBoard
          </h3>
        </router-link>
      </div>
      <div class="navbar-menu">
        <div class="navbar-start">
          <div class="navbar-item">
            <button
              class="button"
              :class="{ selected: isSelected == 1 }"
              @click="changeSelected(1)"
            >
              Kurse
            </button>
          </div>
          <div class="navbar-item">
            <button
              class="button navbar-item"
              :class="{ selected: isSelected == 2 }"
              @click="changeSelected(2)"
            >
              ToDo's
            </button>
          </div>
          <div class="navbar-item">
            <button
              class="button navbar-item"
              :class="{ selected: isSelected == 3 }"
              @click="changeSelected(3)"
            >
              Kalender
            </button>
          </div>
        </div>
      </div>
      <div class="navbar-end">
        <div class="navbar-item">
          <SignInBtn v-if="user == null"></SignInBtn>
          <SignOutBtn v-else></SignOutBtn>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import SignInBtn from "./SignInBtn";
import SignOutBtn from "./SignOutBtn";
export default {
  components: {
    SignInBtn,
    SignOutBtn,
  },
  computed: {
    ...mapState({
      user: (state) => state.user,
      isSelected: (state) => state.isSelected,
    }),
  },
  methods: {
    ...mapActions(["changeSelected"]),
  },
};
</script>

<style lang="scss" scoped>
.selected {
  background-color: #c5f3ff;
}
.navbar {
  z-index: 1;
}
</style>