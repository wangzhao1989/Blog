/*
微信小程序【活动抽奖】助手自动签到脚本，支持QX
未做surge适配
制作者：t.me/makexp

[task_local]
1 0 * * * hdcj.js

[rewrite_local]
^https:\/\/new\.api\.hdcj\.9w9\.com\/api\/sign\/sign url script-request-body hdcj.js

[mitm]
hostname = new.api.hdcj.9w9.com
*/
/*
    本作品用于QuantumultX和Surge之间js执行方法的转换
    您只需书写其中任一软件的js,然后在您的js最【前面】追加上此段js即可
    无需担心影响执行问题,具体原理是将QX和Surge的方法转换为互相可调用的方法
    尚未测试是否支持import的方式进行使用,因此暂未export
    如有问题或您有更好的改进方案,请前往 https://github.com/sazs34/TaskConfig/issues 提交内容,或直接进行pull request
    您也可直接在tg中联系@wechatu
*/
// #region 固定头部
let isQuantumultX = $task != undefined; //判断当前运行环境是否是qx
let isSurge = $httpClient != undefined; //判断当前运行环境是否是surge
// http请求
var $task = isQuantumultX ? $task : {};
var $httpClient = isSurge ? $httpClient : {};
// cookie读写
var $prefs = isQuantumultX ? $prefs : {};
var $persistentStore = isSurge ? $persistentStore : {};
// 消息通知
var $notify = isQuantumultX ? $notify : {};
var $notification = isSurge ? $notification : {};
// #endregion 固定头部

// #region 网络请求专用转换
if (isQuantumultX) {
    var errorInfo = {
        error: ''
    };
    $httpClient = {
        get: (url, cb) => {
            var urlObj;
            if (typeof (url) == 'string') {
                urlObj = {
                    url: url
                }
            } else {
                urlObj = url;
            }
            $task.fetch(urlObj).then(response => {
                cb(undefined, response, response.body)
            }, reason => {
                errorInfo.error = reason.error;
                cb(errorInfo, response, '')
            })
        },
        post: (url, cb) => {
            var urlObj;
            if (typeof (url) == 'string') {
                urlObj = {
                    url: url
                }
            } else {
                urlObj = url;
            }
            url.method = 'POST';
            $task.fetch(urlObj).then(response => {
                cb(undefined, response, response.body)
            }, reason => {
                errorInfo.error = reason.error;
                cb(errorInfo, response, '')
            })
        }
    }
}
if (isSurge) {
    $task = {
        fetch: url => {
            //为了兼容qx中fetch的写法,所以永不reject
            return new Promise((resolve, reject) => {
                if (url.method == 'POST') {
                    $httpClient.post(url, (error, response, data) => {
                        if (response) {
                            response.body = data;
                            resolve(response, {
                                error: error
                            });
                        } else {
                            resolve(null, {
                                error: error
                            })
                        }
                    })
                } else {
                    $httpClient.get(url, (error, response, data) => {
                        if (response) {
                            response.body = data;
                            resolve(response, {
                                error: error
                            });
                        } else {
                            resolve(null, {
                                error: error
                            })
                        }
                    })
                }
            })

        }
    }
}
// #endregion 网络请求专用转换

// #region cookie操作
if (isQuantumultX) {
    $persistentStore = {
        read: key => {
            return $prefs.valueForKey(key);
        },
        write: (val, key) => {
            return $prefs.setValueForKey(val, key);
        }
    }
}
if (isSurge) {
    $prefs = {
        valueForKey: key => {
            return $persistentStore.read(key);
        },
        setValueForKey: (val, key) => {
            return $persistentStore.write(val, key);
        }
    }
}
// #endregion

// #region 消息通知
if (isQuantumultX) {
    $notification = {
        post: (title, subTitle, detail) => {
            $notify(title, subTitle, detail);
        }
    }
}
if (isSurge) {
    $notify = function (title, subTitle, detail) {
        $notification.post(title, subTitle, detail);
    }
}
// #endregion


const userCheckinURL = 'https://new.api.hdcj.9w9.com/api/sign/sign';
const userCookieKey  = 'cjzs_userCookieKey';
const userAgentKey   = 'cjzs_userAgentKey';
const userTokenKey   = 'cjzs_userTokenKey';
const userRefererKey = 'cjzs_userReferKey';
const userBodyKey    = 'cjzs_userBodyKey';
let userBody = '';

let isGetCookie = typeof $request !== 'undefined';

if (isGetCookie) {
    // 获取 Cookie
    if ($request.headers['api-token']) {
        //var usercookie = $request.headers['Cookie'];
        var userAgent  = $request.headers['User-Agent'];
        var userToken  = $request.headers['api-token'];
        var userReferer= $request.headers['Referer'];
        
         userBody   = $request.body;
        //console.log(userBody);
        //$prefs.setValueForKey(usercookie, userCookieKey);
        $prefs.setValueForKey(userAgent, userAgentKey);
        $prefs.setValueForKey(userToken, userTokenKey);
        $prefs.setValueForKey(userReferer, userRefererKey);
        $prefs.setValueForKey(userBody, userBodyKey);
        $notify("成功获取活动抽奖 Cookie 🎉", "", "请禁用该脚本")
    }
    $done({});
} else {
    // 签到
    var request = {
        url: userCheckinURL,
        method: 'POST',
        headers: {
            'app-version': '3.3.7',
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive',
            'Cotent-Type': 'application/json',
            'Content-Type': 'application/json',
            'api-token': $prefs.valueForKey(userTokenKey),
            'Cache-Control': 'no-cache',
            'Referer': $prefs.valueForKey(userRefererKey),
            'Host': 'new.api.hdcj.9w9.com',
            'User-Agent': $prefs.valueForKey(userAgentKey),
            'Accept-Language' : 'en-us',
            'Accept' : 'application/vnd.lumen.v2+json',
            'Content-Length' : 'en-us',
        },
        body: $prefs.valueForKey(userBodyKey)

    };
//console.log(request);
    $task.fetch(request).then(response => {
        const obj = JSON.parse(response.body);
        if (obj.result == "success") {
            $notify("活动抽奖", "", "签到成功！");
        } else {
            $notify("活动抽奖", "", obj.result);
        }
        $prefs.setValueForKey(obj.data, userDataKey); 
    }, reason => {
        $notify("活动抽奖", "", reason.error)
    });
}
