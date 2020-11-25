<template>
  <div class="home">
    <div class="brand"></div>
    <div class="main mt-6">
      <div class="courses" v-if="isSelected == 1">
        <Courses></Courses>
        <div id="addCourse">
          <AddCourse></AddCourse>
        </div>
      </div>
      <div class="calender" v-if="isSelected == 2">ToDo Liste</div>
      <div class="todo" v-if="isSelected == 3">Kalender</div>
      <button class="button" @click="fetchAllCoursesByUser">Call API</button>
    </div>
  </div>
</template>

<script>
import Courses from "@/components/Courses";
import AddCourse from "@/components/AddCourse";
import { mapState,mapActions, mapMutations } from "vuex";
export default {
  name: "Home",
  components: {
    Courses,
    AddCourse,
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions("courses",["fetchAllCoursesByUser", "getUserID"]),
    ...mapMutations("courses", ["makeCourseChunks"])
  },
  computed: {
    ...mapState(["isSelected"]),
  },
  mounted() {
    this.fetchAllCoursesByUser().then(() => {
      this.makeCourseChunks(2) // 4 == chunkSize
    })
  }
};
</script>

<style scoped>
.home {
  display: flex;
  justify-content: center;
}
.main {
  position: relative;
  width: 95vw;
  border: 1px solid black;
}
#addCourse {
  position: absolute;
  bottom: 0;
  right: 0;
}
.navigation {
  width: 250px;
  position: fixed;
  bottom: 0;
}
</style>
