import Cookies from 'js-cookie'
import moment from 'moment'

function initDateList() {
  let list = []
  for (let i = 1; i < 29; i ++) {
    let date = moment().add(i, 'days').format('x')
    list.push(date)
  }
  return list
}

const app = {
  state: {
    sidebar: {
      opened: !+Cookies.get('sidebarStatus')
    },
    language: Cookies.get('language') || 'zh',
    nowDate: moment().format('x'),
    dateList: initDateList(),
    screenWidth: 0,
    screenHeight: 0
  },
  mutations: {
    UPDATE_SCREEN: state => {
      state.screenWidth = document.body.clientWidth,
      state.screenHeight = document.body.clientHeight
    },
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
      state.sidebar.opened = !state.sidebar.opened
    },
    SET_LANGUAGE: (state, language) => {
      state.language = language
      Cookies.set('language', language)
    }
  },
  actions: {
    toggleSideBar({ commit }) {
      commit('TOGGLE_SIDEBAR')
    },
    setLanguage({ commit }, language) {
      commit('SET_LANGUAGE', language)
    }
  }
}

export default app
