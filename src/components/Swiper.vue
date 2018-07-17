<template>
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swp-page swiper-slide" v-for="list in lists" v-bind:key="list.id">
                <a class="js-no-follow" v-bind:href="list.clickUrl">
                    <img class="goods-main-photo fadeIn" v-bind:src="list.image">
                </a>
            </div>
        </div>
        <div class="swiper-pagination"></div>
    </div>
</template>

<style>
.swiper-slide {
    width: 100%;
    height: 100%;
}
</style>

<script>

// swiper对dom节点进行操作的，dom节点是在mounted生成的，所以轮播是在mounted出调用

import Swiper from 'swiper'
import 'swiper/dist/css/swiper.css'

export default {
    name: "swiper",
    props: {
        lists: {
            type: Array,
            required: true
        },
        name: {}
    },

    mounted() {
        this.init()
    },
    methods: {
        init() {
            new Swiper('.swiper-container', {
                loop: true,
                pagination: {
                    el: '.swiper-pagination',
                },
                autoplay: {
                    delay: 5000,
                }
            })
        }

    },

    //在规定了props的数据类型时，如果index.html的swiper上没有使用v-if="bannerLists"，
    //则控制台会报错（预期是数组，得到的却是null），因为数据加载是异步的

    // watch: {
    //   lists(val,oldVal) {
    //     console.log(val,oldVal)
    //     //console.log('before nextTick: ',document.querySelectorAll('.swiper-slide'))
    //     this.$nextTick(() => {
    //       //console.log('after nextTick: ',document.querySelectorAll('.swiper-slide'))
    //       
    //     })
    //   }
    // }
}
</script>

