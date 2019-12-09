export class Utils {
    setCookie(name, value, day) {
        if (day !== 0) {
            //当设置的时间等于0时，不设置expires属性，cookie在浏览器关闭后删除
            var expires = day * 24 * 60 * 60 * 1000;
            var date = new Date(+new Date() + expires);
            document.cookie = name + "=" + value + ";expires=" + date.toUTCString() + ";path=/";
        } else {
            document.cookie = name + "=" + value;
        }
    }
    getCookie(name) {
        var strcookie = document.cookie;//获取cookie字符串
        var arrcookie = strcookie.split(";");//分割
        //遍历匹配
        for (var i = 0; i < arrcookie.length; i++) {
            var arr = arrcookie[i].split("=");
            if (arr[0].trim() == name) {
                return arr[1];
            }
        }
        return "";
    }
    clearCookie(name) {
        this.setCookie(name, "", -1);
    }

}
