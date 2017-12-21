import Cookies from 'js-cookie'
import { _getAtts, _getAtt } from '@/api/info'
import _ from 'lodash'

const atts = {
  state: {
    list: [],
    listMap: null,
    init: false
  },
  actions: {
    getAttsInfo({ commit, dispatch }, id) {
      return new Promise((resolve, reject) => {
        _getAtts().then(res => {
          commit('SET_ATTSINFO', res.data)
          resolve(res)
        })
      })
    },
    getAttsLive({ commit, dispatch }, id) {
      return new Promise((resolve, reject) => {
        _getAtts({mode: 'live'}).then(res => {
          commit('SET_ATTSLIVE', res.data)
          resolve(res)
        })
      })
    }
  },
  mutations: {
    //设置游乐项目排队时间
    SET_ATTSLIVE(state, data) {
      let listMap = state.listMap
      let liveList = data.data.list
      liveList.forEach((item) => {
        let nItem = listMap[item.name]
        if (nItem) {
          nItem.postedWaitMinutes = item.postedWaitMinutes
        }
      })
      console.log('set', listMap)
    },
    //设置项目表
    SET_ATTSINFO(state, data) {
      let list = data.data.list
      let nMap = {}
      list.forEach(item => {
        let time_list = JSON.parse(item.time_list)
        //演出类处理
        if (item.type == 4) {
          item.start_time = JSON.parse(item.start_time)

          let arr = time_list
          let map = {},
            nList = []

          let _nkey = 0
          arr.forEach((item, index) => {
            if (index === 0) {
              nList.push({
                date: item.date,
                start_time: [item]
              })
            } else {
              let oItem = arr[index - 1]
              if (item.date === oItem.date) {
                nList[_nkey]['start_time'].push(item)
              } else {
                nList.push({
                  date: item.date,
                  start_time: [item]
                })
                _nkey++
              }
            }
          })
          time_list = nList
        }
        item.time_list = time_list
        item.postedWaitMinutes = 0
        item.fastPass = 0
        item.fastPassStartTime = ''
        nMap[item.name] = item
      })
      state.list = list
      state.init = true
      state.listMap = nMap
    }
  },
  getters: {
    //游乐项目信息表
    attPlaysInfo: (state, getters) => {
      let list = state.list
      list = list.filter(item => {
        if (item['type'] !== 4) {
          return item
        }
      })
      return list
    },
    //娱乐演出信息表
    attShowsInfo: (state, getters) => {
      let list = state.list
      list = list.filter(item => {
        if (item['type'] == 4) {
          return item
        }
      })
      return list
    },
    //游乐项目排队时间
    attPlaysLive: (state, getters) => {
      let list  = state.listMap
      let nList = []
      for (let k in list) {
        let item = list[k]
        nList.push(item)
      }
      return nList
    }
  }
}

export default atts
