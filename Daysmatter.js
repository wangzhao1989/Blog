/*
倒数日

使用:
#每天 8点通知, 也可以自定义其他时间, 详情:https://community.nssurge.com/d/33-scripting

[Script]
cron "0 8 * * *" script-path=https://github.com/congcong0806/surge-list/raw/master/Script/daysmatter.js
 
作者:聪聪
聪聪 https://t.me/congcongx_bot
群组 https://t.me/YinxiangBiji
频道 https://t.me/YinxiangBiji_News
*/

Date.prototype.format = function(fmt) {
    var date = {
            "M+": this.getMonth() + 1,
            "d+": this.getDate(),
            "h+": this.getHours(),
            "m+": this.getMinutes(),
            "s+": this.getSeconds(),
            "q+": Math.floor((this.getMonth() + 3) / 3),
            "S": this.getMilliseconds()
        };
    if (/(y+)/i.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in date) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
        }
    }
    return fmt;
};

//倒数日计算
function dateDiff(startDate, endDate) {
    //2002-12-18格式  
    var sdate, edate, days
    sdate = new Date(startDate)
    edate = new Date(endDate)
    //把相差的毫秒数转换为天数
    days = parseInt((sdate - edate) / 1000 / 60 / 60 / 24)
    return days;
}

const dayarr = [ 
    [ "预产期👶","2020-06-12" ], 
]

day();

function day() {
    var now = new Date()
    var nowStr = now.format("yyyy-MM-dd")
    var content = "\n";
    for ( var i in dayarr) {
        var d = dateDiff(dayarr[i][1], nowStr)
        if(isNaN(d))
            continue
        var u = valcal(d)
        content += dayarr[i][0] + "•" + u + "\n"
    }
    console.log(content);
    $notification.post('倒数日⏰', "", content)
    $done()
}

function valcal(days) {
    if (days == 0)
        return "就是今天"
    else if (days > 0)
        return "剩余:" + days + "天"
    else
        return "已过:" + Math.abs(days) + "天"
}