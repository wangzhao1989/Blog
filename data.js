[General]
loglevel = notify
skip-proxy = 127.0.0.1, 192.168.0.0/16, 193.168.0.0/24, 10.0.0.0/8, 172.16.0.0/12, 100.64.0.0/10,localhost,*.local
dns-server = 223.5.5.5, 119.29.29.29, 114.114.114.114
external-controller-access = wangzhao@0.0.0.0:1989
ipv6 = true
exclude-simple-hostnames = true
allow-wifi-access = true
http-listen = 0.0.0.0:8888
socks5-listen = 0.0.0.0:8889
network-framework = true

[Replica]
hide-apple-request = true
hide-crashlytics-request = true
hide-udp = false

[Proxy]
🇨🇳 = ss, mirai.cccat.io, 11989, encrypt-method=chacha20, password=wangzhao, obfs=tls, obfs-host=static.hdslb.com.w.kunlunhuf.com, udp-relay=true, tfo=true
🇭🇰 = ss, mirage.cccat.io, 11989, encrypt-method=chacha20, password=wangzhao, obfs=tls, obfs-host=static.hdslb.com.w.kunlunhuf.com, udp-relay=true, tfo=true
🇯🇵 = ss, rin.legacy.cccat.io, 11989, encrypt-method=chacha20, password=wangzhao, obfs=tls, obfs-host=static.hdslb.com.w.kunlunhuf.com, udp-relay=true, tfo=true
🇺🇸 = ss, scheat.cccat.io, 11989, encrypt-method=chacha20, password=wangzhao, obfs=tls, obfs-host=static.hdslb.com.w.kunlunhuf.com, udp-relay=true, tfo=true
Ad-Pass = direct
Ad-Block = reject
Ad-GIF = reject-tinygif

[Proxy Group]
Proxy = select, 🌍, 🇨🇳, 🐱, ✈️
🐱 = url-test, policy-path=https://cccat.me/user/surge3list.php?token=0fdf4685b5dea769826ce247c6ceb087, url = http://www.bing.com/, interval = 600, timeout = 5, tolerance = 100
🌍 = url-test, 🇨🇳, 🇭🇰, 🇯🇵, 🇺🇸, url = http://www.bing.com/, interval = 600, timeout = 5, tolerance = 100
📱 = ssid, default = 🌍, cellular = 🌍, "Xiaomi" = 🌍
✈️ = fallback, policy-path=🇨🇳.list, url = http://www.bing.com/, interval = 600, timeout = 5, tolerance = 100
AdBlock = select, Ad-Pass, Ad-Block, Ad-GIF

[Rule]
USER-AGENT,App%20Store*,DIRECT
USER-AGENT,MacAppStore*,DIRECT
USER-AGENT,%E8%BD%AF%E4%BB%B6%E6%9B%B4%E6%96%B0*,DIRECT
DOMAIN,reserve-prime.apple.com,DIRECT
DOMAIN,guzzoni.apple.com,DIRECT
DOMAIN-SUFFIX,cdn-apple.com,DIRECT
# RULE-SET
RULE-SET,SYSTEM,DIRECT
RULE-SET,https://raw.githubusercontent.com/wangzhao1989/Blog/Surge/apple.list,DIRECT
RULE-SET,https://raw.githubusercontent.com/wangzhao1989/Blog/Surge/adblock.list,AdBlock
RULE-SET,https://raw.githubusercontent.com/wangzhao1989/Blog/Surge/reject.list,AdBlock
RULE-SET,https://raw.githubusercontent.com/wangzhao1989/Blog/Surge/cn.list,DIRECT
RULE-SET,https://raw.githubusercontent.com/wangzhao1989/Blog/Surge/blocked.list,Proxy
RULE-SET,https://raw.githubusercontent.com/wangzhao1989/Blog/Surge/telegram.list,Proxy
RULE-SET,https://raw.githubusercontent.com/wangzhao1989/Blog/Surge/proxy.list,Proxy
RULE-SET,LAN,DIRECT
# GeoIP CN
GEOIP,CN,DIRECT
FINAL,Proxy,dns-failed

[URL Rewrite]
^http://www\.google\.cn http://www.google.com.hk header

[SSID Setting]
"@PHICOMM_12" suspend=true
"@PHICOMM_2C_5G" suspend=true
"iPhone" cellular-mode=true

[MITM]
ca-passphrase = 354A058F
ca-p12 = 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
