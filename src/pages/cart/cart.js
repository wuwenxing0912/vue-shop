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
import Velocity from 'velocity-animate';

import Cart from 'js/cartService.js'
import fetch from 'js/fetch.js'


new Vue({
    el: '.container',
    data: {
        lists: null,
        total: 0,
        editingShop: null, //正在编辑的店铺
        editingShopIndex: -1, //编辑店铺的id
        removePopup: false, //是否删除商品
        removeData: null,
        removeMsg: ''
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
        allRemoveSelected: {
            get() {
                if (this.editingShop) {
                    return this.editingShop.removeChecked
                }
                return false
            },
            set(newVal) {
                if (this.editingShop) {
                    this.editingShop.removeChecked = newVal
                    this.editingShop.goodsList.forEach(goods => {
                        goods.removeChecked = newVal
                    })
                }
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
        },
        removeLists() {
            if (this.editingShop) {
                let arr = []
                this.editingShop.goodsList.forEach(goods => {
                    if (goods.removeChecked) {
                        arr.push(goods)
                    }
                })
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
                    // console.log(lists);
                lists.forEach(shop => {
                    shop.checked = true //勾选所有店铺
                    shop.editing = false //店铺内的商品是否在编辑状态
                    shop.removeChecked = false //编辑状态下的店铺勾选状态
                    shop.editingMsg = '编辑' //
                    shop.goodsList.forEach(goods => {
                        goods.checked = true //勾选所有商品
                        goods.removeChecked = false //编辑状态下的商品勾选状态
                    });
                }); //先处理响应的数据，再赋值
                this.lists = lists

            }).catch(e => console.log(e))
        },
        selectGoods(shop, goods) { //商品选择状态
            // console.log(goods.checked);
            let attr = this.editingShop ? 'removeChecked' : 'checked' //判断店铺什么情况下 removeChecked编辑状态，checked正常显示状态
            goods[attr] = !goods[attr]
            shop[attr] = shop.goodsList.every(goods => {
                return goods[attr]
            })
        },
        selectShop(shop) { //店铺选择状态
            let attr = this.editingShop ? 'removeChecked' : 'checked'
            shop[attr] = !shop[attr]
            shop.goodsList.forEach(goods => {
                goods[attr] = shop[attr] //当店铺选择状态发生改变时，所属的商品选择状态也随之变化
            })
        },
        selectAll() {
            let attr = this.editingShop ? 'allRemoveSelected' : 'allSelected'
            this[attr] = !this[attr]
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
        },
        reduce(goods) {
            if (goods.number === 1) return
                // axios.post(url.cartReduce, {
                //     id: goods.id,
                //     number: 1
                // }).then(res => {
                //     goods.number--
                // })
            Cart.reduce(goods.id).then(res => {
                goods.number--
            })

        },
        add(goods) {
            // axios.post(url.cartAdd, {
            //         id: goods.id,
            //         number: 1
            //     }).then(res => {
            //         goods.number++
            //     })
            Cart.add(goods.id).then(res => {
                goods.number++
            })
        },
        remove(shop, shopIndex, goods, goodsIndex) {
            this.removePopup = true
            this.removeData = {
                shop,
                shopIndex,
                goods,
                goodsIndex
            }
            this.removeMsg = '确定要删除该商品吗？'

        },
        removeList() {
            console.log(1);
            this.removePopup = true
            this.removeMsg = `确定将所选 ${this.removeLists.length} 个商品删除？`
        },
        removeConfirm() {
            if (this.removeMsg === '确定要删除该商品吗？') {
                let {
                    shop,
                    shopIndex,
                    goods,
                    goodsIndex
                } = this.removeData
                axios.post(url.cartRemove, {
                    id: goods.id
                }).then(res => {
                    shop.goodsList.splice(goodsIndex, 1)
                    if (!shop.goodsList.length) {
                        this.lists.splice(shopIndex, 1)
                        this.removeShop()
                    }
                    this.removePopup = false
                })
            } else {
                let ids = []
                this.removeLists.forEach(goods => {
                    ids.push(goods.id)
                })
                axios.post(url.cartMremove, {
                    ids
                }).then(res => {
                    let arr = []
                    this.editingShop.goodsList.forEach(goods => {
                        let index = this.removeLists.findIndex(item => {
                            return item.id == goods.id
                        })
                        if (index === -1) {
                            arr.push(goods)
                        }
                    })
                    if (arr.length) {
                        this.editingShop.goodsList = arr
                    } else {
                        this.lists.splice(this.editingShopIndex, 1)
                        this.removeShop()
                    }
                    this.removePopup = false
                })
            }
        },
        removeShop() {
            this.editingShop = null
            this.editingShopIndex = -1
            this.lists.forEach(shop => { //删除店铺的同时需要把其他店铺的状态改为正常显示
                shop.editing = false
                shop.editingMsg = '编辑'
            })
        },
        start(e, goods) {
            goods.startX = e.changedTouches[0].clientX
        },
        end(e, shopIndex, goods, goodsIndex) {
            let endX = e.changedTouches[0].clientX
            let left = '0'
            if (goods.startX - endX > 100) {
                left = '-60px'
            }
            if (endX - goods.startX > 100) {
                left = '0px' //使用Velocity必须要带上单位，否则无效
            }
            //console.log(this.$refs[`goods-${shopIndex}-${goodsIndex}`]);
            Velocity(this.$refs[`goods-${shopIndex}-${goodsIndex}`], {
                left
            })

        }
    },
    mixins: [mixin]
})