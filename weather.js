const weaapi = "https://www.tianqiapi.com/api/?version=v6&appid=47273245&appsecret=BCK1QTW5"

$httpClient.get(weaapi, function(error, response, data){
    if (error){
        console.log(error);
        $done();                   
    } else {
        var obj = JSON.parse(data);
        console.log(obj);
        var city = "所在城市： " + obj.city;
        var wea = "天气状况： " + obj.wea + "  当前" + obj.tem + "℃  " + obj.tem2 + "℃～" + obj.tem1 + "℃";
        var air = "当前风力： " + obj.win + obj.win_speed + "  风速" + obj.win_meter + "\n空气指数： " + obj.air + "  " + obj.air_level + "\n友情提示： " + obj.air_tips + "\n更新时间： " + obj.date + " "+ obj.update_time;
        let wmation = [city,wea,air];
        $notification.post(wmation[0], wmation[1], wmation[2]);
        $done();
    }
}
);
