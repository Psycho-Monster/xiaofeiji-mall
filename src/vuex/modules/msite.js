/* 
管理首页模块的
*/
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_SEARCH_SHOPS
} from "../mutation-types"

import {
  reqAddress,
  reqCategorys,
  reqShops,
  reqSearchShop
} from '../../api'

const state = {
  latitude: 40.10038, // 纬度
  longitude: 116.36867, // 经度
  address: {}, // 地址信息对象
  categories: [], // 分类数组
  shops: [], //商家数组
  searchShops: []
}
const mutations = {
  [RECEIVE_ADDRESS](state, address) {
    state.address = address
  },

  [RECEIVE_CATEGORYS](state, categories) {
    state.categories = categories
  },

  [RECEIVE_SHOPS](state, shops) {
    state.shops = shops
  },
  [RECEIVE_SEARCH_SHOPS](state, searchShops) {
    state.searchShops = searchShops
  },
}
const actions = {
  /* 
  获取当前地址的异步action
  */
  async getAddress({ commit, state }) {
    const { longitude, latitude } = state
    // 发异步ajax请求
    const result = await reqAddress(longitude, latitude)
    // 有了结果后, 提交mutation
    if (result.code === 0) {
      const address = result.data
      commit(RECEIVE_ADDRESS, address)
    }
  },

  /* 
  获取分类列表的异步action
  */
  async getCategories({ commit }) {
    // 发异步ajax请求
    const result = await reqCategorys()
    // 有了结果后, 提交mutation
    if (result.code === 0) {
      const categories = result.data
      commit(RECEIVE_CATEGORYS, categories)
    }
  },

  /* 
  获取商家列表的异步action
  */
  async getShops({ commit, state }) {
    const { longitude, latitude } = state
    // 发异步ajax请求
    const result = await reqShops({ longitude, latitude })
    // 有了结果后, 提交mutation
    if (result.code === 0) {
      const shops = result.data
      commit(RECEIVE_SHOPS, shops)
    }
  },
  // 异步获取商家商品列表
  async searchShops({ commit, state }, keyword) {
    const geohash = state.latitude + ',' + state.longitude
    const result = await reqSearchShop(geohash, keyword)
    if (result.code === 0) {
      const searchShops = result.data
      commit(RECEIVE_SEARCH_SHOPS, searchShops)
    }
  },
}

export default {
  state,
  mutations,
  actions,
}