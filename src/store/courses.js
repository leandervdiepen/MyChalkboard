import { API, Auth } from "aws-amplify";
import CryptoJS from "crypto-js"

// API Endpoint: https://ipca22i6nh.execute-api.eu-central-1.amazonaws.com/dev

export default {
  namespaced: true,
  state: {
    courses: [],
    apiName: 'mycboardAPI',
    path: '/courses',
    partitionKey: "courseID",
    sortKey: "userID",
    userID: '',
    newCourse: {
      courseID: '',
      courseName: '',
      type: '',
      books: [], // { id: null, bookTitle: '', author: '', rsrcLink: '' }
      addNotes: '',
      date: null
    }
  },
  getters: {},
  actions: {
    // Fetch All Courses with the userid attribute of the authenticated user
    fetchAllCoursesForUser({ state }) {
      API.get(state.apiName, state.path + "/:ID", {})
        .then(res => {
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
    },
    fetchAllCoursesByUser({ state, commit, dispatch }) {
      // let myInit = {
      //   response: true,
      // }
      dispatch("getUserID").then(userID => {
        API.get(state.apiName, state.path + "/all?userID=" + userID).then(res => {
          console.log(res)
          commit("setCourses", res)
        }).catch(err => {
          console.log(err)
        })
      }).catch(err => {
        console.log(err)
      })
      // API.get(state.apiName, state.path + "?courseID=" + state.userID, myInit).then(res => {

    },
    // Call API to insert a course into the ddb
    createCourse({ state, dispatch }) {
      dispatch("hashCourseID")
      return new Promise((resolve, reject) => {
        let body = state.newCourse
        body.userID = state.userID
        let myInit = {
          body: {
            body
          }
        }
        API.put(state.apiName, state.path, myInit)
          .then(res => {
            console.log(res)
            resolve(res)
          }).catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    // Generate a hash as a unique ID for the course
    hashCourseID({ state, dispatch, commit, }) {
      dispatch("getUserID")
      let timestamp = new Date()
      timestamp = timestamp.toLocaleDateString() + " " + timestamp.toLocaleTimeString()
      let hash = {
        index: state.userID,
        previousHash: "none",
        timestamp: timestamp,
        data: state.newCourse,
        nonce: 0
      }
      let courseID = state.userID + "-" + CryptoJS.MD5(hash.index + hash.previousHash + hash.timestamp + hash.data + hash.nonce).toString()
      commit("setCourseID", courseID)
      commit("setDate", timestamp)
    },
    // Cut 'Google_' from username to generate userid to use in storing courses with userId attr
    getUserID({ commit, rootState }) {
      return new Promise((resolve, reject) => {
        let user = rootState.user.username
        if (user != null) {
          let userid = user.replace(/\D/g, "");
          commit("setUserID", userid)
          resolve(userid)
        } else {
          Auth.signOut()
          this.$router.push("/welcome")
          reject("No User signed In")
        }
      })
    }
  },
  mutations: {
    setCourseID(state, id) {
      state.newCourse.courseID = id
    },
    setUserID(state, id) {
      state.userID = id
    },
    setCourseName(state, name) {
      state.newCourse.name = name
    },
    changeCourseType(state, type) {
      state.newCourse.type = type
    },
    addBooks(state, arr) {
      state.newCourse.books = arr
    },
    setNotes(state, notes) {
      state.newCourse.addNotes = notes
    },
    setDate(state, timestamp) {
      state.newCourse.date = timestamp
    },
    setCourseType(state, type) {
      state.newCourse.type = type
    },
    setCourses(state, obj) {
      for (let i = 0; i < obj.length; i++) {
        state.courses.push(obj[i])
      }
      console.log(state.courses)
    },
    addOneCourseToCourses(state, course) {
      state.courses.push(course)
    }
  }
}
