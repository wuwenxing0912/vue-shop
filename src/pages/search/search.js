import 'css/common.css'
import './search.css'

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'
import qs from 'qs'

import mixin from 'js/mixin.js'


let { keyword, id } = qs.parse(location.search.substr(1))

new Vue({
    el: '.container',
    data: {
        searchLists: null,
        pageSize: 6,
        pageNum: 1,
        keyword,
        isShow: false
    },
    created() {
        this.getSearchList()
    },
    methods: {
        getSearchList() {
            axios.post(url.searchList, {
                id: id,
                keyword: keyword,
                pageNum: this.pageNum,
                pageSize: this.pageSize,
            }).then(res => {
                console.log(res)
                this.searchLists = res.data.lists
            })
        },
        move() {
            //console.log(window.pageYOffset)
            //console.log(document.documentElement.scrollTop) 
            //document.body.scrollTop always 0
            if (document.documentElement.scrollTop > 100) {
                this.isShow = true
            } else {
                this.isShow = false
            }
        },
        toTop() {

        }


    },
    mixins: [mixin]
})