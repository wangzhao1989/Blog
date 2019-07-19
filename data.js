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

