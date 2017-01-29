#!MANAGED-CONFIG https://raw.githubusercontent.com/wangzhao1989/Blog/Surge/Surge.php interval=86400 strict=true
[General]
loglevel = notify
dns-server = system, 114.114.114.114, 223.5.5.5
skip-proxy = 127.0.0.1, 192.168.0.0/16, 10.0.0.0/8, 172.16.0.0/12, 100.64.0.0/10,localhost,*.local
ipv6 = true
port = 8888 
socks-port = 8889
external-controller-access = apassword@127.0.0.1:8888
allow-wifi-access = true

# For iOS
bypass-system = true

# For macOS
interface = 127.0.0.1
socks-interface = 127.0.0.1
exclude-simple-hostnames = true
enhanced-mode-by-rule = true

[Proxy]
🇭🇰 = custom,47.89.15.79,11386,aes-256-cfb,wangzhao,http://1.wangzhao19891015.applinzi.com/SSEncrypt.module
🇯🇵 = custom,scarlet.ssnode.link,54717,aes-256-cfb,wangzhao,http://1.wangzhao19891015.applinzi.com/SSEncrypt.module
🇺🇸 = custom, 107.161.80.223,11386,aes-256-cfb,wangzhao,http://1.wangzhao19891015.applinzi.com/SSEncrypt.module
🏳️‍🌈 = custom, 158.69.212.186,9200,aes-256-cfb,wangzhao,http://1.wangzhao19891015.applinzi.com/SSEncrypt.module

[Proxy Group]
Proxy = select,🇨🇳,🌍,🇭🇰,🇯🇵,🇺🇸,🏳️‍🌈
🇨🇳 = ssid, default = 🌍, cellular = 🇯🇵, Xiaomi = 🇭🇰
🌍 = url-test, 🇭🇰,🇯🇵, 🇺🇸,🏳️‍🌈,url = http://www.gstatic.com/generate_204, interval = 600, tolerance = 100, timeout = 5

[URL Rewrite]
^http://www.google.cn http://www.google.com.hk header

^http://i-play.mobile.youku.com/common/v5/play? http://1.wangzhao19891015.applinzi.com/Youku.php header

^http://d.m6.cms.mobile.youku.com/player/domain_name? http://1.wangzhao19891015.applinzi.com/Youku.php header

^http://1.wangzhao1989.applinzi.com/common/v5/play http://1.wangzhao19891015.applinzi.com/Youku.php header

^http://hd.mobile.youku.com/common/v3/hudong/new - reject

[Rule]
# Apple & DIRECT
DOMAIN,api.smoot.apple.com,DIRECT
DOMAIN,captive.apple.com,DIRECT
DOMAIN,configuration.apple.com,DIRECT
DOMAIN,guzzoni.apple.com,DIRECT
DOMAIN,smp-device-content.apple.com,DIRECT
DOMAIN,xp.apple.com,DIRECT
DOMAIN-SUFFIX,akadns.net,DIRECT
DOMAIN-SUFFIX,cdn-apple.com,DIRECT
DOMAIN-SUFFIX,ess.apple.com,DIRECT
DOMAIN-SUFFIX,push.apple.com,DIRECT
DOMAIN-SUFFIX,lookup-api.apple.com,DIRECT,enhanced-mode //Dictionary
DOMAIN-KEYWORD,fmfmobile,DIRECT //Find My Friends
DOMAIN-KEYWORD,content.icloud,DIRECT
DOMAIN,www.thinkdifferent.us,DIRECT
DOMAIN,www.itools.info,DIRECT
DOMAIN,www.ibook.info,DIRECT
DOMAIN,www.apple.com,DIRECT
DOMAIN,www.aiport.us,DIRECT
DOMAIN,upp.itunes.apple.com,DIRECT
DOMAIN,swscan.apple.com,DIRECT //Software Update
DOMAIN,swquery.apple.com,DIRECT //Software Update
DOMAIN,swdownload.apple.com,DIRECT //Software Update
DOMAIN,swcdn.apple.com,DIRECT //Software Update
DOMAIN,su.itunes.apple.com,DIRECT
DOMAIN,streamingaudio.itunes.apple.com,DIRECT //Apple Music Streaming
DOMAIN,sp.itunes.apple.com,DIRECT
DOMAIN,se.itunes.apple.com,DIRECT
DOMAIN,play.itunes.apple.com,DIRECT
DOMAIN,osxapps.itunes.apple.com,DIRECT
DOMAIN,mvod.itunes.apple.com,DIRECT //Apple Music Streaming
DOMAIN,metrics.apple.com,DIRECT //Apple Web Site
DOMAIN,iosapps.itunes.apple.com,DIRECT
DOMAIN,init.itunes.apple.com,DIRECT
DOMAIN,images.apple.com,DIRECT
DOMAIN,idmsa.apple.com,DIRECT //Apple ID
DOMAIN,gs-loc.apple.com,DIRECT //Maps
DOMAIN,client-api.itunes.apple.com,DIRECT
DOMAIN,captive.apple.com,DIRECT
DOMAIN,appleiphonecell.com,DIRECT
DOMAIN,appleid.apple.com,DIRECT
DOMAIN,aod.itunes.apple.com,DIRECT //Apple Music Streaming
DOMAIN-SUFFIX,adcdownload.apple.com,DIRECT
DOMAIN-SUFFIX,appldnld.apple.com,DIRECT
DOMAIN-SUFFIX,lcdn-locator.apple.com,DIRECT //Maps
DOMAIN-SUFFIX,lcdn-registration.apple.com,DIRECT //Maps
DOMAIN-SUFFIX,ls.apple.com,DIRECT //Maps
DOMAIN-SUFFIX,mzstatic.com,DIRECT
DOMAIN-SUFFIX,phobos.apple.com,DIRECT //iTunes Store

# Apple & DIRECT
DOMAIN-SUFFIX,aaplimg.com,DIRECT
DOMAIN-SUFFIX,apple.co,DIRECT
DOMAIN-SUFFIX,apple.com,DIRECT
DOMAIN-SUFFIX,icloud-content.com,DIRECT
DOMAIN-SUFFIX,icloud.com,DIRECT
DOMAIN-SUFFIX,itunes.com,DIRECT
DOMAIN-SUFFIX,itunes.apple.com,DIRECT
DOMAIN-SUFFIX,me.com,DIRECT

# QQ
DOMAIN-SUFFIX,gdt.qq.com,REJECT
DOMAIN-SUFFIX,l.qq.com,REJECT

# Youtube
DOMAIN,device-provisioning.googleapis.com,REJECT
DOMAIN,googleads.g.doubleclick.net,REJECT
DOMAIN,yt3.ggpht.com,REJECT

# 91Porn
DOMAIN,adserver.juicyads.com,REJECT
DOMAIN,ads2.contentabc.com,REJECT
DOMAIN,ajax.cloudflare.com,REJECT
DOMAIN,banners.adultfriendfinder.com,REJECT
DOMAIN,code.jquery.com,REJECT
DOMAIN,fans.bestvogue.com,REJECT

# Xonline
DOMAIN,syndication.exoclick.com,REJECT

# Xvideos
DOMAIN,media.trafficfactory.biz,REJECT

# TurboDL
DOMAIN,ads.mopub.com,REJECT

# 优酷视频
DOMAIN,ad.mobile.youku.com,REJECT

# 土豆视频
DOMAIN-SUFFIX,ad.api.3g.tudou.com,REJECT

# 乐视视频
DOMAIN,apple.www.letv.com,Proxy
DOMAIN,api.mob.app.letv.com,Proxy

# 聚力视频
DOMAIN,de.as.pptv.com,REJECT

# 搜狐视频
DOMAIN-SUFFIX,aty.sohu.com,REJECT

# 风行视频
DOMAIN-SUFFIX,pub.funshion.com,REJECT

# 风云直播
DOMAIN,config.mobile.kukuplay.com,REJECT
DOMAIN,resource.ws.kukuplay.com,REJECT

# 芒果TV
DOMAIN,x.da.hunantv.com,REJECT

# 云图TV
DOMAIN-KEYWORD,umeng,REJECT
DOMAIN-SUFFIX,inmobi.com,REJECT
DOMAIN-SUFFIX,log.umsns.com,REJECT

# VIP解析
DOMAIN ,slb.gedawang.com,REJECT
DOMAIN ,www.3v.do,REJECT

# 蜻蜓FM
DOMAIN,admgr.qingting.fm ,REJECT

# 淘宝
DOMAIN-SUFFIX,mo.m.taobao.com,REJECT

# 百度
DOMAIN-SUFFIX,mobads.baidu.com,REJECT
DOMAIN-SUFFIX,pos.baidu.com,REJECT
DOMAIN-KEYWORD,baidustatic,REJECT

# 美颜相机
DOMAIN,xiuxiu.mobile.meitudata.com ,REJECT

# 车轮考驾照
DOMAIN,msg.eclicks.cn,REJECT

# 在意空气
DOMAIN-KEYWORD,domob,REJECT
DOMAIN-KEYWORD,duomeng,REJECT

# Proxy
DOMAIN,accounts.google.com,Proxy,force-remote-dns,enhanced-mode
DOMAIN-SUFFIX,appspot.com,Proxy,force-remote-dns
DOMAIN-SUFFIX,cdninstagram.com,Proxy,force-remote-dns
DOMAIN-SUFFIX,facebook.com,Proxy,force-remote-dns
DOMAIN-SUFFIX,fb.com,Proxy,force-remote-dns
DOMAIN-SUFFIX,fb.me,Proxy,force-remote-dns
DOMAIN-SUFFIX,fbcdn.net,Proxy,force-remote-dns
DOMAIN-SUFFIX,gmail.com,Proxy,force-remote-dns
DOMAIN-SUFFIX,googleapis.com,Proxy,force-remote-dns,enhanced-mode
DOMAIN-SUFFIX,instagram.com,Proxy,force-remote-dns
DOMAIN-SUFFIX,scdn.co,Proxy,force-remote-dns
DOMAIN-SUFFIX,t.co,Proxy,force-remote-dns
DOMAIN-SUFFIX,twimg.com,Proxy,force-remote-dns
DOMAIN-SUFFIX,twitpic.com,Proxy,force-remote-dns
DOMAIN-SUFFIX,twitter.com,Proxy,force-remote-dns
DOMAIN-SUFFIX,youtube-nocookie.com,Proxy
DOMAIN-SUFFIX,youtube.com,Proxy,force-remote-dns
DOMAIN-KEYWORD,google,Proxy,force-remote-dns

# 爱奇艺
# 河北
IP-CIDR,221.179.183.0/24,REJECT,no-resolve
IP-CIDR,221.179.191.0/24,REJECT,no-resolve

# 河南
IP-CIDR,111.206.13.4/32,REJECT,no-resolve
IP-CIDR,111.206.22.0/24,REJECT,no-resolve
IP-CIDR,123.125.111.117/32,REJECT,no-resolve
IP-CIDR,123.125.117.0/24,REJECT,no-resolve
IP-CIDR,123.125.118.0/24,REJECT,no-resolve

# 江苏
IP-CIDR,101.227.200.0/24,REJECT,no-resolve

# Telegram
IP-CIDR,91.108.4.0/22,Proxy,no-resolve
IP-CIDR,91.108.56.0/22,Proxy,no-resolve
IP-CIDR,109.239.140.0/24,Proxy,no-resolve
IP-CIDR,149.154.160.0/20,Proxy,no-resolve

# LAN
IP-CIDR,10.0.0.0/8,DIRECT
IP-CIDR,127.0.0.0/8,DIRECT
IP-CIDR,172.16.0.0/12,DIRECT
IP-CIDR,192.168.0.0/16,DIRECT

GEOIP, CN, DIRECT
FINAL, Proxy
