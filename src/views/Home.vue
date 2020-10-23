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
      <div class="calender" v-if="isSelected == 2"></div>
      <div class="todo" v-if="isSelected == 3"></div>
    </div>
    <div class="navigation mb-6">
      <div class="columns">
        <div class="column">
          <button class="button" :class="{'selected': isSelected == 1}" @click="isSelected = 1">Kurse</button>
        </div>
        <div class="column">
          <button class="button" :class="{'selected': isSelected == 2}" @click="isSelected = 2">Kalender</button>
        </div>
        <div class="column">
          <button class="button" :class="{'selected': isSelected == 3}" @click="isSelected = 3">ToDo's</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Courses from "@/components/Courses";
import AddCourse from "@/components/AddCourse";
export default {
  name: "Home",
  components: {
    Courses,
    AddCourse
  },
  data() {
    return {
      isSelected: 1
    };
  },
  methods: {
    select(e) {
      console.log(e);
    }
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
  width: 90vw;
  height: 85vh;
  border: 1px solid black;
}
#addCourse {
  position: absolute;
  bottom: 0;
  right: 0;
}
.selected {
  background-color: #c5f3ff;
}
.navigation {
  width: 250px;
  position: fixed;
  bottom: 0;
}
</style>
