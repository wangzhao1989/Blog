//一二日20:00，乡爱12三四五16:00
var taday = new Date();
var week = taday.getDay();
text1="看点其他的吧"
text2="有乡村爱情12"
text3="有刘老根3"
    switch(week){
        case 0:
            str = "今天星期日"+text3;
            break;
        case 1:
            str = "今天星期一"+text3;
            break;
        case 2:
            str = "今天星期二"+text3;
            break;
        case 3:
            str = "今天星期三"+text2
            break;
        case 4:
            str = "今天星期四"+text2;
            break;
        case 5:
            str = "今天星期五"+text2;
            break;
        case 6:
            str = "今天星期六"+text1;
            break;
    }
$notify(str,'','')