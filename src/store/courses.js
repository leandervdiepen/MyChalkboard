import { API } from "aws-amplify";
import CryptoJS from "crypto-js"

// API Endpoint: https://ipca22i6nh.execute-api.eu-central-1.amazonaws.com/dev

export default {
  namespaced: true,
  state: {
    courses: [],
    apiName: 'mycboardApi',
    path: '/coursesLambda-dev',
    partitionKey: "courseID",
    sortKey: "userID",
    newCourse: {
      courseID: '',
      userID: '',
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
    fetchAllCourses({ state, commit }) {
      API.get(state.apiName, state.path + "/:" + state.partitionKey, {}).then(res => {
        console.log(res)
        commit("setCourses", JSON.parse(res.body))
      }).catch(err => {
        console.log(err)
      })
    },
    // Call API to insert a course into the ddb
    createCourse({ state, dispatch }) {
      dispatch("hashCourseID")
      let myInit = {
        body: state.newCourse
      }
      console.log(myInit)
      API.put(state.apiName, state.path, myInit)
        .then(res => {
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
    },
    // Generate a hash as a unique ID for the course
    hashCourseID({ state, dispatch, commit, }) {
      dispatch("getUserID")
      let timestamp = new Date()
      timestamp = timestamp.toLocaleDateString() + " " + timestamp.toLocaleTimeString()
      let hash = {
        index: state.newCourse.userID,
        previousHash: "none",
        timestamp: timestamp,
        data: state.newCourse,
        nonce: 0
      }
      let courseid = state.newCourse.userID + "-" + CryptoJS.MD5(hash.index + hash.previousHash + hash.timestamp + hash.data + hash.nonce).toString()
      commit("setCourseID", courseid)
      commit("setDate", timestamp)
    },
    // Cut 'Google_' from username to generate userid to use in storing courses with userId attr
    getUserID({ commit, rootState }) {
      let user = rootState.user.username
      if (user != null) {
        let userid = user.replace(/\D/g, "");
        commit("setUserID", userid)
        return userid
      }
    }
  },
  mutations: {
    setCourseID(state, id) {
      state.newCourse.courseID = id
    },
    setUserID(state, id) {
      state.newCourse.userID = id
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
      state.courses = [obj]
      console.log(state.courses)
    },
    addOneCourseToCourses(state, course) {
      state.courses.push(course)
    }
  }
}
