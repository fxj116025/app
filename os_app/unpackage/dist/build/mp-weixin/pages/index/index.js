(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/index"],{"00f0":function(n,t,e){"use strict";e.d(t,"b",(function(){return i})),e.d(t,"c",(function(){return a})),e.d(t,"a",(function(){return o}));var o={uniNavBar:function(){return e.e("uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar").then(e.bind(null,"0b14"))},uniLoadMore:function(){return e.e("uni_modules/uni-load-more/components/uni-load-more/uni-load-more").then(e.bind(null,"331d"))}},i=function(){var n=this,t=n.$createElement;n._self._c},a=[]},"04be":function(n,t,e){},"4a7e":function(n,t,e){"use strict";e.r(t);var o=e("00f0"),i=e("d469");for(var a in i)"default"!==a&&function(n){e.d(t,n,(function(){return i[n]}))}(a);e("b77c");var u,r=e("f0c5"),c=Object(r["a"])(i["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],u);t["default"]=c.exports},"93d7":function(n,t,e){"use strict";(function(n){e("286c");o(e("66fd"));var t=o(e("4a7e"));function o(n){return n&&n.__esModule?n:{default:n}}n(t.default)}).call(this,e("543d")["createPage"])},b77c:function(n,t,e){"use strict";var o=e("04be"),i=e.n(o);i.a},d469:function(n,t,e){"use strict";e.r(t);var o=e("f7bc"),i=e.n(o);for(var a in o)"default"!==a&&function(n){e.d(t,n,(function(){return o[n]}))}(a);t["default"]=i.a},f7bc:function(n,t,e){"use strict";(function(n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=e("e893"),i=function(){e.e("components/item/item").then(function(){return resolve(e("6728"))}.bind(null,e)).catch(e.oe)},a={data:function(){return{swiperList:[],noticeList:[],more:"more",pageIndex:1,pageSize:10,total:0,list:[],token:""}},components:{Item:i},mounted:function(){this.token=n.getStorageSync("token"),this.token?(this.get_swiper(),this.get_notice(),this.get_memorials()):n.reLaunch({url:"../auth/auth"})},methods:{scrollBottom:function(){var n=this;this.list.length>=10?this.more="noMore":(this.more="loading",setTimeout((function(){n.more="more"}),1e3))},get_swiper:function(){var n=this;(0,o.home_swiper)({},(function(t){n.swiperList=t.data}))},get_notice:function(){var n=this;(0,o.notice)({},(function(t){console.log(t),n.noticeList=t.data}))},get_memorials:function(){var n=this,t={page:this.pageIndex,pagesize:this.pageSize};(0,o.home_memorials)(t,(function(t){for(var e in t.data)n.list.push(t.data[e])}))},go_memorial:function(t){n.navigateTo({url:"../memorial_hall/memorial_hall"})},go_center:function(){n.navigateTo({url:"../personalCenter/personalCenter"})}}};t.default=a}).call(this,e("543d")["default"])}},[["93d7","common/runtime","common/vendor"]]]);