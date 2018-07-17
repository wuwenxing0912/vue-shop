import 'css/common.css'
import './index.css'

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'
import Foot from 'components/Foot.vue'
import Swiper from 'components/Swiper.vue'

import { InfiniteScroll } from 'mint-ui'
Vue.use(InfiniteScroll)

new Vue({
    el: '#app',
    data: {
        pageNum: 1,
        pageSize: 6,
        lists: null,
        loading: false, //是否继续加载，
        allLoaded: false,
        bannerLists: null
    },
    created() {
        this.getLists() //首页数据
        this.getBanner()
    },
    methods: {
        getLists() {
            //是否加载完成
            if (this.allLoaded) return
            this.loading = true
            axios.get(url.hotLists, {
                pageNum: this.pageNum,
                pageSize: this.pageSize
            }).then(res => {
                let curLists = res.data.lists
                if (curLists.length < this.pageSize) {
                    this.allLoaded = true
                }
                if (this.lists) {
                    this.lists = this.lists.concat(curLists)
                } else {
                    this.lists = curLists
                }
                this.loading = false
            }).catch(e => { console.log(e) })
        },
        getBanner() { //轮播图
            axios.get(url.banner).then(res => {
                this.bannerLists = res.data.lists
            })
        }
    },
    components: {
        Foot, //底部导航栏
        Swiper
    }
})