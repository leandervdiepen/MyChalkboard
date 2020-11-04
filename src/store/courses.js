import { API, Auth } from "aws-amplify";
import CryptoJS from "crypto-js"

// API Endpoint: https://ipca22i6nh.execute-api.eu-central-1.amazonaws.com/dev

export default {
  namespaced: true,
  state: {
    apiName: 'mycboardApi',
    path: '/courses',
    newCourse: {
      ID: '',
      name: '',
      type: '',
      books: [], // { id: null, bookTitle: '', author: '', rsrcLink: '' }
      addNotes: '',
      date: null
    }
  },
  getters: {
    // calculateHash(obj) {
    //   return CryptoJS.MD5(obj.index + obj.previousHash + obj.timestamp + obj.data + obj.nonce).toString()
    // },
  },
  actions: {
    fetchAllCourses({ state }) {
      let myInit = {
        response: true
      }
      API.get(state.apiName, state.path+"/", myInit)
        .then(res => {
          console.log(res)
        })
    },

    createCourse({ state, commit }) {
      Auth.currentUserInfo().then(user => {
        let userid = user.username.replace(/\D/g, "");
        let timestamp = new Date(Date.now()).toISOString()
        let hash = {
          index: userid,
          previousHash: "none",
          timestamp: timestamp,
          data: state.newCourse,
          nonce: 0
        }
        let courseid = userid + "-" + CryptoJS.MD5(hash.index + hash.previousHash + hash.timestamp + hash.data + hash.nonce).toString()
        commit("setCourseID", courseid)
        commit("setDate", timestamp)
        let myInit = {
          body: state.newCourse
        }
        API.put(state.apiName, state.path, myInit)
          .then(res => {
            console.log(res)
          }).catch(err => {
            console.log(err)
          })
      })

    }
  },
  mutations: {
    setCourseID(state, id) {
      state.newCourse.ID = id
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
    setDate(state) {
      state.newCourse.date = Date.now()
    },
    setCourseType(state, type) {
      state.newCourse.type = type
    }
  }
}
