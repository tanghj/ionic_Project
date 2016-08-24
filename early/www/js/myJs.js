function 打印(value) {
    console.log("-----------");
	console.log(value);
    console.log("-----------");
}


//数组前插入
function ArrFrontInsert(arr,value) {
    arr.unshift(value);

    return arr;
}

//数组后插入
function ArrBackInsert(arr,value) {
    arr[arr.length] = value;

    return arr;
}

//数组指定位置插入
function ArrFixInsert(arr,value,index) {
    arr.splice(index,0,value);

    return arr;
}

//数组融合
function ArrMerge() {
    var args = arguments;
    var bear = [];
    for (var i = 0; i < args.length; i++) {
    	bear = bear.concat(args[i]);
    }

    arguments = null;

    return bear;
}

//任意类型融合
function ChangeArr() {
    var args = arguments;
    var bear = [];

    var NOstr = [];
    for (var i = 0; i < args.length; i++) {

    	if (Object.prototype.toString.call(args[i]) === '[object String]') {
    		
    	}else{
    		NOstr = String(args[i]);
    	}
        
    	bear = bear.concat(args[i]);
    }

    arguments = null;

    return bear;
}

//获取当前年月日星期（不带补零月日）
function GetNowDateNames(){
    var dayNames = new Array("星期日","星期一","星期二","星期三","星期四","星期五","星期六");  
    Stamp = new Date();  
    var NowDate = Stamp.getFullYear() + "年" + (Stamp.getMonth() + 1) +"月"+Stamp.getDate()+ "日"+ " " + dayNames[Stamp.getDay()] +"";

    return NowDate;
}

//获取当前年月日（补零年月日）
function GetZeroFillNowDate(){ 
    var oDate  = new Date();
    var oMonth = ("0" + (oDate.getMonth() + 1)).slice(-2);
    var oDay   = ("0" + (oDate.getDate())).slice(-2);
    var NowDate = oDate.getFullYear() + "年" + oMonth + "月" + oDay + "日";

    return NowDate;
}

//日期向后推
function GetNowDateBackWards(NowDate,PushNum,isStr){ 
    NowDate = NowDate.replace(/(日)/g,"");
    NowDate = NowDate.replace(/\/|(年)|(月)/g,"-");
    var Date2 = new Date(NowDate);
    var Date3 = new Date(Date2.getTime() + 24*PushNum*60*60*1000);
    var DateBackWards = "";
    if (isStr) {
        var oMonth = ("0" + (Date3.getMonth() + 1)).slice(-2);
        var oDay   = ("0" + (Date3.getDate())).slice(-2);
        DateBackWards = Date3.getFullYear() + "年" + oMonth + "月" + oDay + "日";
    }else{
        DateBackWards = Date3
    }

    return DateBackWards
}

//日期向前推
function GetNowDateForward(NowDate,PushNum,isStr){ 
    NowDate = NowDate.replace(/(日)/g,"");
    NowDate = NowDate.replace(/\/|(年)|(月)/g,"-");
    var Date2 = new Date(NowDate);
    var Date3 = new Date(Date2.getTime() - 24*PushNum*60*60*1000);
    var DateForward = "";
    if (isStr) {
        var oMonth = ("0" + (Date3.getMonth() + 1)).slice(-2);
        var oDay   = ("0" + (Date3.getDate())).slice(-2);
        DateForward = Date3.getFullYear() + "年" + oMonth + "月" + oDay + "日";
    }else{
        DateForward = Date3
    }

    return DateForward
}

//获取一组日期中最小值
function GetDateMin(dateArr,isStr){
    for (var i = 0; i < dateArr.length; i++) {
        if (Object.prototype.toString.call(dateArr[i]) === '[object String]') {
            dateArr[i] = dateArr[i].replace(/(日)/g,"");
            dateArr[i] = dateArr[i].replace(/\/|(年)|(月)/g,"-");
            dateArr[i] = new Date(dateArr[i]);
        }
    }
    var MinDate = dateArr[0];
    for (var i = 0; i < dateArr.length; i++) {
        var oDate1 = new Date(MinDate);
        var oDate2 = new Date(dateArr[i]);
        if(oDate1.getTime() > oDate2.getTime()){
            MinDate = dateArr[i];
        }
    }
    if (isStr) {
        var oMonth = ("0" + (MinDate.getMonth() + 1)).slice(-2);
        var oDay   = ("0" + (MinDate.getDate())).slice(-2);
        MinDate = MinDate.getFullYear() + "年" + oMonth + "月" + oDay + "日";
    }else{

    }

    return MinDate;
}

//获取一组日期中最大值
function GetDateMax(dateArr,isStr){
    for (var i = 0; i < dateArr.length; i++) {
        if (Object.prototype.toString.call(dateArr[i]) === '[object String]') {
            dateArr[i] = dateArr[i].replace(/(日)/g,"");
            dateArr[i] = dateArr[i].replace(/\/|(年)|(月)/g,"-");
            dateArr[i] = new Date(dateArr[i]);
        }
    }
    var MaxDate = dateArr[0];
    for (var i = 0; i < dateArr.length; i++) {
        var oDate1 = new Date(MaxDate);
        var oDate2 = new Date(dateArr[i]);
        if(oDate1.getTime() < oDate2.getTime()){
            MaxDate = dateArr[i];
        }
    }
    if (isStr) {
        var oMonth = ("0" + (MaxDate.getMonth() + 1)).slice(-2);
        var oDay   = ("0" + (MaxDate.getDate())).slice(-2);
        MaxDate = MaxDate.getFullYear() + "年" + oMonth + "月" + oDay + "日";
    }else{

    }

    return MaxDate;
}

//获取日期相隔天数(字符串与时间格式都可以)
function GetDateDiff(startDate,endDate){
    if (Object.prototype.toString.call(startDate) === '[object String]') {
        startDate = startDate.replace(/(日)/g,"");
        startDate = startDate.replace(/\/|(年)|(月)/g,"-");
        startDate = startDate.replace(/-/g,"/");
    }else{
        startDate = startDate.getYear()+"/"+(startDate.getMonth()+1)+"/"+startDate.getDate();
    }
    if (Object.prototype.toString.call(endDate) === '[object String]') {
        endDate = endDate.replace(/(日)/g,"");
        endDate = endDate.replace(/\/|(年)|(月)/g,"-");
        endDate = endDate.replace(/-/g,"/");
    }else{
        endDate = endDate.getYear()+"/"+(endDate.getMonth()+1)+"/"+endDate.getDate();
    }
    var startTime = new Date(startDate).getTime();     
    var endTime = new Date(endDate).getTime();     
    var dates = Math.abs((startTime - endTime))/(1000*60*60*24);    

    return  dates;
}

//字符串截取

//进入页面第一次触发的函数
function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function() {
            oldonload();
            func();
        }
    }
}


