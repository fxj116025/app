(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar"],{"03f5":function(t,n,e){"use strict";e.d(n,"b",(function(){return u})),e.d(n,"c",(function(){return o})),e.d(n,"a",(function(){return i}));var i={uniIcons:function(){return Promise.all([e.e("common/vendor"),e.e("uni_modules/uni-icons/components/uni-icons/uni-icons")]).then(e.bind(null,"5395"))}},u=function(){var t=this,n=t.$createElement;t._self._c},o=[]},"0b14":function(t,n,e){"use strict";e.r(n);var i=e("03f5"),u=e("b4aa");for(var o in u)"default"!==o&&function(t){e.d(n,t,(function(){return u[t]}))}(o);e("bcbe");var a,r=e("f0c5"),c=Object(r["a"])(u["default"],i["b"],i["c"],!1,null,"03bf6c84",null,!1,i["a"],a);n["default"]=c.exports},a4be:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var i=function(){e.e("uni_modules/uni-nav-bar/components/uni-nav-bar/uni-status-bar").then(function(){return resolve(e("c6c7"))}.bind(null,e)).catch(e.oe)},u={name:"UniNavBar",components:{statusBar:i},props:{title:{type:String,default:""},leftText:{type:String,default:""},rightText:{type:String,default:""},leftIcon:{type:String,default:""},rightIcon:{type:String,default:""},fixed:{type:[Boolean,String],default:!1},color:{type:String,default:"#000000"},backgroundColor:{type:String,default:"#FFFFFF"},statusBar:{type:[Boolean,String],default:!1},shadow:{type:[Boolean,String],default:!1},border:{type:[Boolean,String],default:!0}},mounted:function(){t.report&&""!==this.title&&t.report("title",this.title)},methods:{onClickLeft:function(){this.$emit("clickLeft")},onClickRight:function(){this.$emit("clickRight")},onClickTitle:function(){this.$emit("clickTitle")}}};n.default=u}).call(this,e("543d")["default"])},b4aa:function(t,n,e){"use strict";e.r(n);var i=e("a4be"),u=e.n(i);for(var o in i)"default"!==o&&function(t){e.d(n,t,(function(){return i[t]}))}(o);n["default"]=u.a},bcbe:function(t,n,e){"use strict";var i=e("ffa8"),u=e.n(i);u.a},ffa8:function(t,n,e){}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar-create-component',
    {
        'uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("0b14"))
        })
    },
    [['uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar-create-component']]
]);