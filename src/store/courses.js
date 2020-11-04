import { API } from "aws-amplify";

// API Endpoint: https://ipca22i6nh.execute-api.eu-central-1.amazonaws.com/dev

export default {
  namespaced: true,
  state: {
    apiName: 'mycboardApi',
    path: '/courses',
    myInit: {},
    newCourse: {
      name: '',
      type: '',
      books: [], // { id: null, bookTitle: '', author: '', rsrcLink: '' }
      addNotes: ''
    }
  },
  getters: {},
  actions: {
    fetchAllCourses({ state }) {
      let myInit = {
        response: true
      }
      API.get(state.apiName, state.path + '/:ID', myInit)
        .then(res => {
          console.log(res)
        })
    },
    createCourse({ state }) {
      let myInit = {
        body: state.newCourse
      }
      API.put(state.apiName, state.path, myInit)
        .then(res => {
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
    }
  },
  mutations: {
    changeHeaders(state, obj) {
      state.myInit.headers = obj;
    },
    changeQueryParams(state, obj) {
      state.myInit.queryStringParameters = obj;
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
    setCourseType(state,type){
      state.newCourse.type = type
    }
  }
}
