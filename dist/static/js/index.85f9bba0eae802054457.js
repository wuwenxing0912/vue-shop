webpackJsonp([3],{"035s":function(t,e){},"97Sy":function(t,e){},NydE:function(t,e,a){"use strict";var n=a("DNVT"),s=(a("v2ns"),{name:"swiper",props:{lists:{type:Array,required:!0},name:{}},mounted:function(){this.init()},methods:{init:function(){new n.a(".swiper-container",{loop:!0,pagination:{el:".swiper-pagination"},autoplay:{delay:5e3}})}}}),i={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"swiper-container"},[e("div",{staticClass:"swiper-wrapper"},this._l(this.lists,function(t){return e("div",{key:t.id,staticClass:"swp-page swiper-slide"},[e("a",{staticClass:"js-no-follow",attrs:{href:t.clickUrl}},[e("img",{staticClass:"goods-main-photo fadeIn",attrs:{src:t.image}})])])})),this._v(" "),e("div",{staticClass:"swiper-pagination"})])},staticRenderFns:[]};var r=a("VU/8")(s,i,!1,function(t){a("tT6R")},null,null);e.a=r.exports},TFhR:function(t,e,a){"use strict";var n={hotLists:"/index/hotLists",banner:"/index/banner",topList:"/category/topList",subList:"/category/subList",rank:"/category/rank",searchList:"/search/list",details:"/goods/details",deal:"/goods/deal",cartAdd:"/cart/add",cartLists:"/cart/list",cartReduce:"/cart/reduce",cartRemove:"/cart/remove",cartMremove:"/cart/mremove",addressLists:"/address/list",addressAdd:"/address/add",addressRemove:"/address/remove",addressUpdate:"/address/update",addressSetDefault:"/address/setDefault"};for(var s in n)n.hasOwnProperty(s)&&(n[s]="http://rapapi.org/mockjsdata/24170"+n[s]);e.a=n},U67u:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("97Sy"),s=(a.n(n),a("bCKv")),i=a.n(s),r=a("035s"),o=(a.n(r),a("eChN")),c=(a.n(o),a("7+uW")),d=a("mtWM"),l=a.n(d),u=a("TFhR"),h=a("nq5D"),f=a("NydE");c.default.use(i.a),new c.default({el:"#app",data:{pageNum:1,pageSize:6,lists:null,loading:!1,allLoaded:!1,bannerLists:null},created:function(){this.getLists(),this.getBanner()},methods:{getLists:function(){var t=this;this.allLoaded||(this.loading=!0,l.a.get(u.a.hotLists,{pageNum:this.pageNum,pageSize:this.pageSize}).then(function(e){var a=e.data.lists;a.length<t.pageSize&&(t.allLoaded=!0),t.lists?t.lists=t.lists.concat(a):t.lists=a,t.loading=!1}).catch(function(t){console.log(t)}))},getBanner:function(){var t=this;l.a.get(u.a.banner).then(function(e){t.bannerLists=e.data.lists})}},components:{Foot:h.a,Swiper:f.a}})},c4r7:function(t,e){},eChN:function(t,e){},nq5D:function(t,e,a){"use strict";var n=a("mw3O"),s=a.n(n).a.parse(location.search.substr(1)).index,i=[{name:"有赞",icon:"icon-home",href:"index.html"},{name:"分类",icon:"icon-category",href:"category.html"},{name:"购物车",icon:"icon-cart",href:"cart.html"},{name:"我",icon:"icon-user",href:"member.html"}],r={data:function(){return{navConfig:i,curIndex:parseInt(s)||0}},created:function(){},methods:{changeNav:function(t,e){console.log(t),location.href=t.href+"?index="+e}}},o={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"bottom-nav"},[a("ul",t._l(t.navConfig,function(e,n){return a("li",{class:{active:n==t.curIndex},on:{click:function(a){t.changeNav(e,n)}}},[a("a",[a("i",{class:e.icon}),t._v(" "),a("div",[t._v(t._s(e.name))])])])}))])},staticRenderFns:[]};var c=a("VU/8")(r,o,!1,function(t){a("c4r7")},null,null);e.a=c.exports},tT6R:function(t,e){},v2ns:function(t,e){}},["U67u"]);
//# sourceMappingURL=index.85f9bba0eae802054457.js.map