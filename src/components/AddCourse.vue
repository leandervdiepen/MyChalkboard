<template>
  <div class="addCourse mx-3 my-3">
    <div class="modal" id="modal" :class="{ 'is-active': showCard }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Add a course</p>
          <button
            class="delete"
            aria-label="close"
            @click="toggleModalCard"
          ></button>
        </header>
        <section class="modal-card-body">
          <div class="field">
            <label class="label">Course Name</label>
            <div class="control">
              <input
                class="input"
                type="text"
                placeholder="Name Of The Course"
                v-model="courseName"
              />
            </div>
          </div>
          <div class="field">
            <div class="control">
              <label class="label">Type Of Course</label>
              <label class="radio">
                <input
                  type="radio"
                  name="courseType"
                  value="Presence"
                  v-model="courseType"
                />
                Presence
              </label>
              <label class="radio">
                <input
                  type="radio"
                  name="courseType"
                  value="Online"
                  v-model="courseType"
                />
                Online
              </label>
              <label class="radio">
                <input
                  type="radio"
                  name="courseType"
                  value="Hybrid"
                  v-model="courseType"
                />
                Hybrid
              </label>
            </div>
            <!-- <div class="control" v-if="isPresence">
              Add Options for more Information on presence lessons 
            </div>
            <div class="control" v-if="isOnline">
               Add Options for more Information on online lessons
            </div>
            <div class="control" v-if="isHybrid">
               Add Options for more Information on hybrid lessons
            </div> -->
          </div>
          <div class="field">
            <div class="control">
              <label class="label">Literature</label>
              <div class="columns" v-for="book in books" :key="book.id">
                <span class="icon mt-6 removeBook" @click="removeBook(book.id)">
                  <i class="fas fa-minus-circle"></i>
                </span>
                <div class="column is-4">
                  <label class="label">Book title</label>
                  <input
                    class="input"
                    type="text"
                    name="bookTitle"
                    v-model="books[book.id].bookTitle"
                  />
                </div>
                <div class="column is-3">
                  <label class="label">Author</label>
                  <input
                    class="input"
                    type="text"
                    name="author"
                    v-model="books[book.id].author"
                  />
                </div>
                <div class="column is-4">
                  <label class="label">Ressource Links</label>
                  <input
                    class="input"
                    type="text"
                    name="onlineResrc"
                    v-model="rsrcLink[book.id]"
                    placeholder="Seperate with comma"
                  />
                </div>
              </div>
              <button class="button is-pulled-right mb-2" @click="addABook">
                <span class="icon">
                  <i class="fas fa-plus"></i>
                </span>
                Add Literature
                <span class="icon ml-1">
                  <i class="fas fa-book"></i>
                </span>
              </button>
            </div>
          </div>
          <div class="field">
            <div class="control">
              <textarea
                class="textarea"
                placeholder="Add some important information/notes"
                rows="4"
                v-model="notes"
              ></textarea>
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" @click="makeRequest">
            Add To Courses
          </button>
        </footer>
      </div>
    </div>
    <button class="circle button" @click="toggleModalCard">
      <span class="icon">
        <i class="fas fa-plus"></i>
      </span>
    </button>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import BulmaNotification from "../assets/notifications/bulma-notifications";
export default {
  props: ["isEdit"],
  data() {
    return {
      rsrcLink: [],
      courseName: "",
      showCard: false,
      numberOfBooks: 0,
      books: [],
      notes: "",
    };
  },
  computed: {
    ...mapState("courses", {
      newCourse: (state) => state.newCourse,
    }),
    courseType: {
      get() {
        return this.newCourse.type;
      },
      set(val) {
        this.$store.commit("courses/setCourseType", val);
      },
    },
  },
  methods: {
    ...mapActions("courses", ["createCourse"]),
    ...mapMutations("courses", [
      "setCourseName",
      "changeCourseType",
      "addBooks",
      "setNotes",
    ]),
    toggleModalCard() {
      this.showCard = !this.showCard;
    },
    updateCourseName() {
      this.changeCourseName(this.courseName);
    },
    // Called when you click 'Add Literature' Button
    addABook() {
      this.books.push({
        id: this.numberOfBooks,
        bookTitle: "",
        author: "",
        rsrcLinks: [],
      });
      this.numberOfBooks++;
    },
    removeBook(bookID) {
      console.log(this.books)
      this.books = this.books.filter(book => book.id != bookID)
      console.log(this.books)
    },
    parseRsrcLinks() {
      for (let i = 0; i < this.books.length; i++) {
        console.log(this.rsrcLink[i]);
        this.books[i].rsrcLinks = this.rsrcLink[i].split(",");
      }
    },
    makeRequest() {
      this.parseRsrcLinks();
      this.addBooks(this.books);
      this.setCourseName(this.courseName);
      this.setNotes(this.notes);

      this.createCourse()
        .then((res) => {
          var element = document.getElementById("modal");
          element.classList.remove("is-active");
          this.successPut(res);
        })
        .catch((err) => {
          var element = document.getElementById("modal");
          element.classList.remove("is-active");
          if (err.error != undefined) {
            this.errorPut(err);
          } else {
            this.successPut(this.newCourse);
          }
        });
    },
    successPut(res) {
      let notif = new BulmaNotification();
      notif.show(
        "Success!",
        `Added: ${res.courseID}. Now reloading...`,
        "info",
        "2500"
      );
      // setTimeout(() => {
      //   location.reload();
      // }, 2750);
    },
    errorPut(err) {
      let notif = new BulmaNotification();
      notif.show(
        "Message!",
        `Error at ${err.url} with ${err.error}`,
        "danger",
        "2500"
      );
      // setTimeout(() => {
      //   location.reload();
      // }, 2750);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/notifications/style.css";

.circle {
  height: 50px;
  width: 50px;
  border-radius: 50%;
  background-color: rgb(245, 245, 245);
  box-shadow: 5px 5px 55px silver inset;
}
.removeBook:hover {
  border: 1px solid black;
}
.modal-card-body {
  max-height: 60vh;
  overflow: auto;
}
</style>