# Youku API header
header("cache-control:no-cache,must-revalidate");
header("Content-Type:application/json;charset=UTF-8");

# Youku Request Verify
if(!empty($_GET['deviceid'])&&!empty($_GET['did'])&&!empty($_GET['sessionid'])&&!empty($_GET['ouid'])&&!empty($_GET['vdid'])){
    $YouKuQuery = "http://i-play.mobile.youku.com/common/v5/play?{$_SERVER['QUERY_STRING']}";
    $CURLAddress= $YouKuQuery;
    $CURL = true;
    $Cookie = true;
    $RegExp = true;
}
elseif(!empty($_GET['guid'])&&!empty($_GET['_s_'])&&!empty($_GET['_t_'])){
    $DomainName = "{\"status\":\"success\",\"max_retry\":1,\"switch_duration\":1.0,\"domain_names\":[\"http://{$_SERVER['HTTP_HOST']}\"]}";
    $CURL = false;
    $Cookie = true;
    $Domain = true;
}
else{
    echo "Invalid Parameter || ";
}
# SetCookie Data
if($Cookie===true){
    setcookie("__ysuid",$_COOKIE["__ysuid"],time()+3600);
    setcookie("__aliCount",$_COOKIE["__aliCount"],time()+3600);
    setcookie("isg",$_COOKIE["isg"],time()+3600);
    setcookie("cna",$_COOKIE["cna"],time()+3600);
    setcookie("hz6d_70722522_member_id",$_COOKIE["hz6d_70722522_member_id"],time()+3600);
    setcookie("__ali",$_COOKIE["__ali"],time()+3600);
    setcookie("hz6d_70722522_member_guest",$_COOKIE["hz6d_70722522_member_guest"],time()+3600);
    setcookie("hz6d_70722522_guest_id",$_COOKIE["hz6d_70722522_guest_id"],time()+3600);
    setcookie("__ayspstp",$_COOKIE["__ayspstp"],time()+3600);
    setcookie("__aysid",$_COOKIE["__aysid"],time()+3600);
    setcookie("l",$_COOKIE["l"],time()+3600);
    setcookie("passport_sdk",$_COOKIE["passport_sdk"],time()+3600);
}

# CURL Module
if($CURL===true){
    $CURLX=curl_init();
    curl_setopt($CURLX,CURLOPT_URL,$CURLAddress);
    curl_setopt($CURLX,CURLOPT_USERAGENT,$_SERVER['HTTP_USER_AGENT']);
    curl_setopt($CURLX,CURLOPT_RETURNTRANSFER,true);
    curl_setopt($CURLX,CURLOPT_TIMEOUT,30);
    curl_setopt($CURLX,CURLOPT_REFERER,'http://i-play.mobile.youku.com/');
    $CURLContent=curl_exec($CURLX);
    curl_close($CURLX);
}

# RegExp YoukuAD Data Block
if($RegExp===true&&$CURL===true){
    $RegExp0 = preg_replace('/(\,"cdn":\[")(\w+\:\/\/\d+\.\d+\.\d+\.\d+\/\w+\/\w+\-\w+\-\w+\-\w+\-\w+\.\w+\","\w+\:\/\/\d+\.\d+\.\d+\.\d+\/\w+\/\w+\-\w+\-\w+\-\w+\-\w+\.\w+\","\w+\:\/\/\d+\.\d+\.\d+\.\d+\/\w+\/\w+\-\w+\-\w+\-\w+\-\w+\.\w+\","\w+\:\/\/\d+\.\d+\.\d+\.\d+\/\w+\/\w+\-\w+\-\w+\-\w+\-\w+\.\w+\","\w+\:\/\/\d+\.\d+\.\d+\.\d+\/\w+\/\w+\-\w+\-\w+\-\w+\-\w+\.\w+\"\])/','',$CURLContent);
    $RegExp1 = preg_replace('/(\,"cdn":\[")(\w+\:\/\/\d+\.\d+\.\d+\.\d+\/\w+\/\w+\-\w+\-\w+\-\w+\-\w+\.\w+\","\w+\:\/\/\d+\.\d+\.\d+\.\d+\/\w+\/\w+\-\w+\-\w+\-\w+\-\w+\.\w+\","\w+\:\/\/\d+\.\d+\.\d+\.\d+\/\w+\/\w+\-\w+\-\w+\-\w+\-\w+\.\w+\","\w+\:\/\/\d+\.\d+\.\d+\.\d+\/\w+\/\w+\-\w+\-\w+\-\w+\-\w+\.\w+\"\])/','',$RegExp0);
    $RegExp2 = preg_replace('/(\,"cdn":\[")(\w+\:\/\/\d+\.\d+\.\d+\.\d+\/\w+\/\w+\-\w+\-\w+\-\w+\-\w+\.\w+\","\w+\:\/\/\d+\.\d+\.\d+\.\d+\/\w+\/\w+\-\w+\-\w+\-\w+\-\w+\.\w+\","\w+\:\/\/\d+\.\d+\.\d+\.\d+\/\w+\/\w+\-\w+\-\w+\-\w+\-\w+\.\w+"\])/','',$RegExp1);
    $RegExp3 = preg_replace('/(\,"cdn":\[")(\w+\:\/\/\d+\.\d+\.\d+\.\d+\/\w+\/\w+\-\w+\-\w+\-\w+\-\w+\.\w+\","\w+\:\/\/\d+\.\d+\.\d+\.\d+\/\w+\/\w+\-\w+\-\w+\-\w+\-\w+\.\w+"\])/','',$RegExp2);
    $RegExp4 = preg_replace('/(\,"cdn":\[")(\w+\:\/\/\d+\.\d+\.\d+\.\d+\/\w+\/\w+\-\w+\-\w+\-\w+\-\w+\.\w+"\])/','',$RegExp3);
    $RegExp5 = preg_replace('/("U":")/' ,'"Block":"',$RegExp4);
    $RegExp6 = preg_replace('/("CU":")/','"Block":"',$RegExp5);
    $RegExp7 = preg_replace('/("RS":")/','"Block":"',$RegExp6);
    echo $RegExp7;
}
elseif($Domain===true&&$CURL===false){
    echo $DomainName;
}
else{
    echo 'Error 400 :)';
}

?>
