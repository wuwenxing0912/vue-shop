import './cart_base.css'
import './cart_trade.css'
import './cart.css'


// import Mock from 'mockjs'
// let Random = Mock.Random

// let data = Mock.mock({
//   'cartList|3' :[{
//     'goodsList|1-2' : [{
//       id: Random.int(10000,100000),
//       image: Mock.mock('@img(90x90,@color)')
//     }]
//   }]
// })   本地模拟数据

import Vue from 'vue';
import axios from 'axios';
import mixin from 'js/mixin.js';
import url from 'js/api.js';

new Vue({
    el: '.container',
    data: {
        lists: null,
        total: 0,
        editingShop: null,
        editingShopIndex: -1
    },
    computed: {
        allSelected: {
            get() {
                if (this.lists && this.lists.length) {
                    return this.lists.every(shop => {
                        return shop.checked
                    })
                }
                return false
            }, //获取全选按钮选择状态
            set(newVal) { //取消全选状态
                this.lists.forEach(shop => {
                    shop.checked = newVal
                    shop.goodsList.forEach(goods => {
                        goods.checked = newVal
                    })
                })
            }
        },
        selectLists() { //计算勾选商品的总价
            if (this.lists && this.lists.length) {
                let arr = []
                let total = 0
                this.lists.forEach(shop => {
                    shop.goodsList.forEach(goods => {
                        if (goods.checked) {
                            arr.push(goods)
                            total = total + goods.price * goods.number
                        }
                    })
                })
                this.total = total
                return arr
            }
            return []
        }
    },
    created() {
        this.getLists()
    },
    methods: {
        getLists() {
            axios.post(url.cartLists).then(res => {
                let lists = res.data.cartList
                lists.forEach(shop => {
                    shop.checked = true //勾选所有店铺
                    shop.editing = false //店铺内的商品是否在编辑状态
                    shop.editingMsg = '编辑' //
                    shop.goodsList.forEach(goods => {
                        goods.checked = true //勾选所有商品
                    });
                }); //先处理响应的数据，再赋值
                this.lists = lists

            }).catch(e => console.log(e))
        },
        selectGoods(shop, goods) { //商品选择状态
            // console.log(goods.checked);
            goods.checked = !goods.checked
            shop.checked = shop.goodsList.every(goods => {
                return goods.checked
            })
        },
        selectShop(shop) { //店铺选择状态
            shop.checked = !shop.checked
            shop.goodsList.forEach(goods => {
                goods.checked = shop.checked //当店铺选择状态发生改变时，所属的商品选择状态也随之变化
            })
        },
        selectAll() {
            this.allSelected = !this.allSelected
        },
        edit(shop, shopIndex) {
            shop.editing = !shop.editing
            shop.editingMsg = shop.editing ? '完成' : '编辑'
            this.lists.forEach((item, i) => {
                if (shopIndex !== i) {
                    item.editing = false
                    item.editingMsg = shop.editing ? '' : '编辑'
                }
            })
            this.editingShop = shop.editing ? shop : null //获取编辑店铺商品时的店铺
            this.editingShopIndex = shop.editing ? shopIndex : -1 //获取编辑店铺商品时的店铺id
        }
    },
    mixins: [mixin]
})