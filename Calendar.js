const api1 = "https://www.sortime.com/api/v2/perpetualcalendar/";
const api2 = "https://api.ooopn.com/history/api.php?type=json";
const api3 = "https://v1.hitokoto.cn/?encode=json";


$httpClient.get(api3, function(error, response, data){
  var obj = JSON.parse(data);
  var hit = obj.hitokoto
  //console.log(hit);
  $persistentStore.write(hit,"meeta");
}
);


$httpClient.get(api2, function(error, response, data){
  var obj = JSON.parse(data);
  var hday = obj.content[0];
  //console.log(hday);
  $persistentStore.write(hday,"meeta1");
}
);

$httpClient.get(api1, function(error, response, data){
  if(error){
    console.log(error);
    $done();
  }else{
    var obj = JSON.parse(data);
    //console.log(obj);
    var year = obj.result.result.year;
    var month = obj.result.result.month;
    var day = obj.result.result.day;
    var week = obj.result.result.week;
    var lunar = obj.result.result.huangli.nongli;
   
   
    var title = year+" 年 "+month+" 月 "+day+" 日 "+"星期"+week;
    if(obj.result.result.hasOwnProperty("jieqi")){
      var jieqi = obj.result.result.jieqi;
      var subtitle = lunar+" "+jieqi;
    }else{
      var subtitle = lunar;
    };
    if(obj.result.result.hasOwnProperty("festival")){
      var festival = obj.result.result.festival.solar[0];
      var mation = "今天是:"+festival+"\n一言:"+$persistentStore.read("meeta");
      }else{
          var mation = "一言:"+$persistentStore.read("meeta")+"\n历史上的今天:"+ $persistentStore.read("meeta1")
      
    };
  
    
    
}

$notification.post(title, subtitle,mation );
$done();

}
);
