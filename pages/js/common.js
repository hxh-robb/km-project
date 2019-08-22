/*
 *    获取元素样式的函数
 *   el: 元素
 *    attr:样式字符串
 */
function getStyle(el, attr) {
    // ie浏览器
    if (el.currentStyle) {
        return el.currentStyle[attr];
    } else {
        // 现代浏览器
        return getComputedStyle(el)[attr];
    }
}


function hs(el, obj,cb) {
    // 清除上一次的定时器
    if(el.timer){
        clearInterval(el.timer);
    }

    for (var key in obj) {
        if (key == "opacity") {
            obj[key] = obj[key] * 100;
        }
    }
    // 将定时器作为 元素的自定义属性，防止和其他元素混用
    el.timer = setInterval(function () {
        
        // 假设当前所有属性都到达了终点(需要确认复数个状态是否一致)
        var flag = true;

        // 在定时器函数内部，通过执行for-in循环 让若干项属性都发生变化

        // k  obj 的每一个属性   obj[k]  属性的值
        for (var k in obj) {
            if (k == "opacity") {
                var cur = parseInt(getStyle(el, k) * 100);
            } else {
                var cur = parseInt(getStyle(el, k));
            }


            if (obj[k] > cur) {
                var v = Math.ceil((obj[k] - cur) / 10)
            } else {
                var v = Math.floor((obj[k] - cur) / 10);
            }

            var n = cur + v;

            // 当前属性没有达到终点
            // 当前所有属性都到达了终点的假设不成立
            if (n != obj[k]) {
               flag = false;
            }

            if (k == "opacity") {
                el.style[k] = n / 100;
            } else {
                el.style[k] = n + "px";
            }
            
        }
        // 属性都到达了终点，清除定时器
        if(flag){
            clearInterval(el.timer);
            // if(cb){
            //     cb();
            // }

            cb&&cb();
        }
    }, 30);
}

/*
    method:请求方式
    url:地址
    data:参数
    cb:请求成功执行的回调函数
        res: 返回的字符串

*/ 
function ajax(method,url,data,cb){
    var xhr = new XMLHttpRequest();
    method = method.toUpperCase();
    if(method=="GET"){
        if(data){
            url = url+"?"+data;
        }
        xhr.open("GET",url);
        xhr.responseType = "json";
        xhr.send();
    }else if(method=="POST"){
        xhr.open("POST",url);
        xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        if(data){
            xhr.send(data);
        }else{
            xhr.send();
        }
    }
    xhr.onreadystatechange = function(){
        if(xhr.readyState==4&&xhr.status==200){
            // console.log(xhr.responseText);
            cb(xhr.response);
        }
    }
}

