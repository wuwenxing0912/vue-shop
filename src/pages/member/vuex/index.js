//使用vuex插件

import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import Address from 'js/addressService.js'



//创建store示例

const store = new Vuex.Store({
    state: { //状态，不允许直接修改，只能定义一系列事件来触发，对数据的管理
        lists: null
    },
    mutations: { //提交 mutation 是更改状态的唯一方法，并且这个过程是同步的。
        init(state, lists) {
            state.lists = lists
        },
        add(state, instance) {
            state.lists.push(instance)
        },
        remove(state, id) {
            let lists = state.lists
            let index = lists.findIndex(item => {
                return item.id === id
            })
            lists.splice(index, 1)
        },
        update(state, instance) {
            let lists = JSON.parse(JSON.stringify(state.lists))
            let index = lists.findIndex(item => {
                return item.id === instance.id
            })
            lists[index] = instance
            state.lists = lists
        },
        setDefault(state, id) {
            let lists = state.lists
            lists.forEach(item => {
                if (item.id === id) {
                    item.isDefault = true
                }
            })
        }
    },
    actions: { //异步逻辑都应该封装到 action 里面。
        getLists({ commit }) {
            Address.list().then(res => {
                //this.lists = res.data.lists
                commit('init', res.data.lists)
            })
        },
        addAction({ commit }, instance) {
            Address.add(instance).then(res => {
                commit('add', instance)
            })
        },
        removeAction({ commit }, id) {
            Address.remove(id).then(res => {
                commit('remove', id)
            })
        },
        updateAction({ commit }, instance) {
            Address.update(instance).then(res => {
                commit('update', instance)
            })
        },
        setDefaultAction({ commit }, id) {
            Address.setDefault(id).then(res => {
                commit('setDefault', id)
            })
        },
    }
})

export default store