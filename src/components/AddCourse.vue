<template>
  <div class="addCourse mx-3 my-3">
    <div class="modal" :class="{'is-active': showCard}">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Add a course</p>
          <button class="delete" aria-label="close" @click="toggleModalCard"></button>
        </header>
        <section class="modal-card-body">
          <div class="field">
            <label class="label">Course Name</label>
            <div class="control">
              <input class="input" type="text" placeholder="Text input" />
            </div>
          </div>
          <div class="field">
            <div class="control">
              <label class="label">Type Of Course</label>
              <label class="radio">
                <input type="radio" name="type" />
                Presence
              </label>
              <label class="radio">
                <input type="radio" name="type" />
                Online
              </label>
              <label class="radio">
                <input type="radio" name="type" />
                Hybrid
              </label>
            </div>
            <div
              class="control"
              v-if="isPresence"
            >// Add Options for more Information on presence lessons</div>
            <div
              class="control"
              v-if="isOnline"
            >// Add Options for more Information on online lessons</div>
            <div
              class="control"
              v-if="isHybrid"
            >// Add Options for more Information on hybrid lessons</div>
          </div>
          <div class="field">
            <div class="control">
              <label class="label">Literature</label>
              <div class="columns" v-for="book in numberOfBooks" :key="book.id">
                <span class="icon mt-6 removeBook" @click="removeBook(event)">
                  <i class="fas fa-minus-circle"></i>
                </span>
                <div class="column is-4">
                  <label class="label">Book title</label>
                  <input class="input" type="text" name="bookTitle" />
                </div>
                <div class="column is-4">
                  <label class="label">Author</label>
                  <input class="input" type="text" name="author" />
                </div>
                <div class="column is-4">
                  <label class="label">Ressource Link</label>
                  <input class="input" type="text" name="onlineResrc" />
                </div>
              </div>
              <button class="button is-pulled-right" @click="addABook">
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
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success">Add To Courses</button>
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
export default {
  data() {
    return {
      showCard: false,
      isPresence: false,
      isOnline: false,
      isHybrid: false,
      numberOfBooks: 0,
      books: []
    };
  },
  methods: {
    toggleModalCard() {
      this.showCard = !this.showCard;
    },
    addABook() {
      this.numberOfBooks++;
    },
    removeBook(event){
      this.numberOfBooks--
      console.log(event)
      // Find desired book in array and remove it
    }
  }
};
</script>

<style lang="scss" scoped>
.circle {
  height: 50px;
  width: 50px;
  border-radius: 50%;
  background-color: rgb(245, 245, 245);
  box-shadow: 5px 5px 55px silver inset;
}
.removeBook:hover{
  border: 1px solid black;
}
</style>