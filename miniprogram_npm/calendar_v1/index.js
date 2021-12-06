! function (e) {
  var t = {};

  function a(n) {
    if (t[n]) return t[n].exports;
    var r = t[n] = {
      i: n,
      l: !1,
      exports: {}
    };
    return e[n].call(r.exports, r, r.exports, a), r.l = !0, r.exports
  }
  a.m = e, a.c = t, a.d = function (e, t, n) {
    a.o(e, t) || Object.defineProperty(e, t, {
      enumerable: !0,
      get: n
    })
  }, a.r = function (e) {
    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
      value: "Module"
    }), Object.defineProperty(e, "__esModule", {
      value: !0
    })
  }, a.t = function (e, t) {
    if (1 & t && (e = a(e)), 8 & t) return e;
    if (4 & t && "object" == typeof e && e && e.__esModule) return e;
    var n = Object.create(null);
    if (a.r(n), Object.defineProperty(n, "default", {
        enumerable: !0,
        value: e
      }), 2 & t && "string" != typeof e)
      for (var r in e) a.d(n, r, function (t) {
        return e[t]
      }.bind(null, r));
    return n
  }, a.n = function (e) {
    var t = e && e.__esModule ? function () {
      return e.default
    } : function () {
      return e
    };
    return a.d(t, "a", t), t
  }, a.o = function (e, t) {
    return Object.prototype.hasOwnProperty.call(e, t)
  }, a.p = "", a(a.s = 8)
}([function (e, t, a) {
  "use strict";
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0;
  var n = class {
    constructor(e) {
      this.Component = e
    }
    getData(e) {
      const t = this.Component.data;
      if (!e) return t;
      if (e.includes(".")) {
        return e.split(".").reduce((e, t) => e[t], t)
      }
      return this.Component.data[e]
    }
    setData(e, t = (() => {})) {
      e && "object" == typeof e && this.Component.setData(e, t)
    }
  };
  t.default = n
}, function (e, t, a) {
  "use strict";
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.getSystemInfo = o, t.isComponent = function (e) {
    return e && void 0 !== e.__wxExparserNodeId__ && "function" == typeof e.setData
  }, t.isIos = i, t.shallowEqual = function e(t, a) {
    if (t === a) return !0;
    if ("object" == typeof t && null != t && "object" == typeof a && null != a) {
      if (Object.keys(t).length !== Object.keys(a).length) return !1;
      for (var n in t) {
        if (!a.hasOwnProperty(n)) return !1;
        if (!e(t[n], a[n])) return !1
      }
      return !0
    }
    return !1
  }, t.getCurrentPage = d, t.getComponent = function (e) {
    const t = new c;
    let a = d() || {};
    if (a.selectComponent && "function" == typeof a.selectComponent) {
      if (e) return a.selectComponent(e);
      t.warn("请传入组件ID")
    } else t.warn("该基础库暂不支持多个小程序日历组件")
  }, t.uniqueArrayByDate = function (e = []) {
    let t = {},
      a = [];
    e.forEach(e => {
      t[`${e.year}-${e.month}-${e.day}`] = e
    });
    for (let e in t) a.push(t[e]);
    return a
  }, t.delRepeatedEnableDay = function (e = [], t = []) {
    let a, n;
    if (2 === t.length) {
      const {
        startTimestamp: e,
        endTimestamp: r
      } = f(t);
      a = e, n = r
    }
    const r = h(e);
    return r.filter(e => e < a || e > n)
  }, t.convertEnableAreaToTimestamp = f, t.getDateTimeStamp = b, t.converEnableDaysToTimestamp = h, t.initialTasks = t.GetDate = t.Slide = t.Logger = void 0;
  var n, r = (n = a(2)) && n.__esModule ? n : {
    default: n
  };
  let s;

  function o() {
    return s || (s = wx.getSystemInfoSync(), s)
  }
  class c {
    info(e) {
      console.log("%cInfo: %c" + e, "color:#FF0080;font-weight:bold", "color: #FF509B")
    }
    warn(e) {
      console.log("%cWarn: %c" + e, "color:#FF6600;font-weight:bold", "color: #FF9933")
    }
    tips(e) {
      console.log("%cTips: %c" + e, "color:#00B200;font-weight:bold", "color: #00CC33")
    }
  }
  t.Logger = c;
  t.Slide = class {
    isUp(e = {}, t = {}) {
      const {
        startX: a,
        startY: n
      } = e, r = t.clientX - a;
      return t.clientY - n < -60 && r < 20 && r > -20 && (this.slideLock = !1, !0)
    }
    isDown(e = {}, t = {}) {
      const {
        startX: a,
        startY: n
      } = e, r = t.clientX - a;
      return t.clientY - n > 60 && r < 20 && r > -20
    }
    isLeft(e = {}, t = {}) {
      const {
        startX: a,
        startY: n
      } = e, r = t.clientX - a, s = t.clientY - n;
      return r < -60 && s < 20 && s > -20
    }
    isRight(e = {}, t = {}) {
      const {
        startX: a,
        startY: n
      } = e, r = t.clientX - a, s = t.clientY - n;
      return r > 60 && s < 20 && s > -20
    }
  };
  class l {
    newDate(e, t, a) {
      let n = `${+e}-${+t}-${+a}`;
      return i() && (n = `${+e}/${+t}/${+a}`), new Date(n)
    }
    thisMonthDays(e, t) {
      return new Date(Date.UTC(e, t, 0)).getUTCDate()
    }
    firstDayOfWeek(e, t) {
      return new Date(Date.UTC(e, t - 1, 1)).getUTCDay()
    }
    dayOfWeek(e, t, a) {
      return new Date(Date.UTC(e, t - 1, a)).getUTCDay()
    }
    todayDate() {
      const e = new Date;
      return {
        year: e.getFullYear(),
        month: e.getMonth() + 1,
        date: e.getDate()
      }
    }
    todayTimestamp() {
      const {
        year: e,
        month: t,
        date: a
      } = this.todayDate();
      return this.newDate(e, t, a).getTime()
    }
    toTimeStr(e) {
      return e.day && (e.date = e.day), `${+e.year}-${+e.month}-${+e.date}`
    }
    sortDates(e, t) {
      return e.sort((function (e, a) {
        return b(e) < b(a) && "desc" !== t ? -1 : 1
      }))
    }
    prevMonth(e) {
      return +e.month > 1 ? {
        year: e.year,
        month: e.month - 1
      } : {
        year: e.year - 1,
        month: 12
      }
    }
    nextMonth(e) {
      return +e.month < 12 ? {
        year: e.year,
        month: e.month + 1
      } : {
        year: e.year + 1,
        month: 1
      }
    }
    convertLunar(e = []) {
      return e.map(e => (e && (e.lunar = r.default.solar2lunar(+e.year, +e.month, +e.day)), e))
    }
  }

  function i() {
    const e = o();
    return /iphone|ios/i.test(e.platform)
  }

  function d() {
    const e = getCurrentPages();
    return e[e.length - 1]
  }

  function f(e = []) {
    const t = new l,
      a = e[0].split("-"),
      n = e[1].split("-"),
      r = new c;
    if (3 !== a.length || 3 !== n.length) return r.warn('enableArea() 参数格式为: ["2018-2-1", "2018-3-1"]'), {};
    return {
      start: a,
      end: n,
      startTimestamp: t.newDate(a[0], a[1], a[2]).getTime(),
      endTimestamp: t.newDate(n[0], n[1], n[2]).getTime()
    }
  }

  function b(e) {
    if ("[object Object]" !== Object.prototype.toString.call(e)) return;
    return (new l).newDate(e.year, e.month, e.day).getTime()
  }

  function h(e = []) {
    const t = new c,
      a = new l,
      n = [];
    return e.forEach(e => {
      if ("string" != typeof e) return t.warn("enableDays()入参日期格式错误");
      const r = e.split("-");
      if (3 !== r.length) return t.warn("enableDays()入参日期格式错误");
      const s = a.newDate(r[0], r[1], r[2]).getTime();
      n.push(s)
    }), n
  }
  t.GetDate = l;
  t.initialTasks = {
    flag: "finished",
    tasks: []
  }
}, function (e, t, a) {
  "use strict";
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0;
  const n = {
      lunarInfo: [19416, 19168, 42352, 21717, 53856, 55632, 91476, 22176, 39632, 21970, 19168, 42422, 42192, 53840, 119381, 46400, 54944, 44450, 38320, 84343, 18800, 42160, 46261, 27216, 27968, 109396, 11104, 38256, 21234, 18800, 25958, 54432, 59984, 28309, 23248, 11104, 100067, 37600, 116951, 51536, 54432, 120998, 46416, 22176, 107956, 9680, 37584, 53938, 43344, 46423, 27808, 46416, 86869, 19872, 42416, 83315, 21168, 43432, 59728, 27296, 44710, 43856, 19296, 43748, 42352, 21088, 62051, 55632, 23383, 22176, 38608, 19925, 19152, 42192, 54484, 53840, 54616, 46400, 46752, 103846, 38320, 18864, 43380, 42160, 45690, 27216, 27968, 44870, 43872, 38256, 19189, 18800, 25776, 29859, 59984, 27480, 21952, 43872, 38613, 37600, 51552, 55636, 54432, 55888, 30034, 22176, 43959, 9680, 37584, 51893, 43344, 46240, 47780, 44368, 21977, 19360, 42416, 86390, 21168, 43312, 31060, 27296, 44368, 23378, 19296, 42726, 42208, 53856, 60005, 54576, 23200, 30371, 38608, 19195, 19152, 42192, 118966, 53840, 54560, 56645, 46496, 22224, 21938, 18864, 42359, 42160, 43600, 111189, 27936, 44448, 84835, 37744, 18936, 18800, 25776, 92326, 59984, 27424, 108228, 43744, 41696, 53987, 51552, 54615, 54432, 55888, 23893, 22176, 42704, 21972, 21200, 43448, 43344, 46240, 46758, 44368, 21920, 43940, 42416, 21168, 45683, 26928, 29495, 27296, 44368, 84821, 19296, 42352, 21732, 53600, 59752, 54560, 55968, 92838, 22224, 19168, 43476, 41680, 53584, 62034, 54560],
      solarMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
      Gan: ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"],
      Zhi: ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"],
      Animals: ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"],
      solarTerm: ["小寒", "大寒", "立春", "雨水", "惊蛰", "春分", "清明", "谷雨", "立夏", "小满", "芒种", "夏至", "小暑", "大暑", "立秋", "处暑", "白露", "秋分", "寒露", "霜降", "立冬", "小雪", "大雪", "冬至"],
      sTermInfo: ["9778397bd097c36b0b6fc9274c91aa", "97b6b97bd19801ec9210c965cc920e", "97bcf97c3598082c95f8c965cc920f", "97bd0b06bdb0722c965ce1cfcc920f", "b027097bd097c36b0b6fc9274c91aa", "97b6b97bd19801ec9210c965cc920e", "97bcf97c359801ec95f8c965cc920f", "97bd0b06bdb0722c965ce1cfcc920f", "b027097bd097c36b0b6fc9274c91aa", "97b6b97bd19801ec9210c965cc920e", "97bcf97c359801ec95f8c965cc920f", "97bd0b06bdb0722c965ce1cfcc920f", "b027097bd097c36b0b6fc9274c91aa", "9778397bd19801ec9210c965cc920e", "97b6b97bd19801ec95f8c965cc920f", "97bd09801d98082c95f8e1cfcc920f", "97bd097bd097c36b0b6fc9210c8dc2", "9778397bd197c36c9210c9274c91aa", "97b6b97bd19801ec95f8c965cc920e", "97bd09801d98082c95f8e1cfcc920f", "97bd097bd097c36b0b6fc9210c8dc2", "9778397bd097c36c9210c9274c91aa", "97b6b97bd19801ec95f8c965cc920e", "97bcf97c3598082c95f8e1cfcc920f", "97bd097bd097c36b0b6fc9210c8dc2", "9778397bd097c36c9210c9274c91aa", "97b6b97bd19801ec9210c965cc920e", "97bcf97c3598082c95f8c965cc920f", "97bd097bd097c35b0b6fc920fb0722", "9778397bd097c36b0b6fc9274c91aa", "97b6b97bd19801ec9210c965cc920e", "97bcf97c3598082c95f8c965cc920f", "97bd097bd097c35b0b6fc920fb0722", "9778397bd097c36b0b6fc9274c91aa", "97b6b97bd19801ec9210c965cc920e", "97bcf97c359801ec95f8c965cc920f", "97bd097bd097c35b0b6fc920fb0722", "9778397bd097c36b0b6fc9274c91aa", "97b6b97bd19801ec9210c965cc920e", "97bcf97c359801ec95f8c965cc920f", "97bd097bd097c35b0b6fc920fb0722", "9778397bd097c36b0b6fc9274c91aa", "97b6b97bd19801ec9210c965cc920e", "97bcf97c359801ec95f8c965cc920f", "97bd097bd07f595b0b6fc920fb0722", "9778397bd097c36b0b6fc9210c8dc2", "9778397bd19801ec9210c9274c920e", "97b6b97bd19801ec95f8c965cc920f", "97bd07f5307f595b0b0bc920fb0722", "7f0e397bd097c36b0b6fc9210c8dc2", "9778397bd097c36c9210c9274c920e", "97b6b97bd19801ec95f8c965cc920f", "97bd07f5307f595b0b0bc920fb0722", "7f0e397bd097c36b0b6fc9210c8dc2", "9778397bd097c36c9210c9274c91aa", "97b6b97bd19801ec9210c965cc920e", "97bd07f1487f595b0b0bc920fb0722", "7f0e397bd097c36b0b6fc9210c8dc2", "9778397bd097c36b0b6fc9274c91aa", "97b6b97bd19801ec9210c965cc920e", "97bcf7f1487f595b0b0bb0b6fb0722", "7f0e397bd097c35b0b6fc920fb0722", "9778397bd097c36b0b6fc9274c91aa", "97b6b97bd19801ec9210c965cc920e", "97bcf7f1487f595b0b0bb0b6fb0722", "7f0e397bd097c35b0b6fc920fb0722", "9778397bd097c36b0b6fc9274c91aa", "97b6b97bd19801ec9210c965cc920e", "97bcf7f1487f531b0b0bb0b6fb0722", "7f0e397bd097c35b0b6fc920fb0722", "9778397bd097c36b0b6fc9274c91aa", "97b6b97bd19801ec9210c965cc920e", "97bcf7f1487f531b0b0bb0b6fb0722", "7f0e397bd07f595b0b6fc920fb0722", "9778397bd097c36b0b6fc9274c91aa", "97b6b97bd19801ec9210c9274c920e", "97bcf7f0e47f531b0b0bb0b6fb0722", "7f0e397bd07f595b0b0bc920fb0722", "9778397bd097c36b0b6fc9210c91aa", "97b6b97bd197c36c9210c9274c920e", "97bcf7f0e47f531b0b0bb0b6fb0722", "7f0e397bd07f595b0b0bc920fb0722", "9778397bd097c36b0b6fc9210c8dc2", "9778397bd097c36c9210c9274c920e", "97b6b7f0e47f531b0723b0b6fb0722", "7f0e37f5307f595b0b0bc920fb0722", "7f0e397bd097c36b0b6fc9210c8dc2", "9778397bd097c36b0b70c9274c91aa", "97b6b7f0e47f531b0723b0b6fb0721", "7f0e37f1487f595b0b0bb0b6fb0722", "7f0e397bd097c35b0b6fc9210c8dc2", "9778397bd097c36b0b6fc9274c91aa", "97b6b7f0e47f531b0723b0b6fb0721", "7f0e27f1487f595b0b0bb0b6fb0722", "7f0e397bd097c35b0b6fc920fb0722", "9778397bd097c36b0b6fc9274c91aa", "97b6b7f0e47f531b0723b0b6fb0721", "7f0e27f1487f531b0b0bb0b6fb0722", "7f0e397bd097c35b0b6fc920fb0722", "9778397bd097c36b0b6fc9274c91aa", "97b6b7f0e47f531b0723b0b6fb0721", "7f0e27f1487f531b0b0bb0b6fb0722", "7f0e397bd097c35b0b6fc920fb0722", "9778397bd097c36b0b6fc9274c91aa", "97b6b7f0e47f531b0723b0b6fb0721", "7f0e27f1487f531b0b0bb0b6fb0722", "7f0e397bd07f595b0b0bc920fb0722", "9778397bd097c36b0b6fc9274c91aa", "97b6b7f0e47f531b0723b0787b0721", "7f0e27f0e47f531b0b0bb0b6fb0722", "7f0e397bd07f595b0b0bc920fb0722", "9778397bd097c36b0b6fc9210c91aa", "97b6b7f0e47f149b0723b0787b0721", "7f0e27f0e47f531b0723b0b6fb0722", "7f0e397bd07f595b0b0bc920fb0722", "9778397bd097c36b0b6fc9210c8dc2", "977837f0e37f149b0723b0787b0721", "7f07e7f0e47f531b0723b0b6fb0722", "7f0e37f5307f595b0b0bc920fb0722", "7f0e397bd097c35b0b6fc9210c8dc2", "977837f0e37f14998082b0787b0721", "7f07e7f0e47f531b0723b0b6fb0721", "7f0e37f1487f595b0b0bb0b6fb0722", "7f0e397bd097c35b0b6fc9210c8dc2", "977837f0e37f14998082b0787b06bd", "7f07e7f0e47f531b0723b0b6fb0721", "7f0e27f1487f531b0b0bb0b6fb0722", "7f0e397bd097c35b0b6fc920fb0722", "977837f0e37f14998082b0787b06bd", "7f07e7f0e47f531b0723b0b6fb0721", "7f0e27f1487f531b0b0bb0b6fb0722", "7f0e397bd097c35b0b6fc920fb0722", "977837f0e37f14998082b0787b06bd", "7f07e7f0e47f531b0723b0b6fb0721", "7f0e27f1487f531b0b0bb0b6fb0722", "7f0e397bd07f595b0b0bc920fb0722", "977837f0e37f14998082b0787b06bd", "7f07e7f0e47f531b0723b0b6fb0721", "7f0e27f1487f531b0b0bb0b6fb0722", "7f0e397bd07f595b0b0bc920fb0722", "977837f0e37f14998082b0787b06bd", "7f07e7f0e47f149b0723b0787b0721", "7f0e27f0e47f531b0b0bb0b6fb0722", "7f0e397bd07f595b0b0bc920fb0722", "977837f0e37f14998082b0723b06bd", "7f07e7f0e37f149b0723b0787b0721", "7f0e27f0e47f531b0723b0b6fb0722", "7f0e397bd07f595b0b0bc920fb0722", "977837f0e37f14898082b0723b02d5", "7ec967f0e37f14998082b0787b0721", "7f07e7f0e47f531b0723b0b6fb0722", "7f0e37f1487f595b0b0bb0b6fb0722", "7f0e37f0e37f14898082b0723b02d5", "7ec967f0e37f14998082b0787b0721", "7f07e7f0e47f531b0723b0b6fb0722", "7f0e37f1487f531b0b0bb0b6fb0722", "7f0e37f0e37f14898082b0723b02d5", "7ec967f0e37f14998082b0787b06bd", "7f07e7f0e47f531b0723b0b6fb0721", "7f0e37f1487f531b0b0bb0b6fb0722", "7f0e37f0e37f14898082b072297c35", "7ec967f0e37f14998082b0787b06bd", "7f07e7f0e47f531b0723b0b6fb0721", "7f0e27f1487f531b0b0bb0b6fb0722", "7f0e37f0e37f14898082b072297c35", "7ec967f0e37f14998082b0787b06bd", "7f07e7f0e47f531b0723b0b6fb0721", "7f0e27f1487f531b0b0bb0b6fb0722", "7f0e37f0e366aa89801eb072297c35", "7ec967f0e37f14998082b0787b06bd", "7f07e7f0e47f149b0723b0787b0721", "7f0e27f1487f531b0b0bb0b6fb0722", "7f0e37f0e366aa89801eb072297c35", "7ec967f0e37f14998082b0723b06bd", "7f07e7f0e47f149b0723b0787b0721", "7f0e27f0e47f531b0723b0b6fb0722", "7f0e37f0e366aa89801eb072297c35", "7ec967f0e37f14998082b0723b06bd", "7f07e7f0e37f14998083b0787b0721", "7f0e27f0e47f531b0723b0b6fb0722", "7f0e37f0e366aa89801eb072297c35", "7ec967f0e37f14898082b0723b02d5", "7f07e7f0e37f14998082b0787b0721", "7f07e7f0e47f531b0723b0b6fb0722", "7f0e36665b66aa89801e9808297c35", "665f67f0e37f14898082b0723b02d5", "7ec967f0e37f14998082b0787b0721", "7f07e7f0e47f531b0723b0b6fb0722", "7f0e36665b66a449801e9808297c35", "665f67f0e37f14898082b0723b02d5", "7ec967f0e37f14998082b0787b06bd", "7f07e7f0e47f531b0723b0b6fb0721", "7f0e36665b66a449801e9808297c35", "665f67f0e37f14898082b072297c35", "7ec967f0e37f14998082b0787b06bd", "7f07e7f0e47f531b0723b0b6fb0721", "7f0e26665b66a449801e9808297c35", "665f67f0e37f1489801eb072297c35", "7ec967f0e37f14998082b0787b06bd", "7f07e7f0e47f531b0723b0b6fb0721", "7f0e27f1487f531b0b0bb0b6fb0722"],
      nStr1: ["日", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十"],
      nStr2: ["初", "十", "廿", "卅"],
      nStr3: ["正", "二", "三", "四", "五", "六", "七", "八", "九", "十", "冬", "腊"],
      lYearDays: function (e) {
        let t, a = 348;
        for (t = 32768; t > 8; t >>= 1) a += n.lunarInfo[e - 1900] & t ? 1 : 0;
        return a + n.leapDays(e)
      },
      leapMonth: function (e) {
        return 15 & n.lunarInfo[e - 1900]
      },
      leapDays: function (e) {
        return n.leapMonth(e) ? 65536 & n.lunarInfo[e - 1900] ? 30 : 29 : 0
      },
      monthDays: function (e, t) {
        return t > 12 || t < 1 ? -1 : n.lunarInfo[e - 1900] & 65536 >> t ? 30 : 29
      },
      solarDays: function (e, t) {
        if (t > 12 || t < 1) return -1;
        const a = t - 1;
        return 1 == +a ? e % 4 == 0 && e % 100 != 0 || e % 400 == 0 ? 29 : 28 : n.solarMonth[a]
      },
      toGanZhiYear: function (e) {
        let t = (e - 3) % 10,
          a = (e - 3) % 12;
        return 0 == +t && (t = 10), 0 == +a && (a = 12), n.Gan[t - 1] + n.Zhi[a - 1]
      },
      toAstro: function (e, t) {
        return "魔羯水瓶双鱼白羊金牛双子巨蟹狮子处女天秤天蝎射手魔羯".substr(2 * e - (t < [20, 19, 21, 21, 21, 22, 23, 23, 23, 23, 22, 22][e - 1] ? 2 : 0), 2) + "座"
      },
      toGanZhi: function (e) {
        return n.Gan[e % 10] + n.Zhi[e % 12]
      },
      getTerm: function (e, t) {
        if (e < 1900 || e > 2100) return -1;
        if (t < 1 || t > 24) return -1;
        const a = n.sTermInfo[e - 1900],
          r = [parseInt("0x" + a.substr(0, 5)).toString(), parseInt("0x" + a.substr(5, 5)).toString(), parseInt("0x" + a.substr(10, 5)).toString(), parseInt("0x" + a.substr(15, 5)).toString(), parseInt("0x" + a.substr(20, 5)).toString(), parseInt("0x" + a.substr(25, 5)).toString()],
          s = [r[0].substr(0, 1), r[0].substr(1, 2), r[0].substr(3, 1), r[0].substr(4, 2), r[1].substr(0, 1), r[1].substr(1, 2), r[1].substr(3, 1), r[1].substr(4, 2), r[2].substr(0, 1), r[2].substr(1, 2), r[2].substr(3, 1), r[2].substr(4, 2), r[3].substr(0, 1), r[3].substr(1, 2), r[3].substr(3, 1), r[3].substr(4, 2), r[4].substr(0, 1), r[4].substr(1, 2), r[4].substr(3, 1), r[4].substr(4, 2), r[5].substr(0, 1), r[5].substr(1, 2), r[5].substr(3, 1), r[5].substr(4, 2)];
        return parseInt(s[t - 1])
      },
      toChinaMonth: function (e) {
        if (e > 12 || e < 1) return -1;
        let t = n.nStr3[e - 1];
        return t += "月", t
      },
      toChinaDay: function (e) {
        let t;
        switch (e) {
          case 10:
            t = "初十";
            break;
          case 20:
            t = "二十";
            break;
          case 30:
            t = "三十";
            break;
          default:
            t = n.nStr2[Math.floor(e / 10)], t += n.nStr1[e % 10]
        }
        return t
      },
      getAnimal: function (e) {
        return n.Animals[(e - 4) % 12]
      },
      solar2lunar: function (e, t, a) {
        if (e < 1900 || e > 2100) return -1;
        if (1900 == +e && 1 == +t && +a < 31) return -1;
        let r, s;
        r = e ? new Date(e, parseInt(t) - 1, a) : new Date;
        let o = 0,
          c = 0;
        e = r.getFullYear(), t = r.getMonth() + 1, a = r.getDate();
        let l = (Date.UTC(r.getFullYear(), r.getMonth(), r.getDate()) - Date.UTC(1900, 0, 31)) / 864e5;
        for (s = 1900; s < 2101 && l > 0; s++) c = n.lYearDays(s), l -= c;
        l < 0 && (l += c, s--);
        const i = new Date;
        let d = !1;
        i.getFullYear() === +e && i.getMonth() + 1 === +t && i.getDate() === +a && (d = !0);
        let f = r.getDay();
        const b = n.nStr1[f];
        0 == +f && (f = 7);
        const h = s;
        o = n.leapMonth(s);
        let u = !1;
        for (s = 1; s < 13 && l > 0; s++) o > 0 && s === o + 1 && !1 === u ? (--s, u = !0, c = n.leapDays(h)) : c = n.monthDays(h, s), !0 === u && s === o + 1 && (u = !1), l -= c;
        0 === l && o > 0 && s === o + 1 && (u ? u = !1 : (u = !0, --s)), l < 0 && (l += c, --s);
        const y = s,
          m = l + 1,
          D = t - 1,
          p = n.toGanZhiYear(h),
          g = n.getTerm(e, 2 * t - 1),
          T = n.getTerm(e, 2 * t);
        let w = n.toGanZhi(12 * (e - 1900) + t + 11);
        a >= g && (w = n.toGanZhi(12 * (e - 1900) + t + 12));
        let C = !1,
          M = null; + g === a && (C = !0, M = n.solarTerm[2 * t - 2]), +T === a && (C = !0, M = n.solarTerm[2 * t - 1]);
        const _ = Date.UTC(e, D, 1, 0, 0, 0, 0) / 864e5 + 25567 + 10,
          S = n.toGanZhi(_ + a - 1),
          k = n.toAstro(t, a);
        return {
          lYear: h,
          lMonth: y,
          lDay: m,
          Animal: n.getAnimal(h),
          IMonthCn: (u ? "闰" : "") + n.toChinaMonth(y),
          IDayCn: n.toChinaDay(m),
          cYear: e,
          cMonth: t,
          cDay: a,
          gzYear: p,
          gzMonth: w,
          gzDay: S,
          isToday: d,
          isLeap: u,
          nWeek: f,
          ncWeek: "星期" + b,
          isTerm: C,
          Term: M,
          astro: k
        }
      },
      lunar2solar: function (e, t, a, r) {
        r = !!r;
        const s = n.leapMonth(e);
        if (r && s !== t) return -1;
        if (2100 == +e && 12 == +t && +a > 1 || 1900 == +e && 1 == +t && +a < 31) return -1;
        const o = n.monthDays(e, t);
        let c = o;
        if (r && (c = n.leapDays(e, t)), e < 1900 || e > 2100 || a > c) return -1;
        let l = 0;
        for (let t = 1900; t < e; t++) l += n.lYearDays(t);
        let i = 0,
          d = !1;
        for (let a = 1; a < t; a++) i = n.leapMonth(e), d || i <= a && i > 0 && (l += n.leapDays(e), d = !0), l += n.monthDays(e, a);
        r && (l += o);
        const f = Date.UTC(1900, 1, 30, 0, 0, 0),
          b = new Date(864e5 * (l + a - 31) + f),
          h = b.getUTCFullYear(),
          u = b.getUTCMonth() + 1,
          y = b.getUTCDate();
        return n.solar2lunar(h, u, y)
      }
    },
    {
      Gan: r,
      Zhi: s,
      nStr1: o,
      nStr2: c,
      nStr3: l,
      Animals: i,
      solarTerm: d,
      lunarInfo: f,
      sTermInfo: b,
      solarMonth: h,
      ...u
    } = n;
  var y = u;
  t.default = y
}, function (e, t, a) {
  "use strict";
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0;
  var n = c(a(0)),
    r = c(a(4)),
    s = c(a(2)),
    o = a(1);

  function c(e) {
    return e && e.__esModule ? e : {
      default: e
    }
  }
  const l = new o.Logger,
    i = new o.GetDate,
    d = Object.prototype.toString;
  class f extends n.default {
    constructor(e) {
      super(e), this.Component = e
    }
    getCalendarConfig() {
      return this.Component.config
    }
    buildDate(e, t) {
      const a = i.todayDate(),
        n = i.thisMonthDays(e, t),
        r = [];
      for (let o = 1; o <= n; o++) {
        const n = +a.year == +e && +a.month == +t && o === +a.date,
          c = this.getCalendarConfig(),
          l = {
            year: e,
            month: t,
            day: o,
            choosed: !1,
            week: i.dayOfWeek(e, t, o),
            isToday: n && c.highlightToday,
            lunar: s.default.solar2lunar(+e, +t, +o)
          };
        r.push(l)
      }
      return r
    }
    enableArea(e = []) {
      if (2 === e.length) {
        if (this.__judgeParam(e)) {
          let {
            days: t = [],
            selectedDay: a = []
          } = this.getData("calendar");
          const {
            startTimestamp: n,
            endTimestamp: r
          } = (0, o.convertEnableAreaToTimestamp)(e), s = this.__handleEnableArea({
            dateArea: e,
            days: t,
            startTimestamp: n,
            endTimestamp: r
          }, a);
          this.setData({
            "calendar.enableArea": e,
            "calendar.days": s.dates,
            "calendar.selectedDay": s.selectedDay,
            "calendar.enableAreaTimestamp": [n, r]
          })
        }
      } else l.warn('enableArea()参数需为时间范围数组，形如：["2018-8-4" , "2018-8-24"]')
    }
    enableDays(e = []) {
      const {
        enableArea: t = []
      } = this.getData("calendar");
      let a = [];
      a = t.length ? (0, o.delRepeatedEnableDay)(e, t) : (0, o.converEnableDaysToTimestamp)(e);
      let {
        days: n = [],
        selectedDay: r = []
      } = this.getData("calendar");
      const s = this.__handleEnableDays({
        days: n,
        expectEnableDaysTimestamp: a
      }, r);
      this.setData({
        "calendar.days": s.dates,
        "calendar.selectedDay": s.selectedDay,
        "calendar.enableDays": e,
        "calendar.enableDaysTimestamp": a
      })
    }
    setSelectedDays(e) {
      if (!(0, r.default)(this.Component).getCalendarConfig().multi) return l.warn("单选模式下不能设置多日期选中，请配置 multi");
      let {
        days: t
      } = this.getData("calendar"), a = [];
      if (e) {
        if (e && e.length) {
          const {
            dates: n,
            selectedDates: r
          } = this.__handleSelectedDays(t, a, e);
          t = n, a = r
        }
      } else t.map(e => {
        e.choosed = !0, e.showTodoLabel = !1
      }), a = t;
      (0, r.default)(this.Component).setCalendarConfig("multi", !0), this.setData({
        "calendar.days": t,
        "calendar.selectedDay": a
      })
    }
    disableDays(e) {
      const {
        disableDays: t = [],
        days: a
      } = this.getData("calendar");
      if ("[object Array]" !== Object.prototype.toString.call(e)) return l.warn("disableDays 参数为数组");
      let n = [];
      if (e.length) {
        n = (0, o.uniqueArrayByDate)(e.concat(t));
        const r = n.map(e => i.toTimeStr(e));
        a.forEach(e => {
          const t = i.toTimeStr(e);
          r.includes(t) && (e.disable = !0)
        })
      } else a.forEach(e => {
        e.disable = !1
      });
      this.setData({
        "calendar.days": a,
        "calendar.disableDays": n
      })
    }
    chooseArea(e = []) {
      return new Promise((t, a) => {
        if (1 === e.length && (e = e.concat(e)), 2 === e.length) {
          if (this.__judgeParam(e)) {
            const n = (0, r.default)(this.Component).getCalendarConfig(),
              {
                startTimestamp: s,
                endTimestamp: c
              } = (0, o.convertEnableAreaToTimestamp)(e);
            this.setData({
              calendarConfig: {
                ...n,
                chooseAreaMode: !0,
                mulit: !0
              },
              "calendar.chooseAreaTimestamp": [s, c]
            }, () => {
              this.__chooseContinuousDates(s, c).then(t).catch(a)
            })
          }
        }
      })
    }
    __pusheNextMonthDateArea(e, t, a, n) {
      const r = this.buildDate(e.year, e.month);
      let s = r.length;
      for (let e = 0; e < s; e++) {
        const c = r[e],
          l = (0, o.getDateTimeStamp)(c);
        l <= a && l >= t && n.push({
          ...c,
          choosed: !0
        }), e === s - 1 && l < a && this.__pusheNextMonthDateArea(i.nextMonth(c), t, a, n)
      }
    }
    __pushPrevMonthDateArea(e, t, a, n) {
      const r = i.sortDates(this.buildDate(e.year, e.month), "desc");
      let s = r.length,
        c = (0, o.getDateTimeStamp)(r[0]);
      for (let e = 0; e < s; e++) {
        const l = r[e],
          d = (0, o.getDateTimeStamp)(l);
        d >= t && d <= a && n.push({
          ...l,
          choosed: !0
        }), e === s - 1 && c > t && this.__pushPrevMonthDateArea(i.prevMonth(l), t, a, n)
      }
    }
    __calcDateWhenNotInOneMonth(e) {
      const {
        firstDate: t,
        lastDate: a,
        startTimestamp: n,
        endTimestamp: r,
        filterSelectedDate: s
      } = e;
      (0, o.getDateTimeStamp)(t) > n && this.__pushPrevMonthDateArea(i.prevMonth(t), n, r, s), (0, o.getDateTimeStamp)(a) < r && this.__pusheNextMonthDateArea(i.nextMonth(a), n, r, s);
      return [...i.sortDates(s)]
    }
    __chooseContinuousDates(e, t) {
      return new Promise((a, n) => {
        const {
          days: r,
          selectedDay: s = []
        } = this.getData("calendar"), c = [];
        let l = [];
        s.forEach(a => {
          const n = (0, o.getDateTimeStamp)(a);
          n >= e && n <= t && (l.push(a), c.push(i.toTimeStr(a)))
        }), r.forEach(a => {
          const n = (0, o.getDateTimeStamp)(a),
            r = c.includes(i.toTimeStr(a));
          if (n >= e && n <= t) {
            if (r) return;
            a.choosed = !0, l.push(a)
          } else if (a.choosed = !1, r) {
            const e = l.findIndex(e => i.toTimeStr(e) === i.toTimeStr(a));
            e > -1 && l.splice(e, 1)
          }
        });
        const d = r[0],
          f = r[r.length - 1],
          b = this.__calcDateWhenNotInOneMonth({
            firstDate: d,
            lastDate: f,
            startTimestamp: e,
            endTimestamp: t,
            filterSelectedDate: l
          });
        try {
          this.setData({
            "calendar.days": [...r],
            "calendar.selectedDay": b
          }, () => {
            a(b)
          })
        } catch (e) {
          n(e)
        }
      })
    }
    setDateStyle(e) {
      if ("[object Array]" !== d.call(e)) return;
      const {
        days: t,
        specialStyleDates: a
      } = this.getData("calendar");
      "[object Array]" === d.call(a) && (e = (0, o.uniqueArrayByDate)([...a, ...e]));
      const n = e.map(e => `${e.year}_${e.month}_${e.day}`),
        r = t.map(t => {
          const a = n.indexOf(`${t.year}_${t.month}_${t.day}`);
          return a > -1 ? {
            ...t,
            class: e[a].class
          } : {
            ...t
          }
        });
      this.setData({
        "calendar.days": r,
        "calendar.specialStyleDates": e
      })
    }
    __judgeParam(e) {
      const {
        start: t,
        end: a,
        startTimestamp: n,
        endTimestamp: r
      } = (0, o.convertEnableAreaToTimestamp)(e);
      if (!t || !a) return;
      const s = i.thisMonthDays(t[0], t[1]),
        c = i.thisMonthDays(a[0], a[1]);
      return t[2] > s || t[2] < 1 ? (l.warn("enableArea() 开始日期错误，指定日期不在当前月份天数范围内"), !1) : t[1] > 12 || t[1] < 1 ? (l.warn("enableArea() 开始日期错误，月份超出1-12月份"), !1) : a[2] > c || a[2] < 1 ? (l.warn("enableArea() 截止日期错误，指定日期不在当前月份天数范围内"), !1) : a[1] > 12 || a[1] < 1 ? (l.warn("enableArea() 截止日期错误，月份超出1-12月份"), !1) : !(n > r) || (l.warn("enableArea()参数最小日期大于了最大日期"), !1)
    }
    __getDisableDateTimestamp() {
      let e;
      const {
        date: t,
        type: a
      } = this.getCalendarConfig().disableMode || {};
      if (t) {
        const a = t.split("-");
        if (a.length < 3) return l.warn("配置 disableMode.date 格式错误"), {};
        e = (0, o.getDateTimeStamp)({
          year: +a[0],
          month: +a[1],
          day: +a[2]
        })
      }
      return {
        disableDateTimestamp: e,
        disableType: a
      }
    }
    __handleEnableArea(e = {}, t = []) {
      const {
        area: a,
        days: n,
        startTimestamp: r,
        endTimestamp: s
      } = e, c = this.getData("calendar.enableDays") || [];
      let l = [];
      c.length && (l = (0, o.delRepeatedEnableDay)(c, a));
      const {
        disableDateTimestamp: d,
        disableType: f
      } = this.__getDisableDateTimestamp(), b = [...n];
      return b.forEach(e => {
        const a = +i.newDate(e.year, e.month, e.day).getTime();
        (+r > a || a > +s) && !l.includes(a) || "before" === f && d && a < d || "after" === f && d && a > d ? (e.disable = !0, e.choosed && (e.choosed = !1, t = t.filter(t => i.toTimeStr(e) !== i.toTimeStr(t)))) : e.disable && (e.disable = !1)
      }), {
        dates: b,
        selectedDay: t
      }
    }
    __handleEnableDays(e = {}, t = []) {
      const {
        days: a,
        expectEnableDaysTimestamp: n
      } = e, {
        enableAreaTimestamp: r = []
      } = this.getData("calendar"), s = [...a];
      return s.forEach(e => {
        const a = i.newDate(e.year, e.month, e.day).getTime();
        let s = !1;
        r.length ? (+r[0] > +a || +a > +r[1]) && !n.includes(+a) && (s = !0) : n.includes(+a) || (s = !0), s ? (e.disable = !0, e.choosed && (e.choosed = !1, t = t.filter(t => i.toTimeStr(e) !== i.toTimeStr(t)))) : e.disable = !1
      }), {
        dates: s,
        selectedDay: t
      }
    }
    __handleSelectedDays(e = [], t = [], a) {
      const {
        selectedDay: n,
        showLabelAlways: r
      } = this.getData("calendar");
      t = n && n.length ? (0, o.uniqueArrayByDate)(n.concat(a)) : a;
      const {
        year: s,
        month: c
      } = e[0], l = [];
      return t.forEach(e => {
        +e.year == +s && +e.month == +c && l.push(i.toTimeStr(e))
      }), [...e].map(e => {
        l.includes(i.toTimeStr(e)) && (e.choosed = !0, r && e.showTodoLabel ? e.showTodoLabel = !0 : e.showTodoLabel = !1)
      }), {
        dates: e,
        selectedDates: t
      }
    }
  }
  t.default = e => new f(e)
}, function (e, t, a) {
  "use strict";
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0;
  var n, r = (n = a(0)) && n.__esModule ? n : {
    default: n
  };
  class s extends r.default {
    constructor(e) {
      super(e), this.Component = e
    }
    getCalendarConfig() {
      return this.Component && this.Component.config ? this.Component.config : {}
    }
    setCalendarConfig(e) {
      return new Promise((t, a) => {
        if (!this.Component || !this.Component.config) return void a("异常：未找到组件配置信息");
        let n = {
          ...this.Component.config,
          ...e
        };
        this.Component.config = n, this.setData({
          calendarConfig: n
        }, () => {
          t(n)
        })
      })
    }
  }
  t.default = e => new s(e)
}, function (e, t, a) {
  "use strict";
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0;
  var n = i(a(3)),
    r = i(a(0)),
    s = i(a(6)),
    o = i(a(4)),
    c = i(a(2)),
    l = a(1);

  function i(e) {
    return e && e.__esModule ? e : {
      default: e
    }
  }
  const d = new l.GetDate,
    f = new l.Logger;
  class b extends r.default {
    constructor(e) {
      super(e), this.Component = e, this.getCalendarConfig = (0, o.default)(this.Component).getCalendarConfig
    }
    switchWeek(e, t) {
      return new Promise((a, n) => {
        if ((0, o.default)(this.Component).getCalendarConfig().multi) return f.warn("多选模式不能切换周月视图");
        const {
          selectedDay: r = [],
          curYear: c,
          curMonth: l
        } = this.getData("calendar");
        let i = [],
          b = !1;
        r.length ? i = r[0] : (i = d.todayDate(), i.day = i.date, b = !0);
        let h = t || i;
        const {
          year: u,
          month: y
        } = h, m = c !== u || l !== y;
        if ("week" === e) {
          if (this.Component.weekMode) return;
          (r.length && m || !r.length) && (b = !0, h = {
            year: c,
            month: l,
            day: h.day
          }), this.Component.weekMode = !0, this.setData({
            "calendarConfig.weekMode": !0
          }), this.jump(h, b).then(a).catch(n)
        } else {
          this.Component.weekMode = !1, this.setData({
            "calendarConfig.weekMode": !1
          });
          const e = r.length && m || !r.length;
          (0, s.default)(this.Component).renderCalendar(c, l, h.day, e).then(a).catch(n)
        }
      })
    }
    updateCurrYearAndMonth(e) {
      let {
        days: t,
        curYear: a,
        curMonth: n
      } = this.getData("calendar");
      const {
        month: r
      } = t[0], {
        month: s
      } = t[t.length - 1], o = d.thisMonthDays(a, n), c = t[t.length - 1], l = t[0];
      return (c.day + 7 > o || n === r && r !== s) && "next" === e ? (n += 1, n > 12 && (a += 1, n = 1)) : (+l.day <= 7 || n === s && r !== s) && "prev" === e && (n -= 1, n <= 0 && (a -= 1, n = 12)), {
        Uyear: a,
        Umonth: n
      }
    }
    calculateLastDay() {
      const {
        days: e = [],
        curYear: t,
        curMonth: a
      } = this.getData("calendar");
      return {
        lastDayInThisWeek: e[e.length - 1].day,
        lastDayInThisMonth: d.thisMonthDays(t, a)
      }
    }
    calculateFirstDay() {
      const {
        days: e
      } = this.getData("calendar");
      return {
        firstDayInThisWeek: e[0].day
      }
    }
    firstWeekInMonth(e, t, a) {
      let r = d.dayOfWeek(e, t, 1);
      a && 0 === r && (r = 7);
      const [, s] = [0, 7 - r];
      let o = this.getData("calendar.days") || [];
      this.Component.weekMode && (o = (0, n.default)(this.Component).buildDate(e, t));
      return o.slice(0, a ? s + 1 : s)
    }
    lastWeekInMonth(e, t, a) {
      const r = d.thisMonthDays(e, t),
        s = d.dayOfWeek(e, t, r),
        [o, c] = [r - s, r];
      let l = this.getData("calendar.days") || [];
      this.Component.weekMode && (l = (0, n.default)(this.Component).buildDate(e, t));
      return l.slice(a ? o : o - 1, c)
    }
    __getDisableDateTimestamp(e) {
      const {
        date: t,
        type: a
      } = e.disableMode || {};
      let n;
      if (t) {
        const e = t.split("-");
        if (e.length < 3) return f.warn("配置 disableMode.date 格式错误"), {};
        n = (0, l.getDateTimeStamp)({
          year: +e[0],
          month: +e[1],
          day: +e[2]
        })
      }
      return {
        disableDateTimestamp: n,
        disableType: a
      }
    }
    initSelectedDay(e) {
      let t = [...e];
      const {
        selectedDay: a = []
      } = this.getData("calendar"), n = a.map(e => `${+e.year}-${+e.month}-${+e.day}`), r = this.getCalendarConfig(), {
        disableDateTimestamp: s,
        disableType: o
      } = this.__getDisableDateTimestamp(r);
      return t = t.map(e => {
        if (!e) return {};
        const t = (0, l.getDateTimeStamp)(e);
        let a = {
          ...e
        };
        return n.includes(`${+a.year}-${+a.month}-${+a.day}`) ? a.choosed = !0 : a.choosed = !1, ("after" === o && t > s || "before" === o && t < s) && (a.disable = !0), a = this.__setTodoWhenJump(a, r), r.showLunar && (a = this.__setSolarLunar(a)), r.highlightToday && (a = this.__highlightToday(a)), a
      }), t
    }
    setEnableAreaOnWeekMode(e = []) {
      let {
        enableAreaTimestamp: t = [],
        enableDaysTimestamp: a = []
      } = this.getData("calendar");
      e.forEach(e => {
        const n = d.newDate(e.year, e.month, e.day).getTime();
        let r = !1;
        t.length ? (+t[0] > +n || +n > +t[1]) && !a.includes(+n) && (r = !0) : a.length && !a.includes(+n) && (r = !0), r && (e.disable = !0, e.choosed = !1);
        const s = (0, o.default)(this.Component).getCalendarConfig(),
          {
            disableDateTimestamp: c,
            disableType: l
          } = this.__getDisableDateTimestamp(s);
        ("before" === l && n < c || "after" === l && n > c) && (e.disable = !0)
      })
    }
    updateYMWhenSwipeCalendarHasSelected(e) {
      const t = e.filter(e => e.choosed);
      if (t && t.length) {
        const {
          year: e,
          month: a
        } = t[0];
        return {
          year: e,
          month: a
        }
      }
      return {}
    }
    calculateNextWeekDays() {
      let {
        lastDayInThisWeek: e,
        lastDayInThisMonth: t
      } = this.calculateLastDay(), {
        curYear: a,
        curMonth: r
      } = this.getData("calendar"), s = [];
      if (t - e >= 7) {
        const {
          Uyear: t,
          Umonth: n
        } = this.updateCurrYearAndMonth("next");
        a = t, r = n;
        for (let t = e + 1; t <= e + 7; t++) s.push({
          year: a,
          month: r,
          day: t,
          week: d.dayOfWeek(a, r, t)
        })
      } else {
        for (let n = e + 1; n <= t; n++) s.push({
          year: a,
          month: r,
          day: n,
          week: d.dayOfWeek(a, r, n)
        });
        const {
          Uyear: n,
          Umonth: o
        } = this.updateCurrYearAndMonth("next");
        a = n, r = o;
        for (let n = 1; n <= 7 - (t - e); n++) s.push({
          year: a,
          month: r,
          day: n,
          week: d.dayOfWeek(a, r, n)
        })
      }
      s = this.initSelectedDay(s);
      const {
        year: o,
        month: c
      } = this.updateYMWhenSwipeCalendarHasSelected(s);
      o && c && (a = o, r = c), this.setEnableAreaOnWeekMode(s), this.setData({
        "calendar.curYear": a,
        "calendar.curMonth": r,
        "calendar.days": s
      }, () => {
        (0, n.default)(this.Component).setDateStyle()
      })
    }
    calculatePrevWeekDays() {
      let {
        firstDayInThisWeek: e
      } = this.calculateFirstDay(), {
        curYear: t,
        curMonth: a
      } = this.getData("calendar"), r = [];
      if (e - 7 > 0) {
        const {
          Uyear: n,
          Umonth: s
        } = this.updateCurrYearAndMonth("prev");
        t = n, a = s;
        for (let n = e - 7; n < e; n++) r.push({
          year: t,
          month: a,
          day: n,
          week: d.dayOfWeek(t, a, n)
        })
      } else {
        let n = [];
        for (let r = 1; r < e; r++) n.push({
          year: t,
          month: a,
          day: r,
          week: d.dayOfWeek(t, a, r)
        });
        const {
          Uyear: s,
          Umonth: o
        } = this.updateCurrYearAndMonth("prev");
        t = s, a = o;
        const c = d.thisMonthDays(t, a);
        for (let n = c - Math.abs(e - 7); n <= c; n++) r.push({
          year: t,
          month: a,
          day: n,
          week: d.dayOfWeek(t, a, n)
        });
        r = r.concat(n)
      }
      r = this.initSelectedDay(r);
      const {
        year: s,
        month: o
      } = this.updateYMWhenSwipeCalendarHasSelected(r);
      s && o && (t = s, a = o), this.setEnableAreaOnWeekMode(r), this.setData({
        "calendar.curYear": t,
        "calendar.curMonth": a,
        "calendar.days": r
      }, () => {
        (0, n.default)(this.Component).setDateStyle()
      })
    }
    calculateDatesWhenJump({
      year: e,
      month: t,
      day: a
    }, {
      firstWeekDays: n,
      lastWeekDays: r
    }, s) {
      const o = this.__dateIsInWeek({
          year: e,
          month: t,
          day: a
        }, n),
        c = this.__dateIsInWeek({
          year: e,
          month: t,
          day: a
        }, r);
      let l = [];
      return l = o ? this.__calculateDatesWhenInFirstWeek(n, s) : c ? this.__calculateDatesWhenInLastWeek(r, s) : this.__calculateDates({
        year: e,
        month: t,
        day: a
      }, s), l
    }
    jump({
      year: e,
      month: t,
      day: a
    }, r) {
      return new Promise(s => {
        if (!a) return;
        const o = this.getCalendarConfig(),
          c = "Mon" === o.firstDayOfWeek,
          l = this.firstWeekInMonth(e, t, c);
        let i = this.lastWeekInMonth(e, t, c),
          d = this.calculateDatesWhenJump({
            year: e,
            month: t,
            day: a
          }, {
            firstWeekDays: l,
            lastWeekDays: i
          }, c);
        d = d.map(n => {
          let s = {
            ...n
          };
          return +s.year != +e || +s.month != +t || +s.day != +a || r || (s.choosed = !0), s = this.__setTodoWhenJump(s, o), o.showLunar && (s = this.__setSolarLunar(s)), o.highlightToday && (s = this.__highlightToday(s)), s
        }), this.setEnableAreaOnWeekMode(d);
        const f = {
          "calendar.days": d,
          "calendar.curYear": e,
          "calendar.curMonth": t,
          "calendar.empytGrids": [],
          "calendar.lastEmptyGrids": []
        };
        r || (f["calendar.selectedDay"] = d.filter(e => e.choosed)), this.setData(f, () => {
          (0, n.default)(this.Component).setDateStyle(), s({
            year: e,
            month: t,
            date: a
          })
        })
      })
    }
    __setTodoWhenJump(e) {
      const t = {
          ...e
        },
        {
          todoLabels: a = [],
          showLabelAlways: n
        } = this.getData("calendar"),
        r = a.map(e => `${+e.year}-${+e.month}-${+e.day}`).indexOf(`${+t.year}-${+t.month}-${+t.day}`);
      if (-1 !== r) {
        t.showTodoLabel = !!n || !t.choosed;
        const e = a[r] || {};
        t.showTodoLabel && e.todoText && (t.todoText = e.todoText), e.color && (t.color = e.color)
      }
      return t
    }
    __setSolarLunar(e) {
      const t = {
        ...e
      };
      return t.lunar = c.default.solar2lunar(+t.year, +t.month, +t.day), t
    }
    __highlightToday(e) {
      const t = {
          ...e
        },
        a = d.todayDate(),
        n = +a.year == +t.year && +a.month == +t.month && +t.day == +a.date;
      return t.isToday = n, t
    }
    __calculateDatesWhenInFirstWeek(e) {
      const t = [...e];
      if (t.length < 7) {
        let e, {
            year: a,
            month: n
          } = t[0],
          r = 7 - t.length;
        for (n > 1 ? (n -= 1, e = d.thisMonthDays(a, n)) : (n = 12, a -= 1, e = d.thisMonthDays(a, n)); r;) t.unshift({
          year: a,
          month: n,
          day: e,
          week: d.dayOfWeek(a, n, e)
        }), e -= 1, r -= 1
      }
      return t
    }
    __calculateDatesWhenInLastWeek(e) {
      const t = [...e];
      if (t.length < 7) {
        let {
          year: e,
          month: a
        } = t[0], n = 7 - t.length, r = 1;
        for (a > 11 ? (a = 1, e += 1) : a += 1; n;) t.push({
          year: e,
          month: a,
          day: r,
          week: d.dayOfWeek(e, a, r)
        }), r += 1, n -= 1
      }
      return t
    }
    __calculateDates({
      year: e,
      month: t,
      day: a
    }, r) {
      const s = d.dayOfWeek(e, t, a);
      let o = [a - s, a + (6 - s)];
      r && (o = [a + 1 - s, a + (7 - s)]);
      return (0, n.default)(this.Component).buildDate(e, t).slice(o[0] - 1, o[1])
    }
    __dateIsInWeek(e, t) {
      return t.find(t => +t.year == +e.year && +t.month == +e.month && +t.day == +e.day)
    }
    __tipsWhenCanNotSwtich() {
      f.info("当前月份未选中日期下切换为周视图，不能明确该展示哪一周的日期，故此情况不允许切换")
    }
  }
  t.default = e => new b(e)
}, function (e, t, a) {
  "use strict";
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0;
  var n = l(a(3)),
    r = l(a(7)),
    s = l(a(0)),
    o = l(a(2)),
    c = a(1);

  function l(e) {
    return e && e.__esModule ? e : {
      default: e
    }
  }
  const i = new c.GetDate,
    d = new c.Logger;
  class f extends s.default {
    constructor(e) {
      super(e), this.Component = e
    }
    getCalendarConfig() {
      return this.Component.config
    }
    renderCalendar(e, t, a, s) {
      return new Promise(o => {
        const c = this.getCalendarConfig();
        this.calculateEmptyGrids(e, t), this.calculateDays(e, t, a, s).then(() => {
          const {
            todoLabels: a,
            specialStyleDates: s,
            enableDays: l,
            selectedDay: i
          } = this.getData("calendar") || {};
          a && a.find(a => +a.month == +t && +a.year == +e) && (0, r.default)(this.Component).setTodoLabels(), s && s.length && s.find(a => +a.month == +t && +a.year == +e) && (0, n.default)(this.Component).setDateStyle(s), l && l.length && l.find(a => {
            let n = a.split("-");
            return +n[1] == +t && +n[0] == +e
          }) && (0, n.default)(this.Component).enableDays(l), i && i.length && i.find(a => +a.month == +t && +a.year == +e) && c.mulit && (0, n.default)(this.Component).setSelectedDays(i), this.Component.firstRender ? o({
            firstRender: !1
          }) : o({
            firstRender: !0
          })
        })
      })
    }
    calculateEmptyGrids(e, t) {
      this.calculatePrevMonthGrids(e, t), this.calculateNextMonthGrids(e, t)
    }
    calculatePrevMonthGrids(e, t) {
      let a = [];
      const n = i.thisMonthDays(e, t - 1);
      let r = i.firstDayOfWeek(e, t);
      const s = this.getCalendarConfig() || {};
      if ("Mon" === s.firstDayOfWeek && (0 === r ? r = 6 : r -= 1), r > 0) {
        const c = n - r,
          {
            onlyShowCurrentMonth: l
          } = s,
          {
            showLunar: i
          } = this.getCalendarConfig();
        for (let r = n; r > c; r--) l ? a.push("") : a.push({
          day: r,
          lunar: i ? o.default.solar2lunar(e, t - 1, r) : null
        });
        this.setData({
          "calendar.empytGrids": a.reverse()
        })
      } else this.setData({
        "calendar.empytGrids": null
      })
    }
    calculateExtraEmptyDate(e, t, a) {
      let n = 0;
      if (2 == +t) {
        n += 7;
        let r = i.dayOfWeek(e, t, 1);
        "Mon" === a.firstDayOfWeek ? 1 == +r && (n += 7) : 0 == +r && (n += 7)
      } else {
        let r = i.dayOfWeek(e, t, 1);
        "Mon" === a.firstDayOfWeek ? 0 !== r && r < 6 && (n += 7) : r <= 5 && (n += 7)
      }
      return n
    }
    calculateNextMonthGrids(e, t) {
      let a = [];
      const n = i.thisMonthDays(e, t);
      let r = i.dayOfWeek(e, t, n);
      const s = this.getCalendarConfig() || {};
      "Mon" === s.firstDayOfWeek && (0 === r ? r = 6 : r -= 1);
      let c = 7 - (r + 1);
      const {
        onlyShowCurrentMonth: l,
        showLunar: d
      } = s;
      l || (c += this.calculateExtraEmptyDate(e, t, s));
      for (let n = 1; n <= c; n++) l ? a.push("") : a.push({
        day: n,
        lunar: d ? o.default.solar2lunar(e, t + 1, n) : null
      });
      this.setData({
        "calendar.lastEmptyGrids": a
      })
    }
    setSelectedDay(e, t, a) {
      let n = [];
      const r = this.getCalendarConfig();
      if (r.noDefault) n = [], r.noDefault = !1;
      else {
        const r = this.getData("calendar") || {},
          {
            showLunar: s
          } = this.getCalendarConfig();
        n = a ? [{
          year: e,
          month: t,
          day: a,
          choosed: !0,
          week: i.dayOfWeek(e, t, a),
          lunar: s ? o.default.solar2lunar(e, t, a) : null
        }] : r.selectedDay
      }
      return n
    }
    __getDisableDateTimestamp() {
      let e;
      const {
        date: t,
        type: a
      } = this.getCalendarConfig().disableMode || {};
      if (t) {
        const a = t.split("-");
        if (a.length < 3) return d.warn("配置 disableMode.date 格式错误"), {};
        e = (0, c.getDateTimeStamp)({
          year: +a[0],
          month: +a[1],
          day: +a[2]
        })
      }
      return {
        disableDateTimestamp: e,
        disableType: a
      }
    }
    resetDates() {
      this.setData({
        "calendar.days": []
      })
    }
    calculateDays(e, t, a, r) {
      return new Promise(s => {
        this.resetDates();
        let o = [];
        const {
          disableDays: l = [],
          chooseAreaTimestamp: d = [],
          selectedDay: f = []
        } = this.getData("calendar");
        o = (0, n.default)(this.Component).buildDate(e, t);
        let b = f;
        r || (b = this.setSelectedDay(e, t, a));
        const h = b.map(e => i.toTimeStr(e)),
          u = l.map(e => i.toTimeStr(e)),
          [y, m] = d;
        o.forEach(e => {
          const t = i.toTimeStr(e),
            a = (0, c.getDateTimeStamp)(e);
          if (h.includes(t) && !r) {
            if (e.choosed = !0, a > m || a < y) {
              const t = b.findIndex(t => i.toTimeStr(t) === i.toTimeStr(e));
              b.splice(t, 1)
            }
          } else y && m && a >= y && a <= m && !r && (e.choosed = !0, b.push(e));
          u.includes(t) && (e.disable = !0);
          const {
            disableDateTimestamp: n,
            disableType: s
          } = this.__getDisableDateTimestamp();
          let o = !1;
          n && ("before" === s && a < n || "after" === s && a > n) && (o = !0);
          (o || this.__isDisable(a)) && (e.disable = !0, e.choosed = !1)
        }), this.setData({
          "calendar.days": o,
          "calendar.selectedDay": [...b] || !1
        }, () => {
          s()
        })
      })
    }
    __isDisable(e) {
      const {
        enableArea: t = [],
        enableDays: a = [],
        enableAreaTimestamp: n = []
      } = this.getData("calendar");
      let r = !1,
        s = (0, c.converEnableDaysToTimestamp)(a);
      return t.length && (s = (0, c.delRepeatedEnableDay)(a, t)), n.length ? (+n[0] > +e || +e > +n[1]) && !s.includes(+e) && (r = !0) : s.length && !s.includes(+e) && (r = !0), r
    }
  }
  t.default = e => new f(e)
}, function (e, t, a) {
  "use strict";
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0;
  var n, r = (n = a(0)) && n.__esModule ? n : {
      default: n
    },
    s = a(1);
  const o = new s.Logger,
    c = new s.GetDate;
  class l extends r.default {
    constructor(e) {
      super(e), this.Component = e
    }
    setTodoLabels(e) {
      e && (this.Component.todoConfig = e);
      const t = this.getData("calendar");
      if (!t || !t.days) return o.warn("请等待日历初始化完成后再调用该方法");
      const a = [...t.days],
        {
          curYear: n,
          curMonth: r
        } = t,
        {
          circle: c,
          dotColor: l = "",
          pos: i = "bottom",
          showLabelAlways: d,
          days: f = []
        } = e || this.Component.todoConfig || {},
        {
          todoLabels: b = []
        } = t,
        h = this.getTodoLabels({
          year: n,
          month: r
        });
      let u = f.filter(e => +e.year == +n && +e.month == +r);
      this.Component.weekMode && (u = f);
      const y = h.concat(u);
      for (let e of y) {
        let t;
        t = this.Component.weekMode ? a.find(t => +e.year == +t.year && +e.month == +t.month && +e.day == +t.day) : a[e.day - 1], t && (t.showTodoLabel = !!d || !t.choosed, t.showTodoLabel && (t.todoText = e.todoText), t.color = e.color)
      }
      const m = {
        "calendar.days": a,
        "calendar.todoLabels": (0, s.uniqueArrayByDate)(b.concat(f))
      };
      c || (m["calendar.todoLabelPos"] = i, m["calendar.todoLabelColor"] = l), m["calendar.todoLabelCircle"] = c || !1, m["calendar.showLabelAlways"] = d || !1, this.setData(m)
    }
    deleteTodoLabels(e) {
      if (!(e instanceof Array && e.length)) return;
      const t = this.filterTodos(e),
        {
          days: a,
          curYear: n,
          curMonth: r
        } = this.getData("calendar"),
        s = t.filter(e => n === +e.year && r === +e.month);
      a.forEach(e => {
        e.showTodoLabel = !1
      }), s.forEach(e => {
        a[e.day - 1].showTodoLabel = !a[e.day - 1].choosed
      }), this.setData({
        "calendar.days": a,
        "calendar.todoLabels": t
      })
    }
    clearTodoLabels() {
      const {
        days: e = []
      } = this.getData("calendar"), t = [].concat(e);
      t.forEach(e => {
        e.showTodoLabel = !1
      }), this.setData({
        "calendar.days": t,
        "calendar.todoLabels": []
      })
    }
    getTodoLabels(e) {
      const {
        todoLabels: t = []
      } = this.getData("calendar");
      if (e) {
        const {
          year: a,
          month: n
        } = e;
        return t.filter(e => +e.year == +a && +e.month == +n)
      }
      return t
    }
    filterTodos(e) {
      const t = this.getData("calendar.todoLabels") || [],
        a = e.map(e => c.toTimeStr(e));
      return t.filter(e => !a.includes(c.toTimeStr(e)))
    }
    showTodoLabels(e, t, a) {
      e.forEach(e => {
        if (this.Component.weekMode) t.forEach((n, r) => {
          if (+n.day == +e.day) {
            const n = t[r];
            n.hasTodo = !0, n.todoText = e.todoText, a && a.length && +a[0].day == +e.day && (n.showTodoLabel = !0)
          }
        });
        else {
          const n = t[e.day - 1];
          if (!n) return;
          n.hasTodo = !0, n.todoText = e.todoText, a && a.length && +a[0].day == +e.day && (t[a[0].day - 1].showTodoLabel = !0)
        }
      })
    }
  }
  t.default = e => new l(e)
}, function (e, t, a) {
  "use strict";
  var n, r = (n = a(5)) && n.__esModule ? n : {
      default: n
    },
    s = a(1),
    o = function (e) {
      if (e && e.__esModule) return e;
      if (null === e || "object" != typeof e && "function" != typeof e) return {
        default: e
      };
      var t = c();
      if (t && t.has(e)) return t.get(e);
      var a = {},
        n = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var r in e)
        if (Object.prototype.hasOwnProperty.call(e, r)) {
          var s = n ? Object.getOwnPropertyDescriptor(e, r) : null;
          s && (s.get || s.set) ? Object.defineProperty(a, r, s) : a[r] = e[r]
        } a.default = e, t && t.set(e, a);
      return a
    }(a(9));

  function c() {
    if ("function" != typeof WeakMap) return null;
    var e = new WeakMap;
    return c = function () {
      return e
    }, e
  }
  const l = new s.Slide,
    i = new s.Logger,
    d = new s.GetDate;
  Component({
    options: {
      styleIsolation: "apply-shared",
      multipleSlots: !0
    },
    properties: {
      calendarConfig: {
        type: Object,
        value: {}
      }
    },
    data: {
      handleMap: {
        prev_year: "chooseYear",
        prev_month: "chooseMonth",
        next_month: "chooseMonth",
        next_year: "chooseYear"
      }
    },
    lifetimes: {
      attached: function () {
        this.initComp()
      },
      detached: function () {
        s.initialTasks.flag = "finished", s.initialTasks.tasks.length = 0
      }
    },
    methods: {
      initComp() {
        const e = this.setDefaultDisableDate();
        this.setConfig(e)
      },
      setDefaultDisableDate() {
        const e = this.properties.calendarConfig || {};
        return e.disableMode && !e.disableMode.date && (e.disableMode.date = d.toTimeStr(d.todayDate())), e
      },
      setConfig(e) {
        e.markToday && "string" == typeof e.markToday && (e.highlightToday = !0), e.theme = e.theme || "default", this.weekMode = e.weekMode, this.setData({
          calendarConfig: e
        }, () => {
          (0, o.default)(this, e)
        })
      },
      chooseDate(e) {
        const {
          type: t
        } = e.currentTarget.dataset;
        if (!t) return;
        this[this.data.handleMap[t]](t)
      },
      chooseYear(e) {
        const {
          curYear: t,
          curMonth: a
        } = this.data.calendar;
        if (!t || !a) return i.warn("异常：未获取到当前年月");
        if (this.weekMode) return console.warn("周视图下不支持点击切换年月");
        let n = +t,
          r = +a;
        "prev_year" === e ? n -= 1 : "next_year" === e && (n += 1), this.render(t, a, n, r)
      },
      chooseMonth(e) {
        const {
          curYear: t,
          curMonth: a
        } = this.data.calendar;
        if (!t || !a) return i.warn("异常：未获取到当前年月");
        if (this.weekMode) return console.warn("周视图下不支持点击切换年月");
        let n = +t,
          r = +a;
        "prev_month" === e ? (r -= 1, r < 1 && (n -= 1, r = 12)) : "next_month" === e && (r += 1, r > 12 && (n += 1, r = 1)), this.render(t, a, n, r)
      },
      render(e, t, a, n) {
        o.whenChangeDate.call(this, {
          curYear: e,
          curMonth: t,
          newYear: a,
          newMonth: n
        }), this.setData({
          "calendar.curYear": a,
          "calendar.curMonth": n
        }), o.renderCalendar.call(this, a, n)
      },
      tapDayItem(e) {
        const {
          idx: t,
          date: a = {}
        } = e.currentTarget.dataset, {
          day: n,
          disable: r
        } = a;
        if (r || !n) return;
        const s = this.data.calendarConfig || this.config || {},
          {
            multi: c,
            chooseAreaMode: l
          } = s;
        c ? o.whenMulitSelect.call(this, t) : l ? o.whenChooseArea.call(this, t) : o.whenSingleSelect.call(this, t), this.setData({
          "calendar.noDefault": !1
        })
      },
      doubleClickToToday() {
        if (!this.config.multi && !this.weekMode)
          if (void 0 === this.count ? this.count = 1 : this.count += 1, this.lastClick) {
            (new Date).getTime() - this.lastClick < 500 && this.count >= 2 && o.jump.call(this), this.count = void 0, this.lastClick = void 0
          } else this.lastClick = (new Date).getTime()
      },
      calendarTouchstart(e) {
        const t = e.touches[0],
          a = t.clientX,
          n = t.clientY;
        this.slideLock = !0, this.setData({
          "gesture.startX": a,
          "gesture.startY": n
        })
      },
      calendarTouchmove(e) {
        const {
          gesture: t
        } = this.data, {
          preventSwipe: a
        } = this.properties.calendarConfig;
        this.slideLock && !a && (l.isLeft(t, e.touches[0]) && (this.handleSwipe("left"), this.slideLock = !1), l.isRight(t, e.touches[0]) && (this.handleSwipe("right"), this.slideLock = !1))
      },
      calendarTouchend(e) {
        this.setData({
          "calendar.leftSwipe": 0,
          "calendar.rightSwipe": 0
        })
      },
      handleSwipe(e) {
        let t = "calendar.leftSwipe",
          a = "next_month",
          n = "next_week";
        if ("right" === e && (t = "calendar.rightSwipe", a = "prev_month", n = "prev_week"), this.setData({
            [t]: 1
          }), this.currentYM = (0, o.getCurrentYM)(), this.weekMode) return this.slideLock = !1, this.currentDates = (0, o.getCalendarDates)(), "prev_week" === n ? (0, r.default)(this).calculatePrevWeekDays() : "next_week" === n && (0, r.default)(this).calculateNextWeekDays(), this.onSwipeCalendar(n), void this.onWeekChange(n);
        this.chooseMonth(a), this.onSwipeCalendar(a)
      },
      onSwipeCalendar(e) {
        this.triggerEvent("onSwipe", {
          directionType: e,
          currentYM: this.currentYM
        })
      },
      onWeekChange(e) {
        this.triggerEvent("whenChangeWeek", {
          current: {
            currentYM: this.currentYM,
            dates: [...this.currentDates]
          },
          next: {
            currentYM: (0, o.getCurrentYM)(),
            dates: (0, o.getCalendarDates)()
          },
          directionType: e
        }), this.currentDates = null, this.currentYM = null
      }
    }
  })
}, function (e, t, a) {
  "use strict";
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.getCurrentYM = v, t.getSelectedDay = L, t.cancelSelectedDates = W, t.jump = A, t.setTodoLabels = O, t.deleteTodoLabels = x, t.clearTodoLabels = Y, t.getTodoLabels = E, t.disableDay = P, t.enableArea = j, t.enableDays = I, t.setSelectedDays = $, t.getCalendarConfig = G, t.setCalendarConfig = U, t.getCalendarDates = R, t.chooseDateArea = F, t.setDateStyle = N, t.switchView = X, t.default = t.calculateNextWeekDays = t.calculatePrevWeekDays = t.whenMulitSelect = t.whenChooseArea = t.whenSingleSelect = t.renderCalendar = t.whenChangeDate = void 0;
  var n = f(a(3)),
    r = f(a(5)),
    s = f(a(7)),
    o = f(a(0)),
    c = f(a(6)),
    l = f(a(4)),
    i = f(a(2)),
    d = a(1);

  function f(e) {
    return e && e.__esModule ? e : {
      default: e
    }
  }
  let b = {},
    h = new d.Logger,
    u = new d.GetDate,
    y = null;

  function m(e) {
    return e && (b = (0, d.getComponent)(e)), b
  }

  function D(e, t) {
    return m(t), y = new o.default(b), y.getData(e)
  }

  function p(e, t = (() => {})) {
    return new o.default(b).setData(e, t)
  }
  const g = {
      renderCalendar(e, t, a) {
        return (0, d.isComponent)(this) && (b = this), new Promise((n, r) => {
          (0, c.default)(b).renderCalendar(e, t, a).then((r = {}) => {
            if (!r.firstRender) return n({
              year: e,
              month: t,
              date: a
            });
            Z((0, d.getCurrentPage)()), b.triggerEvent("afterCalendarRender", b), b.firstRender = !0, d.initialTasks.flag = "finished", d.initialTasks.tasks.length && d.initialTasks.tasks.shift()(), n({
              year: e,
              month: t,
              date: a
            })
          }).catch(e => {
            r(e)
          })
        })
      },
      whenChangeDate({
        curYear: e,
        curMonth: t,
        newYear: a,
        newMonth: n
      }) {
        b.triggerEvent("whenChangeMonth", {
          current: {
            year: e,
            month: t
          },
          next: {
            year: a,
            month: n
          }
        })
      },
      whenMulitSelect(e) {
        (0, d.isComponent)(this) && (b = this);
        const {
          calendar: t = {}
        } = D(), {
          days: a,
          todoLabels: n
        } = t, r = (0, l.default)(b).getCalendarConfig();
        let {
          selectedDay: s = []
        } = t;
        const o = a[e];
        if (o) {
          if (o.choosed = !o.choosed, o.choosed) {
            o.cancel = !1;
            const {
              showLabelAlways: e
            } = D("calendar");
            e && o.showTodoLabel ? o.showTodoLabel = !0 : o.showTodoLabel = !1, r.takeoverTap || s.push(o)
          } else {
            o.cancel = !0;
            const e = u.toTimeStr(o);
            s = s.filter(t => e !== u.toTimeStr(t)), n && n.forEach(t => {
              e === u.toTimeStr(t) && (o.showTodoLabel = !0)
            })
          }
          if (r.takeoverTap) return b.triggerEvent("onTapDay", o);
          p({
            "calendar.days": a,
            "calendar.selectedDay": s
          }), g.afterTapDay(o, s)
        }
      },
      whenSingleSelect(e) {
        (0, d.isComponent)(this) && (b = this);
        const {
          calendar: t = {}
        } = D(), {
          days: a,
          selectedDay: n = [],
          todoLabels: r
        } = t;
        let o = [];
        const c = a[e];
        if (!c) return;
        const i = [...n].pop() || {},
          {
            month: f,
            year: h
          } = a[0] || {},
          u = (0, l.default)(b).getCalendarConfig();
        if (u.takeoverTap) return b.triggerEvent("onTapDay", c);
        if (g.afterTapDay(c), !u.inverse && i.day === c.day) return;
        a.forEach((e, t) => {
          +e.day == +i.day && (a[t].choosed = !1)
        }), r && (o = r.filter(e => +e.year === h && +e.month === f)), (0, s.default)(b).showTodoLabels(o, a, n);
        const y = {
          "calendar.days": a
        };
        i.day !== c.day ? (i.choosed = !1, c.choosed = !0, t.showLabelAlways && c.showTodoLabel || (c.showTodoLabel = !1), y["calendar.selectedDay"] = [c]) : u.inverse && (c.choosed && (c.showTodoLabel && t.showLabelAlways ? c.showTodoLabel = !0 : c.showTodoLabel = !1), y["calendar.selectedDay"] = []), u.weekMode && (y["calendar.curYear"] = c.year, y["calendar.curMonth"] = c.month), p(y)
      },
      gotoSetContinuousDates: (e, t) => F(["" + u.toTimeStr(e), "" + u.toTimeStr(t)]),
      timeRangeHelper(e, t) {
        const a = (0, d.getDateTimeStamp)(e),
          n = t[0];
        let r, s, o = t.length;
        o > 1 && (r = t[o - 1], s = (0, d.getDateTimeStamp)(r));
        return {
          endDate: r,
          startDate: n,
          currentDateTimestamp: a,
          endDateTimestamp: s,
          startTimestamp: (0, d.getDateTimeStamp)(n)
        }
      },
      calculateDateRange(e, t) {
        const {
          endDate: a,
          startDate: n,
          currentDateTimestamp: r,
          endDateTimestamp: s,
          startTimestamp: o
        } = this.timeRangeHelper(e, t);
        let c = [],
          l = t.length;
        const i = t.filter(t => u.toTimeStr(t) === u.toTimeStr(e));
        if (2 === l && i.length) return c = [e, e], c;
        if (r >= o && s && r <= s) {
          c = l / 2 > t.findIndex(t => u.toTimeStr(t) === u.toTimeStr(e)) ? [e, a] : [n, e]
        } else r < o ? c = [e, a] : r > o && (c = [n, e]);
        return c
      },
      chooseAreaWhenExistArea: (e, t) => new Promise((a, n) => {
        const r = g.calculateDateRange(e, u.sortDates(t));
        g.gotoSetContinuousDates(...r).then(t => {
          a(t), g.afterTapDay(e)
        }).catch(t => {
          n(t), g.afterTapDay(e)
        })
      }),
      chooseAreaWhenHasOneDate: (e, t, a) => new Promise((n, r) => {
        const s = a || t[0];
        let o = [s, e];
        const c = (0, d.getDateTimeStamp)(e);
        (0, d.getDateTimeStamp)(s) > c && (o = [e, s]), g.gotoSetContinuousDates(...o).then(t => {
          n(t), g.afterTapDay(e)
        }).catch(t => {
          r(t), g.afterTapDay(e)
        })
      }),
      whenChooseArea(e) {
        return new Promise((t, a) => {
          if ((0, d.isComponent)(this) && (b = this), b.weekMode) return;
          const {
            days: n = [],
            selectedDay: r,
            lastChoosedDate: s
          } = D("calendar"), c = n[e];
          if (c.disable) return;
          if ((0, l.default)(b).getCalendarConfig().takeoverTap) return b.triggerEvent("onTapDay", c);
          if (r && r.length > 1) g.chooseAreaWhenExistArea(c, r).then(e => {
            t(e)
          }).catch(e => {
            a(e)
          });
          else if (s || r && 1 === r.length) g.chooseAreaWhenHasOneDate(c, r, s).then(e => {
            t(e)
          }).catch(e => {
            a(e)
          });
          else {
            n.forEach(e => {
              +e.day == +c.day ? e.choosed = !0 : e.choosed = !1
            });
            new o.default(b).setData({
              "calendar.days": [...n],
              "calendar.lastChoosedDate": c
            })
          }
        })
      },
      afterTapDay(e, t) {
        const a = (0, l.default)(b).getCalendarConfig(),
          {
            multi: n
          } = a;
        n ? b.triggerEvent("afterTapDay", {
          currentSelected: e,
          selectedDates: t
        }) : b.triggerEvent("afterTapDay", e)
      },
      jumpToToday: () => new Promise((e, t) => {
        const {
          year: a,
          month: n,
          date: r
        } = u.todayDate(), s = u.todayTimestamp(), o = (0, l.default)(b).getCalendarConfig();
        p({
          "calendar.curYear": a,
          "calendar.curMonth": n,
          "calendar.selectedDay": [{
            year: a,
            day: r,
            month: n,
            choosed: !0,
            lunar: o.showLunar ? i.default.solar2lunar(a, n, r) : null
          }],
          "calendar.todayTimestamp": s
        }), g.renderCalendar(a, n, r).then(() => {
          e({
            year: a,
            month: n,
            date: r
          })
        }).catch(() => {
          t("jump failed")
        })
      })
    },
    T = g.whenChangeDate;
  t.whenChangeDate = T;
  const w = g.renderCalendar;
  t.renderCalendar = w;
  const C = g.whenSingleSelect;
  t.whenSingleSelect = C;
  const M = g.whenChooseArea;
  t.whenChooseArea = M;
  const _ = g.whenMulitSelect;
  t.whenMulitSelect = _;
  const S = g.calculatePrevWeekDays;
  t.calculatePrevWeekDays = S;
  const k = g.calculateNextWeekDays;

  function v(e) {
    return m(e), {
      year: D("calendar.curYear"),
      month: D("calendar.curMonth")
    }
  }

  function L(e = {}, t) {
    m(t);
    const a = G(),
      n = D("calendar.selectedDay") || [];
    if (e.lunar && !a.showLunar) {
      return u.convertLunar(n)
    }
    return n
  }

  function W(e, t) {
    m(t);
    const {
      days: a = [],
      selectedDay: n = []
    } = D("calendar") || {};
    if (e && e.length) {
      const t = e.map(e => `${+e.year}-${+e.month}-${+e.day}`),
        r = n.filter(e => !t.includes(`${+e.year}-${+e.month}-${+e.day}`));
      a.forEach(e => {
        t.includes(`${+e.year}-${+e.month}-${+e.day}`) && (e.choosed = !1)
      }), p({
        "calendar.days": a,
        "calendar.selectedDay": r
      })
    } else a.forEach(e => {
      e.choosed = !1
    }), p({
      "calendar.days": a,
      "calendar.selectedDay": []
    })
  }

  function A(e, t, a, n) {
    return new Promise((s, o) => {
      m(n);
      const {
        selectedDay: c = []
      } = D("calendar") || {}, {
        weekMode: l
      } = D("calendarConfig") || {}, {
        year: i,
        month: f,
        day: y
      } = c[0] || {};
      if (+i != +e || +f != +t || +y != +a) {
        if (l) {
          let n = !1;
          if (!e || !t || !a) {
            const r = u.todayDate();
            e = r.year, t = r.month, a = r.date, n = !0
          }
          return function ({
            year: e,
            month: t,
            day: a
          }, n) {
            return new Promise((s, o) => {
              (0, r.default)(b).jump({
                year: +e,
                month: +t,
                day: +a
              }, n).then(e => {
                s(e), b.triggerEvent("afterCalendarRender", b)
              }).catch(e => {
                o(e), b.triggerEvent("afterCalendarRender", b)
              })
            })
          }({
            year: e,
            month: t,
            day: a
          }, n).then(e => {
            s(e)
          }).catch(e => {
            o(e)
          }), void Z((0, d.getCurrentPage)())
        }
        e && t ? function ({
          year: e,
          month: t,
          day: a
        }) {
          return new Promise((n, r) => {
            if ("number" != typeof + e || "number" != typeof + t) return h.warn("jump 函数年月日参数必须为数字");
            const s = u.todayTimestamp();
            p({
              "calendar.curYear": +e,
              "calendar.curMonth": +t,
              "calendar.todayTimestamp": s
            }, () => {
              g.renderCalendar(+e, +t, +a).then(e => {
                n(e)
              }).catch(e => {
                r(e)
              })
            })
          })
        }({
          year: e,
          month: t,
          day: a
        }).then(e => {
          s(e)
        }).catch(e => {
          o(e)
        }) : g.jumpToToday().then(e => {
          s(e)
        }).catch(e => {
          o(e)
        })
      }
    })
  }

  function O(e, t) {
    m(t), (0, s.default)(b).setTodoLabels(e)
  }

  function x(e, t) {
    m(t), (0, s.default)(b).deleteTodoLabels(e)
  }

  function Y(e) {
    m(e), (0, s.default)(b).clearTodoLabels()
  }

  function E(e = {}, t) {
    m(t);
    const a = G(),
      n = (0, s.default)(b).getTodoLabels() || [];
    if (e.lunar && !a.showLunar) {
      return u.convertLunar(n)
    }
    return n
  }

  function P(e = [], t) {
    m(t), (0, n.default)(b).disableDays(e)
  }

  function j(e = [], t) {
    m(t), (0, n.default)(b).enableArea(e)
  }

  function I(e = [], t) {
    m(t), (0, n.default)(b).enableDays(e)
  }

  function $(e, t) {
    m(t), (0, n.default)(b).setSelectedDays(e)
  }

  function G(e) {
    return m(e), (0, l.default)(b).getCalendarConfig()
  }

  function U(e, t) {
    if (m(t), !e || 0 === Object.keys(e).length) return h.warn("setCalendarConfig 参数必须为非空对象");
    const a = G();
    return new Promise((t, n) => {
      (0, l.default)(b).setCalendarConfig(e).then(n => {
        t(n);
        const {
          date: r,
          type: s
        } = a.disableMode || {}, {
          _date: o,
          _type: c
        } = e.disableMode || {};
        if (s !== c || r !== o) {
          const {
            year: e,
            month: t
          } = v();
          A(e, t)
        }
      }).catch(e => {
        n(e)
      })
    })
  }

  function R(e = {}, t) {
    m(t);
    const a = G(),
      n = D("calendar.days", t) || [];
    if (e.lunar && !a.showLunar) {
      return u.convertLunar(n)
    }
    return n
  }

  function F(e, t) {
    return m(t), (0, n.default)(b).chooseArea(e)
  }

  function N(e, t) {
    e && (m(t), (0, n.default)(b).setDateStyle(e))
  }

  function X(...e) {
    return new Promise((t, a) => {
      const n = e[0];
      if (!e[1]) return (0, r.default)(b).switchWeek(n).then(t).catch(a);
      "string" == typeof e[1] ? (m(e[1]), (0, r.default)(b).switchWeek(n, e[2]).then(t).catch(a)) : "object" == typeof e[1] && ("string" == typeof e[2] && m(e[1]), (0, r.default)(b).switchWeek(n, e[1]).then(t).catch(a))
    })
  }

  function Z(e) {
    e.calendar = {
      jump: A,
      switchView: X,
      disableDay: P,
      enableArea: j,
      enableDays: I,
      chooseDateArea: F,
      getCurrentYM: v,
      getSelectedDay: L,
      cancelSelectedDates: W,
      setDateStyle: N,
      setTodoLabels: O,
      getTodoLabels: E,
      deleteTodoLabels: x,
      clearTodoLabels: Y,
      setSelectedDays: $,
      getCalendarConfig: G,
      setCalendarConfig: U,
      getCalendarDates: R
    }
  }

  function B(e, t) {
    d.initialTasks.flag = "process", b = e, b.config = t,
      function (e) {
        let t = ["日", "一", "二", "三", "四", "五", "六"];
        "Mon" === e && (t = ["一", "二", "三", "四", "五", "六", "日"]), p({
          "calendar.weeksCh": t
        })
      }(t.firstDayOfWeek),
      function (e) {
        if (b.firstRenderWeekMode = !0, e && "string" == typeof e) {
          const t = e.split("-");
          if (t.length < 3) return h.warn("配置 jumpTo 格式应为: 2018-4-2 或 2018-04-02");
          A(+t[0], +t[1], +t[2])
        } else e || (b.config.noDefault = !0, p({
          "config.noDefault": !0
        })), A()
      }(t.defaultDay), h.tips("使用中若遇问题请反馈至 https://github.com/treadpit/wx_calendar/issues ✍️")
  }
  t.calculateNextWeekDays = k;
  t.default = (e, t = {}) => {
    if ("process" === d.initialTasks.flag) return d.initialTasks.tasks.push((function () {
      B(e, t)
    }));
    B(e, t)
  }
}]);