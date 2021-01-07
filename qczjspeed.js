/* ziye 

github地址 https://github.com/ziye12/QCZJSPEED
TG频道地址  https://t.me/ziyescript
TG交流群   https://t.me/joinchat/AAAAAE7XHm-q1-7Np-tF3g
boxjs链接  https://raw.githubusercontent.com/ziye12/QCZJSPEED/main/Task/ziye.qczjboxjs.json

转载请备注个名字，谢谢

⚠️汽车之家极速版

下载地址 http://athm.cn/rUcSMrc 邀请码 99558995
助力活动入口 https://raw.githubusercontent.com/ziye12/QCZJSPEED/main/Task/qczjzl.png

谢谢支持

12.20 优化重写说明,优化时段重写
12.21 修复boxjs配置错误，钱包ck易掉，故去除
12.23 去除14天任务显示，增加惊喜福利，视频，福利视频，福利 4个任务
1.5 取消助力任务显示，可从活动入口进入，然后分享自己的助力，再助力自己获取助力ck


⚠️一共9个位置 12个ck  14条 Secrets 
多账号换行

第一步 添加  hostname=mobile.app.autohome.com.cn,openapi.autohome.com.cn,

第二步 添加header重写 

点击 我 获取用户名url header
GetUserInfourlVal    👉  QCZJ_GetUserInfoURL  
GetUserInfoheaderVal 👉QCZJ_GetUserInfoHEADER


第三步 注释header重写，添加body重写 添加时段body重写  获取完后注释

点击 活动 获取账户信息 日常任务 活动body



coinbodyVal          👉  QCZJ_coinBODY
taskbodyVal          👉  QCZJ_taskBODY
activitybodyVal      👉  QCZJ_activityBODY


点击 首页>>右上角 获取时段 时段翻倍 body
addCoinbodyVal       👉  addCoinBODY
addCoin2bodyVal      👉  addCoin2BODY

微信扫码 https://raw.githubusercontent.com/ziye12/QCZJSPEED/main/Task/qczjzl.png   然后自己助力自己 获取助力任务header  body 
reportAssheaderVal   👉  reportAssHEADER
reportAssbodyVal     👉  reportAssBODY

点击 活动>>现金收入>>提现>>立即提现 获取提现body
cointowalletbodyVal  👉  cointowalletBODY


⚠️⚠️⚠️以上CK全部获取完以后，添加时段body重写，去boxjs里设置ins的值，再按操作获取body

设置ins = 1
点击 活动 右上角领惊喜福利 获取惊喜福利body
设置ins = 2
点击 活动 看视频领金币 获取视频body
设置ins = 3
点击 活动 观看福利视频 获取福利视频body
设置ins = 4
点击 活动 领取福利 获取福利body


GoldcoinbodyVal      👉  QCZJ_GoldcoinBODY
videobodyVal         👉  QCZJ_videoBODY
WelfarevideobodyVal👉QCZJ_WelfarevideoBODY
WelfarebodyVal       👉  QCZJ_WelfareBODY


⚠️主机名以及重写👇

hostname=mobile.app.autohome.com.cn,openapi.autohome.com.cn,
############## 圈x
#汽车之家极速版获取header
https:\/\/(mobile\.app\.autohome\.com\.cn\/*||openapi\.autohome\.com\.cn\/*) url script-request-header https://raw.githubusercontent.com/ziye12/QCZJSPEED/master/Task/qczjspeed.js

#汽车之家极速版获取body
https:\/\/(mobile\.app\.autohome\.com\.cn\/*||openapi\.autohome\.com\.cn\/*) url script-request-body https://raw.githubusercontent.com/ziye12/QCZJSPEED/master/Task/qczjspeed.js

#汽车之家极速版获取时段body
http:\/\/mobile\.app\.autohome\.com\.cn\/* url script-request-body https://raw.githubusercontent.com/ziye12/QCZJSPEED/master/Task/qczjspeed.js



############## loon

#汽车之家极速版获取header
http-request (mobile\.app\.autohome\.com\.cn\/*||openapi\.autohome\.com\.cn\/*) script-path=https://raw.githubusercontent.com/ziye12/QCZJSPEED/master/Task/qczjspeed.js, requires-header=true, tag=汽车之家极速版获取header

#汽车之家极速版获取body
http-request (mobile\.app\.autohome\.com\.cn\/*||openapi\.autohome\.com\.cn\/*) script-path=https://raw.githubusercontent.com/ziye12/QCZJSPEED/master/Task/qczjspeed.js,requires-body=true, tag=汽车之家极速版获取body

#汽车之家极速版获取时段body
http-request http:\/\/mobile\.app\.autohome\.com\.cn\/* script-path=https://raw.githubusercontent.com/ziye12/QCZJSPEED/master/Task/qczjspeed.js, requires-body=true, tag=汽车之家极速版获取时段body

############## surge

#汽车之家极速版获取body
汽车之家极速版获取body = type=http-request,pattern=(mobile\.app\.autohome\.com\.cn\/*||openapi\.autohome\.com\.cn\/*),requires-body=1,max-size=0,script-path=https://raw.githubusercontent.com/ziye12/QCZJSPEED/master/Task/qczjspeed.js, script-update-interval=0

#汽车之家极速版获取header
汽车之家极速版获取header = type=http-request,pattern=(mobile\.app\.autohome\.com\.cn\/*||openapi\.autohome\.com\.cn\/*),script-path=https://raw.githubusercontent.com/ziye12/QCZJSPEED/master/Task/qczjspeed.js, 

#汽车之家极速版获取时段body
汽车之家极速版获取时段body = type=http-request,pattern=http:\/\/mobile\.app\.autohome\.com\.cn\/*,requires-body=1,max-size=0,script-path=https://raw.githubusercontent.com/ziye12/QCZJSPEED/master/Task/qczjspeed.js, script-update-interval=0

  "Goldcoinbody",  "videobody", "Welfarevideobody", "Welfarebody", 

*/


const $ = Env("汽车之家极速版");
$.idx = ($.idx = ($.getval('qczjSuffix') || '1') - 1) > 0 ? ($.idx + 1 + '') : ''; // 账号扩展字符
const notify = $.isNode() ? require("./sendNotify") : "";

let COOKIES_SPLIT = "\n"; // 自定义多cookie之间连接的分隔符，默认为\n换行分割，不熟悉的不要改动和配置，为了兼容本地node执行

const logs = 0; // 0为关闭日志，1为开启
const notifyInterval = 1;// 0为关闭通知，1为所有通知，
const cointowalletid = 0.5;//提现金额
const ins = $.getval('qczjIns'); // ⚠️0不获取，1获取惊喜福利body，2获取视频body,3获取福利视频body,4获取福利body

let gksp,flsp,lqfl;
$.message = '';

const GetUserInfourlArr = [];
let GetUserInfourlVal = "";
const GetUserInfoheaderArr = [];
let GetUserInfoheaderVal = "";
let middleGetUserInfoURL = [];
let middleGetUserInfoHEADER = [];
const coinbodyArr = [];
let coinbodyVal = "";
let middlecoinBODY = [];
const taskbodyArr = [];
let taskbodyVal = "";
let middletaskBODY = [];
const activitybodyArr = [];
let activitybodyVal = "";
let middleactivityBODY = [];
const GoldcoinbodyArr = [];
let GoldcoinbodyVal = "";
let middleGoldcoinBODY = [];
const videobodyArr = [];
let videobodyVal = "";
let middlevideoBODY = [];
const WelfarevideobodyArr = [];
let WelfarevideobodyVal = "";
let middleWelfarevideoBODY = [];
const WelfarebodyArr = [];
let WelfarebodyVal = "";
let middleWelfareBODY = [];
const addCoinbodyArr = [];
let addCoinbodyVal = "";
let middleaddCoinBODY = [];
const addCoin2bodyArr = [];
let addCoin2bodyVal = "";
let middleaddCoin2BODY = [];
const reportAssbodyArr = [];
let reportAssbodyVal = "";
const reportAssheaderArr = [];
let reportAssheaderVal = "";
let middlereportAssBODY = [];
let middlereportAssHEADER = [];
const cointowalletbodyArr = [];
let cointowalletbodyVal = "";
let middlecointowalletBODY = [];









if ($.isNode()) {
  if (process.env.COOKIES_SPLIT) {
    COOKIES_SPLIT = process.env.COOKIES_SPLIT;
  }
  console.log(
    `============ cookies分隔符为：${JSON.stringify(
      COOKIES_SPLIT
    )} =============\n`
  );
 if (
    process.env.QCZJ_GetUserInfoURL &&
    process.env.QCZJ_GetUserInfoURL.indexOf(COOKIES_SPLIT) > -1
  ) {
    middleGetUserInfoURL = process.env.QCZJ_GetUserInfoURL.split(COOKIES_SPLIT);
  } else {
    middleGetUserInfoURL = process.env.QCZJ_GetUserInfoURL.split();
  }
  if (
    process.env.QCZJ_GetUserInfoHEADER &&
    process.env.QCZJ_GetUserInfoHEADER.indexOf(COOKIES_SPLIT) > -1
  ) {
    middleGetUserInfoHEADER = process.env.QCZJ_GetUserInfoHEADER.split(COOKIES_SPLIT);
  } else {
    middleGetUserInfoHEADER = process.env.QCZJ_GetUserInfoHEADER.split();
  } 
    if (
    process.env.QCZJ_coinBODY &&
    process.env.QCZJ_coinBODY.indexOf(COOKIES_SPLIT) > -1
  ) {
    middlecoinBODY = process.env.QCZJ_coinBODY.split(COOKIES_SPLIT);
  } else {
    middlecoinBODY = process.env.QCZJ_coinBODY.split();
  } 
    if (
    process.env.QCZJ_taskBODY &&
    process.env.QCZJ_taskBODY.indexOf(COOKIES_SPLIT) > -1
  ) {
    middletaskBODY = process.env.QCZJ_taskBODY.split(COOKIES_SPLIT);
  } else {
    middletaskBODY = process.env.QCZJ_taskBODY.split();
  }  
    if (
    process.env.QCZJ_activityBODY &&
    process.env.QCZJ_activityBODY.indexOf(COOKIES_SPLIT) > -1
  ) {
    middleactivityBODY = process.env.QCZJ_activityBODY.split(COOKIES_SPLIT);
  } else {
    middleactivityBODY = process.env.QCZJ_activityBODY.split();
  }
    if (
    process.env.QCZJ_GoldcoinBODY &&
    process.env.QCZJ_GoldcoinBODY.indexOf(COOKIES_SPLIT) > -1
  ) {
    middleGoldcoinBODY = process.env.QCZJ_GoldcoinBODY.split(COOKIES_SPLIT);
  } else {
    middleGoldcoinBODY = process.env.QCZJ_GoldcoinBODY.split();
  }
    if (
    process.env.QCZJ_videoBODY &&
    process.env.QCZJ_videoBODY.indexOf(COOKIES_SPLIT) > -1
  ) {
    middlevideoBODY = process.env.QCZJ_videoBODY.split(COOKIES_SPLIT);
  } else {
    middlevideoBODY = process.env.QCZJ_videoBODY.split();
  }
    if (
    process.env.QCZJ_WelfarevideoBODY &&
    process.env.QCZJ_WelfarevideoBODY.indexOf(COOKIES_SPLIT) > -1
  ) {
    middleWelfarevideoBODY = process.env.QCZJ_WelfarevideoBODY.split(COOKIES_SPLIT);
  } else {
    middleWelfarevideoBODY = process.env.QCZJ_WelfarevideoBODY.split();
  }
    if (
    process.env.QCZJ_WelfareBODY &&
    process.env.QCZJ_WelfareBODY.indexOf(COOKIES_SPLIT) > -1
  ) {
    middleWelfareBODY = process.env.QCZJ_WelfareBODY.split(COOKIES_SPLIT);
  } else {
    middleWelfareBODY = process.env.QCZJ_WelfareBODY.split();
  }
    if (
    process.env.QCZJ_addCoinBODY &&
    process.env.QCZJ_addCoinBODY.indexOf(COOKIES_SPLIT) > -1
  ) {
    middleaddCoinBODY = process.env.QCZJ_addCoinBODY.split(COOKIES_SPLIT);
  } else {
    middleaddCoinBODY = process.env.QCZJ_addCoinBODY.split();
  } 
    if (
    process.env.QCZJ_addCoin2BODY &&
    process.env.QCZJ_addCoin2BODY.indexOf(COOKIES_SPLIT) > -1
  ) {
    middleaddCoin2BODY = process.env.QCZJ_addCoin2BODY.split(COOKIES_SPLIT);
  } else {
    middleaddCoin2BODY = process.env.QCZJ_addCoin2BODY.split();
  } 
  if (
    process.env.QCZJ_reportAssHEADER &&
    process.env.QCZJ_reportAssHEADER.indexOf(COOKIES_SPLIT) > -1
  ) {
    middlereportAssHEADER = process.env.QCZJ_reportAssHEADER.split(COOKIES_SPLIT);
  } else {
    middlereportAssHEADER = process.env.QCZJ_reportAssHEADER.split();
  } 
    if (
    process.env.QCZJ_reportAssBODY &&
    process.env.QCZJ_reportAssBODY.indexOf(COOKIES_SPLIT) > -1
  ) {
    middlereportAssBODY = process.env.QCZJ_reportAssBODY.split(COOKIES_SPLIT);
  } else {
    middlereportAssBODY = process.env.QCZJ_reportAssBODY.split();
  }   
    if (
    process.env.QCZJ_cointowalletBODY &&
    process.env.QCZJ_cointowalletBODY.indexOf(COOKIES_SPLIT) > -1
  ) {
    middlecointowalletBODY = process.env.QCZJ_cointowalletBODY.split(COOKIES_SPLIT);
  } else {
    middlecointowalletBODY = process.env.QCZJ_cointowalletBODY.split();
  } 
}

if ($.isNode()) {
  Object.keys(middleGetUserInfoURL).forEach((item) => {
    if (middleGetUserInfoURL[item]) {
      GetUserInfourlArr.push(middleGetUserInfoURL[item]);
    }
  });
  Object.keys(middleGetUserInfoHEADER).forEach((item) => {
    if (middleGetUserInfoHEADER[item]) {
      GetUserInfoheaderArr.push(middleGetUserInfoHEADER[item]);
    }
  });  
  Object.keys(middlecoinBODY).forEach((item) => {
    if (middlecoinBODY[item]) {
      coinbodyArr.push(middlecoinBODY[item]);
    }
  }); 
  Object.keys(middletaskBODY).forEach((item) => {
    if (middletaskBODY[item]) {
      taskbodyArr.push(middletaskBODY[item]);
    }
  });
  Object.keys(middleactivityBODY).forEach((item) => {
    if (middleactivityBODY[item]) {
      activitybodyArr.push(middleactivityBODY[item]);
    }
  });  
  Object.keys(middleGoldcoinBODY).forEach((item) => {
    if (middleGoldcoinBODY[item]) {
      GoldcoinbodyArr.push(middleGoldcoinBODY[item]);
    }
  });    
  Object.keys(middlevideoBODY).forEach((item) => {
    if (middlevideoBODY[item]) {
      videobodyArr.push(middlevideoBODY[item]);
    }
  });  
  Object.keys(middleWelfarevideoBODY).forEach((item) => {
    if (middleWelfarevideoBODY[item]) {
      WelfarevideobodyArr.push(middleWelfarevideoBODY[item]);
    }
  });   
  Object.keys(middleWelfareBODY).forEach((item) => {
    if (middleWelfareBODY[item]) {
      WelfarebodyArr.push(middleWelfareBODY[item]);
    }
  });    
  Object.keys(middleaddCoinBODY).forEach((item) => {
    if (middleaddCoinBODY[item]) {
      addCoinbodyArr.push(middleaddCoinBODY[item]);
    }
  });
  Object.keys(middleaddCoin2BODY).forEach((item) => {
    if (middleaddCoin2BODY[item]) {
      addCoin2bodyArr.push(middleaddCoin2BODY[item]);
    }
  });
  Object.keys(middlereportAssBODY).forEach((item) => {
    if (middlereportAssBODY[item]) {
      reportAssbodyArr.push(middlereportAssBODY[item]);
    }
  });
  Object.keys(middlereportAssHEADER).forEach((item) => {
    if (middlereportAssHEADER[item]) {
      reportAssheaderArr.push(middlereportAssHEADER[item]);
    }
  });
  Object.keys(middlecointowalletBODY).forEach((item) => {
    if (middlecointowalletBODY[item]) {
      cointowalletbodyArr.push(middlecointowalletBODY[item]);
    }
  });
} else {	
  GetUserInfourlArr.push($.getdata("GetUserInfourl"));	
  GetUserInfoheaderArr.push($.getdata("GetUserInfoheader"));  
  coinbodyArr.push($.getdata("coinbody"));
  taskbodyArr.push($.getdata("taskbody"));
  activitybodyArr.push($.getdata("activitybody"));
  GoldcoinbodyArr.push($.getdata("Goldcoinbody"));  
  videobodyArr.push($.getdata("videobody"));  
  WelfarevideobodyArr.push($.getdata("Welfarevideobody"));  
  WelfarebodyArr.push($.getdata("Welfarebody"));  
  addCoinbodyArr.push($.getdata("addCoinbody"));
  addCoin2bodyArr.push($.getdata("addCoin2body"));    
  reportAssbodyArr.push($.getdata("reportAssbody")); 
  reportAssheaderArr.push($.getdata("reportAssheader"));  
  cointowalletbodyArr.push($.getdata("cointowalletbody"));
  // 根据boxjs中设置的额外账号数，添加存在的账号数据进行任务处理
  let qczjCount = ($.getval('qczjCount') || '1') - 0;
  for (let i = 2; i <= qczjCount; i++) {
    if ($.getdata(`GetUserInfourl${i}`)) {	
  GetUserInfourlArr.push($.getdata(`GetUserInfourl${i}`));	
  GetUserInfoheaderArr.push($.getdata(`GetUserInfoheader${i}`));  
  coinbodyArr.push($.getdata(`coinbody${i}`));
  taskbodyArr.push($.getdata(`taskbody${i}`));
  activitybodyArr.push($.getdata(`activitybody${i}`));
  GoldcoinbodyArr.push($.getdata(`Goldcoinbody${i}`));  
  videobodyArr.push($.getdata(`videobody${i}`));  
  WelfarevideobodyArr.push($.getdata(`Welfarevideobody${i}`));  
  WelfarebodyArr.push($.getdata(`Welfarebody${i}`));    
  addCoinbodyArr.push($.getdata(`addCoinbody${i}`));
  addCoin2bodyArr.push($.getdata(`addCoin2body${i}`));    
  reportAssbodyArr.push($.getdata(`reportAssbody${i}`)); 
  reportAssheaderArr.push($.getdata(`reportAssheader${i}`));  
  cointowalletbodyArr.push($.getdata(`cointowalletbody${i}`));
    }
  }
}


function GetCookie() {
//用户名
if ($request && $request.url.indexOf("GetUserInfo.ashx") >= 0) {
    const GetUserInfourlVal = $request.url;
    if (GetUserInfourlVal) $.setdata(GetUserInfourlVal, "GetUserInfourl" + $.idx);
    $.log(
      `[${$.name + $.idx}] 获取用户名url✅: 成功,GetUserInfourlVal: ${GetUserInfourlVal}`
    );
    $.msg($.name + $.idx, `获取用户名url: 成功🎉`, ``);		
    const GetUserInfoheaderVal = JSON.stringify($request.headers);
    if (GetUserInfoheaderVal) $.setdata(GetUserInfoheaderVal, "GetUserInfoheader" + $.idx);
    $.log(
      `[${$.name + $.idx}] 获取用户名header✅: 成功,GetUserInfoheaderVal: ${GetUserInfoheaderVal}`
    );
    $.msg($.name + $.idx, `获取用户名header: 成功🎉`, ``);
    } 
//账户信息
if ($request && $request.url.indexOf("init") >= 0&& $request.url.indexOf("coin") >= 0&&$request.body.indexOf("pm=1")>=0) {
    const coinbodyVal = $request.body;
    if (coinbodyVal) $.setdata(coinbodyVal, "coinbody" + $.idx);
    $.log(
      `[${$.name + $.idx}] 获取账户信息body✅: 成功,coinbodyVal: ${coinbodyVal}`
    );
    $.msg($.name + $.idx, `获取账户信息body: 成功🎉`, ``);
    } 
//日常任务
if ($request && $request.url.indexOf("init") >= 0&& $request.url.indexOf("task") >= 0&&$request.body.indexOf("model=1")>=0) {
    const taskbodyVal = $request.body;
    if (taskbodyVal) $.setdata(taskbodyVal, "taskbody" + $.idx);
    $.log(
      `[${$.name + $.idx}] 获取日常任务body✅: 成功,taskbodyVal: ${taskbodyVal}`
    );
    $.msg($.name + $.idx, `获取日常任务body: 成功🎉`, ``);
    } 
//活动
if ($request && $request.url.indexOf("activity") >= 0&&$request.body.indexOf("pm=1")>=0)  {
    const activitybodyVal = $request.body;
    if (activitybodyVal) $.setdata(activitybodyVal, "activitybody" + $.idx);
    $.log(
      `[${$.name + $.idx}] 获取活动body✅: 成功,activitybodyVal: ${activitybodyVal}`
    );
    $.msg($.name + $.idx, `获取活动body: 成功🎉`, ``);
    } 

//惊喜福利 视频 福利视频 福利
if ($request && $request.url.indexOf("addRewardLog") >= 0&&$request.body.indexOf("pm=1")>=0)  {
if (ins==1) {
    const GoldcoinbodyVal = $request.body;
    if (GoldcoinbodyVal) $.setdata(GoldcoinbodyVal, "Goldcoinbody" + $.idx);
    $.log(
      `[${$.name + $.idx}] 获取惊喜福利body✅: 成功,GoldcoinbodyVal: ${GoldcoinbodyVal}`
    );
    $.msg($.name + $.idx, `获取惊喜福利body: 成功🎉`, ``);
	 }if (ins==2) {
	const videobodyVal = $request.body;
    if (videobodyVal) $.setdata(videobodyVal, "videobody" + $.idx);
    $.log(
      `[${$.name + $.idx}] 获取视频body✅: 成功,videobodyVal: ${videobodyVal}`
    );
    $.msg($.name + $.idx, `获取视频body: 成功🎉`, ``);
	 } if (ins==3) {  
    const WelfarevideobodyVal = $request.body;
    if (WelfarevideobodyVal) $.setdata(WelfarevideobodyVal, "Welfarevideobody" + $.idx);
    $.log(
      `[${$.name + $.idx}] 获取福利视频body✅: 成功,WelfarevideobodyVal: ${WelfarevideobodyVal}`
    );
    $.msg($.name + $.idx, `获取福利视频body: 成功🎉`, ``);	
	 } if (ins==4) {
    const WelfarebodyVal = $request.body;
    if (WelfarebodyVal) $.setdata(WelfarebodyVal, "Welfarebody" + $.idx);
    $.log(
      `[${$.name + $.idx}] 获取福利body✅: 成功,WelfarebodyVal: ${WelfarebodyVal}`
    );
    $.msg($.name + $.idx, `获取福利body: 成功🎉`, ``);
    } 	

	}	
//时段任务
 if ($request &&$request.body.indexOf("moreflag=0")>=0 ){
    const addCoinbodyVal = $request.body;
    if (addCoinbodyVal) $.setdata(addCoinbodyVal, "addCoinbody" + $.idx);
    $.log(
      `[${$.name + $.idx}] 获取时段任务body✅: 成功,addCoinbodyVal: ${addCoinbodyVal}`
    );
    $.msg($.name + $.idx, `获取时段任务body: 成功🎉`, ``);
    } 
//时段翻倍
 if ($request &&$request.body.indexOf("moreflag=1")>=0 ){
    const addCoin2bodyVal = $request.body;
    if (addCoin2bodyVal) $.setdata(addCoin2bodyVal, "addCoin2body" + $.idx);
    $.log(
      `[${$.name + $.idx}] 获取时段翻倍body✅: 成功,addCoin2bodyVal: ${addCoin2bodyVal}`
    );
    $.msg($.name + $.idx, `获取时段翻倍body: 成功🎉`, ``);
    } 
//助力任务
if ($request && $request.url.indexOf("reportAss") >= 0) {
    const reportAssheaderVal = JSON.stringify($request.headers);
    if (reportAssheaderVal) $.setdata(reportAssheaderVal, "reportAssheader" + $.idx);
    $.log(
      `[${$.name + $.idx}] 获取助力任务header✅: 成功,reportAssheaderVal: ${reportAssheaderVal}`
    );
    $.msg($.name + $.idx, `获取助力任务header: 成功🎉`, ``);
	
if ($request &&$request.body.indexOf("_appid=car")>=0 ){	
    const reportAssbodyVal = $request.body;
    if (reportAssbodyVal) $.setdata(reportAssbodyVal, "reportAssbody" + $.idx);
    $.log(
      `[${$.name + $.idx}] 获取助力任务body✅: 成功,reportAssbodyVal: ${reportAssbodyVal}`
    );
    $.msg($.name + $.idx, `获取助力任务body: 成功🎉`, ``);
	}
    } 
//提现
if ($request && $request.url.indexOf("cointowallet") >= 0&&$request.body.indexOf("pm=1")>=0) {
    const cointowalletbodyVal = $request.body;
    if (cointowalletbodyVal) $.setdata(cointowalletbodyVal, "cointowalletbody" + $.idx);
    $.log(
      `[${$.name + $.idx}] 获取提现body✅: 成功,cointowalletbodyVal: ${cointowalletbodyVal}`
    );
    $.msg($.name + $.idx, `获取提现body: 成功🎉`, ``);
    } 
}


let isGetCookie = typeof $request !== 'undefined'
if (isGetCookie) {
  GetCookie()
} else {
  !(async () => {
    await all();
    await msgShow();
  })()
      .catch((e) => {
        $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
      })
      .finally(() => {
        $.done();
      })
}


async function all() {
if (!GetUserInfourlArr[0]) {
    $.msg($.name, '提示：⚠️请点击前往获取cookie\n', 'http://athm.cn/rUcSMrc', {"open-url": "http://athm.cn/rUcSMrc"});
    return;
  } else {console.log(`============ 共${GetUserInfourlArr.length}个${$.name}账号  =============\n`
  );
  console.log(`==================脚本执行- 北京时间(UTC+8)：${new Date(new Date().getTime() + new Date().getTimezoneOffset()*60*1000 + 8*60*60*1000).toLocaleString()}=====================\n`)}

  for (let i = 0; i < GetUserInfourlArr.length; i++) {
  GetUserInfourlVal = GetUserInfourlArr[i];		
  GetUserInfoheaderVal = GetUserInfoheaderArr[i];  
  coinbodyVal = coinbodyArr[i];
  taskbodyVal = taskbodyArr[i];	  
  activitybodyVal = activitybodyArr[i];
  GoldcoinbodyVal = GoldcoinbodyArr[i];
  videobodyVal = videobodyArr[i];
  WelfarevideobodyVal = WelfarevideobodyArr[i];
  WelfarebodyVal = WelfarebodyArr[i];
  addCoinbodyVal = addCoinbodyArr[i];
  addCoin2bodyVal = addCoin2bodyArr[i];
  reportAssheaderVal = reportAssheaderArr[i];
  reportAssbodyVal = reportAssbodyArr[i];	  
  cointowalletbodyVal = cointowalletbodyArr[i];
      await console.log(`-------------------------\n\n🔔开始运行【${$.name+(i+1)}】`) 
      await GetUserInfo();     
      await coin();
      await task();
      await activity();
      await Goldcoin();
      await video();
      await Welfarevideo();
      await Welfare();
      await addCoin();
      await addCoin2();
      await reportAss();
      await cointowallet();
      
  }
}


//用户名
function GetUserInfo(timeout = 0) {
  return new Promise((resolve) => {
    setTimeout( ()=>{
      let url = {
        url: GetUserInfourlVal,
        headers: JSON.parse(GetUserInfoheaderVal),		
      }
      $.get(url, async(err, resp, data) => {
        try {
          if (logs) $.log(`${$.name}, 用户名🚩: ${data}`);
          $.GetUserInfo = JSON.parse(data);
$.message += `\n========== 【${$.GetUserInfo.result.name}】 ==========\n`;
        } catch (e) {
          $.logErr(e, resp);
        } finally {
          resolve()
        }
      })
    },timeout)
  })
}
//账户信息  
function coin(timeout = 0) {
  return new Promise((resolve) => {
    setTimeout( ()=>{
      let url = {
        url:`https://mobile.app.autohome.com.cn/speedgrow_v1.0.0/taskcenter/init/coin`,
        headers: JSON.parse(GetUserInfoheaderVal),
		body: coinbodyVal,
      }
      $.post(url, async(err, resp, data) => {
        try {
          if (logs) $.log(`${$.name}, 账户信息🚩: ${data}`);
          $.coin = JSON.parse(data);
 $.message +='【账户信息】：今日金币'+$.coin.result.nowcoin+',账户余额'+$.coin.result.nowmoney+'元'+'\n';
        } catch (e) {
          $.logErr(e, resp);
        } finally {
          resolve()
        }
      })
    },timeout)
  })
}
//日常任务
function task(timeout = 0) {
  return new Promise((resolve) => {
    setTimeout( ()=>{
      let url = {
        url: `https://mobile.app.autohome.com.cn/speedgrow_v1.0.0/taskcenter/init/task`,
        headers: JSON.parse(GetUserInfoheaderVal),
        body: taskbodyVal,
      }
      $.post(url, async(err, resp, data) => {
        try {
          if (logs) $.log(`${$.name}, 日常任务🚩: ${data}`);
          $.task = JSON.parse(data);
      gksp = $.task.result.list[1].tasklist.find(item => item.id === 14);
      flsp = $.task.result.list[1].tasklist.find(item => item.id === 18);
      lqfl = $.task.result.list[1].tasklist.find(item => item.id === 35);
  $.message +=  
  '【'+gksp.title+'】：奖励'+gksp.tiptxt+'，进度'+gksp.step+'\n'+
  '【'+flsp.title+'】：奖励'+flsp.tiptxt+'，进度'+flsp.step+'\n'+
  '【'+lqfl.title+'】：奖励'+lqfl.tiptxt+'\n';
        } catch (e) {
          $.logErr(e, resp);
        } finally {
          resolve()
        }
      })
    },timeout)
  })
}
//活动
function activity(timeout = 0) {
  return new Promise((resolve) => {
    setTimeout( ()=>{
      let url = {
        url:`https://mobile.app.autohome.com.cn/speedgrow_v1.0.0/taskcenter/init/activity`,
        headers: JSON.parse(GetUserInfoheaderVal),
		body: activitybodyVal,
      }
      $.post(url, async(err, resp, data) => {
        try {
          if (logs) $.log(`${$.name}, 活动🚩: ${data}`);
          $.activity = JSON.parse(data);
  let activitydex=$.activity.result.list
  let activityxyz=activitydex[1].data.activitycard.headdata
  let activityabc=activitydex[1].data.activitycard.currenttask
  let activitydef=activitydex[1].data.activitycard.activityinfo
  $.message +='【'+$.activity.result.title+'】：已连续签到'+activitydex[0].data.signdaycount+'天，今日签到奖励'+activitydex[0].data.signlist[activitydex[0].data.signdaycount-1].prize+'金币'+'\n'
  
        } catch (e) {
          $.logErr(e, resp);
        } finally {
          resolve()
        }
      })
    },timeout)
  })
}
//惊喜福利
function Goldcoin(timeout = 0) {
  return new Promise((resolve) => {
    setTimeout( ()=>{	 		
      let url = {
        url: `https://mobile.app.autohome.com.cn/fasthome/invite/addRewardLog`,
        headers: JSON.parse(GetUserInfoheaderVal),
		body: GoldcoinbodyVal,
      }
      $.post(url, async(err, resp, data) => {
        try {
          if (logs) $.log(`${$.name}, 惊喜福利🚩: ${data}`);
          $.Goldcoin = JSON.parse(data);
if($.Goldcoin.result.fk_flag==0)
      $.message +='【惊喜福利】：成功领取'+$.Goldcoin.result.rewardCoin+'金币\n';
        } catch (e) {
          $.logErr(e, resp);
        } finally {
          resolve()
        }
      })
    },timeout)
  })
}
//视频
function video(timeout = 0) {
  return new Promise((resolve) => {
    setTimeout( ()=>{	 		
      let url = {
        url: `https://mobile.app.autohome.com.cn/fasthome/invite/addRewardLog`,
        headers: JSON.parse(GetUserInfoheaderVal),
		body: videobodyVal,
      }
      $.post(url, async(err, resp, data) => {
        try {
          if (logs) $.log(`${$.name}, 视频🚩: ${data}`);
          $.video = JSON.parse(data);
if($.video.result.fk_flag&&$.video.result.addedCoin==0){
      $.message +='【视频】：成功领取'+$.video.result.rewardCoin+'金币\n'}
else if($.video.result.fk_flag&&$.video.result.addedCoin!=0){
      $.message +='【视频】：成功领取'+$.video.result.rewardCoin+'金币,'+$.video.result.nextAddedText+'\n';}	  	  
	          } catch (e) {
          $.logErr(e, resp);
        } finally {
          resolve()
        }
      })
    },timeout)
  })
}


//福利视频
function Welfarevideo(timeout = 0) {
  return new Promise((resolve) => {
    setTimeout( ()=>{	 		
      let url = {
        url: `https://mobile.app.autohome.com.cn/fasthome/invite/addRewardLog`,
        headers: JSON.parse(GetUserInfoheaderVal),
		body: WelfarevideobodyVal,
      }
      $.post(url, async(err, resp, data) => {
        try {
          if (logs) $.log(`${$.name}, 福利视频🚩: ${data}`);
          $.Welfarevideo = JSON.parse(data);
if($.Welfarevideo.result.rewardCash)
      $.message +='【福利视频】：成功领取'+$.Welfarevideo.result.rewardCoin+'金币\n';
 if($.Welfarevideo.result.finish)
      $.message +='【福利视频】：已全部领取完毕\n';
        } catch (e) {
          $.logErr(e, resp);
        } finally {
          resolve()
        }
      })
    },timeout)
  })
}

//福利
function Welfare(timeout = 0) {
  return new Promise((resolve) => {
    setTimeout( ()=>{	 		
      let url = {
        url: `https://mobile.app.autohome.com.cn/fasthome/invite/addRewardLog`,
        headers: JSON.parse(GetUserInfoheaderVal),
		body: WelfarebodyVal,
      }
      $.post(url, async(err, resp, data) => {
        try {
          if (logs) $.log(`${$.name}, 福利🚩: ${data}`);
          $.Welfare = JSON.parse(data);
if($.Welfare.result.rewardCoin){
      $.message +='【福利】：成功领取'+$.Welfare.result.rewardCoin+'金币\n'}
else if($.Welfare.returncode!=0)
      $.message +='【福利】：'+$.Welfare.message+'\n';	  
        } catch (e) {
          $.logErr(e, resp);
        } finally {
          resolve()
        }
      })
    },timeout)
  })
}


//时段任务
function addCoin(timeout = 0) {
  return new Promise((resolve) => {
    setTimeout( ()=>{	 		
      let url = {
        url: `http://mobile.app.autohome.com.cn/fasthome/mainpagecoin/addCoin`,
        headers: JSON.parse(GetUserInfoheaderVal),
		body: addCoinbodyVal,
      }
      $.post(url, async(err, resp, data) => {
        try {
          if (logs) $.log(`${$.name}, 时段任务🚩: ${data}`);
          $.addCoin = JSON.parse(data);
if($.addCoin.returncode==0)
      $.message +='【时段奖励】：成功领取'+$.addCoin.result.getcoinnum+'金币\n';
        } catch (e) {
          $.logErr(e, resp);
        } finally {
          resolve()
        }
      })
    },timeout)
  })
}
//时段翻倍
function addCoin2(timeout = 1000) {
  return new Promise((resolve) => {
    setTimeout( ()=>{	 	  
      let url = {
        url: `http://mobile.app.autohome.com.cn/fasthome/mainpagecoin/addCoin`,
        headers: JSON.parse(GetUserInfoheaderVal),
		body: addCoin2bodyVal,
      }
      $.post(url, async(err, resp, data) => {
        try {
          if (logs) $.log(`${$.name}, 时段翻倍🚩: ${data}`);
          $.addCoin2 = JSON.parse(data);
if($.addCoin2.returncode==0)
       $.message +='【时段翻倍】：成功领取'+$.addCoin2.result.getcoinnum+'金币\n';
        } catch (e) {
          $.logErr(e, resp);
        } finally {
          resolve()
        }
      })
    },timeout)
  })
}
//助力任务
function reportAss(timeout = 0) {
  return new Promise((resolve) => {
    setTimeout( ()=>{
		do out = Math.floor(Math.random()*10000000);
        while( out < 100 )		
	   for(var i=0;i<1;i++){
		 setTimeout( ()=>{	  
	  let body = reportAssbodyVal.replace(/userAssistanceId=[0-9]{0,10}/, `userAssistanceId=${out}`)
      let url = {
        url:`https://openapi.autohome.com.cn/autohome/uc-news-quickappservice/msapi/dealers/reportAss`,
        headers: JSON.parse(reportAssheaderVal),
		body: body,
      }
      $.post(url, async(err, resp, data) => {
        try {
          if (logs) $.log(`${$.name}, 助力任务🚩: ${data}`);
          $.reportAss = JSON.parse(data);
if($.reportAss.data==0)
  $.message +='【助力任务】：助力成功\n';  
        } catch (e) {
          $.logErr(e, resp);
        } finally {
          resolve()
        }
      })
	  },1000)
	 }
    },timeout)
  })
}
//提现
function cointowallet(timeout = 0) {
  return new Promise((resolve) => {
    setTimeout( ()=>{
	  let body = cointowalletbodyVal.replace(/coin_amount=[0-9]{0,6}/, `coin_amount=${cointowalletid*10000}`)
      let url = {
        url: `https://mobile.app.autohome.com.cn/fasthome/coin/cointowallet`,
        headers: JSON.parse(GetUserInfoheaderVal),
		body: body,
      }
      $.post(url, async(err, resp, data) => {
        try {
          if (logs) $.log(`${$.name}, 提现🚩: ${data}`);
          $.cointowallet = JSON.parse(data);
if($.cointowallet.returncode==0)
  $.message +='【提现'+cointowalletid+'元】：成功\n';  
        } catch (e) {
          $.logErr(e, resp);
        } finally {
          resolve()
        }
      })
    },timeout)
  })
}

//通知
function msgShow() {
 
if (notifyInterval == 1) 
  $.msg($.name, '', $.message);
}

// prettier-ignore
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r)));let h=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];h.push(e),s&&h.push(s),i&&h.push(i),console.log(h.join("\n")),this.logs=this.logs.concat(h)}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}