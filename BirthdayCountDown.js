/**
生日倒计时 v0.1 alpha
@author: DUMPLING YaYa

图标：
🔘彩色版本: https://raw.githubusercontent.com/Orz-3/task/master/birthday.png
🔘透明版本: https://raw.githubusercontent.com/Orz-3/mini/master/birthday.png

TODO:
- 提醒生日
- 计算属相
- 计算星座
- 提醒生理期
- 生日倒计时

配置：
1️⃣birthdayList 支持多个人，复制一分根据配置填写即可
2️⃣配置cron任务如：0 0 * * *
[loon]
cron ”10 0 0 * * *“ script-path=https://raw.githubusercontent.com/dompling/Script/master/birthdayCountDown/index.js
[quanx]
10 0 0 * * * https://raw.githubusercontent.com/dompling/Script/master/birthdayCountDown/index.js
*/
var mediaImg = ”“; // 头像图片默认显示第一张图片，随机 bing 应 api 背景：https://api.dujin.org/pic
var username = ”“; // 姓名
var birthday = ”“; // 生日日期
var physiologicalDefault = ”“; // 最近一次来周期时间
var physiologicalCycle = ”“; // 下一次周期
var eday = ”“; // 相识日期
var loveWords = false;
var nongli = false; // 是否农历生日

const $ = API(”birthday“, true);

var birthday_mediaImg = $.read(”mediaImg“);
if (birthday_mediaImg) mediaImg = birthday_mediaImg;

var birthday_username = $.read(”username“);
if (birthday_username) username = birthday_username;

var birthday_time = $.read(”time“);
if (birthday_time) birthday = birthday_time;

var pDefault = $.read(”pDefault“);

if (pDefault) {
  physiologicalDefault = pDefault;
}


var _eday = $.read(”eday“);
if (_eday) eday = _eday;

var pCycle = $.read(”pCycle“);
if (pCycle) physiologicalCycle = pCycle;

var birthday_nongli = $.read(”nongli“);
if (birthday_nongli === ”true“) nongli = true;

var _loveWords = $.read(”loveWords“);
if (_loveWords === ”true“) loveWords = true;

const _birthdayConfig = {
  username, // 姓名
  birthday, // 生日日期
  physiologicalDefault, // 最近一次来周期时间
  physiologicalCycle, // 下一次周期
  nongli, // 农历生日
  eday,
  isLeapMonth: false, //如果是农历闰月第四个参数赋值true即可
};
var dataSource = [_birthdayConfig];
var verify = true;
for (var i = 0; i < dataSource.length; i++) {
  var data = dataSource[i];
  if (!verifyTime(data.birthday) || !data.username) {
    verify = false;
    $.notify(
      ”📅提示消息“,
      `请填写${data.username || ”（未知姓名“ + (i + 1) + ”）“}的🐣破壳日期`,
      ”“
    );
    break;
  }
}

if (verify) {
  var calendar = new Calendar(dataSource);
 
  async function birthdayNotify() {
    if (loveWords) {
      loveWords = await getEveryDaySay().finally((res) => {
        $.done({ bdoy: res });
      });
    }
    var birthdayMessage = `\n`;
    for (var i = 0; i < dataSource.length; i++) {
      var data = dataSource[i];
      $.log(”数据：“ + JSON.stringify(data));
      var birthday = data.birthday.split(”-“);

      var params = {
        year: parseInt(birthday[0]),
        month: parseInt(birthday[1]),
        day: parseInt(birthday[2]),
        nongli: data.nongli,
        isLeapMonth: data.isLeapMonth,
      };

      var birthdayText = calendar.birthday(params);
      var nextBirthday = birthdayText[0];
      var solarData;
      if (params.nongli) {
        solarData = calendar.lunar2solar(
          params.year,
          params.month,
          params.day,
          params.isLeapMonth
        );
      } else {
        solarData = calendar.solar2lunar(params.year, params.month, params.day);
      }
      var acquaintance = false;
      if (verifyTime(data.eday)) {
        acquaintance = getEdayNumber(data.eday);
      }

      var physiologicalDay = false;
      if (verifyTime(data.physiologicalDefault) && data.physiologicalCycle) {
        physiologicalDay = getPhysiological(
          data.physiologicalDefault,
          data.physiologicalCycle,
          i
        );
      }
      birthdayMessage += `
[🐣${data.username}🐣]：${loveWords||”“}

    📆农历：${solarData.gzMonth}(${solarData.IMonthCn})  ${solarData.gzDay} (${
        solarData.IDayCn
      }) （${solarData.ncWeek}）

    📆公历：${solarData.cYear}-${solarData.cMonth}-${solarData.cDay}

    🐽属相：${solarData.Animal} ${getAnimalZodiacToEmoji(solarData.Animal)}

    🌠星座：${solarData.astro} ${getAstroToEmoji(solarData.astro)}

    🎂下个生日：${nextBirthday.cYear}-${nextBirthday.cMonth}-${
        nextBirthday.cDay
      }
      
    💖生日倒计：${birthdayText[1] || ”0“} 天`;
      if (physiologicalDay) {
        birthdayMessage += `

    🆘生理期：${physiologicalDay[0] || ”“} 天  📆：${physiologicalDay[1] || ”“}`;
      }
      if (acquaintance) {
        birthdayMessage += `
        
    💏相识天数：${acquaintance} 天   📆：${data.eday}`;
      }

      $.log(birthdayMessage);
      if ($.env.isSurge) {
        $.notify(”嘿，在干嘛呀？“, ”“, birthdayMessage);
      } else {
        $.notify(”嘿，在干嘛呀？“, ”“, birthdayMessage, {
          ”media-url“: mediaImg,
        });
      }
    }
    $.done();
  };
  birthdayNotify();
} else {
  $.done();
}


async function getEveryDaySay() {
  return $.http
    .get(”https://api.uomg.com/api/rand.qinghua?format=json“)
    .then((response) => {
      const { body } = response;
      const { code, content } = JSON.parse(body);
      if (code !== 1) {
        throw new Error(body);
      }
      console.log(content);
      return content;
    });
}


function getEdayNumber(date){
  var initDay = date.split(”-“);
  var obj = {
    cYear: parseInt(initDay[0]),
    cMonth: parseInt(initDay[1]),
    cDay: parseInt(initDay[2]),
  };
  return Math.abs(calendar.daysBetween(obj));
}

function getAstroToEmoji(astro) {
  var data = {
    白羊座: ”♈“,
    金牛座: ”♉“,
    双子座: ”♊“,
    巨蟹座: ”♋“,
    狮子座: ”♌“,
    处女座: ”♍“,
    天秤座: ”♎“,
    天蝎座: ”♏“,
    射手座: ”♐“,
    摩羯座: ”♑“,
    水瓶座: ”♒“,
    双鱼座: ”♓“,
    蛇夫座: ”⛎“,
  };
  return data[astro]||”“;
}

function getAnimalZodiacToEmoji(zodiac) {
  var data = {
    鼠: ”🐭“,
    牛: ”🐂“,
    虎: ”🐯“,
    兔: ”🐇“,
    龙: ”🐲“,
    蛇: ”🐍“,
    马: ”🐴“,
    羊: ”🐑“,
    猴: ”🐵“,
    鸡: ”🐔“,
    狗: ”🐶“,
    猪: ”🐷“,
  };
  return data[zodiac]||”“;
}

function verifyTime(date){
  var dateFormat = /^(\d{4})-(\d{1,2})-(\d{1,2})$/;
  return dateFormat.test(date);
}

function getPhysiological(d, r, i) {
  var lastPDefault = $.read(”lastPDefault_“ + i);
  if (lastPDefault !== d) {
    $.write(d, ”physiologicalDefault_“ + i);
  }
  if (!lastPDefault) {
    $.write(d, ”lastPDefault_“ + i);
  }
  var i_day = $.read(”physiologicalDefault_“ + i),
    _default = d,
    range = r;

  if (verifyTime(i_day)) {
    _default = i_day;
  } else {
    $.write(_default, ”physiologicalDefault_“ + i);
  }
  var initDay = _default.split(”-“);
  var _physiological = {
    cYear: parseInt(initDay[0]),
    cMonth: parseInt(initDay[1]),
    cDay: parseInt(initDay[2]),
  };
  var _pdays = calendar.daysBetween(_physiological);
  var nextPday = _default;
  if (_pdays <= 0) {
    var nexMont = new Date(
      parseInt(initDay[0]),
      parseInt(initDay[1]) - 1,
      parseInt(initDay[2]) + parseInt(range)
    );
    var nextYear = nexMont.getFullYear();
    var nextMonth = nexMont.getMonth() + 1;
    var nextDay = nexMont.getDate();
    nextPday = `${nextYear}-${nextMonth}-${nextDay}`;

    _physiological = {
      cYear: nextYear,
      cMonth: nextMonth,
      cDay: nextDay,
    };

    _pdays = calendar.daysBetween(_physiological);
    $.write(nextPday, ”physiologicalDefault_“ + i);
  }
  return [_pdays, nextPday];
}

function MYERR() {
  class TokenError extends Error {
    constructor(message) {
      super(message);
      this.name = ”TokenError“;
    }
  }
  return {TokenError};
}
function Calendar(data){this.data=data;this.lunarInfo=[0x04bd8,0x04ae0,0x0a570,0x054d5,0x0d260,0x0d950,0x16554,0x056a0,0x09ad0,0x055d2,0x04ae0,0x0a5b6,0x0a4d0,0x0d250,0x1d255,0x0b540,0x0d6a0,0x0ada2,0x095b0,0x14977,0x04970,0x0a4b0,0x0b4b5,0x06a50,0x06d40,0x1ab54,0x02b60,0x09570,0x052f2,0x04970,0x06566,0x0d4a0,0x0ea50,0x06e95,0x05ad0,0x02b60,0x186e3,0x092e0,0x1c8d7,0x0c950,0x0d4a0,0x1d8a6,0x0b550,0x056a0,0x1a5b4,0x025d0,0x092d0,0x0d2b2,0x0a950,0x0b557,0x06ca0,0x0b550,0x15355,0x04da0,0x0a5b0,0x14573,0x052b0,0x0a9a8,0x0e950,0x06aa0,0x0aea6,0x0ab50,0x04b60,0x0aae4,0x0a570,0x05260,0x0f263,0x0d950,0x05b57,0x056a0,0x096d0,0x04dd5,0x04ad0,0x0a4d0,0x0d4d4,0x0d250,0x0d558,0x0b540,0x0b6a0,0x195a6,0x095b0,0x049b0,0x0a974,0x0a4b0,0x0b27a,0x06a50,0x06d40,0x0af46,0x0ab60,0x09570,0x04af5,0x04970,0x064b0,0x074a3,0x0ea50,0x06b58,0x055c0,0x0ab60,0x096d5,0x092e0,0x0c960,0x0d954,0x0d4a0,0x0da50,0x07552,0x056a0,0x0abb7,0x025d0,0x092d0,0x0cab5,0x0a950,0x0b4a0,0x0baa4,0x0ad50,0x055d9,0x04ba0,0x0a5b0,0x15176,0x052b0,0x0a930,0x07954,0x06aa0,0x0ad50,0x05b52,0x04b60,0x0a6e6,0x0a4e0,0x0d260,0x0ea65,0x0d530,0x05aa0,0x076a3,0x096d0,0x04afb,0x04ad0,0x0a4d0,0x1d0b6,0x0d250,0x0d520,0x0dd45,0x0b5a0,0x056d0,0x055b2,0x049b0,0x0a577,0x0a4b0,0x0aa50,0x1b255,0x06d20,0x0ada0,0x14b63,0x09370,0x049f8,0x04970,0x064b0,0x168a6,0x0ea50,0x06b20,0x1a6c4,0x0aae0,0x0a2e0,0x0d2e3,0x0c960,0x0d557,0x0d4a0,0x0da50,0x05d55,0x056a0,0x0a6d0,0x055d4,0x052d0,0x0a9b8,0x0a950,0x0b4a0,0x0b6a6,0x0ad50,0x055a0,0x0aba4,0x0a5b0,0x052b0,0x0b273,0x06930,0x07337,0x06aa0,0x0ad50,0x14b55,0x04b60,0x0a570,0x054e4,0x0d160,0x0e968,0x0d520,0x0daa0,0x16aa6,0x056d0,0x04ae0,0x0a9d4,0x0a2d0,0x0d150,0x0f252,0x0d520,];this.solarMonth=[31,28,31,30,31,30,31,31,30,31,30,31];this.Gan=[”\u7532“,”\u4e59“,”\u4e19“,”\u4e01“,”\u620a“,”\u5df1“,”\u5e9a“,”\u8f9b“,”\u58ec“,”\u7678“,];this.Zhi=[”\u5b50“,”\u4e11“,”\u5bc5“,”\u536f“,”\u8fb0“,”\u5df3“,”\u5348“,”\u672a“,”\u7533“,”\u9149“,”\u620c“,”\u4ea5“,];this.Animals=[”\u9f20“,”\u725b“,”\u864e“,”\u5154“,”\u9f99“,”\u86c7“,”\u9a6c“,”\u7f8a“,”\u7334“,”\u9e21“,”\u72d7“,”\u732a“,];this.solarTerm=[”\u5c0f\u5bd2“,”\u5927\u5bd2“,”\u7acb\u6625“,”\u96e8\u6c34“,”\u60ca\u86f0“,”\u6625\u5206“,”\u6e05\u660e“,”\u8c37\u96e8“,”\u7acb\u590f“,”\u5c0f\u6ee1“,”\u8292\u79cd“,”\u590f\u81f3“,”\u5c0f\u6691“,”\u5927\u6691“,”\u7acb\u79cb“,”\u5904\u6691“,”\u767d\u9732“,”\u79cb\u5206“,”\u5bd2\u9732“,”\u971c\u964d“,”\u7acb\u51ac“,”\u5c0f\u96ea“,”\u5927\u96ea“,”\u51ac\u81f3“,];this.sTermInfo=[”9778397bd097c36b0b6fc9274c91aa“,”97b6b97bd19801ec9210c965cc920e“,”97bcf97c3598082c95f8c965cc920f“,”97bd0b06bdb0722c965ce1cfcc920f“,”b027097bd097c36b0b6fc9274c91aa“,”97b6b97bd19801ec9210c965cc920e“,”97bcf97c359801ec95f8c965cc920f“,”97bd0b06bdb0722c965ce1cfcc920f“,”b027097bd097c36b0b6fc9274c91aa“,”97b6b97bd19801ec9210c965cc920e“,”97bcf97c359801ec95f8c965cc920f“,”97bd0b06bdb0722c965ce1cfcc920f“,”b027097bd097c36b0b6fc9274c91aa“,”9778397bd19801ec9210c965cc920e“,”97b6b97bd19801ec95f8c965cc920f“,”97bd09801d98082c95f8e1cfcc920f“,”97bd097bd097c36b0b6fc9210c8dc2“,”9778397bd197c36c9210c9274c91aa“,”97b6b97bd19801ec95f8c965cc920e“,”97bd09801d98082c95f8e1cfcc920f“,”97bd097bd097c36b0b6fc9210c8dc2“,”9778397bd097c36c9210c9274c91aa“,”97b6b97bd19801ec95f8c965cc920e“,”97bcf97c3598082c95f8e1cfcc920f“,”97bd097bd097c36b0b6fc9210c8dc2“,”9778397bd097c36c9210c9274c91aa“,”97b6b97bd19801ec9210c965cc920e“,”97bcf97c3598082c95f8c965cc920f“,”97bd097bd097c35b0b6fc920fb0722“,”9778397bd097c36b0b6fc9274c91aa“,”97b6b97bd19801ec9210c965cc920e“,”97bcf97c3598082c95f8c965cc920f“,”97bd097bd097c35b0b6fc920fb0722“,”9778397bd097c36b0b6fc9274c91aa“,”97b6b97bd19801ec9210c965cc920e“,”97bcf97c359801ec95f8c965cc920f“,”97bd097bd097c35b0b6fc920fb0722“,”9778397bd097c36b0b6fc9274c91aa“,”97b6b97bd19801ec9210c965cc920e“,”97bcf97c359801ec95f8c965cc920f“,”97bd097bd097c35b0b6fc920fb0722“,”9778397bd097c36b0b6fc9274c91aa“,”97b6b97bd19801ec9210c965cc920e“,”97bcf97c359801ec95f8c965cc920f“,”97bd097bd07f595b0b6fc920fb0722“,”9778397bd097c36b0b6fc9210c8dc2“,”9778397bd19801ec9210c9274c920e“,”97b6b97bd19801ec95f8c965cc920f“,”97bd07f5307f595b0b0bc920fb0722“,”7f0e397bd097c36b0b6fc9210c8dc2“,”9778397bd097c36c9210c9274c920e“,”97b6b97bd19801ec95f8c965cc920f“,”97bd07f5307f595b0b0bc920fb0722“,”7f0e397bd097c36b0b6fc9210c8dc2“,”9778397bd097c36c9210c9274c91aa“,”97b6b97bd19801ec9210c965cc920e“,”97bd07f1487f595b0b0bc920fb0722“,”7f0e397bd097c36b0b6fc9210c8dc2“,”9778397bd097c36b0b6fc9274c91aa“,”97b6b97bd19801ec9210c965cc920e“,”97bcf7f1487f595b0b0bb0b6fb0722“,”7f0e397bd097c35b0b6fc920fb0722“,”9778397bd097c36b0b6fc9274c91aa“,”97b6b97bd19801ec9210c965cc920e“,”97bcf7f1487f595b0b0bb0b6fb0722“,”7f0e397bd097c35b0b6fc920fb0722“,”9778397bd097c36b0b6fc9274c91aa“,”97b6b97bd19801ec9210c965cc920e“,”97bcf7f1487f531b0b0bb0b6fb0722“,”7f0e397bd097c35b0b6fc920fb0722“,”9778397bd097c36b0b6fc9274c91aa“,”97b6b97bd19801ec9210c965cc920e“,”97bcf7f1487f531b0b0bb0b6fb0722“,”7f0e397bd07f595b0b6fc920fb0722“,”9778397bd097c36b0b6fc9274c91aa“,”97b6b97bd19801ec9210c9274c920e“,”97bcf7f0e47f531b0b0bb0b6fb0722“,”7f0e397bd07f595b0b0bc920fb0722“,”9778397bd097c36b0b6fc9210c91aa“,”97b6b97bd197c36c9210c9274c920e“,”97bcf7f0e47f531b0b0bb0b6fb0722“,”7f0e397bd07f595b0b0bc920fb0722“,”9778397bd097c36b0b6fc9210c8dc2“,”9778397bd097c36c9210c9274c920e“,”97b6b7f0e47f531b0723b0b6fb0722“,”7f0e37f5307f595b0b0bc920fb0722“,”7f0e397bd097c36b0b6fc9210c8dc2“,”9778397bd097c36b0b70c9274c91aa“,”97b6b7f0e47f531b0723b0b6fb0721“,”7f0e37f1487f595b0b0bb0b6fb0722“,”7f0e397bd097c35b0b6fc9210c8dc2“,”9778397bd097c36b0b6fc9274c91aa“,”97b6b7f0e47f531b0723b0b6fb0721“,”7f0e27f1487f595b0b0bb0b6fb0722“,”7f0e397bd097c35b0b6fc920fb0722“,”9778397bd097c36b0b6fc9274c91aa“,”97b6b7f0e47f531b0723b0b6fb0721“,”7f0e27f1487f531b0b0bb0b6fb0722“,”7f0e397bd097c35b0b6fc920fb0722“,”9778397bd097c36b0b6fc9274c91aa“,”97b6b7f0e47f531b0723b0b6fb0721“,”7f0e27f1487f531b0b0bb0b6fb0722“,”7f0e397bd097c35b0b6fc920fb0722“,”9778397bd097c36b0b6fc9274c91aa“,”97b6b7f0e47f531b0723b0b6fb0721“,”7f0e27f1487f531b0b0bb0b6fb0722“,”7f0e397bd07f595b0b0bc920fb0722“,”9778397bd097c36b0b6fc9274c91aa“,”97b6b7f0e47f531b0723b0787b0721“,”7f0e27f0e47f531b0b0bb0b6fb0722“,”7f0e397bd07f595b0b0bc920fb0722“,”9778397bd097c36b0b6fc9210c91aa“,”97b6b7f0e47f149b0723b0787b0721“,”7f0e27f0e47f531b0723b0b6fb0722“,”7f0e397bd07f595b0b0bc920fb0722“,”9778397bd097c36b0b6fc9210c8dc2“,”977837f0e37f149b0723b0787b0721“,”7f07e7f0e47f531b0723b0b6fb0722“,”7f0e37f5307f595b0b0bc920fb0722“,”7f0e397bd097c35b0b6fc9210c8dc2“,”977837f0e37f14998082b0787b0721“,”7f07e7f0e47f531b0723b0b6fb0721“,”7f0e37f1487f595b0b0bb0b6fb0722“,”7f0e397bd097c35b0b6fc9210c8dc2“,”977837f0e37f14998082b0787b06bd“,”7f07e7f0e47f531b0723b0b6fb0721“,”7f0e27f1487f531b0b0bb0b6fb0722“,”7f0e397bd097c35b0b6fc920fb0722“,”977837f0e37f14998082b0787b06bd“,”7f07e7f0e47f531b0723b0b6fb0721“,”7f0e27f1487f531b0b0bb0b6fb0722“,”7f0e397bd097c35b0b6fc920fb0722“,”977837f0e37f14998082b0787b06bd“,”7f07e7f0e47f531b0723b0b6fb0721“,”7f0e27f1487f531b0b0bb0b6fb0722“,”7f0e397bd07f595b0b0bc920fb0722“,”977837f0e37f14998082b0787b06bd“,”7f07e7f0e47f531b0723b0b6fb0721“,”7f0e27f1487f531b0b0bb0b6fb0722“,”7f0e397bd07f595b0b0bc920fb0722“,”977837f0e37f14998082b0787b06bd“,”7f07e7f0e47f149b0723b0787b0721“,”7f0e27f0e47f531b0b0bb0b6fb0722“,”7f0e397bd07f595b0b0bc920fb0722“,”977837f0e37f14998082b0723b06bd“,”7f07e7f0e37f149b0723b0787b0721“,”7f0e27f0e47f531b0723b0b6fb0722“,”7f0e397bd07f595b0b0bc920fb0722“,”977837f0e37f14898082b0723b02d5“,”7ec967f0e37f14998082b0787b0721“,”7f07e7f0e47f531b0723b0b6fb0722“,”7f0e37f1487f595b0b0bb0b6fb0722“,”7f0e37f0e37f14898082b0723b02d5“,”7ec967f0e37f14998082b0787b0721“,”7f07e7f0e47f531b0723b0b6fb0722“,”7f0e37f1487f531b0b0bb0b6fb0722“,”7f0e37f0e37f14898082b0723b02d5“,”7ec967f0e37f14998082b0787b06bd“,”7f07e7f0e47f531b0723b0b6fb0721“,”7f0e37f1487f531b0b0bb0b6fb0722“,”7f0e37f0e37f14898082b072297c35“,”7ec967f0e37f14998082b0787b06bd“,”7f07e7f0e47f531b0723b0b6fb0721“,”7f0e27f1487f531b0b0bb0b6fb0722“,”7f0e37f0e37f14898082b072297c35“,”7ec967f0e37f14998082b0787b06bd“,”7f07e7f0e47f531b0723b0b6fb0721“,”7f0e27f1487f531b0b0bb0b6fb0722“,”7f0e37f0e366aa89801eb072297c35“,”7ec967f0e37f14998082b0787b06bd“,”7f07e7f0e47f149b0723b0787b0721“,”7f0e27f1487f531b0b0bb0b6fb0722“,”7f0e37f0e366aa89801eb072297c35“,”7ec967f0e37f14998082b0723b06bd“,”7f07e7f0e47f149b0723b0787b0721“,”7f0e27f0e47f531b0723b0b6fb0722“,”7f0e37f0e366aa89801eb072297c35“,”7ec967f0e37f14998082b0723b06bd“,”7f07e7f0e37f14998083b0787b0721“,”7f0e27f0e47f531b0723b0b6fb0722“,”7f0e37f0e366aa89801eb072297c35“,”7ec967f0e37f14898082b0723b02d5“,”7f07e7f0e37f14998082b0787b0721“,”7f07e7f0e47f531b0723b0b6fb0722“,”7f0e36665b66aa89801e9808297c35“,”665f67f0e37f14898082b0723b02d5“,”7ec967f0e37f14998082b0787b0721“,”7f07e7f0e47f531b0723b0b6fb0722“,”7f0e36665b66a449801e9808297c35“,”665f67f0e37f14898082b0723b02d5“,”7ec967f0e37f14998082b0787b06bd“,”7f07e7f0e47f531b0723b0b6fb0721“,”7f0e36665b66a449801e9808297c35“,”665f67f0e37f14898082b072297c35“,”7ec967f0e37f14998082b0787b06bd“,”7f07e7f0e47f531b0723b0b6fb0721“,”7f0e26665b66a449801e9808297c35“,”665f67f0e37f1489801eb072297c35“,”7ec967f0e37f14998082b0787b06bd“,”7f07e7f0e47f531b0723b0b6fb0721“,”7f0e27f1487f531b0b0bb0b6fb0722“,];this.nStr1=[”\u65e5“,”\u4e00“,”\u4e8c“,”\u4e09“,”\u56db“,”\u4e94“,”\u516d“,”\u4e03“,”\u516b“,”\u4e5d“,”\u5341“,];this.nStr2=[”\u521d“,”\u5341“,”\u5eff“,”\u5345“];this.nStr3=[”\u6b63“,”\u4e8c“,”\u4e09“,”\u56db“,”\u4e94“,”\u516d“,”\u4e03“,”\u516b“,”\u4e5d“,”\u5341“,”\u51ac“,”\u814a“,];this.lYearDays=function(y){var i,sum=348;for(i=0x8000;i>0x8;i>>=1){sum+=this.lunarInfo[y-1900]&i?1:0}return sum+this.leapDays(y)};this.leapMonth=function(y){return this.lunarInfo[y-1900]&0xf};this.leapDays=function(y){if(this.leapMonth(y)){return this.lunarInfo[y-1900]&0x10000?30:29}return 0};this.monthDays=function(y,m){if(m>12||m<1){return-1}return this.lunarInfo[y-1900]&(0x10000>>m)?30:29};this.solarDays=function(y,m){if(m>12||m<1){return-1}var ms=m-1;if(ms==1){return(y%4==0&&y%100!=0)||y%400==0?29:28}else{return this.solarMonth[ms]}};this.toGanZhiYear=function(lYear){var ganKey=(lYear-3)%10;var zhiKey=(lYear-3)%12;if(ganKey==0)ganKey=10;if(zhiKey==0)zhiKey=12;return this.Gan[ganKey-1]+this.Zhi[zhiKey-1]};this.toAstro=function(cMonth,cDay){var s=”\u9b54\u7faf\u6c34\u74f6\u53cc\u9c7c\u767d\u7f8a\u91d1\u725b\u53cc\u5b50\u5de8\u87f9\u72ee\u5b50\u5904\u5973\u5929\u79e4\u5929\u874e\u5c04\u624b\u9b54\u7faf“;var arr=[20,19,21,21,21,22,23,23,23,23,22,22];return(s.substr(cMonth*2-(cDay<arr[cMonth-1]?2:0),2)+”\u5ea7“)};this.toGanZhi=function(offset){return this.Gan[offset%10]+this.Zhi[offset%12]};this.getTerm=function(y,n){if(y<1900||y>2100){return-1}if(n<1||n>24){return-1}var _table=this.sTermInfo[y-1900];var _info=[parseInt(”0x“+_table.substr(0,5)).toString(),parseInt(”0x“+_table.substr(5,5)).toString(),parseInt(”0x“+_table.substr(10,5)).toString(),parseInt(”0x“+_table.substr(15,5)).toString(),parseInt(”0x“+_table.substr(20,5)).toString(),parseInt(”0x“+_table.substr(25,5)).toString(),];var _calday=[_info[0].substr(0,1),_info[0].substr(1,2),_info[0].substr(3,1),_info[0].substr(4,2),_info[1].substr(0,1),_info[1].substr(1,2),_info[1].substr(3,1),_info[1].substr(4,2),_info[2].substr(0,1),_info[2].substr(1,2),_info[2].substr(3,1),_info[2].substr(4,2),_info[3].substr(0,1),_info[3].substr(1,2),_info[3].substr(3,1),_info[3].substr(4,2),_info[4].substr(0,1),_info[4].substr(1,2),_info[4].substr(3,1),_info[4].substr(4,2),_info[5].substr(0,1),_info[5].substr(1,2),_info[5].substr(3,1),_info[5].substr(4,2),];return parseInt(_calday[n-1])};this.toChinaMonth=function(m){if(m>12||m<1){return-1}var s=this.nStr3[m-1];s+=”\u6708“;return s};this.toChinaDay=function(d){var s;switch(d){case 10:s=”\u521d\u5341“;break;case 20:s=”\u4e8c\u5341“;break;break;case 30:s=”\u4e09\u5341“;break;break;default:s=this.nStr2[Math.floor(d/10)];s+=this.nStr1[d%10]}return s};this.getAnimal=function(y){return this.Animals[(y-4)%12]};this.solar2lunar=function(y,m,d){if(y<1900||y>2100){return-1}if(y==1900&&m==1&&d<31){return-1}if(!y){var objDate=new Date()}else{var objDate=new Date(y,parseInt(m)-1,d)}var i,leap=0,temp=0;var y=objDate.getFullYear(),m=objDate.getMonth()+1,d=objDate.getDate();var offset=(Date.UTC(objDate.getFullYear(),objDate.getMonth(),objDate.getDate())-Date.UTC(1900,0,31))/86400000;for(i=1900;i<2101&&offset>0;i++){temp=this.lYearDays(i);offset-=temp}if(offset<0){offset+=temp;i—}var isTodayObj=new Date(),isToday=false;if(isTodayObj.getFullYear()==y&&isTodayObj.getMonth()+1==m&&isTodayObj.getDate()==d){isToday=true}var nWeek=objDate.getDay(),cWeek=this.nStr1[nWeek];if(nWeek==0){nWeek=7}var year=i;var leap=this.leapMonth(i);var isLeap=false;for(i=1;i<13&&offset>0;i++){if(leap>0&&i==leap+1&&isLeap==false){—i;isLeap=true;temp=this.leapDays(year)}else{temp=this.monthDays(year,i)}if(isLeap==true&&i==leap+1){isLeap=false}offset-=temp}if(offset==0&&leap>0&&i==leap+1){if(isLeap){isLeap=false}else{isLeap=true;—i}}if(offset<0){offset+=temp;—i}var month=i;var day=offset+1;var sm=m-1;var gzY=this.toGanZhiYear(year);var firstNode=this.getTerm(y,m*2-1);var secondNode=this.getTerm(y,m*2);var gzM=this.toGanZhi((y-1900)*12+m+11);if(d>=firstNode){gzM=this.toGanZhi((y-1900)*12+m+12)}var isTerm=false;var Term=null;if(firstNode==d){isTerm=true;Term=this.solarTerm[m*2-2]}if(secondNode==d){isTerm=true;Term=this.solarTerm[m*2-1]}var dayCyclical=Date.UTC(y,sm,1,0,0,0,0)/86400000+25567+10;var gzD=this.toGanZhi(dayCyclical+d-1);var astro=this.toAstro(m,d);return{lYear:year,lMonth:month,lDay:day,Animal:this.getAnimal(year),IMonthCn:(isLeap?”\u95f0“:”“)+this.toChinaMonth(month),IDayCn:this.toChinaDay(day),cYear:y,cMonth:m,cDay:d,gzYear:gzY,gzMonth:gzM,gzDay:gzD,isToday:isToday,isLeap:isLeap,nWeek:nWeek,ncWeek:”\u661f\u671f“+cWeek,isTerm:isTerm,Term:Term,astro:astro,}};this.lunar2solar=function(y,m,d,isLeapMonth){var isLeapMonth=!!isLeapMonth;var leapOffset=0;var leapMonth=this.leapMonth(y);var leapDay=this.leapDays(y);if(isLeapMonth&&leapMonth!=m){return-1}if((y==2100&&m==12&&d>1)||(y==1900&&m==1&&d<31)){return-1}var day=this.monthDays(y,m);var _day=day;if(isLeapMonth){_day=this.leapDays(y,m)}if(y<1900||y>2100||d>_day){return-1}var offset=0;for(var i=1900;i<y;i++){offset+=this.lYearDays(i)}var leap=0,isAdd=false;for(var i=1;i<m;i++){leap=this.leapMonth(y);if(!isAdd){if(leap<=i&&leap>0){offset+=this.leapDays(y);isAdd=true}}offset+=this.monthDays(y,i)}if(isLeapMonth){offset+=day}var stmap=Date.UTC(1900,1,30,0,0,0);var calObj=new Date((offset+d-31)*86400000+stmap);var cY=calObj.getUTCFullYear();var cM=calObj.getUTCMonth()+1;var cD=calObj.getUTCDate();return this.solar2lunar(cY,cM,cD)};this.birthday=function(config){var y=parseInt(config.year),m=parseInt(config.month),d=parseInt(config.day),nongli=config.nongli,isLeapMonth=config.isLeapMonth;var date;var now=new Date();if(nongli){var now_d=this.solar2lunar(now.getFullYear(),now.getMonth()+1,now.getDate());var now_year=now_d.lYear;date=this.birthBylunar(now_year,m,d,isLeapMonth);if(this.daysBetween(date)<=0){now_year++;date=this.birthBylunar(now_year,m,d,isLeapMonth)}}else{var now_year=now.getFullYear();date=this.solar2lunar(now_year,m,d);if(this.daysBetween(date)<=0){now_year++;date=this.solar2lunar(now_year,m,d)}}var result=[date,this.daysBetween(date)];return result};this.birthBylunar=function(y,m,d,isLeapMonth){if(isLeapMonth&&this.leapMonth(y)==m){d=this.lunar2solar(y,m,d,isLeapMonth)}else{d=this.lunar2solar(y,m,d,false)}return d};this.daysBetween=function(d){var now=new Date();var date=new Date(d.cYear,d.cMonth-1,d.cDay);return parseInt((date.getTime()-now.getTime())/(24*3600*1000))}}
// prettier-ignore
/*********************************** API *************************************/
function ENV(){const e=”undefined“!=typeof $task,t=”undefined“!=typeof $loon,s=”undefined“!=typeof $httpClient&&!this.isLoon,o=”function“==typeof require&&”undefined“!=typeof $jsbox;return{isQX:e,isLoon:t,isSurge:s,isNode:”function“==typeof require&&!o,isJSBox:o,isRequest:”undefined“!=typeof $request,isScriptable:”undefined“!=typeof importModule}}
function HTTP(e,t={}){const{isQX:s,isLoon:o,isSurge:i,isScriptable:n,isNode:r}=ENV();const u={};return([”GET“,”POST“,”PUT“,”DELETE“,”HEAD“,”OPTIONS“,”PATCH“].forEach((h)=>(u[h.toLowerCase()]=(u)=>(function(u,h){(h=”string“==typeof h?{url:h}:h).url=e?e+h.url:h.url;const c=(h={...t,...h}).timeout,d={onRequest:()=>{},onResponse:(e)=>e,onTimeout:()=>{},...h.events,};let l,a;if((d.onRequest(u,h),s))l=$task.fetch({method:u,...h});else if(o||i||r)l=new Promise((e,t)=>{(r?require(”request“):$httpClient)[u.toLowerCase()](h,(s,o,i)=>{s?t(s):e({statusCode:o.status||o.statusCode,headers:o.headers,body:i,})})});else if(n){const e=new Request(h.url);(e.method=u),(e.headers=h.headers),(e.body=h.body),(l=new Promise((t,s)=>{e.loadString().then((s)=>{t({statusCode:e.response.statusCode,headers:e.response.headers,body:s,})}).catch((e)=>s(e))}))}const f=c?new Promise((e,t)=>{a=setTimeout(()=>(d.onTimeout(),t(`${u}URL:${h.url}exceeds the timeout ${c}ms`)),c)}):null;return(f?Promise.race([f,l]).then((e)=>(clearTimeout(a),e)):l).then((e)=>d.onResponse(e))})(h,u))),u)}function API(e=”untitled“,t=!1){const{isQX:s,isLoon:o,isSurge:i,isNode:n,isJSBox:r}=ENV();return new(class{constructor(e,t){(this.name=e),(this.debug=t),(this.http=HTTP()),(this.env=ENV()),(this.node=(()=>{if(n){return{fs:require(”fs“)}}return null})()),this.initCache();Promise.prototype.delay=function(e){return this.then(function(t){return((e,t)=>new Promise(function(s){setTimeout(s.bind(null,t),e)}))(e,t)})}}initCache(){if((s&&(this.cache=JSON.parse($prefs.valueForKey(this.name)||”{}“)),(o||i)&&(this.cache=JSON.parse($persistentStore.read(this.name)||”{}“)),n)){let e=”root.json“;this.node.fs.existsSync(e)||this.node.fs.writeFileSync(e,JSON.stringify({}),{flag:”wx“},(e)=>console.log(e)),(this.root={}),(e=`${this.name}.json`),this.node.fs.existsSync(e)?(this.cache=JSON.parse(this.node.fs.readFileSync(`${this.name}.json`))):(this.node.fs.writeFileSync(e,JSON.stringify({}),{flag:”wx“},(e)=>console.log(e)),(this.cache={}))}}persistCache(){const e=JSON.stringify(this.cache);s&&$prefs.setValueForKey(e,this.name),(o||i)&&$persistentStore.write(e,this.name),n&&(this.node.fs.writeFileSync(`${this.name}.json`,e,{flag:”w“},(e)=>console.log(e)),this.node.fs.writeFileSync(”root.json“,JSON.stringify(this.root),{flag:”w“},(e)=>console.log(e)))}write(e,t){this.log(`SET ${t}`),-1!==t.indexOf(”#“)?((t=t.substr(1)),i&o&&$persistentStore.write(e,t),s&&$prefs.setValueForKey(e,t),n&&(this.root[t]=e)):(this.cache[t]=e),this.persistCache()}read(e){return(this.log(`READ ${e}`),-1===e.indexOf(”#“)?this.cache[e]:((e=e.substr(1)),i&o?$persistentStore.read(e):s?$prefs.valueForKey(e):n?this.root[e]:void 0))}delete(e){this.log(`DELETE ${e}`),-1!==e.indexOf(”#“)?((e=e.substr(1)),i&o&&$persistentStore.write(null,e),s&&$prefs.removeValueForKey(e),n&&delete this.root[e]):delete this.cache[e],this.persistCache()}notify(e,t=”“,u=”“,h={}){const c=h[”open-url“],d=h[”media-url“],l=u+(c?`\n点击跳转:${c}`:”“)+(d?`\n多媒体:${d}`:”“);if((s&&$notify(e,t,u,h),i&&$notification.post(e,t,l),o&&$notification.post(e,t,u,c),n))if(r){require(”push“).schedule({title:e,body:(t?t+”\n“:”“)+l})}else console.log(`${e}\n${t}\n${l}\n\n`)}log(e){this.debug&&console.log(e)}info(e){console.log(e)}error(e){console.log(”ERROR: “+e)}wait(e){return new Promise((t)=>setTimeout(t,e))}done(e={}){s||o||i?$done(e):n&&!r&&”undefined“!=typeof $context&&(($context.headers=e.headers),($context.statusCode=e.statusCode),($context.body=e.body))}})(e,t)}
/*****************************************************************************/
