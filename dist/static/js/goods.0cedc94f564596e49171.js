webpackJsonp([1],{AeEs:function(t,s){},AnIW:function(t,s){},"Do/K":function(t,s){},HFfA:function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var a=e("JWK+"),n=(e.n(a),e("pI1A")),i=(e.n(n),e("AeEs")),r=(e.n(i),e("AnIW")),o=(e.n(r),e("d7BR")),d=(e.n(o),e("Do/K")),u=(e.n(d),e("LjF4")),c=(e.n(u),e("7+uW")),l=e("mtWM"),h=e.n(l),f=e("TFhR"),p=e("mw3O"),m=e.n(p),g=e("NydE"),v=e("U/rD"),w=m.a.parse(location.search.substr(1));new c.default({el:"#app",data:{id:w,details:null,detailsTab:["商品详情","本店成交"],tabIndex:0,dealLists:null,bannerLists:null,skuType:1,showSku:!1,skuNum:1,isAddCart:!1,showAddMessage:!1},created:function(){this.getDetails()},methods:{getDetails:function(){var t=this;h.a.post(f.a.details,{id:w}).then(function(s){t.details=s.data.data,t.bannerLists=[],t.details.imgs.forEach(function(s){t.bannerLists.push({clickUrl:"",image:s})})})},changeTab:function(t){this.tabIndex=t,1===t&&this.getDeal()},getDeal:function(){var t=this;h.a.post(f.a.deal,{id:w}).then(function(s){t.dealLists=s.data.data.lists})},chooseSku:function(t){this.skuType=t,this.showSku=!0},changeSkuNum:function(t){console.log(t),t<0&&1===this.skuNum||(this.skuNum+=t)},addCart:function(){var t=this;h.a.post(f.a.cartAdd,{id:w,number:this.skuNum}).then(function(s){200===s.data.status&&(t.showSku=!1,t.isAddCart=!0,t.showAddMessage=!0,setTimeout(function(){t.showAddMessage=!1},1e3))})}},components:{Swiper:g.a},watch:{showSku:function(t,s){document.documentElement.style.overflow=t?"hidden":"auto",document.querySelector("html").style.overflow=t?"hidden":"auto",document.documentElement.style.height=t?"100%":"auto",document.querySelector("html").style.height=t?"100%":"auto"}},mixins:[v.a]})},"JWK+":function(t,s){},LjF4:function(t,s){},NydE:function(t,s,e){"use strict";var a=e("DNVT"),n=(e("v2ns"),{name:"swiper",props:{lists:{type:Array,required:!0},name:{}},mounted:function(){this.init()},methods:{init:function(){new a.a(".swiper-container",{loop:!0,pagination:{el:".swiper-pagination"},autoplay:{delay:5e3}})}}}),i={render:function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"swiper-container"},[s("div",{staticClass:"swiper-wrapper"},this._l(this.lists,function(t){return s("div",{key:t.id,staticClass:"swp-page swiper-slide"},[s("a",{staticClass:"js-no-follow",attrs:{href:t.clickUrl}},[s("img",{staticClass:"goods-main-photo fadeIn",attrs:{src:t.image}})])])})),this._v(" "),s("div",{staticClass:"swiper-pagination"})])},staticRenderFns:[]};var r=e("VU/8")(n,i,!1,function(t){e("tT6R")},null,null);s.a=r.exports},TFhR:function(t,s,e){"use strict";var a={hotLists:"/index/hotLists",banner:"/index/banner",topList:"/category/topList",subList:"/category/subList",rank:"/category/rank",searchList:"/search/list",details:"/goods/details",deal:"/goods/deal",cartAdd:"/cart/add",cartLists:"/cart/list",cartReduce:"/cart/reduce",cartRemove:"/cart/remove",cartMremove:"/cart/mremove",addressLists:"/address/list",addressAdd:"/address/add",addressRemove:"/address/remove",addressUpdate:"/address/update",addressSetDefault:"/address/setDefault"};for(var n in a)a.hasOwnProperty(n)&&(a[n]="http://rapapi.org/mockjsdata/24170"+a[n]);s.a=a},"U/rD":function(t,s,e){"use strict";s.a={filters:{currency:function(t){var s=""+t;if(s.indexOf(".")>-1){var e=s.split(".");return e[0]+"."+(e[1]+"0").substr(0,2)}return s+".00"}}}},d7BR:function(t,s){},pI1A:function(t,s){},tT6R:function(t,s){},v2ns:function(t,s){}},["HFfA"]);
//# sourceMappingURL=goods.0cedc94f564596e49171.js.map