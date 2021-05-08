(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.createPlugin = createPlugin;exports.createSubpackageApp = createSubpackageApp;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|Window$|WindowStyle$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}

var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  } };


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


var UUID_KEY = '__DC_STAT_UUID';
var deviceId;
function addUuid(result) {
  deviceId = deviceId || wx.getStorageSync(UUID_KEY);
  if (!deviceId) {
    deviceId = Date.now() + '' + Math.floor(Math.random() * 1e7);
    wx.setStorage({
      key: UUID_KEY,
      data: deviceId });

  }
  result.deviceId = deviceId;
}

function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}

var getSystemInfo = {
  returnValue: function returnValue(result) {
    addUuid(result);
    addSafeAreaInsets(result);
  } };


// import navigateTo from 'uni-helpers/navigate-to'

var protocols = {
  redirectTo: redirectTo,
  // navigateTo,  // 由于在微信开发者工具的页面参数，会显示__id__参数，因此暂时关闭mp-weixin对于navigateTo的AOP
  previewImage: previewImage,
  getSystemInfo: getSystemInfo,
  getSystemInfoSync: getSystemInfo };

var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("The '".concat(methodName, "' method of platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support option '").concat(key, "'"));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("Platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support '".concat(methodName, "'."));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail method '").concat(name, "' not supported") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail service not found' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse || !wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}
if (!MPPage.__$wrappered) {
  MPPage.__$wrappered = true;
  Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('onLoad', options);
    return MPPage(options);
  };
  Page.after = MPPage.after;

  Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('created', options);
    return MPComponent(options);
  };
}

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"VUE_APP_NAME":"os_app","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    // 用于字节跳动小程序模拟抽象节点
    properties.generic = {
      type: Object,
      value: null };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            if (event.detail && event.detail.__args__) {
              extraObj['$' + index] = event.detail.__args__;
            } else {
              extraObj['$' + index] = [event];
            }
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName);

          params = Array.isArray(params) ? params : [];
          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          if (/=\s*\S+\.eventParams\s*\|\|\s*\S+\[['"]event-params['"]\]/.test(handler.toString())) {
            // eslint-disable-next-line no-sparse-arrays
            params = params.concat([,,,,,,,,,, event]);
          }
          ret.push(handler.apply(handlerCtx, params));
        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var eventChannels = {};

var eventChannelStack = [];

function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function initEventChannel() {
  _vue.default.prototype.getOpenerEventChannel = function () {
    // 微信小程序使用自身getOpenerEventChannel
    {
      return this.$scope.getOpenerEventChannel();
    }
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
}

function initScopedSlotsParams() {
  var center = {};
  var parents = {};

  _vue.default.prototype.$hasScopedSlotsParams = function (vueId) {
    var has = center[vueId];
    if (!has) {
      parents[vueId] = this;
      this.$on('hook:destory', function () {
        delete parents[vueId];
      });
    }
    return has;
  };

  _vue.default.prototype.$getScopedSlotsParams = function (vueId, name, key) {
    var data = center[vueId];
    if (data) {
      var object = data[name] || {};
      return key ? object[key] : object;
    } else {
      parents[vueId] = this;
      this.$on('hook:destory', function () {
        delete parents[vueId];
      });
    }
  };

  _vue.default.prototype.$setScopedSlotsParams = function (name, value) {
    var vueId = this.$options.propsData.vueId;
    var object = center[vueId] = center[vueId] || {};
    object[name] = value;
    if (parents[vueId]) {
      parents[vueId].$forceUpdate();
    }
  };

  _vue.default.mixin({
    destroyed: function destroyed() {
      var propsData = this.$options.propsData;
      var vueId = propsData && propsData.vueId;
      if (vueId) {
        delete center[vueId];
        delete parents[vueId];
      }
    } });

}

function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  initEventChannel();
  {
    initScopedSlotsParams();
  }
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;
      if (this.mpType === 'page' && typeof getApp === 'function') {// hack vue-i18n
        var app = getApp();
        if (app.$vm && app.$vm.$i18n) {
          this._i18n = app.$vm.$i18n;
        }
      }
      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (wx.canIUse && !wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function selectAllComponents(mpInstance, selector, $refs) {
  var components = mpInstance.selectAllComponents(selector);
  components.forEach(function (component) {
    var ref = component.dataset.ref;
    $refs[ref] = component.$vm || component;
    {
      if (component.dataset.vueGeneric === 'scoped') {
        component.selectAllComponents('.scoped-ref').forEach(function (scopedComponent) {
          selectAllComponents(scopedComponent, selector, $refs);
        });
      }
    }
  });
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      selectAllComponents(mpInstance, '.vue-ref', $refs);
      // TODO 暂不考虑 for 中的 scoped
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {return '%' + c.charCodeAt(0).toString(16);};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {return encodeURIComponent(str).
  replace(encodeReserveRE, encodeReserveReplacer).
  replace(commaRE, ',');};

function stringifyQuery(obj) {var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encodeStr(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }

    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {return x.length > 0;}).join('&') : null;
  return res ? "?".concat(res) : '';
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery) };

    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

function createSubpackageApp(vm) {
  var appOptions = parseApp(vm);
  var app = getApp({
    allowDefault: true });

  var globalData = app.globalData;
  if (globalData) {
    Object.keys(appOptions.globalData).forEach(function (name) {
      if (!hasOwn(globalData, name)) {
        globalData[name] = appOptions.globalData[name];
      }
    });
  }
  Object.keys(appOptions).forEach(function (name) {
    if (!hasOwn(app, name)) {
      app[name] = appOptions[name];
    }
  });
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {args[_key5] = arguments[_key5];}
      appOptions.onShow.apply(app, args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {args[_key6] = arguments[_key6];}
      appOptions.onHide.apply(app, args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    appOptions.onLaunch.call(app, args);
  }
  return vm;
}

function createPlugin(vm) {
  var appOptions = parseApp(vm);
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {args[_key7] = arguments[_key7];}
      appOptions.onShow.apply(vm, args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {args[_key8] = arguments[_key8];}
      appOptions.onHide.apply(vm, args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    appOptions.onLaunch.call(vm, args);
  }
  return vm;
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;
wx.createSubpackageApp = createSubpackageApp;
wx.createPlugin = createPlugin;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ 10:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 111:
/*!*****************************************************************************!*\
  !*** D:/app/app/os_app/uni_modules/uni-icons/components/uni-icons/icons.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  "pulldown": "\uE588",
  "refreshempty": "\uE461",
  "back": "\uE471",
  "forward": "\uE470",
  "more": "\uE507",
  "more-filled": "\uE537",
  "scan": "\uE612",
  "qq": "\uE264",
  "weibo": "\uE260",
  "weixin": "\uE261",
  "pengyouquan": "\uE262",
  "loop": "\uE565",
  "refresh": "\uE407",
  "refresh-filled": "\uE437",
  "arrowthindown": "\uE585",
  "arrowthinleft": "\uE586",
  "arrowthinright": "\uE587",
  "arrowthinup": "\uE584",
  "undo-filled": "\uE7D6",
  "undo": "\uE406",
  "redo": "\uE405",
  "redo-filled": "\uE7D9",
  "bars": "\uE563",
  "chatboxes": "\uE203",
  "camera": "\uE301",
  "chatboxes-filled": "\uE233",
  "camera-filled": "\uE7EF",
  "cart-filled": "\uE7F4",
  "cart": "\uE7F5",
  "checkbox-filled": "\uE442",
  "checkbox": "\uE7FA",
  "arrowleft": "\uE582",
  "arrowdown": "\uE581",
  "arrowright": "\uE583",
  "smallcircle-filled": "\uE801",
  "arrowup": "\uE580",
  "circle": "\uE411",
  "eye-filled": "\uE568",
  "eye-slash-filled": "\uE822",
  "eye-slash": "\uE823",
  "eye": "\uE824",
  "flag-filled": "\uE825",
  "flag": "\uE508",
  "gear-filled": "\uE532",
  "reload": "\uE462",
  "gear": "\uE502",
  "hand-thumbsdown-filled": "\uE83B",
  "hand-thumbsdown": "\uE83C",
  "hand-thumbsup-filled": "\uE83D",
  "heart-filled": "\uE83E",
  "hand-thumbsup": "\uE83F",
  "heart": "\uE840",
  "home": "\uE500",
  "info": "\uE504",
  "home-filled": "\uE530",
  "info-filled": "\uE534",
  "circle-filled": "\uE441",
  "chat-filled": "\uE847",
  "chat": "\uE263",
  "mail-open-filled": "\uE84D",
  "email-filled": "\uE231",
  "mail-open": "\uE84E",
  "email": "\uE201",
  "checkmarkempty": "\uE472",
  "list": "\uE562",
  "locked-filled": "\uE856",
  "locked": "\uE506",
  "map-filled": "\uE85C",
  "map-pin": "\uE85E",
  "map-pin-ellipse": "\uE864",
  "map": "\uE364",
  "minus-filled": "\uE440",
  "mic-filled": "\uE332",
  "minus": "\uE410",
  "micoff": "\uE360",
  "mic": "\uE302",
  "clear": "\uE434",
  "smallcircle": "\uE868",
  "close": "\uE404",
  "closeempty": "\uE460",
  "paperclip": "\uE567",
  "paperplane": "\uE503",
  "paperplane-filled": "\uE86E",
  "person-filled": "\uE131",
  "contact-filled": "\uE130",
  "person": "\uE101",
  "contact": "\uE100",
  "images-filled": "\uE87A",
  "phone": "\uE200",
  "images": "\uE87B",
  "image": "\uE363",
  "image-filled": "\uE877",
  "location-filled": "\uE333",
  "location": "\uE303",
  "plus-filled": "\uE439",
  "plus": "\uE409",
  "plusempty": "\uE468",
  "help-filled": "\uE535",
  "help": "\uE505",
  "navigate-filled": "\uE884",
  "navigate": "\uE501",
  "mic-slash-filled": "\uE892",
  "search": "\uE466",
  "settings": "\uE560",
  "sound": "\uE590",
  "sound-filled": "\uE8A1",
  "spinner-cycle": "\uE465",
  "download-filled": "\uE8A4",
  "personadd-filled": "\uE132",
  "videocam-filled": "\uE8AF",
  "personadd": "\uE102",
  "upload": "\uE402",
  "upload-filled": "\uE8B1",
  "starhalf": "\uE463",
  "star-filled": "\uE438",
  "star": "\uE408",
  "trash": "\uE401",
  "phone-filled": "\uE230",
  "compose": "\uE400",
  "videocam": "\uE300",
  "trash-filled": "\uE8DC",
  "download": "\uE403",
  "chatbubble-filled": "\uE232",
  "chatbubble": "\uE202",
  "cloud-download": "\uE8E4",
  "cloud-upload-filled": "\uE8E5",
  "cloud-upload": "\uE8E6",
  "cloud-download-filled": "\uE8E9",
  "headphones": "\uE8BF",
  "shop": "\uE609" };exports.default = _default;

/***/ }),

/***/ 133:
/*!*****************************************************************************!*\
  !*** D:/app/app/os_app/uni_modules/uni-popup/components/uni-popup/popup.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _message = _interopRequireDefault(__webpack_require__(/*! ./message.js */ 134));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
// 定义 type 类型:弹出类型：top/bottom/center
var config = {
  // 顶部弹出
  top: 'top',
  // 底部弹出
  bottom: 'bottom',
  // 居中弹出
  center: 'center',
  // 消息提示
  message: 'top',
  // 对话框
  dialog: 'center',
  // 分享
  share: 'bottom' };var _default =


{
  data: function data() {
    return {
      config: config,
      popupWidth: 0,
      popupHeight: 0 };

  },
  mixins: [_message.default],
  computed: {
    isDesktop: function isDesktop() {
      return this.popupWidth >= 500 && this.popupHeight >= 500;
    } },

  mounted: function mounted() {var _this = this;
    var fixSize = function fixSize() {var _uni$getSystemInfoSyn =




      uni.getSystemInfoSync(),windowWidth = _uni$getSystemInfoSyn.windowWidth,windowHeight = _uni$getSystemInfoSyn.windowHeight,windowTop = _uni$getSystemInfoSyn.windowTop;
      _this.popupWidth = windowWidth;
      _this.popupHeight = windowHeight + windowTop;
    };
    fixSize();






  } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 134:
/*!*******************************************************************************!*\
  !*** D:/app/app/os_app/uni_modules/uni-popup/components/uni-popup/message.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  created: function created() {
    if (this.type === 'message') {
      // 不显示遮罩
      this.maskShow = false;
      // 获取子组件对象
      this.childrenMsg = null;
    }
  },
  methods: {
    customOpen: function customOpen() {
      if (this.childrenMsg) {
        this.childrenMsg.open();
      }
    },
    customClose: function customClose() {
      if (this.childrenMsg) {
        this.childrenMsg.close();
      }
    } } };exports.default = _default;

/***/ }),

/***/ 142:
/*!******************************************!*\
  !*** D:/app/app/os_app/common/base64.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.imaga64 = void 0;var imaga64 = {
  bg1: "data:image/png;base64,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",
  bg2: "data:image/png;base64,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",
  bg3: "data:image/png;base64,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" };exports.imaga64 = imaga64;

/***/ }),

/***/ 143:
/*!***********************************************!*\
  !*** D:/app/app/os_app/static/images/yy2.png ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 144:
/*!************************************************!*\
  !*** D:/app/app/os_app/static/images/jyy2.png ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 17:
/*!****************************************!*\
  !*** D:/app/app/os_app/common/http.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.login = login;exports.home_swiper = home_swiper;exports.notice = notice;exports.home_memorials = home_memorials;exports.userInfo = userInfo;exports.execJobs = execJobs;exports.blessJobs = blessJobs;exports.sacrifice = sacrifice;exports.memorial_detail = memorial_detail;exports.staticDetail = staticDetail;exports.memorialSorrow = memorialSorrow;exports.userMyFocus = userMyFocus;exports.memorialAction = memorialAction;exports.recharge = recharge;exports.getPayConf = getPayConf;






var _request = __webpack_require__(/*! ./request.js */ 18); /* 
                                         @author fxj 
                                        			2021-04-27
                                         @version v0.1
                                         */

//授权登录
function login(data, callback) {
  (0, _request.postRequest)('/user/miniLogin', data).then(function (res) {
    callback(res);
  });
}

// 首页轮播请求
function home_swiper(data, callback) {
  (0, _request.postRequest)('/index/lunbotu', data).then(function (res) {
    callback(res);
  });
}

// 首页公告
function notice(data, callback) {
  (0, _request.postRequest)('/index/notice', data).then(function (res) {
    callback(res);
  });
}

// 首页纪念馆
function home_memorials(data, callback) {
  (0, _request.postRequest)('/index/memorial', data).then(function (res) {
    callback(res);
  });
}
// 个人中心用户信息
function userInfo(data, callback) {
  (0, _request.postRequest)('/user/personalInfo', data).then(function (res) {
    callback(res);
  });
}

// 任务公共接口
function execJobs(data, callback) {
  (0, _request.postRequest)('/user/execJobs', data).then(function (res) {
    callback(res);
  });
}

// 用户行为
function memorialAction(data, callback) {
  (0, _request.postRequest)('/memorial/action', data).then(function (res) {
    callback(res);
  });
}



// 任务列表
function blessJobs(data, callback) {
  (0, _request.postRequest)('/user/blessJobs', data).then(function (res) {
    callback(res);
  });
}
// 祭品列表
function sacrifice(data, callback) {
  (0, _request.postRequest)('/memorial/sacrifice', data).then(function (res) {
    callback(res);
  });
}


// 纪念馆主页Html
function memorial_detail(data, callback) {
  (0, _request.postRequest)('/memorial/detail', data).then(function (res) {
    callback(res);
  });
}
// 纪念馆数据
function staticDetail(data, callback) {
  (0, _request.postRequest)('/memorial/staticDetail', data).then(function (res) {
    callback(res);
  });
}
// 纪念馆留言
function memorialSorrow(data, callback) {
  (0, _request.postRequest)('/memorial/sorrow', data).then(function (res) {
    callback(res);
  });
}

// 关注的纪念馆
function userMyFocus(data, callback) {
  (0, _request.postRequest)('/user/myFocus', data).then(function (res) {
    callback(res);
  });
}

// 支付配置
function getPayConf(data, callback) {
  (0, _request.postRequest)('/recharge_log/getPayConf', data).then(function (res) {
    callback(res);
  });
}
// 充值
function recharge(data, callback) {
  (0, _request.postRequest)('/recharge_log/createOrder', data).then(function (res) {
    callback(res);
  });
}

/***/ }),

/***/ 173:
/*!*************************************************************************************************!*\
  !*** D:/app/app/os_app/uni_modules/uni-transition/components/uni-transition/createAnimation.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.createAnimation = createAnimation;function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;} // const defaultOption = {
// 	duration: 300,
// 	timingFunction: 'linear',
// 	delay: 0,
// 	transformOrigin: '50% 50% 0'
// }
var


MPAnimation = /*#__PURE__*/function () {
  function MPAnimation(options, _this) {_classCallCheck(this, MPAnimation);
    this.options = options;
    this.animation = uni.createAnimation(options);
    this.currentStepAnimates = {};
    this.next = 0;
    this.$ = _this;

  }_createClass(MPAnimation, [{ key: "_nvuePushAnimates", value: function _nvuePushAnimates(

    type, args) {
      var aniObj = this.currentStepAnimates[this.next];
      var styles = {};
      if (!aniObj) {
        styles = {
          styles: {},
          config: {} };

      } else {
        styles = aniObj;
      }
      if (animateTypes1.includes(type)) {
        if (!styles.styles.transform) {
          styles.styles.transform = '';
        }
        var unit = '';
        if (type === 'rotate') {
          unit = 'deg';
        }
        styles.styles.transform += "".concat(type, "(").concat(args + unit, ") ");
      } else {
        styles.styles[type] = "".concat(args);
      }
      this.currentStepAnimates[this.next] = styles;
    } }, { key: "_animateRun", value: function _animateRun()
    {var styles = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var ref = this.$.$refs['ani'].ref;
      if (!ref) return;
      return new Promise(function (resolve, reject) {
        nvueAnimation.transition(ref, _objectSpread({
          styles: styles },
        config),
        function (res) {
          resolve();
        });
      });
    } }, { key: "_nvueNextAnimate", value: function _nvueNextAnimate(

    animates) {var _this2 = this;var step = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;var fn = arguments.length > 2 ? arguments[2] : undefined;
      var obj = animates[step];
      if (obj) {var

        styles =

        obj.styles,config = obj.config;
        this._animateRun(styles, config).then(function () {
          step += 1;
          _this2._nvueNextAnimate(animates, step, fn);
        });
      } else {
        this.currentStepAnimates = {};
        typeof fn === 'function' && fn();
        this.isEnd = true;
      }
    } }, { key: "step", value: function step()

    {var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      this.animation.step(config);






      return this;
    } }, { key: "run", value: function run(

    fn) {

      this.$.animationData = this.animation.export();
      this.$.timer = setTimeout(function () {
        typeof fn === 'function' && fn();
      }, this.$.durationTime);






    } }]);return MPAnimation;}();



var animateTypes1 = ['matrix', 'matrix3d', 'rotate', 'rotate3d', 'rotateX', 'rotateY', 'rotateZ', 'scale', 'scale3d',
'scaleX', 'scaleY', 'scaleZ', 'skew', 'skewX', 'skewY', 'translate', 'translate3d', 'translateX', 'translateY',
'translateZ'];

var animateTypes2 = ['opacity', 'backgroundColor'];
var animateTypes3 = ['width', 'height', 'left', 'right', 'top', 'bottom'];
animateTypes1.concat(animateTypes2, animateTypes3).forEach(function (type) {
  MPAnimation.prototype[type] = function () {var _this$animation;

    (_this$animation = this.animation)[type].apply(_this$animation, arguments);




    return this;
  };
});

function createAnimation(option, _this) {
  if (!_this) return;
  clearTimeout(_this.timer);
  return new MPAnimation(option, _this);
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 18:
/*!*******************************************!*\
  !*** D:/app/app/os_app/common/request.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.postRequest = postRequest;exports.getRequest = getRequest; /* 
                                                                                                                                               @author fxj 
                                                                                                                                              			2021-04-27
                                                                                                                                               @version v0.1
                                                                                                                                               */

var APP_URL = 'https://t.mem.wmys9.com';

//GET请求封装
function getRequest(url, data) {
  return promise = new Promise(function (resolve, reject) {
    var postData = data;
    if (uni.getStorageSync('token')) {
      postData.token = uni.getStorageSync('token');
    }
    uni.request({
      url: APP_URL + url,
      data: postData,
      method: "GET",
      dataType: 'json',
      header: {
        'content-type': 'application/json' },

      success: function success(res) {
        if (res.statusCode === 200 && res.data.code === 1) {
          resolve(res.data);
        } else {
          uni.showToast({
            title: res.data.msg || '请求失败',
            icon: 'none',
            duration: 2000 });

        }
      },
      error: function error(e) {
        uni.showToast({
          title: '网络错误',
          icon: 'none',
          duration: 2000 });

      } });

  });
}


//post请求封装
function postRequest(url, data) {
  uni.showLoading({
    title: '加载中',
    mask: true });

  return new Promise(function (resolve, reject) {
    var postData = data;
    if (uni.getStorageSync('token')) {
      postData.token = uni.getStorageSync('token');
    }
    uni.request({
      url: APP_URL + url,
      data: postData,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' },

      success: function success(res) {
        uni.hideLoading();
        if (res.statusCode === 200 && res.data.code === 1) {
          resolve(res.data);
        } else {
          if (url != '/user/execJobs') {
            uni.showToast({
              title: res.data.msg || '请求失败',
              icon: 'none',
              duration: 2000 });

          }
        }
      },
      error: function error(e) {
        uni.showToast({
          title: '网络错误',
          icon: 'none',
          duration: 2000 });

      } });

  });
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2021 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i, i++)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"VUE_APP_NAME":"os_app","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"VUE_APP_NAME":"os_app","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_NAME":"os_app","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"VUE_APP_NAME":"os_app","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = typeof getApp === 'function' && getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onInit',
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 4:
/*!************************************!*\
  !*** D:/app/app/os_app/pages.json ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map