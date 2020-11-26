<template>
  <div class="hero">
    <div class="hero-body">
      <div
        class="columns has-text-centered"
        v-for="chunk in courseChunks"
        :key="chunk.index"
      >
        <div
          class="column mt-4"
          v-for="element in chunk"
          :key="element.courseID"
        >
          <div class="card pb-2">
            <header class="card-header">
              <p
                class="card-header-title is-size-3-desktop is-size-4-mobile has-text-info-dark"
              >
                {{ element.courseName }}
              </p>
            </header>
            <div class="card-content">
              <div
                class="content"
                v-for="book in element.books"
                :key="book.index"
              >
                <div>
                  <p
                    class="is-size-4 desktop is-size-4-mobile has-text-weight-semibold has-text-centered"
                  >
                    {{ book.bookTitle }} - {{ book.author }}
                  </p>
                  <p
                    class="is-size-5 desktop is-size-5-mobile has-text-weight-semibold has-text-centered"
                  ></p>
                  <p
                    v-if="book.isbn != null"
                    class="is-size-5 has-text-centered"
                  >
                    ISBN: {{ book.isbn }}
                  </p>
                  <p v-else class="is-size-5 has-text-centered">ISBN: -</p>
                  <table class="table">
                    <thead>
                      <tr>
                        <th><abbr>Ressource Links</abbr></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="j in book.ressourceLinks" :key="j.index">
                        <td>
                          <span
                            class="icon is-pulled-left is-size-7 has-text-warning-dark"
                            ><i class="fas fa-book"></i
                          ></span>
                          <a :href="j">{{ j }}</a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <hr />
                </div>
              </div>
              <p class="has-text-right">
                Documents: {{ element.numDocs || 0 }}
              </p>
            </div>
            <footer class="card-footer">
              <button
                class="card-footer-item button has-icon has-text-success"
                @click="saveCourse"
              >
                <span class="icon"><i class="fas fa-save"></i></span
                ><span>Save</span>
              </button>
              <button
                class="card-footer-item button has-text-info"
                @click="editing != editing"
              >
                <span class="icon"><i class="fas fa-cog"></i></span
                ><span>Edit</span>
              </button>
              <button
                class="card-footer-item button has-text-danger-dark"
                @click="tryDelete(element.courseID)"
              >
                <span class="icon is-size-7"><i class="fas fa-ban"></i></span
                ><span>Delete</span>
              </button>
            </footer>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  editing: false,
  computed: {
    ...mapState("courses", {
      courseChunks: (state) => state.courseChunks,
    }),
  },
  mounted() {
    console.log(this.courseChunks);
  },
  methods: {
    ...mapActions("courses",["deleteCourse"]),
    saveCourse() {},
    tryDelete(courseID) {
      this.deleteCourse(courseID)
    },
  },
};
</script>

<style lang="scss" scoped>
.hero-body {
  border: 1px solid black;
}
@media screen and (min-width: 769px) and (max-width: 1024px) {
  .column,
  .card {
    height: 500px;
    width: 40vw;
  }
}

@media screen and (min-width: 1024px) and (max-width: 1408px) {
  .column,
  .card {
    width: 40vw;
    max-height: 550px;
  }
}

@media screen and (min-width: 1409px) {
  .column,
  .card {
    width: 40vw;
    height: 550px;
    position: relative;
  }
}
// .card {
//   overflow-y: auto;
//   overflow-x: hidden;
// }
.card-footer-item {
  text-decoration: none;
  color: black;
}
.table {
  max-height: 100px;
}
thead,
tbody,
tr,
th,
td {
  display: block;
}
tbody {
  height: 100px;
  overflow-y: auto;
  overflow-x: hidden;
}
.card,
.card-content {
  max-height: 100%;
  display: block;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>