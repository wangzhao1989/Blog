/*ziye
******************************************************************************
固定ck版，可N个账号，无外部通知，BOX 设置为0 日常任务，设置为1 单开宝箱

github地址     https://github.com/ziye12/JavaScript
TG频道地址     https://t.me/ziyescript
TG交流群       https://t.me/joinchat/AAAAAE7XHm-q1-7Np-tF3g
boxjs链接      https://raw.githubusercontent.com/ziye12/JavaScript/master/Task/ziye.boxjs.json
完整版         https://raw.githubusercontent.com/ziye12/JavaScript/master/Task/qqreads.js

本人github地址     https://github.com/ziye12/JavaScript 
转载请备注个名字，谢谢

12.28 固定ck版,增加外部通知，默认12点以及23.40通知，解决宝箱翻倍问题，解决手机端运行异常问题


⚠️cookie获取方法：

进 https://m.q.qq.com/a/s/d3eacc70120b9a37e46bad408c0c4c2a  点我的   获取cookie

进一本书 看 10秒以下 然后退出，获取阅读时长cookie，看书一定不能超过10秒

可能某些页面会卡住，但是能获取到cookie，再注释cookie重写就行了！



⚠️宝箱奖励为20分钟一次，自己根据情况设置定时，建议设置11分钟一次

hostname=mqqapi.reader.qq.com
############## 圈x
#企鹅读书获取更新body
https:\/\/mqqapi\.reader\.qq\.com\/log\/v4\/mqq\/track url script-request-body https://raw.githubusercontent.com/ziye12/JavaScript/master/Task/qqreads.js
#企鹅读书获取时长cookie
https:\/\/mqqapi\.reader\.qq\.com\/mqq\/addReadTimeWithBid? url script-request-header https://raw.githubusercontent.com/ziye12/JavaScript/master/Task/qqreads.js

############## loon
#企鹅读书获取更新body
http-request https:\/\/mqqapi\.reader\.qq\.com\/log\/v4\/mqq\/track script-path=https://raw.githubusercontent.com/ziye12/JavaScript/master/Task/qqreads.js,requires-body=true, tag=企鹅读书获取更新body
#企鹅读书获取时长cookie
http-request https:\/\/mqqapi\.reader\.qq\.com\/mqq\/addReadTimeWithBid? script-path=https://raw.githubusercontent.com/ziye12/JavaScript/master/Task/qqreads.js, requires-header=true, tag=企鹅读书获取时长cookie

############## surge
#企鹅读书获取更新body
企鹅读书获取更新body = type=http-request,pattern=https:\/\/mqqapi\.reader\.qq\.com\/log\/v4\/mqq\/track,script-path=https://raw.githubusercontent.com/ziye12/JavaScript/master/Task/qqreads.js, 
#企鹅读书获取时长cookie
企鹅读书获取时长cookie = type=http-request,pattern=https:\/\/mqqapi\.reader\.qq\.com\/mqq\/addReadTimeWithBid?,script-path=https://raw.githubusercontent.com/ziye12/JavaScript/master/Task/qqreads.js, 



*/

const BOX = 1;//设置为0 日常任务，设置为1 单开宝箱

const jsname = '企鹅读书'
const $ = Env(jsname)
let task ,tz, kz,config = '';

console.log(`\n========= 脚本执行时间(TM)：${new Date(new Date().getTime() + 0 * 60 * 60 * 1000).toLocaleString('zh', {hour12: false})} =========\n`)
const notify = $.isNode() ? require("./sendNotify") : "";
const logs = 0;   //0为关闭日志，1为开启
const maxtime = 10//每日上传时长限制，默认20小时
const wktimess = 1200//周奖励领取标准，默认1200分钟
const CASH = 10;//提现金额 可设置0 1 2 10 30 50 100  设置0关闭

//在``里面填写，多账号换行
let qqreadbodyVal=`{"common":{"appid":1450024394,"areaid":5,"qq_ver":"8.4.17","os_ver":"iOS 14.2","mp_ver":"0.32.5","mpos_ver":"1.21.0","brand":"iPhone","model":"iPhone X<iPhone10,3>","screenWidth":375,"screenHeight":812,"windowWidth":375,"windowHeight":729,"openid":"D6A6B495FA7681F1B3F41364FFA8A213","guid":877820030,"session":"n2drdqzx1bsz9jm8tcatl62std6rh3e7","scene":1007,"source":"z0008","hasRedDot":"false","missions":-1,"caseID":-1},"dataList":[{"click1":"bookDetail_bottomBar_read_C","click2":"bookLib2_bookList_bookClick_C","route":"pages/book-read/index","refer":"pages/book-detail/index","options":{"bid":"33502814","cid":"1"},"dis":1607436071332,"ext6":160,"eventID":"bookRead_show_I","type":"shown","ccid":1,"bid":"33502814","bookStatus":0,"bookPay":1,"chapterStatus":0,"ext1":{"font":18,"bg":0,"pageMode":1},"from":"bookLib2_bookList_bookClick_C_2_33502814"}]}
{"common":{"appid":1450024394,"areaid":5,"qq_ver":"8.4.17","os_ver":"iOS 14.2","mp_ver":"0.32.5","mpos_ver":"1.21.0","brand":"iPhone","model":"iPhone X<iPhone10,3>","screenWidth":375,"screenHeight":812,"windowWidth":375,"windowHeight":812,"openid":"16FBEBF4AA969D0BB4A55BCF3DC8EE00","guid":975666702,"session":"uvdju4g7rvwkbx83k4py0l1gt691i8eh","scene":1132,"source":"wza0005wzb0004","hasRedDot":"false","missions":-1,"caseID":-1},"dataList":[{"click1":"bookDetail_bottomBar_read_C","click2":"bookLib2_bookList_bookClick_C","route":"pages/book-read/index","refer":"pages/book-detail/index","options":{"bid":"468021","cid":"1"},"dis":1607436179529,"ext6":35,"eventID":"bookRead_show_I","type":"shown","ccid":1,"bid":"468021","bookStatus":1,"bookPay":0,"chapterStatus":0,"ext1":{"font":18,"bg":0,"pageMode":1},"from":"bookLib2_bookList_bookClick_C_3_468021"}]}
{"common":{"appid":1450024394,"areaid":5,"qq_ver":"8.4.17","os_ver":"iOS 14.2","mp_ver":"0.32.5","mpos_ver":"1.21.0","brand":"iPhone","model":"iPhone X<iPhone10,3>","screenWidth":375,"screenHeight":812,"windowWidth":375,"windowHeight":729,"openid":"23390182939E555DFE0E6C1FD963C375","guid":3217852247,"session":"y1ff6jgjq5a20fkcm4tmoj68whzocp3m","scene":1132,"source":"wza0006wzb0002","hasRedDot":"false","missions":-1,"caseID":-1},"dataList":[{"click1":"bookDetail_bottomBar_read_C","click2":"qqauthorize_addRCS_succ_C","route":"pages/book-read/index","refer":"pages/book-detail/index","options":{"bid":"23406185","cid":"1"},"dis":1607495312889,"ext6":81,"eventID":"bookRead_show_I","type":"shown","ccid":1,"bid":"23406185","bookStatus":0,"bookPay":1,"chapterStatus":0,"ext1":{"font":18,"bg":0,"pageMode":1},"from":"bookLib2_bookList_bookClick_C_0_23406185"}]}
{"common":{"appid":1450024394,"areaid":5,"qq_ver":"8.4.17","os_ver":"iOS 14.2","mp_ver":"0.32.5","mpos_ver":"1.21.0","brand":"iPhone","model":"iPhone X<iPhone10,3>","screenWidth":375,"screenHeight":812,"windowWidth":375,"windowHeight":729,"openid":"AECBEB6466333718C9D25B56F2633F3C","guid":1938915277,"session":"tdbayqppxcj3ifsam9k9xjzofkhx4z5b","scene":1132,"source":"wza0004wzb0003","hasRedDot":"false","missions":-1,"caseID":-1},"dataList":[{"click1":"bookDetail_bottomBar_read_C","click2":"bookLib2_bookList_bookClick_C","route":"pages/book-read/index","refer":"pages/book-detail/index","options":{"bid":"648963","cid":"1"},"dis":1607495414095,"ext6":41,"eventID":"bookRead_show_I","type":"shown","ccid":1,"bid":"648963","bookStatus":0,"bookPay":1,"chapterStatus":0,"ext1":{"font":18,"bg":0,"pageMode":1},"stat_params":"{\"alg\":\"90.4.1\",\"expid\":10,\"exposetime\":\"1607495123\",\"logid\":\"8596515343764061469\",\"origin\":\"29090\",\"preitemid\":\"b_648963\",\"scene\":\"tencent_feed_recommend\",\"tabtype\":\"4\",\"type\":\"0\",\"userdegree\":\"0\"}","from":"bookLib2_bookList_bookClick_C_1_648963"}]}
{"common":{"appid":1450024394,"areaid":5,"qq_ver":"8.4.17","os_ver":"iOS 14.2","mp_ver":"0.33.3","mpos_ver":"1.21.0","brand":"iPhone","model":"iPhone X<iPhone10,3>","screenWidth":375,"screenHeight":812,"windowWidth":375,"windowHeight":729,"openid":"CA9EF3DB8A26D1FE21CC2F62CF02BEF8","guid":2043226159,"session":"25nluztiay66pgjqawudum6dn48oifnk","scene":1132,"source":-1,"hasRedDot":"false","missions":-1,"caseID":-1},"dataList":[{"click1":"bookDetail_bottomBar_read_C","click2":"bookLib2_bookList_bookClick_C","route":"pages/book-read/index","refer":"pages/book-detail/index","options":{"bid":"31378513","cid":"1"},"dis":1607943787927,"ext6":46,"eventID":"bookRead_show_I","type":"shown","ccid":1,"bid":"31378513","bookStatus":0,"bookPay":1,"chapterStatus":0,"ext1":{"font":18,"bg":0,"pageMode":1},"from":"bookLib2_bookList_bookClick_C_0_31378513"}]}
{"common":{"appid":1450024394,"areaid":5,"qq_ver":"8.5.0","os_ver":"iOS 14.3","mp_ver":"0.36.0","mpos_ver":"1.23.0","brand":"iPhone","model":"iPhone XR<iPhone11,8>","screenWidth":414,"screenHeight":896,"windowWidth":414,"windowHeight":813,"openid":"1E7CF8C4D5B05C02D94A9477465E052E","guid":249393674,"session":"y58yorrj0qgrvk10x2q7gmphjvnfmiyd","scene":1132,"source":-1,"hasRedDot":"false","missions":-1,"caseID":-1},"dataList":[{"click1":"bookDetail_bottomBar_read_C","click2":"bookLib2_bookList_bookClick_C","route":"pages/book-read/index","refer":"pages/book-detail/index","options":{"bid":"31378513","cid":"1"},"dis":1608561740437,"ext6":39,"eventID":"bookRead_show_I","type":"shown","ccid":1,"bid":"31378513","bookStatus":0,"bookPay":1,"chapterStatus":0,"ext1":{"font":18,"bg":0,"pageMode":1},"from":"bookLib2_bookList_bookClick_C_0_31378513"}]}
{"common":{"appid":1450024394,"areaid":5,"qq_ver":"8.5.0","os_ver":"iOS 14.3","mp_ver":"0.36.0","mpos_ver":"1.23.0","brand":"iPhone","model":"iPhone XR<iPhone11,8>","screenWidth":414,"screenHeight":896,"windowWidth":414,"windowHeight":813,"openid":"CB025328CDF84CBD73F4DED8D6A64600","guid":1587735031,"session":"f93xe5fwig4kd0lzguwnk7t8c58fsqma","scene":1132,"source":-1,"hasRedDot":"false","missions":-1,"caseID":-1},"dataList":[{"click1":"bookDetail_bottomBar_read_C","click2":"bookLib2_bookList_bookClick_C","route":"pages/book-read/index","refer":"pages/book-detail/index","options":{"bid":"31378513","cid":"1"},"dis":1608561849155,"ext6":35,"eventID":"bookRead_show_I","type":"shown","ccid":1,"bid":"31378513","bookStatus":0,"bookPay":1,"chapterStatus":0,"ext1":{"font":18,"bg":0,"pageMode":1},"from":"bookLib2_bookList_bookClick_C_0_31378513"}]}
{"common":{"appid":1450024394,"areaid":5,"qq_ver":"8.5.0","os_ver":"iOS 14.3","mp_ver":"0.36.0","mpos_ver":"1.23.0","brand":"iPhone","model":"iPhone XR<iPhone11,8>","screenWidth":414,"screenHeight":896,"windowWidth":414,"windowHeight":813,"openid":"CA5F3CC4CA3563CD65451B38DA2A1611","guid":2016552506,"session":"3090ap0lofikhdroi2utc5qsy90668jw","scene":1132,"source":-1,"hasRedDot":"false","missions":-1,"caseID":-1},"dataList":[{"click1":"bookDetail_bottomBar_read_C","click2":"bookLib2_bookList_bookClick_C","route":"pages/book-read/index","refer":"pages/book-detail/index","options":{"bid":"31378513","cid":"1"},"dis":1608561912789,"ext6":41,"eventID":"bookRead_show_I","type":"shown","ccid":1,"bid":"31378513","bookStatus":0,"bookPay":1,"chapterStatus":0,"ext1":{"font":18,"bg":0,"pageMode":1},"from":"bookLib2_bookList_bookClick_C_0_31378513"}]}
{"common":{"appid":1450024394,"areaid":5,"qq_ver":"8.5.0","os_ver":"iOS 14.3","mp_ver":"0.36.0","mpos_ver":"1.23.0","brand":"iPhone","model":"iPhone XR<iPhone11,8>","screenWidth":414,"screenHeight":896,"windowWidth":414,"windowHeight":813,"openid":"29160C3A2539BFEC3DF047AEC80C012C","guid":3472683487,"session":"thie5ung724uigtm5f086rhl8iswgei5","scene":1132,"source":-1,"hasRedDot":"false","missions":-1,"caseID":-1},"dataList":[{"click1":"bookDetail_bottomBar_read_C","click2":"bookLib_rankBook_bookClick_C","route":"pages/book-read/index","refer":"pages/book-detail/index","options":{"bid":"25575570","cid":"1"},"dis":1608561992134,"ext6":59,"eventID":"bookRead_show_I","type":"shown","ccid":1,"bid":"25575570","bookStatus":0,"bookPay":1,"chapterStatus":0,"ext1":{"font":18,"bg":0,"pageMode":1},"from":"bookLib_rankBook_bookClick_C_0_25575570"}]}
{"common":{"appid":1450024394,"areaid":5,"qq_ver":"8.5.0","os_ver":"iOS 14.3","mp_ver":"0.36.0","mpos_ver":"1.23.0","brand":"iPhone","model":"iPhone XR<iPhone11,8>","screenWidth":414,"screenHeight":896,"windowWidth":414,"windowHeight":813,"openid":"15BE59A3F2372B9E79171BF0EBC05183","guid":178182821,"session":"4bs5e518rqll8oja6vu8wm9g7n3972pn","scene":1132,"source":-1,"hasRedDot":"false","missions":-1,"caseID":-1},"dataList":[{"click1":"bookDetail_bottomBar_read_C","click2":"bookLib2_bookList_bookClick_C","route":"pages/book-read/index","refer":"pages/book-detail/index","options":{"bid":"31378513","cid":"1"},"dis":1608562059009,"ext6":42,"eventID":"bookRead_show_I","type":"shown","ccid":1,"bid":"31378513","bookStatus":0,"bookPay":1,"chapterStatus":0,"ext1":{"font":18,"bg":0,"pageMode":1},"from":"bookLib2_bookList_bookClick_C_0_31378513"}]}
{"common":{"appid":1450024394,"areaid":5,"qq_ver":"8.5.0","os_ver":"iOS 14.3","mp_ver":"0.36.0","mpos_ver":"1.23.0","brand":"iPhone","model":"iPhone XR<iPhone11,8>","screenWidth":414,"screenHeight":896,"windowWidth":414,"windowHeight":813,"openid":"2162527834","guid":2162527834,"session":"zj17y98auwepwjyoqiush5o8krcrfe37","scene":1132,"source":-1,"hasRedDot":"false","missions":-1,"caseID":-1},"dataList":[{"click1":"bookDetail_bottomBar_read_C","click2":"qqauthorize_addRCS_succ_C","route":"pages/book-read/index","refer":"pages/book-detail/index","options":{"bid":"31378513","cid":"1"},"dis":1608562139061,"ext6":50,"eventID":"bookRead_show_I","type":"shown","ccid":1,"bid":"31378513","bookStatus":0,"bookPay":1,"chapterStatus":0,"ext1":{"font":18,"bg":0,"pageMode":1},"from":"bookLib2_bookList_bookClick_C_0_31378513"}]}
{"common":{"appid":1450024394,"areaid":5,"qq_ver":"8.4.17","os_ver":"iOS 14.2","mp_ver":"0.33.3","mpos_ver":"1.21.0","brand":"iPhone","model":"iPad Air 2 (WiFi)<iPad5,3>","screenWidth":768,"screenHeight":1024,"windowWidth":768,"windowHeight":974,"openid":"B25304DBD0E697FBDF46A72A445D425B","guid":709177281,"session":"2z5vk37pd349ztmliwq49msw8c8ghcxh","scene":1131,"source":-1,"hasRedDot":"false","missions":-1,"caseID":-1},"dataList":[{"click1":"bookDetail_bottomBar_read_C","click2":"bookLib2_bookList_bookClick_C","route":"pages/book-read/index","refer":"pages/book-detail/index","options":{"bid":"31378513","cid":"1"},"dis":1607671716253,"ext6":38,"eventID":"bookRead_show_I","type":"shown","ccid":1,"bid":"31378513","bookStatus":0,"bookPay":1,"chapterStatus":0,"ext1":{"font":18,"bg":0,"pageMode":1},"from":"bookLib2_bookList_bookClick_C_0_31378513"}]}
{"common":{"appid":1450024394,"areaid":5,"qq_ver":"8.4.17","os_ver":"iOS 14.2","mp_ver":"0.33.3","mpos_ver":"1.21.0","brand":"iPhone","model":"iPad Air 2 (WiFi)<iPad5,3>","screenWidth":768,"screenHeight":1024,"windowWidth":768,"windowHeight":974,"openid":"09FB52B39862A8364F96D251AEA9305F","guid":1544654738,"session":"hceyl51mkyy4asfd1ee5agtlgl118kiw","scene":1132,"source":-1,"hasRedDot":"false","missions":-1,"caseID":-1},"dataList":[{"click1":"bookDetail_bottomBar_read_C","click2":"bookLib2_bookList_bookClick_C","route":"pages/book-read/index","refer":"pages/book-detail/index","options":{"bid":"31378513","cid":"1"},"dis":1607672034506,"ext6":48,"eventID":"bookRead_show_I","type":"shown","ccid":1,"bid":"31378513","bookStatus":0,"bookPay":1,"chapterStatus":0,"ext1":{"font":18,"bg":0,"pageMode":1},"from":"bookLib2_bookList_bookClick_C_0_31378513"}]}
{"common":{"appid":1450024394,"areaid":5,"qq_ver":"8.4.17","os_ver":"iOS 14.2","mp_ver":"0.33.3","mpos_ver":"1.21.0","brand":"iPhone","model":"iPad Air 2 (WiFi)<iPad5,3>","screenWidth":768,"screenHeight":1024,"windowWidth":768,"windowHeight":974,"openid":"3942E907CF90F0343D5BDE9D67C5FB6A","guid":2040252653,"session":"4glwaqy08vgumfhg7ry4zlmbwufv4su5","scene":1007,"source":"wza0001wzb0001","hasRedDot":"false","missions":-1,"caseID":-1},"dataList":[{"click1":"bookDetail_bottomBar_read_C","click2":"bookLib2_bookList_bookClick_C","route":"pages/book-read/index","refer":"pages/book-detail/index","options":{"bid":"31378513","cid":"1"},"dis":1607672117481,"ext6":47,"eventID":"bookRead_show_I","type":"shown","ccid":1,"bid":"31378513","bookStatus":0,"bookPay":1,"chapterStatus":0,"ext1":{"font":18,"bg":0,"pageMode":1},"from":"bookLib2_bookList_bookClick_C_0_31378513"}]}
{"common":{"appid":1450024394,"areaid":5,"qq_ver":"8.4.17","os_ver":"iOS 14.2","mp_ver":"0.33.3","mpos_ver":"1.21.0","brand":"iPhone","model":"iPad Air 2 (WiFi)<iPad5,3>","screenWidth":768,"screenHeight":1024,"windowWidth":768,"windowHeight":974,"openid":"C7467FCA55F05241E85E9EB0F283C7E9","guid":1980207745,"session":"7f8w9i2idxkcrksf6014459w3u3cnasp","scene":1007,"source":-1,"hasRedDot":"false","missions":-1,"caseID":-1},"dataList":[{"click1":"bookDetail_bottomBar_read_C","click2":"bookDetail_chapter_slide_C","route":"pages/book-read/index","refer":"pages/book-detail/index","options":{"bid":"31808365","cid":"1"},"dis":1607870802222,"ext6":81,"eventID":"bookRead_show_I","type":"shown","ccid":1,"bid":"31808365","bookStatus":0,"bookPay":1,"chapterStatus":0,"ext1":{"font":18,"bg":0,"pageMode":1},"from":"bookLib2_bookList_bookClick_C_0_31808365"}]}
{"common":{"appid":1450024394,"areaid":5,"qq_ver":"8.4.17","os_ver":"iOS 14.2","mp_ver":"0.33.3","mpos_ver":"1.21.0","brand":"iPhone","model":"iPad Air 2 (WiFi)<iPad5,3>","screenWidth":768,"screenHeight":1024,"windowWidth":768,"windowHeight":974,"openid":"F2D72E27FBEBA6D7F130384E02C80C75","guid":3346996689,"session":"a750oscjndx6ousecpd3jp3d0gmkgj7t","scene":1007,"source":"wza0001wzb0001","hasRedDot":"false","missions":-1,"caseID":-1},"dataList":[{"click1":"bookDetail_bottomBar_read_C","click2":"bookLib2_bookList_bookClick_C","route":"pages/book-read/index","refer":"pages/book-detail/index","options":{"bid":"31378513","cid":"1"},"dis":1607871037940,"ext6":87,"eventID":"bookRead_show_I","type":"shown","ccid":1,"bid":"31378513","bookStatus":0,"bookPay":1,"chapterStatus":0,"ext1":{"font":18,"bg":0,"pageMode":1},"from":"bookLib2_bookList_bookClick_C_1_31378513"}]}
{"common":{"appid":1450024394,"areaid":5,"qq_ver":"8.4.17","os_ver":"iOS 14.2","mp_ver":"0.33.3","mpos_ver":"1.21.0","brand":"iPhone","model":"iPad Air 2 (WiFi)<iPad5,3>","screenWidth":768,"screenHeight":1024,"windowWidth":768,"windowHeight":974,"openid":"F45CFEB648EE9A815693CB444B6D00EA","guid":1478723465,"session":"mgabyeajzez75pbnh8a7vd5bftqpv8ss","scene":1007,"source":"wza0001wzb0001","hasRedDot":"false","missions":-1,"caseID":-1},"dataList":[{"click1":"bookDetail_bottomBar_read_C","click2":"bookLib2_bookList_bookClick_C","route":"pages/book-read/index","refer":"pages/book-detail/index","options":{"bid":"23406185","cid":"1"},"dis":1607871292379,"ext6":43,"eventID":"bookRead_show_I","type":"shown","ccid":1,"bid":"23406185","bookStatus":0,"bookPay":1,"chapterStatus":0,"ext1":{"font":18,"bg":0,"pageMode":1},"from":"bookLib2_bookList_bookClick_C_0_23406185"}]}
{"common":{"appid":1450024394,"areaid":5,"qq_ver":"8.4.17","os_ver":"iOS 14.2","mp_ver":"0.33.3","mpos_ver":"1.21.0","brand":"iPhone","model":"iPad Air 2 (WiFi)<iPad5,3>","screenWidth":768,"screenHeight":1024,"windowWidth":768,"windowHeight":974,"openid":"326CD910C833BBD02508584258C72046","guid":3386659237,"session":"1g0ttjtnw3yx364kbusjubyri8ull4n4","scene":1007,"source":"wza0001wzb0001","hasRedDot":"false","missions":-1,"caseID":-1},"dataList":[{"click1":"bookDetail_bottomBar_read_C","click2":"bookLib2_bookList_bookClick_C","route":"pages/book-read/index","refer":"pages/book-detail/index","options":{"bid":"23406185","cid":"1"},"dis":1607871482659,"ext6":64,"eventID":"bookRead_show_I","type":"shown","ccid":1,"bid":"23406185","bookStatus":0,"bookPay":1,"chapterStatus":0,"ext1":{"font":18,"bg":0,"pageMode":1},"from":"bookLib2_bookList_bookClick_C_0_23406185"}]}
{"common":{"appid":1450024394,"areaid":5,"qq_ver":"8.4.17","os_ver":"iOS 14.2","mp_ver":"0.33.3","mpos_ver":"1.21.0","brand":"iPhone","model":"iPad Air 2 (WiFi)<iPad5,3>","screenWidth":768,"screenHeight":1024,"windowWidth":768,"windowHeight":974,"openid":"657457C4459B3A2049070811ED8A1564","guid":3069263787,"session":"k2dzowrw3fbbpu8e7ktz46p9cf6qmbw6","scene":1007,"source":"wza0001wzb0001","hasRedDot":"false","missions":-1,"caseID":-1},"dataList":[{"click1":"bookDetail_bottomBar_read_C","click2":"bookStore_newCI_unit_C","route":"pages/book-read/index","refer":"pages/book-detail/index","options":{"bid":"413278","cid":"1"},"dis":1607871762768,"ext6":53,"eventID":"bookRead_show_I","type":"shown","ccid":1,"bid":"413278","bookStatus":1,"bookPay":0,"chapterStatus":0,"ext1":{"font":18,"bg":0,"pageMode":1},"from":"1007_413278"}]}
`
let qqreadtimeurlVal=`https://mqqapi.reader.qq.com/mqq/addReadTimeWithBid?scene=1007&refer=pages%2Fbook-category%2Findex&bid=33502814&readTime=7686&read_type=0&conttype=1&read_status=0&chapter_info=%5B%7B%221%22%3A%7B%22readTime%22%3A7686%2C%22pay_status%22%3A0%7D%7D%5D&sp=-1
https://mqqapi.reader.qq.com/mqq/addReadTimeWithBid?scene=1132&refer=pages%2Fbook-category%2Findex&bid=468021&readTime=5201&read_type=0&conttype=1&read_status=0&chapter_info=%5B%7B%221%22%3A%7B%22readTime%22%3A5201%2C%22pay_status%22%3A0%7D%7D%5D&sp=-1
https://mqqapi.reader.qq.com/mqq/addReadTimeWithBid?scene=1132&refer=pages%2Fbook-category%2Findex&bid=23406185&readTime=5490&read_type=0&conttype=1&read_status=0&chapter_info=%5B%7B%221%22%3A%7B%22readTime%22%3A5490%2C%22pay_status%22%3A0%7D%7D%5D&sp=-1
https://mqqapi.reader.qq.com/mqq/addReadTimeWithBid?scene=1132&refer=pages%2Fbook-category%2Findex&bid=648963&readTime=5048&read_type=0&conttype=1&read_status=0&chapter_info=%5B%7B%221%22%3A%7B%22readTime%22%3A5048%2C%22pay_status%22%3A0%7D%7D%5D&sp=%7B%22alg%22%3A%2290.4.1%22%2C%22expid%22%3A10%2C%22exposetime%22%3A%221607495123%22%2C%22logid%22%3A%228596515343764061469%22%2C%22origin%22%3A%2229090%22%2C%22preitemid%22%3A%22b_648963%22%2C%22scene%22%3A%22tencent_feed_recommend%22%2C%22tabtype%22%3A%224%22%2C%22type%22%3A%220%22%2C%22userdegree%22%3A%220%22%7D
https://mqqapi.reader.qq.com/mqq/addReadTimeWithBid?scene=1132&refer=pages%2Fbook-category%2Findex&bid=31378513&readTime=3666&read_type=0&conttype=1&read_status=0&chapter_info=%5B%7B%221%22%3A%7B%22readTime%22%3A3666%2C%22pay_status%22%3A0%7D%7D%5D&sp=-1
https://mqqapi.reader.qq.com/mqq/addReadTimeWithBid?scene=1132&refer=pages%2Fbook-category%2Findex&bid=31378513&readTime=4640&read_type=0&conttype=1&read_status=0&chapter_info=%5B%7B%221%22%3A%7B%22readTime%22%3A4640%2C%22pay_status%22%3A0%7D%7D%5D&sp=-1
https://mqqapi.reader.qq.com/mqq/addReadTimeWithBid?scene=1132&refer=pages%2Fbook-category%2Findex&bid=31378513&readTime=4678&read_type=0&conttype=1&read_status=0&chapter_info=%5B%7B%221%22%3A%7B%22readTime%22%3A4678%2C%22pay_status%22%3A0%7D%7D%5D&sp=-1
https://mqqapi.reader.qq.com/mqq/addReadTimeWithBid?scene=1132&refer=pages%2Fbook-category%2Findex&bid=31378513&readTime=6158&read_type=0&conttype=1&read_status=0&chapter_info=%5B%7B%221%22%3A%7B%22readTime%22%3A6158%2C%22pay_status%22%3A0%7D%7D%5D&sp=-1
https://mqqapi.reader.qq.com/mqq/addReadTimeWithBid?scene=1132&refer=pages%2Fnav-library%2Findex&bid=25575570&readTime=4832&read_type=0&conttype=1&read_status=0&chapter_info=%5B%7B%221%22%3A%7B%22readTime%22%3A4832%2C%22pay_status%22%3A0%7D%7D%5D&sp=-1
https://mqqapi.reader.qq.com/mqq/addReadTimeWithBid?scene=1132&refer=pages%2Fbook-category%2Findex&bid=31378513&readTime=6972&read_type=0&conttype=1&read_status=0&chapter_info=%5B%7B%221%22%3A%7B%22readTime%22%3A6972%2C%22pay_status%22%3A0%7D%7D%5D&sp=-1
https://mqqapi.reader.qq.com/mqq/addReadTimeWithBid?scene=1132&refer=pages%2Fbook-category%2Findex&bid=31378513&readTime=6027&read_type=0&conttype=1&read_status=0&chapter_info=%5B%7B%221%22%3A%7B%22readTime%22%3A6027%2C%22pay_status%22%3A0%7D%7D%5D&sp=-1
https://mqqapi.reader.qq.com/mqq/addReadTimeWithBid?scene=1131&refer=pages%2Fbook-category%2Findex&bid=31378513&readTime=5262&read_type=0&conttype=1&read_status=0&chapter_info=%5B%7B%221%22%3A%7B%22readTime%22%3A5262%2C%22pay_status%22%3A0%7D%7D%5D&sp=-1
https://mqqapi.reader.qq.com/mqq/addReadTimeWithBid?scene=1132&refer=pages%2Fbook-category%2Findex&bid=31378513&readTime=2901&read_type=0&conttype=1&read_status=0&chapter_info=%5B%7B%221%22%3A%7B%22readTime%22%3A2901%2C%22pay_status%22%3A0%7D%7D%5D&sp=-1
https://mqqapi.reader.qq.com/mqq/addReadTimeWithBid?scene=1007&refer=pages%2Fbook-category%2Findex&bid=31378513&readTime=4614&read_type=0&conttype=1&read_status=0&chapter_info=%5B%7B%221%22%3A%7B%22readTime%22%3A4614%2C%22pay_status%22%3A0%7D%7D%5D&sp=-1
https://mqqapi.reader.qq.com/mqq/addReadTimeWithBid?scene=1007&refer=pages%2Fbook-read%2Findex&bid=31808365&readTime=2123&read_type=0&conttype=1&read_status=0&chapter_info=%5B%7B%221%22%3A%7B%22readTime%22%3A2123%2C%22pay_status%22%3A0%2C%22is_tail%22%3A0%7D%7D%5D&sp=-1
https://mqqapi.reader.qq.com/mqq/addReadTimeWithBid?scene=1007&refer=pages%2Fbook-category%2Findex&bid=31378513&readTime=4633&read_type=0&conttype=1&read_status=0&chapter_info=%5B%7B%221%22%3A%7B%22readTime%22%3A4633%2C%22pay_status%22%3A0%7D%7D%5D&sp=-1
https://mqqapi.reader.qq.com/mqq/addReadTimeWithBid?scene=1007&refer=pages%2Fbook-category%2Findex&bid=23406185&readTime=9751&read_type=0&conttype=1&read_status=0&chapter_info=%5B%7B%221%22%3A%7B%22readTime%22%3A9751%2C%22pay_status%22%3A0%7D%7D%5D&sp=-1
https://mqqapi.reader.qq.com/mqq/addReadTimeWithBid?scene=1007&refer=pages%2Fbook-category%2Findex&bid=23406185&readTime=4471&read_type=0&conttype=1&read_status=0&chapter_info=%5B%7B%221%22%3A%7B%22readTime%22%3A4471%2C%22pay_status%22%3A0%7D%7D%5D&sp=-1
https://mqqapi.reader.qq.com/mqq/addReadTimeWithBid?scene=1007&refer=pages%2Findex%2Findex&bid=413278&readTime=6074&read_type=0&conttype=1&read_status=0&chapter_info=%5B%7B%221%22%3A%7B%22readTime%22%3A6074%2C%22pay_status%22%3A0%7D%7D%5D&sp=-1
`
let qqreadtimeheaderVal=`{"Accept":"*/*","ywsession":"n2drdqzx1bsz9jm8tcatl62std6rh3e7","Connection":"keep-alive","Content-Type":"application/json","Cookie":"ywguid=877820030;ywkey=ywQNBBMSdqkk;platform=ios;channel=mqqmina;mpVersion=0.32.5;qq_ver=8.4.17;os_ver=iOS 14.2;mpos_ver=1.21.0;platform=ios;openid=D6A6B495FA7681F1B3F41364FFA8A213","Host":"mqqapi.reader.qq.com","User-Agent":"QQ/8.4.17.638 CFNetwork/1206 Darwin/20.1.0","Referer":"https://appservice.qq.com/1110657249/0.32.5/page-frame.html","Accept-Language":"zh-cn","Accept-Encoding":"gzip, deflate, br","mpversion":"0.32.5"}
{"Accept":"*/*","ywsession":"uvdju4g7rvwkbx83k4py0l1gt691i8eh","Connection":"keep-alive","Content-Type":"application/json","Cookie":"ywguid=975666702;ywkey=ywYdr5ZJVSvI;platform=ios;channel=mqqmina;mpVersion=0.32.5;qq_ver=8.4.17;os_ver=iOS 14.2;mpos_ver=1.21.0;platform=ios;openid=16FBEBF4AA969D0BB4A55BCF3DC8EE00","Host":"mqqapi.reader.qq.com","User-Agent":"QQ/8.4.17.638 CFNetwork/1206 Darwin/20.1.0","Referer":"https://appservice.qq.com/1110657249/0.32.5/page-frame.html","Accept-Language":"zh-cn","Accept-Encoding":"gzip, deflate, br","mpversion":"0.32.5"}
{"Accept":"*/*","ywsession":"y1ff6jgjq5a20fkcm4tmoj68whzocp3m","Connection":"keep-alive","Content-Type":"application/json","Cookie":"ywguid=3217852247;ywkey=ywpRUFwIia6S;platform=ios;channel=mqqmina;mpVersion=0.32.5;qq_ver=8.4.17;os_ver=iOS 14.2;mpos_ver=1.21.0;platform=ios;openid=23390182939E555DFE0E6C1FD963C375","Host":"mqqapi.reader.qq.com","User-Agent":"QQ/8.4.17.638 CFNetwork/1206 Darwin/20.1.0","Referer":"https://appservice.qq.com/1110657249/0.32.5/page-frame.html","Accept-Language":"zh-cn","Accept-Encoding":"gzip, deflate, br","mpversion":"0.32.5"}
{"Accept":"*/*","ywsession":"tdbayqppxcj3ifsam9k9xjzofkhx4z5b","Connection":"keep-alive","Content-Type":"application/json","Cookie":"ywguid=1938915277;ywkey=ywM0j3tycyXO;platform=ios;channel=mqqmina;mpVersion=0.32.5;qq_ver=8.4.17;os_ver=iOS 14.2;mpos_ver=1.21.0;platform=ios;openid=AECBEB6466333718C9D25B56F2633F3C","Host":"mqqapi.reader.qq.com","User-Agent":"QQ/8.4.17.638 CFNetwork/1206 Darwin/20.1.0","Referer":"https://appservice.qq.com/1110657249/0.32.5/page-frame.html","Accept-Language":"zh-cn","Accept-Encoding":"gzip, deflate, br","mpversion":"0.32.5"}
{"Accept":"*/*","ywsession":"25nluztiay66pgjqawudum6dn48oifnk","Connection":"keep-alive","Content-Type":"application/json","Cookie":"ywguid=2043226159;ywkey=ywDAxt96UYxy;platform=ios;channel=mqqmina;mpVersion=0.33.3;qq_ver=8.4.17;os_ver=iOS 14.2;mpos_ver=1.21.0;platform=ios;openid=CA9EF3DB8A26D1FE21CC2F62CF02BEF8","Host":"mqqapi.reader.qq.com","User-Agent":"QQ/8.4.17.638 CFNetwork/1206 Darwin/20.1.0","Referer":"https://appservice.qq.com/1110657249/0.33.3/page-frame.html","Accept-Language":"zh-cn","Accept-Encoding":"gzip, deflate, br","mpversion":"0.33.3"}
{"Accept":"*/*","ywsession":"y58yorrj0qgrvk10x2q7gmphjvnfmiyd","Connection":"keep-alive","Content-Type":"application/json","Cookie":"ywguid=249393674;ywkey=ywHeGBCQ461D;platform=ios;channel=mqqmina;mpVersion=0.36.0;qq_ver=8.5.0;os_ver=iOS 14.3;mpos_ver=1.23.0;platform=ios;openid=1E7CF8C4D5B05C02D94A9477465E052E","Host":"mqqapi.reader.qq.com","User-Agent":"QQ/8.5.0.635 CFNetwork/1209 Darwin/20.2.0","Referer":"https://appservice.qq.com/1110657249/0.36.0/page-frame.html","Accept-Language":"zh-cn","Accept-Encoding":"gzip, deflate, br","mpversion":"0.36.0"}
{"Accept":"*/*","ywsession":"f93xe5fwig4kd0lzguwnk7t8c58fsqma","Connection":"keep-alive","Content-Type":"application/json","Cookie":"ywguid=1587735031;ywkey=ywGZD9KexTrn;platform=ios;channel=mqqmina;mpVersion=0.36.0;qq_ver=8.5.0;os_ver=iOS 14.3;mpos_ver=1.23.0;platform=ios;openid=CB025328CDF84CBD73F4DED8D6A64600","Host":"mqqapi.reader.qq.com","User-Agent":"QQ/8.5.0.635 CFNetwork/1209 Darwin/20.2.0","Referer":"https://appservice.qq.com/1110657249/0.36.0/page-frame.html","Accept-Language":"zh-cn","Accept-Encoding":"gzip, deflate, br","mpversion":"0.36.0"}
{"Accept":"*/*","ywsession":"3090ap0lofikhdroi2utc5qsy90668jw","Connection":"keep-alive","Content-Type":"application/json","Cookie":"ywguid=2016552506;ywkey=ywKZhcAhOyBS;platform=ios;channel=mqqmina;mpVersion=0.36.0;qq_ver=8.5.0;os_ver=iOS 14.3;mpos_ver=1.23.0;platform=ios;openid=CA5F3CC4CA3563CD65451B38DA2A1611","Host":"mqqapi.reader.qq.com","User-Agent":"QQ/8.5.0.635 CFNetwork/1209 Darwin/20.2.0","Referer":"https://appservice.qq.com/1110657249/0.36.0/page-frame.html","Accept-Language":"zh-cn","Accept-Encoding":"gzip, deflate, br","mpversion":"0.36.0"}
{"Accept":"*/*","ywsession":"thie5ung724uigtm5f086rhl8iswgei5","Connection":"keep-alive","Content-Type":"application/json","Cookie":"ywguid=3472683487;ywkey=ywGioPNhkgZV;platform=ios;channel=mqqmina;mpVersion=0.36.0;qq_ver=8.5.0;os_ver=iOS 14.3;mpos_ver=1.23.0;platform=ios;openid=29160C3A2539BFEC3DF047AEC80C012C","Host":"mqqapi.reader.qq.com","User-Agent":"QQ/8.5.0.635 CFNetwork/1209 Darwin/20.2.0","Referer":"https://appservice.qq.com/1110657249/0.36.0/page-frame.html","Accept-Language":"zh-cn","Accept-Encoding":"gzip, deflate, br","mpversion":"0.36.0"}
{"Accept":"*/*","ywsession":"4bs5e518rqll8oja6vu8wm9g7n3972pn","Connection":"keep-alive","Content-Type":"application/json","Cookie":"ywguid=178182821;ywkey=yw8JfqqRWVnC;platform=ios;channel=mqqmina;mpVersion=0.36.0;qq_ver=8.5.0;os_ver=iOS 14.3;mpos_ver=1.23.0;platform=ios;openid=15BE59A3F2372B9E79171BF0EBC05183","Host":"mqqapi.reader.qq.com","User-Agent":"QQ/8.5.0.635 CFNetwork/1209 Darwin/20.2.0","Referer":"https://appservice.qq.com/1110657249/0.36.0/page-frame.html","Accept-Language":"zh-cn","Accept-Encoding":"gzip, deflate, br","mpversion":"0.36.0"}
{"Accept":"*/*","ywsession":"zj17y98auwepwjyoqiush5o8krcrfe37","Connection":"keep-alive","Content-Type":"application/json","Cookie":"ywguid=2162527834;ywkey=ywef8aibqFfc;platform=ios;channel=mqqmina;mpVersion=0.36.0;qq_ver=8.5.0;os_ver=iOS 14.3;mpos_ver=1.23.0;platform=ios;openid=2162527834","Host":"mqqapi.reader.qq.com","User-Agent":"QQ/8.5.0.635 CFNetwork/1209 Darwin/20.2.0","Referer":"https://appservice.qq.com/1110657249/0.36.0/page-frame.html","Accept-Language":"zh-cn","Accept-Encoding":"gzip, deflate, br","mpversion":"0.36.0"}
{"Accept":"*/*","ywsession":"2z5vk37pd349ztmliwq49msw8c8ghcxh","Connection":"keep-alive","Content-Type":"application/json","Cookie":"ywguid=709177281;ywkey=yw56ng0Xmy4g;platform=ios;channel=mqqmina;mpVersion=0.33.3;qq_ver=8.4.17;os_ver=iOS 14.2;mpos_ver=1.21.0;platform=ios;openid=B25304DBD0E697FBDF46A72A445D425B","Host":"mqqapi.reader.qq.com","User-Agent":"QQ/8.4.17.638 CFNetwork/1206 Darwin/20.1.0","Referer":"https://appservice.qq.com/1110657249/0.33.3/page-frame.html","Accept-Language":"zh-cn","Accept-Encoding":"gzip, deflate, br","mpversion":"0.33.3"}
{"Accept":"*/*","ywsession":"hceyl51mkyy4asfd1ee5agtlgl118kiw","Connection":"keep-alive","Content-Type":"application/json","Cookie":"ywguid=1544654738;ywkey=ywq9H4CAsppS;platform=ios;channel=mqqmina;mpVersion=0.33.3;qq_ver=8.4.17;os_ver=iOS 14.2;mpos_ver=1.21.0;platform=ios;openid=09FB52B39862A8364F96D251AEA9305F","Host":"mqqapi.reader.qq.com","User-Agent":"QQ/8.4.17.638 CFNetwork/1206 Darwin/20.1.0","Referer":"https://appservice.qq.com/1110657249/0.33.3/page-frame.html","Accept-Language":"zh-cn","Accept-Encoding":"gzip, deflate, br","mpversion":"0.33.3"}
{"Accept":"*/*","ywsession":"4glwaqy08vgumfhg7ry4zlmbwufv4su5","Connection":"keep-alive","Content-Type":"application/json","Cookie":"ywguid=2040252653;ywkey=yw0n3q881vKv;platform=ios;channel=mqqmina;mpVersion=0.33.3;qq_ver=8.4.17;os_ver=iOS 14.2;mpos_ver=1.21.0;platform=ios;openid=3942E907CF90F0343D5BDE9D67C5FB6A","Host":"mqqapi.reader.qq.com","User-Agent":"QQ/8.4.17.638 CFNetwork/1206 Darwin/20.1.0","Referer":"https://appservice.qq.com/1110657249/0.33.3/page-frame.html","Accept-Language":"zh-cn","Accept-Encoding":"gzip, deflate, br","mpversion":"0.33.3"}
{"Accept":"*/*","ywsession":"7f8w9i2idxkcrksf6014459w3u3cnasp","Connection":"keep-alive","Content-Type":"application/json","Cookie":"ywguid=1980207745;ywkey=ywiaJ4FuZuk8;platform=ios;channel=mqqmina;mpVersion=0.33.3;qq_ver=8.4.17;os_ver=iOS 14.2;mpos_ver=1.21.0;platform=ios;openid=C7467FCA55F05241E85E9EB0F283C7E9","Host":"mqqapi.reader.qq.com","User-Agent":"QQ/8.4.17.638 CFNetwork/1206 Darwin/20.1.0","Referer":"https://appservice.qq.com/1110657249/0.33.3/page-frame.html","Accept-Language":"zh-cn","Accept-Encoding":"gzip, deflate, br","mpversion":"0.33.3"}
{"Accept":"*/*","ywsession":"a750oscjndx6ousecpd3jp3d0gmkgj7t","Connection":"keep-alive","Content-Type":"application/json","Cookie":"ywguid=3346996689;ywkey=yw3x0cJZ877X;platform=ios;channel=mqqmina;mpVersion=0.33.3;qq_ver=8.4.17;os_ver=iOS 14.2;mpos_ver=1.21.0;platform=ios;openid=F2D72E27FBEBA6D7F130384E02C80C75","Host":"mqqapi.reader.qq.com","User-Agent":"QQ/8.4.17.638 CFNetwork/1206 Darwin/20.1.0","Referer":"https://appservice.qq.com/1110657249/0.33.3/page-frame.html","Accept-Language":"zh-cn","Accept-Encoding":"gzip, deflate, br","mpversion":"0.33.3"}
{"Accept":"*/*","ywsession":"mgabyeajzez75pbnh8a7vd5bftqpv8ss","Connection":"keep-alive","Content-Type":"application/json","Cookie":"ywguid=1478723465;ywkey=yw8nwhwknMBL;platform=ios;channel=mqqmina;mpVersion=0.33.3;qq_ver=8.4.17;os_ver=iOS 14.2;mpos_ver=1.21.0;platform=ios;openid=F45CFEB648EE9A815693CB444B6D00EA","Host":"mqqapi.reader.qq.com","User-Agent":"QQ/8.4.17.638 CFNetwork/1206 Darwin/20.1.0","Referer":"https://appservice.qq.com/1110657249/0.33.3/page-frame.html","Accept-Language":"zh-cn","Accept-Encoding":"gzip, deflate, br","mpversion":"0.33.3"}
{"Accept":"*/*","ywsession":"1g0ttjtnw3yx364kbusjubyri8ull4n4","Connection":"keep-alive","Content-Type":"application/json","Cookie":"ywguid=3386659237;ywkey=ywRzKqT29bcy;platform=ios;channel=mqqmina;mpVersion=0.33.3;qq_ver=8.4.17;os_ver=iOS 14.2;mpos_ver=1.21.0;platform=ios;openid=326CD910C833BBD02508584258C72046","Host":"mqqapi.reader.qq.com","User-Agent":"QQ/8.4.17.638 CFNetwork/1206 Darwin/20.1.0","Referer":"https://appservice.qq.com/1110657249/0.33.3/page-frame.html","Accept-Language":"zh-cn","Accept-Encoding":"gzip, deflate, br","mpversion":"0.33.3"}
{"Accept":"*/*","ywsession":"k2dzowrw3fbbpu8e7ktz46p9cf6qmbw6","Connection":"keep-alive","Content-Type":"application/json","Cookie":"ywguid=3069263787;ywkey=ywurrgABl7db;platform=ios;channel=mqqmina;mpVersion=0.33.3;qq_ver=8.4.17;os_ver=iOS 14.2;mpos_ver=1.21.0;platform=ios;openid=657457C4459B3A2049070811ED8A1564","Host":"mqqapi.reader.qq.com","User-Agent":"QQ/8.4.17.638 CFNetwork/1206 Darwin/20.1.0","Referer":"https://appservice.qq.com/1110657249/0.33.3/page-frame.html","Accept-Language":"zh-cn","Accept-Encoding":"gzip, deflate, br","mpversion":"0.33.3"}`





let QQ_READ_COOKIES = {  
  "qqreadbodyVal": qqreadbodyVal.split('\n'),
  "qqreadtimeurlVal": qqreadtimeurlVal.split('\n'),
"qqreadtimeheaderVal":qqreadtimeheaderVal.split('\n') 
}

!(async () => {

  await all();
  
})()
    .catch((e) => {
      $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
    })
    .finally(() => {
      $.done();
    })



async function all() {
  console.log(`==========🔔共${QQ_READ_COOKIES.qqreadbodyVal.length}个${jsname}账号🔔=========\n`);
  for (let i = 0; i < QQ_READ_COOKIES.qqreadbodyVal.length; i++) {	  
	  nowTimes = new Date(new Date().getTime() + new Date().getTimezoneOffset()*60*1000 + 8*60*60*1000);  
    daytime= new Date(new Date().toLocaleDateString()).getTime()- 8 * 60 * 60 * 1000; 
	
    qqreadbodyVal = QQ_READ_COOKIES.qqreadbodyVal[i];
	qqreadtimeurlVal = QQ_READ_COOKIES.qqreadtimeurlVal[i];   
    qqreadtimeheaderVal = QQ_READ_COOKIES.qqreadtimeheaderVal[i];    
    O=(`${jsname+(i + 1)}🔔`);
    tz= '';
	kz= '';	
	if (BOX == 0){
		
    await qqreadinfo();//用户名
    await qqreadtrack();//更新
	await qqreadconfig();//时长查询
	await qqreadwktime();//周时长查询
	if (config.data.pageParams.todayReadSeconds / 3600 <= maxtime) {
    await qqreadtime();// 上传时长
    }
	if (wktime.data.readTime >= wktimess && wktime.data.readTime <= 1250) {
	await qqreadpick();//领周时长奖励
	}	
    await qqreadtask();//任务列表
    if (task.data.taskList[0].doneFlag == 0) {
    await qqreaddayread();//阅读任务
     }	 	 
    if (task.data.taskList[1].doneFlag == 0&&config.data && config.data.pageParams.todayReadSeconds / 60 >= 1 ) {     
      await qqreadssr1();//阅读金币1	  
    }
	if (task.data.taskList[2].doneFlag == 0) {
      await qqreadsign();//金币签到
      await qqreadtake();//阅豆签到
    }	
    await $.wait(4000)	
	if (task.data.taskList[1].doneFlag == 0&&config.data && config.data.pageParams.todayReadSeconds / 60 >= 30 ) {
      await qqreadssr2();//阅读金币2
	  await $.wait(4000);
	  await qqreadssr3();//阅读金币3
    }
    if (nowTimes.getHours() >=23  && (nowTimes.getMinutes() >= 0 && nowTimes.getMinutes() <= 59)) 
    {
    if (CASH>=1&&task.data.user.amount >= CASH*10000) {
      await qqreadwithdraw();//提现
      }		
      await qqreadtrans();//今日收益累计
    }	
    if (task.data.taskList[2].doneFlag == 0) {
      await qqreadsign2();}//签到翻倍    	
    if (task.data.taskList[3].doneFlag == 0) {
      await qqreadvideo();//视频奖励
    }
     }


     if (BOX == 1){
	
	if (nowTimes.getHours() === 0 && (nowTimes.getMinutes() >= 0 && nowTimes.getMinutes() <= 59)) 
	{
    await qqreadtrack();//更新
  }
    await qqreadtask();//任务列表
    if (task.data&&task.data.taskList[0].doneFlag == 0) {
    await qqreaddayread();//阅读任务
     }
	 if (task.data&&task.data.treasureBox.timeInterval<=5000) {
      await $.wait(task.data.treasureBox.timeInterval)
      await qqreadbox();//宝箱
    }
    if (task.data&&task.data.treasureBox.timeInterval-600000<=5000) {
      await $.wait(task.data.treasureBox.timeInterval-600000)
      await qqreadbox2();//宝箱翻倍
	  }	
	}
	 
      await showmsg();//通知	
  }
}


function showmsg() {
  return new Promise(async resolve => {
    if (BOX==0){
	$.msg(O, "", tz);
	if ($.isNode()&&nowTimes.getHours() === 12 && (nowTimes.getMinutes() >= 0 && nowTimes.getMinutes() <= 15)||nowTimes.getHours() === 23 && (nowTimes.getMinutes() >= 40 && nowTimes.getMinutes() <= 59))
  await notify.sendNotify(O, tz);
    
	}
	if (BOX==1){
	$.msg(O, "", kz);
	if ($.isNode()&&nowTimes.getHours() === 12 && (nowTimes.getMinutes() >= 0 && nowTimes.getMinutes() <= 15)||nowTimes.getHours() === 23 && (nowTimes.getMinutes() >= 40 && nowTimes.getMinutes() <= 59))
  await notify.sendNotify(O, kz); 
  
	}
	
    resolve()
  })
}


// 更新
function qqreadtrack() {
  return new Promise((resolve, reject) => {
    const body = qqreadbodyVal.replace(new RegExp(/"dis":[0-9]{13}/), `"dis":${new Date().getTime()}`)
    const toqqreadtrackurl = {
      url: "https://mqqapi.reader.qq.com/log/v4/mqq/track",
      headers: JSON.parse(qqreadtimeheaderVal),
      body: body,
      timeout: 60000,
    };
    $.post(toqqreadtrackurl, (error, response, data) => {
      if (logs) $.log(`${O}, 更新: ${data}`);
      let track = JSON.parse(data);	  
      tz += `【数据更新】:更新${track.msg}\n`;
      kz += `【数据更新】:更新${track.msg}\n`;	  
      resolve();
    });
  });
}
// 用户名
function qqreadinfo() {
  return new Promise((resolve, reject) => {
    const toqqreadinfourl = {
      url: "https://mqqapi.reader.qq.com/mqq/user/init",
      headers: JSON.parse(qqreadtimeheaderVal),
      timeout: 60000,
    };
    $.get(toqqreadinfourl, (error, response, data) => {
      if (logs) $.log(`${O}, 用户名: ${data}`);
      let info = JSON.parse(data);
      tz += `\n========== 【${info.data.user.nickName}】 ==========\n`;
	  kz += `\n========== 【${info.data.user.nickName}】 ==========\n`;
      resolve();
    });
  });
}
// 任务列表
function qqreadtask() {
  return new Promise((resolve, reject) => {
    const toqqreadtaskurl = {
      url: "https://mqqapi.reader.qq.com/mqq/red_packet/user/page?fromGuid=",
      headers: JSON.parse(qqreadtimeheaderVal),
      timeout: 60000,
    };
    $.get(toqqreadtaskurl, (error, response, data) => {
      if (logs) $.log(`${O}, 任务列表: ${data}`);
      task = JSON.parse(data);
      
      tz +=
          `【现金余额】:${(task.data.user.amount / 10000).toFixed(2)}元\n` +
          `【第${task.data.invite.issue}期】:时间${task.data.invite.dayRange}\n` +
          ` 已邀请${task.data.invite.inviteCount}人，再邀请${task.data.invite.nextInviteConfig.count}人获得${task.data.invite.nextInviteConfig.amount}金币\n` +
          `【${task.data.taskList[0].title}】:${task.data.taskList[0].amount}金币,${task.data.taskList[0].actionText}\n` +
          `【${task.data.taskList[1].title}】:${task.data.taskList[1].amount}金币,${task.data.taskList[1].actionText}\n` +
          `【${task.data.taskList[2].title}】:${task.data.taskList[2].amount}金币,${task.data.taskList[2].actionText}\n` +
          `【${task.data.taskList[3].title}】:${task.data.taskList[3].amount}金币,${task.data.taskList[3].actionText}\n` +
          `【宝箱任务${task.data.treasureBox.count + 1}】:${
              task.data.treasureBox.tipText
          }\n` +
          `【${task.data.fans.title}】:${task.data.fans.fansCount}个好友,${task.data.fans.todayAmount}金币\n`;
		  
		  kz +=
          `【现金余额】:${(task.data.user.amount / 10000).toFixed(2)}元\n` +
          `【宝箱任务${task.data.treasureBox.count + 1}】:${
            task.data.treasureBox.timeInterval/1000
        }秒后领取\n` +
          `【已开宝箱】:${task.data.treasureBox.count}个\n`;
      resolve();
    });
  });
}
// 每日阅读
function qqreaddayread() {
  return new Promise((resolve, reject) => {
    const toqqreaddayreadurl = {
      url: "https://mqqapi.reader.qq.com/mqq/red_packet/user/read_book",
      headers: JSON.parse(qqreadtimeheaderVal),
      timeout: 60000,
    };
    $.get(toqqreaddayreadurl, (error, response, data) => {
      if (logs) $.log(`${O}, 每日阅读: ${data}`);
      let dayread = JSON.parse(data);
      if (dayread.code == 0) {
        tz += `【每日阅读】:获得${dayread.data.amount}金币\n`;
        kz += `【每日阅读】:获得${dayread.data.amount}金币\n`;
      }
      resolve();
    });
  });
}
// 金币签到
function qqreadsign() {
  return new Promise((resolve, reject) => {
    const toqqreadsignurl = {
      url: "https://mqqapi.reader.qq.com/mqq/red_packet/user/clock_in/page",
      headers: JSON.parse(qqreadtimeheaderVal),
      timeout: 60000,
    };
    $.get(toqqreadsignurl, (error, response, data) => {
      if (logs) $.log(`${O}, 金币签到: ${data}`);
      sign = JSON.parse(data);
      if (sign.data.videoDoneFlag) {
        tz += `【金币签到】:获得${sign.data.todayAmount}金币\n`;
		kz += `【金币签到】:获得${sign.data.todayAmount}金币\n`;
      }
      resolve();
    });
  });
}
// 金币签到翻倍
function qqreadsign2() {
  return new Promise((resolve, reject) => {
    const toqqreadsign2url = {
      url: "https://mqqapi.reader.qq.com/mqq/red_packet/user/clock_in_video",
      headers: JSON.parse(qqreadtimeheaderVal),
      timeout: 60000,
    };
    $.get(toqqreadsign2url, (error, response, data) => {
      if (logs) $.log(`${O}, 金币签到翻倍: ${data}`);
      let sign2 = JSON.parse(data);
      if (sign2.code == 0) {
        tz += `【签到翻倍】:获得${sign2.data.amount}金币\n`;
		kz += `【签到翻倍】:获得${sign2.data.amount}金币\n`;
      }
      resolve();
    });
  });
}
// 视频奖励
function qqreadvideo() {
  return new Promise((resolve, reject) => {
    const toqqreadvideourl = {
      url: "https://mqqapi.reader.qq.com/mqq/red_packet/user/watch_video",
      headers: JSON.parse(qqreadtimeheaderVal),
      timeout: 60000,
    };
    $.get(toqqreadvideourl, (error, response, data) => {
      if (logs) $.log(`${O}, 视频奖励: ${data}`);
      let video = JSON.parse(data);
      if (video.code == 0) {
        tz += `【视频奖励】:获得${video.data.amount}金币\n`;
		kz += `【视频奖励】:获得${video.data.amount}金币\n`;
      }
      resolve();
    });
  });
}
// 阅读金币1
function qqreadssr1() {
  return new Promise((resolve, reject) => {
    const toqqreadssr1url = {
      url: `https://mqqapi.reader.qq.com/mqq/red_packet/user/read_time?seconds=30`,
      headers: JSON.parse(qqreadtimeheaderVal),
      timeout: 60000,
    };
    
      $.get(toqqreadssr1url, (error, response, data) => {
        if (logs) $.log(`${O}, 金币奖励1: ${data}`);
        let ssr1 = JSON.parse(data);
        if (ssr1.data.amount > 0){
          tz += `【阅读金币1】获得${ssr1.data.amount}金币\n`;
      kz += `【阅读金币1】获得${ssr1.data.amount}金币\n`;
    }
      });
    
    resolve();
  });
}
// 阅读金币2
function qqreadssr2() {
  return new Promise((resolve, reject) => {
    const toqqreadssr2url = {
      url: `https://mqqapi.reader.qq.com/mqq/red_packet/user/read_time?seconds=300`,
      headers: JSON.parse(qqreadtimeheaderVal),
      timeout: 60000,
    };
    
      $.get(toqqreadssr2url, (error, response, data) => {
        if (logs) $.log(`${O}, 金币奖励2: ${data}`);
        ssr2 = JSON.parse(data);
        if (ssr2.data.amount > 0){
      tz += `【阅读金币2】获得${ssr2.data.amount}金币\n`;
      kz += `【阅读金币2】获得${ssr2.data.amount}金币\n`;
    }
      });
    
    resolve();
  });
}
// 阅读金币3
function qqreadssr3() {
  return new Promise((resolve, reject) => {
    const toqqreadssr3url = {
      url: `https://mqqapi.reader.qq.com/mqq/red_packet/user/read_time?seconds=1800`,
      headers: JSON.parse(qqreadtimeheaderVal),
      timeout: 60000,
    };
    
      $.get(toqqreadssr3url, (error, response, data) => {
        if (logs) $.log(`${O}, 金币奖励3: ${data}`);
        let ssr3 = JSON.parse(data);
        if (ssr3.data.amount > 0)
          tz += `【阅读金币3】获得${ssr3.data.amount}金币\n`;
		  kz += `【阅读金币3】获得${ssr3.data.amount}金币\n`;
      });
    
    resolve();
  });
}
// 阅豆签到
function qqreadtake() {
  return new Promise((resolve, reject) => {
    const toqqreadtakeurl = {
      url: "https://mqqapi.reader.qq.com/mqq/sign_in/user",
      headers: JSON.parse(qqreadtimeheaderVal),
      timeout: 60000,
    };
    $.post(toqqreadtakeurl, (error, response, data) => {
      if (logs) $.log(`${O}, 阅豆签到: ${data}`);
      let take = JSON.parse(data);
      if (take.data.takeTicket > 0) {
        tz += `【阅豆签到】:获得${take.data.takeTicket}豆\n`;
		kz += `【阅豆签到】:获得${take.data.takeTicket}豆\n`;
      }
      resolve();
    });
  });
}
// 阅读时长任务
function qqreadconfig() {
  return new Promise((resolve, reject) => {
    const toqqreadconfigurl = {
      url:
          "https://mqqapi.reader.qq.com/mqq/page/config?router=%2Fpages%2Fbook-read%2Findex&options=",
      headers: JSON.parse(qqreadtimeheaderVal),
    };
    $.get(toqqreadconfigurl, (error, response, data) => {
      if (logs) $.log(`${O}, 阅读时长查询: ${data}`);
      config = JSON.parse(data);
      if (config.code == 0)
        tz += `【时长查询】:今日阅读${(
            config.data.pageParams.todayReadSeconds / 60
        ).toFixed(0)}分钟\n`;
		kz += `【时长查询】:今日阅读${(
            config.data.pageParams.todayReadSeconds / 60
        ).toFixed(0)}分钟\n`;
		
		
      resolve();
    });
  });
}
// 阅读时长
function qqreadtime() {
  return new Promise((resolve, reject) => {
	  do TIME = Math.floor(Math.random()*30);
        while( TIME < 20 )	  
    const toqqreadtimeurl = {
      url: qqreadtimeurlVal.replace(/readTime=/g, `readTime=${TIME}`),
      headers: JSON.parse(qqreadtimeheaderVal),
    };
    $.get(toqqreadtimeurl, (error, response, data) => {
      if (logs) $.log(`${O}, 阅读时长: ${data}`);
      let time = JSON.parse(data);
      if (time.code == 0) 
	  tz += `【阅读时长】:上传${(TIME/6).toFixed(1)}分钟\n`;
	  kz += `【阅读时长】:上传${(TIME/6).toFixed(1)}分钟\n`;
      resolve();
    });
  });
}
// 宝箱奖励
function qqreadbox() {
  return new Promise((resolve, reject) => {
    const toqqreadboxurl = {
      url: "https://mqqapi.reader.qq.com/mqq/red_packet/user/treasure_box",
      headers: JSON.parse(qqreadtimeheaderVal),
      timeout: 60000,
    };
    $.get(toqqreadboxurl, (error, response, data) => {
      if (logs) $.log(`${O}, 宝箱奖励: ${data}`);
      let box = JSON.parse(data);
      if (box.code==0)
        tz += `【宝箱奖励${box.data.count}】:获得${box.data.amount}金币\n`;
		kz += `【宝箱奖励${box.data.count}】:获得${box.data.amount}金币\n`;
      
      resolve();
    });
  });
}
// 宝箱奖励翻倍
function qqreadbox2() {
  return new Promise((resolve, reject) => {
    const toqqreadbox2url = {
      url:
          "https://mqqapi.reader.qq.com/mqq/red_packet/user/treasure_box_video",
      headers: JSON.parse(qqreadtimeheaderVal),
      timeout: 60000,
    };
    $.get(toqqreadbox2url, (error, response, data) => {
      if (logs) $.log(`${O}, 宝箱奖励翻倍: ${data}`);
      let box2 = JSON.parse(data);
      if (box2.code == 0) {
        tz += `【宝箱翻倍】:获得${box2.data.amount}金币\n`;
		kz += `【宝箱翻倍】:获得${box2.data.amount}金币\n`;
      }
      resolve();
    });
  });
}
// 本周阅读时长
function qqreadwktime() {
  return new Promise((resolve, reject) => {
    const toqqreadwktimeurl = {
      url: `https://mqqapi.reader.qq.com/mqq/v1/bookShelfInit`,
      headers: JSON.parse(qqreadtimeheaderVal),
    };
    $.get(toqqreadwktimeurl, (error, response, data) => {
      if (logs) $.log(`${O}, 本周阅读时长: ${data}`);
      wktime = JSON.parse(data);
      if (wktime.code == 0)
        tz += `【本周阅读时长】:${wktime.data.readTime}分钟\n`;
		kz += `【本周阅读时长】:${wktime.data.readTime}分钟\n`;
      resolve();
    });
  });
}
// 本周阅读时长奖励任务
function qqreadpick() {
  return new Promise((resolve, reject) => {
    const toqqreadpickurl = {
      url: `https://mqqapi.reader.qq.com/mqq/pickPackageInit`,
      headers: JSON.parse(qqreadtimeheaderVal),
    };
    
      $.get(toqqreadpickurl, (error, response, data) => {
        if (logs) $.log(`${O},周阅读时长奖励任务: ${data}`);
        let pick = JSON.parse(data);
        if (pick.data[7].isPick == true) tz += "【周时长奖励】:已全部领取\n";
        for (let i = 0; i < pick.data.length; i++) {
          setTimeout(() => {
            const pickid = pick.data[i].readTime;
            const Packageid = [
              "10",
              "10",
              "20",
              "30",
              "50",
              "80",
              "100",
              "120",
            ];
            const toqqreadPackageurl = {
              url: `https://mqqapi.reader.qq.com/mqq/pickPackage?readTime=${pickid}`,
              headers: JSON.parse(qqreadtimeheaderVal),
              timeout: 60000,
            };
            $.get(toqqreadPackageurl, (error, response, data) => {
              if (logs) $.log(`${O}, 领周阅读时长奖励: ${data}`);
              Package = JSON.parse(data);
              if (Package.code == 0)
                tz += `【周时长奖励${i + 1}】:领取${Packageid[i]}阅豆\n`;
				kz += `【周时长奖励${i + 1}】:领取${Packageid[i]}阅豆\n`;
            });
          }, i * 100);
        }
      });
      resolve();
    
    resolve();
  });
}
//提现
function qqreadwithdraw() {
  return new Promise((resolve, reject) => {
    const toqqreadwithdrawurl = {
      url: `https://mqqapi.reader.qq.com/mqq/red_packet/user/withdraw?amount=${CASH*10000}`,
      headers: JSON.parse(qqreadtimeheaderVal),
      timeout: 60000,
    };
    $.post(toqqreadwithdrawurl, (error, response, data) => {
      if (logs) $.log(`${O}, 提现: ${data}`);
      let withdraw = JSON.parse(data);
      if (withdraw.data.code == 0)
        tz += `【现金提现】:成功提现${CASH}元\n`;
		kz += `【现金提现】:成功提现${CASH}元\n`;
      resolve();
    });
  });
}
// 金币统计
function qqreadtrans() {
  return new Promise((resolve, reject) => {  
for(var y=1;y<9;y++){
   let day=0;
    const toqqreadtransurl = { 
      url: "https://mqqapi.reader.qq.com/mqq/red_packet/user/trans/list?pn="+y, 
      headers: JSON.parse(qqreadtimeheaderVal), 
      timeout: 60000, 
    };
    $.get(toqqreadtransurl, (error, response, data) => {
      if (logs) $.log(`${O}, 今日收益: ${data}`);
      trans = JSON.parse(data);
    for(var i=0;i<20;i++){
if(trans.data.list[i].createTime>=daytime)
  day+=trans.data.list[i].amount;
}
tz+="【今日收益】:获得"+day+'\n'
kz+="【今日收益】:获得"+day+'\n'
resolve();
      });
     }
      
  });
}
// prettier-ignore
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r)));let h=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];h.push(e),s&&h.push(s),i&&h.push(i),console.log(h.join("\n")),this.logs=this.logs.concat(h)}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
