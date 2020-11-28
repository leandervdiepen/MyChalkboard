import { API, Auth } from "aws-amplify";
import CryptoJS from "crypto-js"

// API Endpoint: https://ipca22i6nh.execute-api.eu-central-1.amazonaws.com/dev

export default {
  namespaced: true,
  state: {
    courseChunks: [],
    myCourses: [],
    apiName: 'mycboardAPI',
    path: '/courses',
    partitionKey: "courseID",
    sortKey: "userID",
    userID: '',
    newCourse: {
      courseID: '',
      userID: '',
      courseName: '',
      type: '',
      books: [], // { id: null, bookTitle: '', author: '', rsrcLinks: [] }
      addNotes: '',
      date: null
    }
  },
  getters: {},
  actions: {
    fetchAllCoursesByUser({ state, dispatch }) {
      return new Promise((resolve, reject) => {
        dispatch("getUserID").then(userID => {
          API.get(state.apiName, state.path + "/allFromUser?userID=" + userID).then(res => {
            resolve(res.Items)
          }).catch(err => {
            console.log(err)
            reject(err)
          })
        }).catch(err => {
          console.log(err)
          reject(err)
        })
      })
    },
    // Call API to insert a course into the ddb
    createCourse({ state, dispatch }) {
      dispatch("hashCourseID")
      return new Promise((resolve, reject) => {

        let params = state.newCourse
        let myInit = {
          body: params
        }
        console.log(myInit)
        API.post(state.apiName, state.path, myInit)
          .then(res => {
            console.log(res)
            resolve(res.body)
          }).catch(err => {
            console.log(err.error, err.url, err.body)
            reject(err)
          })
      })
    },
    filterCoursesByID(state, courseID) {
      console.log(state.myCourses)
      return state.myCourses.filter(course => course.courseID == courseID)
    },
    deleteCourse({ state }, courseID) {
      return new Promise((resolve, reject) => {
        API.del(state.apiName, state.path + "?courseID=" + courseID + "&courseID=" + state.userID).then(res => {
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
      commit("setUserIDCourse", state.userID)
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
    },
  },
  mutations: {
    setCourseID(state, id) {
      state.newCourse.courseID = id
    },
    setUserID(state, id) {
      state.userID = id
    },
    setUserIDCourse(state, id) {
      state.newCourse.userID = id
    },
    setCourseName(state, name) {
      state.newCourse.courseName = name
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
    setCourses(state, items) {
      state.myCourses = items
      console.log(state.myCourses)
    },
    makeCourseChunks(state, chunksize) {
      var i,
        j,
        temparray
      for (i = 0, j = state.myCourses.length; i < j; i += chunksize) {
        temparray = state.myCourses.slice(i, i + chunksize);
        state.courseChunks.push(temparray)
      }
    },
    addOneCourseToCourses(state, course) {
      state.courses.push(course)
    }
  }
}
