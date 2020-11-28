<template>
  <section class="hero is-info welcome is-small">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">{{currentCourse.courseName}}</h1>
        <h2 class="subtitle">Welcome! I hope you are having a great day!</h2>
      </div>
    </div>
  </section>
  <section class="info-tiles">
    <div class="tile is-ancestor has-text-centered">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <p class="title">439k</p>
          <p class="subtitle">Users</p>
        </article>
      </div>
      <div class="tile is-parent">
        <article class="tile is-child box">
          <p class="title">59k</p>
          <p class="subtitle">Products</p>
        </article>
      </div>
      <div class="tile is-parent">
        <article class="tile is-child box">
          <p class="title">3.4k</p>
          <p class="subtitle">Open Orders</p>
        </article>
      </div>
      <div class="tile is-parent">
        <article class="tile is-child box">
          <p class="title">19</p>
          <p class="subtitle">Exceptions</p>
        </article>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      courseID: "",
      currentCourse: {},
    };
  },
  computed: {
    ...mapActions("courses", ["filterCoursesByID"]),
  },
  mounted() {
    this.courseID = this.$route.params.id
    this.currentCourse = this.filterCoursesByID(this.courseID);
  },
};
</script>

<style lang="scss" scoped>
</style>