(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/attention/attention"],{"68cc":function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=t("e893"),i=function(){t.e("components/item/item").then(function(){return resolve(t("6728"))}.bind(null,t)).catch(t.oe)},u={components:{Item:i},data:function(){return{more:"more",pageIndex:1,pageSize:10,list:[]}},mounted:function(){this.init()},methods:{init:function(){var n=this,e={page:this.pageIndex,page_size:this.pageSize};(0,o.userMyFocus)(e,(function(e){for(var t in e.data)n.list.push(e.data[t])}))},scrollBottom:function(){var n=this;console.log(0),this.list.length>=10?this.more="noMore":(this.more="loading",setTimeout((function(){n.more="more"}),1e3))}}};e.default=u},"99ef":function(n,e,t){},b43e:function(n,e,t){"use strict";t.r(e);var o=t("f3e3"),i=t("b64b");for(var u in i)"default"!==u&&function(n){t.d(e,n,(function(){return i[n]}))}(u);t("eec1");var c,r=t("f0c5"),a=Object(r["a"])(i["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],c);e["default"]=a.exports},b64b:function(n,e,t){"use strict";t.r(e);var o=t("68cc"),i=t.n(o);for(var u in o)"default"!==u&&function(n){t.d(e,n,(function(){return o[n]}))}(u);e["default"]=i.a},cd5c:function(n,e,t){"use strict";(function(n){t("286c");o(t("66fd"));var e=o(t("b43e"));function o(n){return n&&n.__esModule?n:{default:n}}n(e.default)}).call(this,t("543d")["createPage"])},eec1:function(n,e,t){"use strict";var o=t("99ef"),i=t.n(o);i.a},f3e3:function(n,e,t){"use strict";t.d(e,"b",(function(){return i})),t.d(e,"c",(function(){return u})),t.d(e,"a",(function(){return o}));var o={uniLoadMore:function(){return t.e("uni_modules/uni-load-more/components/uni-load-more/uni-load-more").then(t.bind(null,"331d"))}},i=function(){var n=this,e=n.$createElement;n._self._c},u=[]}},[["cd5c","common/runtime","common/vendor"]]]);