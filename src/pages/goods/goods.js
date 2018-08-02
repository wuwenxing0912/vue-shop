import './goods_common.css'
import './goods_custom.css'
import './goods.css'
import './goods_theme.css'
import './goods_mars.css'
import './goods_sku.css'
import './goods_transition.css'

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'
import qs from 'qs' //A querystring parser with nesting support
import Swiper from 'components/Swiper.vue'


import mixin from 'js/mixin.js'

var id = qs.parse(location.search.substr(1))

var detailsTab = ['商品详情', '本店成交']

new Vue({
    el: "#app",
    data: {
        id,
        details: null,
        detailsTab,
        tabIndex: 0,
        dealLists: null,
        bannerLists: null, //轮播图
        skuType: 1, //点击“规格”、“加入购物车”、“立即购买”，弹出窗口，“规格”-1、“加入购物车”-2、“立即购买”-3
        showSku: false, //阴影层是否显示
        skuNum: 1, //添加数量
        isAddCart: false, //加入购物车后显示购物车图标
        showAddMessage: false //是否显示加入购物车成功信息
    },
    created() {
        this.getDetails()
    },
    methods: {
        getDetails() {
            axios.post(url.details, { id }).then(res => {
                this.details = res.data.data
                this.bannerLists = []
                this.details.imgs.forEach((item) => {
                    this.bannerLists.push({
                        clickUrl: '',
                        img: item
                    })
                })
            })
        },
        changeTab(index) {
            this.tabIndex = index
            if (index === 1) {
                this.getDeal()
            }
        },
        getDeal() {
            axios.post(url.deal, { id }).then(res => {
                // console.log(res)
                this.dealLists = res.data.data.lists
            })
        },
        chooseSku(type) {
            this.skuType = type
            this.showSku = true
        },
        changeSkuNum(num) {
            console.log(num)
            if (num < 0 && this.skuNum === 1) return;
            this.skuNum += num
        },
        addCart() {
            axios.post(url.cartAdd, {
                id,
                number: this.skuNum
            }).then(res => {
                if (res.data.status === 200) {
                    // console.log('before' + this.showAddMessage)
                    this.showSku = false
                    this.isAddCart = true
                    this.showAddMessage = true
                        // console.log('after' + this.showAddMessage)

                    setTimeout(() => {
                        this.showAddMessage = false
                    }, 1000)
                }
            })
        }

    },
    components: {
        Swiper
    },
    watch: {
        showSku(val, oldVal) {
            document.documentElement.style.overflow = val ? 'hidden' : 'auto'
            document.querySelector('html').style.overflow = val ? 'hidden' : 'auto'
            document.documentElement.style.height = val ? '100%' : 'auto'
            document.querySelector('html').style.height = val ? '100%' : 'auto'
        }
    },
    mixins: [mixin]
})