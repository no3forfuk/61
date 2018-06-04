/*Created By Jsir on 2018/5/8*/
'use strict'
const utils = {}
//时间格式化
utils.timeFormat = function (type, ms) {
    var time;
    if (ms) {
        time = new Date(ms);
    } else {
        time = new Date();
    }
    let mouth = time.getMonth() + 1;
    let day = time.getDate();
    if (mouth < 10) {
        mouth = '0' + mouth
    } else {
        mouth = mouth;
    }
    if (day < 10) {
        day = '0' + day
    } else {
        day = day
    }
    return time.getFullYear() + type + mouth + type + day;
}
//毫秒值返回当前时间差
utils.timeAgo = function (params) {
    var ms;
    if (typeof params == "number") {
        ms = params;
    } else {
        ms = new Date(params).getTime();
    }
    var time = new Date();
    var gap = Math.abs(time - ms);
    var second = parseInt(gap / 1000);
    if (second < 60) {
        return second + '秒';
    }
    var minuit = parseInt(gap / 1000 / 60);
    if (minuit < 60) {
        return minuit + '分钟';
    }
    var hour = parseInt(gap / 1000 / 60 / 60);
    if (hour < 24) {
        return hour + '小时';
    }
    var day = parseInt(gap / 1000 / 60 / 60 / 24);
    if (day > 1) {
        return day + '天';
    }
}
utils.phoneType = function () {
    var u = navigator.userAgent, app = navigator.appVersion;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
    var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    if (isAndroid) {
        return 'Android'
    }
    if (isIOS) {
        return 'IOS'
    }
}
//获取屏幕高度
utils.getWindowHeight = function (jquery) {
    var height;
    height = jquery(window).height();
    return height;
}
module.exports = utils;