/**
 * 各种工具方法
 * @author  WhyCoder
 * @date    2017-02-28
 */
(function () {
    'use strict';

    var arr = {};
    var date = {};
    var fun = {};
    var str = {};
    var obj = {};

    var util = {
        'array': arr,
        'date': date,
        'function': fun,
        'string': str,
        'object': obj
    };

    // 数组方法
    /**
     * 查找数组中所有与指定值相等(strict equality)的元素的索引
     * @author   yuanye
     * @date     2017-02-25
     * @param {Array} [a](必选) [被查找的数组]
     * @param {any} [x](必选) [要查找的元素]
     * @return {Array} [匹配元素的索引数组]
     */
    arr['findAll'] = function (a, x) {
        var result = [], //将会返回的索引数组
            len = a.length, //传入的数组长度
            pos = 0; //开始搜索的位置
        while (pos < len) { //循环搜索
            pos = a.indexOf(x, pos); //搜索到,就将索引值赋值给pos
            if (pos === -1) break; //未找到,就结束搜索
            result.push(pos); //给结果数组存储索引
            pos += 1; //从下一个位置开始搜索
        }
        return result;
    }
    /**
     * 将类数组对象(arguments || NodeList...)转换成数组。
     * @author  yuanye
     * @date    2017.02.26
     * @param {Object} obj 函数参数对象或节点列表.
     * @param {Number} [start] 数组开始元素是从零开始计算的下标。
     * @param {Number} [end] 数组结束元素是从零开始计算的下标.
     * @return {Array} [数组]
     */
    arr['objToArray'] = function (obj, start, end) {
        var len = obj.length;
        start = start || 0;
        end = end || len;
        return Array.prototype.slice.call(obj, start, end);
    };

    // 日期方法
    /*
     * 时间格式转换
     * @author   yuanye
     * @date     2017-02-25
     * @param    {String||Number} [date](必选) [时间戳(数值)||日期格式字符串(如2017-10-05 13:04:55)]
     * @param    {String} [format](可选)  [想要输出的时间格式(如 %Y-%m-%d)]
     * 注: format可识别参数: %Y - 包括世纪数的十进制年份;
     *                     %m - 十进制月份（范围从 01 到 12）;
     *                     %d - 月份中的第几天，十进制数字（范围从 01 到 31）;
     *                     %w - 星期中的第几天，星期天为 0;
     *                     %H - 24 小时制的十进制小时数（范围从 00 到 23）;
     *                     %M - 十进制分钟数;
     *                     %S - 十进制秒数;
     *                     %T - 当前时间，和 %H:%M:%S 一样;
     * @return {String} [日期字符串]
     */
    date['dateFormat'] = function (date, format) {
        var reg = /\%Y|\%y|\%m|\%d|\%w|\%H|\%M|\%S|\%T/g;
        var D;
        var value;
        var alter = '';
        var circle;
        function zeroFill(str) {
            str += '';
            (str.length === 1) && (str = '0' + str);
            return str
        }
        if (date) {
            D = new Date(date);
            value = format = format || "%Y-%m-%d %H:%M:%S";
            if (D.toString() !== "Invalid Date") {
                circle = reg.exec(format);
                while (circle) {
                    switch (circle[0]) {
                        case "\%Y":
                            alter = D.getFullYear();
                            break;
                        case "\%m":
                            alter = zeroFill(D.getMonth() + 1);
                            break;
                        case "\%d":
                            alter = D.getDate();
                            break;
                        case "\%w":
                            alter = D.getDay();
                            break;
                        case "\%H":
                            alter = zeroFill(D.getHours());
                            break;
                        case "\%M":
                            alter = zeroFill(D.getMinutes());
                            break;
                        case "\%S":
                            alter = zeroFill(D.getSeconds());
                            break;
                        case "\%T":
                            alter = zeroFill(D.getHours())
                                  + ":"
                                  + zeroFill(D.getMinutes())
                                  + ":"
                                  + zeroFill(D.getSeconds());
                            break;
                    }
                    value = value.replace(circle[0], alter);
                    circle = reg.exec(value);
                }
                return value;
            }
            else {
                return "Invalid Date";
            }
        }
        else {
            return false;
        }
    }

    // 函数方法
    /**
     * 效果类似ES5的bind方法,即修改函数内部的this指向,并在需要调用的时候才调用
     * @param  {Function} [handle](必须)  [要绑定的函数]
     * @param  {any}      [context](必须) [要修改的this]
     * @param  {any}      [any](可选)     [传入绑定函数的参数]
     * @return {Function}           [修改this后的函数]
     */
    fun['bind'] = function (handle, context) {
        if (arguments.length > 2) {
            var args = arr['objToArray'](arguments, 2);
            return function () {
                return handle.apply(context || this, arguments.length > 0 ? args.concat(array.argsToArray(arguments)) :
                    args);
            }
        } else {
            return function () {
                return handle.apply(context || this, arguments)
            }
        }
    };

    // 对象方法
    /**
     * 判断是不是空对象
     * @author yuanye
     * @date   2017.02.25
     * @param {Object} [object] [要判断的对象]
     * @return {Boolean} [是否为空对象]
     */
    obj['isEmpty'] = function (object) {
        for (var p in object) {
            if (object.hasOwnProperty(p)) {
                return false;
            }
        }
        return true;
    };
    


    window.util = util;

})();