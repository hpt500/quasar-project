import { date } from 'quasar'

export function formatDateTime(timeValue) {
    var date = new Date(timeValue);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    var second = date.getSeconds();
    minute = minute < 10 ? ('0' + minute) : minute;
    second = second < 10 ? ('0' + second) : second;
    return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
};
//判断传入日期是否为昨天  
export function isYestday(timeValue) {
    var date = (new Date()); //当前时间  
    var today = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime(); //今天凌晨  
    var yestday = new Date(today - 24 * 3600 * 1000).getTime();
    return timeValue < today && yestday <= timeValue;
};
//判断传入日期是否属于今年  
export function isYear (timeValue) {
    var takeNewYear = formatDateTime(new Date()).substr(0, 4); //当前时间的年份  
    var takeTimeValue = formatDateTime(timeValue).substr(0, 4); //传入时间的年份  
    return takeTimeValue == takeNewYear;
}
export function timeChange(timeValue) {
    if (!timeValue || timeValue == '') return timeValue
    timeValue = Number(timeValue)
    var timeNew = Date.parse(new Date()); //当前时间  
    var timeDiffer = timeNew - timeValue; //与当前时间误差  
    var returnTime = '';
    if (timeDiffer <= 60000) { //一分钟内
        var returnTime = '刚刚';
    } else if (timeDiffer > 60000 && timeDiffer < 3600000) { //1小时内  
        var returnTime = Math.floor(timeDiffer / 60000 ) + '分钟前';
    } else if (timeDiffer >= 3600000 && timeDiffer < 86400000 && isYestday(timeValue) === false) { //今日               
        var returnTime = formatDateTime(timeValue).substr(11, 5);
    } else if (timeDiffer > 3600000 && isYestday(timeValue) === true) { //昨天 
        var returnTime = '昨天' + formatDateTime(timeValue).substr(11, 5);
    } else if (timeDiffer > 86400000 && isYestday(timeValue) === false && isYear (timeValue) === true) {  //今年              
        var returnTime = formatDateTime(timeValue).substr(5, 11);
    } else if (timeDiffer > 86400000 && isYestday(timeValue) === false && isYear (timeValue) === false) { //不属于今年                           
        var returnTime = formatDateTime(timeValue).substr(0, 10);
    }
    return returnTime;
}
// 过滤万级数字
export function transUnit(num) {
    return num > 99999 ? (num > 99999999 ? (Math.floor(num / 10000 / 10000) > 100 ? Math.floor(num / 10000 / 10000) : Math.floor(num / 1000 / 10000) / 10) + '亿' : (Math.floor(num / 10000) >= 100 ? Math.floor(num / 10000) : Math.floor(num / 1000) / 10) + '万') : num
}

/*格式化日期*/
export function formatDate(sdate, rule = 'YYYY-MM-DD HH:mm:ss') {
    if (!sdate) return
    let t = new Date(sdate)
    let tD = date.formatDate(t, rule)
    return tD
}

// 毫秒转时分秒
export function msToMS(value) {
  //  console.log('opopopopopoppopop', value)
    if (!value) return 0
    let day = Math.floor(value / 1000 / 3600 / 24)
    let hours = Math.floor((value % 86400000) / 3600000); //时
    let minutes = Math.floor((value % 3600000) / 60000); //分
    let seconds = Math.floor((value % 60000) / 1000); //秒

    hours = hours >= 10 ? hours : '0'+hours
    minutes = minutes >= 10 ? minutes : '0'+minutes
    seconds = seconds >= 10 ? seconds : '0' +seconds

    return `${hours}:${minutes}:${seconds}`
}

// 时间差转天时分秒（新版）
export function timeDiff(value,formatString = 'D:h:m:s',fillZero = true) {
    //  console.log('opopopopopoppopop', value)
    if (!value) return 0
    let day = Math.floor(value / 1000  / 3600 / 24)
   // console.log('day',day)
    let hours = Math.floor((value % 86400000) / 3600000); //时
    let minutes = Math.floor((value % 3600000) / 60000); //分
    let seconds = Math.floor((value % 60000) / 1000); //秒
    if (fillZero) { // 是否补全0
        hours = hours >= 10 ? hours : '0'+hours
        minutes = minutes >= 10 ? minutes : '0'+minutes
        seconds = seconds >= 10 ? seconds : '0' +seconds
    }


    formatString = formatString.replace('D',day)
    formatString = formatString.replace('h',hours)
    formatString = formatString.replace('m',minutes)
    formatString = formatString.replace('s',seconds)

    return formatString
}

export function daysAfter(value, level = 3) {
    if (!value) return
    let curDate = new Date()
    let date = new Date(value)
    let gap = parseInt(date - curDate)
    if (gap < 0) return '0天' // 因为已经过期

    //计算出相差天数
    var days = Math.floor(gap / (24 * 60 * 60 * 1000));
    //计算小时数
    var hourLevel = gap % (24 * 60 * 60 * 1000);
    var hours = Math.floor(hourLevel / (60 * 60 * 1000))
    //计算分钟数
    var minutesLevel = hourLevel % (60 * 60 * 1000);
    var minutes = Math.floor(minutesLevel / (60 * 1000));
    //计算秒数
    var seconds = Math.round((minutesLevel % (60 * 1000)) / 1000);
    let st = ''
    if (level === 1) {
        st = days + '天'
    }
    if (level === 2) {
        st = days + '天' + hours + '小时'
    }
    if (level === 3) {
        st = days + '天' + hours + '小时' + minutes + '分钟'
    }
    return st
}

// 过滤空格换行
export function outBlack(text) {
    let resultStr = text.replace(/[ ]/g, ""); //去掉空格
    resultStr = resultStr.replace(/[\r\n]/g, ""); //去掉回车换行
    resultStr = resultStr.replace(/[　　]/g, "") // 去掉特殊空格
    resultStr = resultStr.replace(/[\x09]/g, "") // 去掉特殊空格
    resultStr = resultStr.replace(/[\u00A0]/g, "") // 去掉特殊空格

    return resultStr
}

// 小说字数过滤
export function novelCount(val) {
    if (!val) return "0字"
    let num = Number(val);
    if (num > 10000) {
        let firstNum = Math.floor(num / 100) / 100
        return firstNum + "万字";
    }
    return num + "字";
}
export function setDeci(num,deciNum = 1) {

    if (!num) return
    if (String(num).indexOf('.')!==-1) {
        num = num.toFixed(deciNum)
    }
    return num
}

// 转万
export function toTenThousand(val) {
    if (!val) return 0
    let num = Number(val);
    let firstNum
    if (num > 100000000) {
         firstNum = (Math.floor(num / 100) / 100 /1000 /10)
        firstNum =  setDeci(firstNum)
        return firstNum + "亿";
    }
    if (num > 10000000) {
         firstNum = (Math.floor(num / 100) / 100 /1000)
        firstNum =  setDeci(firstNum)
        return firstNum + "千万";
    }
    if (num > 10000) {
         firstNum = (Math.floor(num / 100) / 100)
        firstNum =  setDeci(firstNum)
        return firstNum + "万";
    }

    return setDeci(num);
}
