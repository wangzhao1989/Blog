<?php

# Youku API header
header("cache-control:no-cache,must-revalidate");
header("Content-Type:application/json;charset=UTF-8");

# Youku Request Verify
if($_GET['sessionid']||$_GET['aid']||$_GET['ouid']){
    $YouKuQuery = "http://i-play.mobile.youku.com/common/v5/play?{$_SERVER['QUERY_STRING']}";
    $CURLAddress= $YouKuQuery;
    $CURL = true;
    $Cookie = true;
}
elseif($_GET['guid']||$_GET['_s_']||$_GET['_t_']){
    $DomainName = "{\"status\":\"success\",\"max_retry\":1,\"switch_duration\":1.0,\"domain_names\":[\"http://{$_SERVER['HTTP_HOST']}\"]}";
    $CURL = false;
    $Cookie = true;
}

# SetCookie Data
if($Cookie===true){
    setcookie("__ysuid", $_Cookie['__ysuid']);
    setcookie("__aliCount", $_Cookie['__aliCount']);
    setcookie("isg", $_Cookie['isg']);
    setcookie("cna", $_Cookie['cna']);
    setcookie("hz6d_70722522_member_id", $_Cookie['hz6d_70722522_member_id']);
    setcookie("__ali", $_Cookie['__ali']);
    setcookie("hz6d_70722522_member_guest", $_Cookie['hz6d_70722522_member_guest']);
    setcookie("hz6d_70722522_guest_id", $_Cookie['hz6d_70722522_guest_id']);
    setcookie("__ayspstp", $_Cookie['__ayspstp']);
    setcookie("__aysid", $_Cookie['__aysid']);
    setcookie("l", $_Cookie['l']);
    setcookie("passport_sdk", $_Cookie['passport_sdk']);
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
if($_GET['sessionid']||$_GET['aid']||$_GET['ouid']||$CURL===true){
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
elseif($_GET['guid']||$_GET['_s_']||$_GET['_t_']||$CURL===false){
    echo $DomainName;
}
else{
    echo 'Error 400 :)';
}

?>
