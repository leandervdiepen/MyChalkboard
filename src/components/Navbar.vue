<template>
  <div class="hero">
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="https://bulma.io">
          <img
            src="https://bulma.io/images/bulma-logo.png"
            width="112"
            height="28"
          />
        </a>
      </div>
      <div class="navbar-menu">
        <div class="navbar-start">
          <button
            class="button navbar-item"
            :class="{ selected: isSelected == 1 }"
            @click="setSelected(1)"
          >
            Kurse
          </button>
          <button
            class="button navbar-item"
            :class="{ selected: isSelected == 2 }"
            @click="setSelected(2)"
          >
            Kalender
          </button>
          <button
            class="button navbar-item"
            :class="{ selected: isSelected == 3 }"
            @click="setSelected(3)"
          >
            ToDo's
          </button>
        </div>
      </div>
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <a class="button is-primary">
              <strong>Sign up</strong>
            </a>
            <a class="button is-light"> Log in </a>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  methods: {
    methods: {
      ...mapMutations(["setSelected"]),
    },
  },
};
</script>

<style lang="scss" scoped>
.selected {
  background-color: #c5f3ff;
}
</style>