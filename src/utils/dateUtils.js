/*
 * @Author: dave.zhao@zerofinance.cn
 * @LastEditors: dave.zhao@zerofinance.cn
 * @Description: Date tools
 * @Date: 2019-04-24 10:28:22
 * @LastEditTime: 2019-04-28 17:26:22
 */
export default class DateUtils {
    /**
     * @description: Date formatter
     * @param {fmt} date formatter
     * @param {date} Date object
     * @Date: 2019-04-24 10:23:14
     */
    static formatTime(fmt, date) {
        // let date = new Date(Date.parse(date1.replace(/\//g, '-')))
        let o = {
            'M+': date.getMonth() + 1, //月份
            'd+': date.getDate(), //日
            'h+': date.getHours(), //小时
            'm+': date.getMinutes(), //分
            's+': date.getSeconds(), //秒
            'q+': Math.floor((date.getMonth() + 3) / 3), //季度
            S: date.getMilliseconds() //毫秒
        }
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
        }
        for (let k in o) {
            if (new RegExp('(' + k + ')').test(fmt)) {
                fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
            }
        }
        return fmt
    }

    static formatTime4String(fmt, dateStr) {
        let date = new Date(Date.parse(dateStr.replace(/\//g, '-')))
        return DateUtils.formatTime(fmt, date)
    }
}
