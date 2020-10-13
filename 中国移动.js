// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-green; icon-glyph: mobile;

/**
 * Author: GideonSenku,Chavyleung,wangfei021325
 * Github: https://github.com/GideonSenku
 */

const prefix = "boxjs.net"; //修改成你用的域名
const $ = importModule("Env");

const chavy_autologin_cmcc = `直接将本段子界文字替换成BoxJS中的chavy_autologin_cmcc数据，或者抓包填入一个request对象`;

const chavy_getfee_cmcc = `直接将本段子界文字替换成BoxJS中的chavy_autologin_cmcc数据，或者抓包填入一个request对象`;

$.KEY_autologin = "chavy_autologin_cmcc";

$.KEY_getfee = "chavy_getfee_cmcc";

async function getdata(key) {
  const url = `http://${prefix}/query/boxdata`;
  const boxdata = await $.get({ url });
  if (boxdata.datas[key]) {
    return boxdata.datas[key];
  } else {
    return undefined;
  }
}

const crypto = {
  moduleName: "crypto-js",
  url:
    "https://raw.githubusercontent.com/GideonSenku/Scriptable/master/crypto-js.min.js",
};

!(async () => {
  $.CryptoJS = $.require(crypto);
  $.autologin = await getdata($.KEY_autologin);
  $.getfee = await getdata($.KEY_getfee);
  log($.autologin)
  await loginapp();
  await queryfee();
  await querymeal();
  await showmsg();
})().catch((e) => $.logErr(e));

function loginapp() {
  return new Promise((resolve) => {
    const url = $.autologin
      ? JSON.parse($.autologin)
      : JSON.parse(chavy_autologin_cmcc);
    $.post(url, (resp, data) => {
      try {
        $.setck = resp.headers["Set-Cookie"];
        console.warn("login");
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve();
      }
    });
  });
}

function queryfee() {
  return new Promise((resolve) => {
    const url = $.getfee ? JSON.parse($.getfee) : JSON.parse(chavy_getfee_cmcc);
    const body = JSON.parse(decrypt(url.body, "bAIgvwAuA4tbDr9d"));
    const cellNum = body.reqBody.cellNum;
    const bodystr = `{"t":"${$.CryptoJS.MD5(
      $.setck
    ).toString()}","cv":"9.9.9","reqBody":{"cellNum":"${cellNum}"}}`;
    url.body = encrypt(bodystr, "bAIgvwAuA4tbDr9d");
    url.headers["Cookie"] = $.setck;
    url.headers["xs"] = $.CryptoJS.MD5(
      url.url + "_" + bodystr + "_Leadeon/SecurityOrganization"
    ).toString();
    console.warn("fee");
    $.post(url, (resp, data) => {
      try {
        $.fee = JSON.parse(decrypt(data, "GS7VelkJl5IT1uwQ"));
        console.warn($.fee);
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve();
      }
    });
  });
}

function querymeal() {
  return new Promise((resolve) => {
    const url = $.getfee ? JSON.parse($.getfee) : JSON.parse(chavy_getfee_cmcc);
    url.url =
      "https://clientaccess.10086.cn/biz-orange/BN/newComboMealResouceUnite/getNewComboMealResource";
    const body = JSON.parse(decrypt(url.body, "bAIgvwAuA4tbDr9d"));
    const cellNum = body.reqBody.cellNum;
    const bodystr = `{"t":"${$.CryptoJS.MD5(
      $.setck
    ).toString()}","cv":"9.9.9","reqBody":{"cellNum":"${cellNum}","tag":"3"}}`;
    url.body = encrypt(bodystr, "bAIgvwAuA4tbDr9d");
    url.headers["Cookie"] = $.setck;
    url.headers["xs"] = $.CryptoJS.MD5(
      url.url + "_" + bodystr + "_Leadeon/SecurityOrganization"
    ).toString();
    $.post(url, (resp, data) => {
      try {
        $.meal = JSON.parse(decrypt(data, "GS7VelkJl5IT1uwQ"));
        console.warn($.meal);
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve();
      }
    });
  });
}

function encrypt(str, key) {
  return $.CryptoJS.AES.encrypt(
    $.CryptoJS.enc.Utf8.parse(str),
    $.CryptoJS.enc.Utf8.parse(key),
    {
      iv: $.CryptoJS.enc.Utf8.parse("9791027341711819"),
      mode: $.CryptoJS.mode.CBC,
      padding: $.CryptoJS.pad.Pkcs7,
    }
  ).toString();
}

function decrypt(str, key) {
  return $.CryptoJS.AES.decrypt(str, $.CryptoJS.enc.Utf8.parse(key), {
    iv: $.CryptoJS.enc.Utf8.parse("9791027341711819"),
    mode: $.CryptoJS.mode.CBC,
    padding: $.CryptoJS.pad.Pkcs7,
  }).toString($.CryptoJS.enc.Utf8);
}

function showmsg() {
  return new Promise(async(resolve) => {
    $.subt = `[话费] ${$.fee.rspBody.curFee}元`;
    const res = $.meal.rspBody.qryInfoRsp[0].resourcesTotal;
    const flowRes = res.find((r) => r.resourcesCode === "04");
    const voiceRes = res.find((r) => r.resourcesCode === "01");
    console.log(JSON.stringify(flowRes));
    if (flowRes) {
      const remUnit = flowRes.remUnit === "05" ? "GB" : "MB";
      const usedUnit = flowRes.usedUnit === "05" ? "GB" : "MB";
      const unit = flowRes.allUnit === "05" ? "GB" : "MB";
      $.flowRes = `[流量] ${flowRes.allRemainRes}${remUnit}`;
    }
    if (voiceRes) {
      const remUnit = flowRes.remUnit === "01" ? "分钟" : "";
      const usedUnit = flowRes.usedUnit === "01" ? "分钟" : "";
      const allUnit = "分钟";
      $.voiceRes = `[语音] ${voiceRes.allRemainRes}${allUnit}`;
    }

    // create and show widget
    if (config.runsInWidget) {
      const texts = {
        subt: $.subt,
        flowRes: $.flowRes,
        voiceRes: $.voiceRes,
        updateTime: 'true',
        battery: 'true'
      }
      const opts = {
        title: '🇨🇳移动',
        texts
      }
      let widget = await $.createWidget(opts)      
      Script.setWidget(widget)
      Script.complete()
    } else {
      $.msg("🇨🇳移动", `${$.subt}\n${$.flowRes}\n${$.voiceRes}`, "确定");
    }
    resolve();
  });
}
