/**
 * Created by sa on 2018/10/27.
 */

/**
 *
 * @param id
 * @returns {Element}
 */
//获取id标签
function my$(id){
    return document.getElementById(id);
}





//匀速动画函数
//设置任意的一个元素，移动到指定的目标位置
function animate(element, target) {
    //最开始要清除一次定时器
    clearInterval(element.timeId);
    //定时器的id值存储到element对象的一个属性中
    element.timeId = setInterval(function () {
        //获取对象当前的位置, .offsetLeft得到的是数字类型
        var current = element.offsetLeft;
        //设置对象每次移动的距离
        var step = 10;
        step = current < target ? step : -step;
        //对象当前移动到的位置
        current += step;
        if (Math.abs(target - current) > Math.abs(step)) {
            element.style.left = current + "px";
        } else {
            //清理定时器
            clearInterval(element.timeId);
            //让对象直接到达目标位置
            element.style.left = target + "px";
        }
    }, 20);
}





//获取元素的任意一个样式的属性值
//谷歌、火狐支持window.getComputedStyle
//IE8支持.currentStyle
//获取任意一个元素的任意一个样式属性的值
//计算后的样式属性----获取任意一个元素的当前属性值----返回的是字符串类型
function getStyle(element, attr) {
    return window.getComputedStyle ? window.getComputedStyle(element, null)[attr] : element.currentStyle[arrt] || 0;
}

//变速动画函数
//element---元素
//json---对象---多个属性及多个属性当前值
//fn---函数---这里是回调函数
function speedAnimate(element, json, fn) {
    //先清理定时器
    clearInterval(element.timeId);
    //设置定时器,返回的是定时器的id
    element.timeId = setInterval(function () {
        var flag = true;  //默认，假设全部到达目标
        for (var attr in json) { //遍历json中所有对象中的属性以及当前的属性值，key是对象中每个属性的名称
            //判断attr这个属性中是不是opacity这个属性
            if (attr == "opacity") {
                //获取当前opacity的属性值
                //因为opacity的值是小数，为了计算方便，将当前的属性值放大100倍；
                var current = getStyle(element, attr) * 100;
                //获取元素的目标值,同样为了计算方便，将当前的属性值放大100倍；
                var target = json[attr] * 100;
                //设置每次移动的像素
                var step = (target - current) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                //元素移动后的位置
                current += step;
                //将当前的属性值缩小100倍；还原属性值，
                element.style[attr] = current / 100;
            } else if (attr == "zIndex") {//判断这个属性attr中是不是zIndex属性
                //层级改变就是直接改变层级属性的值
                element.style[attr] = json[attr];
            } else {
                //获取div当前的位置
                //函数getStyle返回的是字符串类型，讲字符串类型转换成数字类型
                var current = parseInt(getStyle(element, attr));
                //当前属性对应的目标值
                var target = json[attr];
                //设置移动的像素
                var step = (target - current) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                //获取当前div的位置
                current += step;
                element.style[attr] = current + "px";
            }
            if (current != target) {
                flag = false;
            }
        }
        //判断是否所有的属性值都到达目标值
        if (flag) {
            //清理定时器
            clearInterval(element.timeId);
            if(fn){
                fn();
            }
        }

        //测试
        console.log("目标位置:" + target + ",当前位置:" + current + ",移动像素" + step);
    }, 20);
}





//set和get兼容代码
//设置标签中的文本内容,使用textContent属性,谷歌,火狐支持,IE8不支持
//设置标签中的文本内容,使用innerText属性,谷歌,火狐,IE8都支持
//设置任意元素中间的文本内容
function setInnerText(element, text){
    if(typeof element.textContent=="undefined"){
        element.innerText=text;
    }
    element.textContent=text;
}

//获取任意标签中间的文本内容
function getInnerText(element){
    if(typeof element.textContent=="undefined"){
        return element.innerText;
    }
    return element.textContent;
}





//第一个节点和第一个元素的获取的代码在IE8中可能不支持
//element.firstChild--->谷歌和火狐获取的是第一个子节点
//element.firstChild--->IE8获取的是第一个子元素
//element.firstElementChild------>谷歌和火狐是第一个子元素,IE8不支持
//获取任意一个父级元素的第一个子级元素
function getFirstElementChild(element) {
    //判断element.firstElementChild在浏览器中是否支持
    if(element.firstElementChild){
        return element.firstElementChild;   //支持，直接返回element.firstElementChild
    }
    else{
        //不支持，找到父级元素中的第一个子级元素后返回
        //根据父级元素的id值获取第一个子节点
        var node=my$("uu").firstChild;
        //这里得到的第一个子节点可能不是元素（可能是文本），所以要从第一个子节点一直往下找，直到找到第一个子元素为止
        while(node&&node.nodeType!=1){ //nodes有效并且这个节点不是标签节点
            node=nodes.nextSibling;
        }
        return node;
    }
}





//最后一个节点和最后一个元素的获取的代码在IE8中可能不支持
//element.lastChild--->谷歌和火狐获取的是最后一个子节点
//element.lastChild--->IE8获取的是最后一个子元素
//element.lastElementChild------>谷歌和火狐是最后一个子元素,IE8不支持
//获取任意一个父级元素的最后一个子级元素
function getLastElementChild(element){
    //判断element.lastElementChild在浏览器中是否支持
    if(element.lastElementChild){
        return element.lastElementChild;
    }
    else {
        //根据父级元素的id值获取最后一个子节点
        var node=my$("uu").lastChild;
        //这里得到的最后个子节点可能不是元素（可能是文本），所以要从最后一个子节点一直往上找，直到找到最后一个子元素为止
        while(node&&node.nodeType!=1){
            node=node.previousSibling;
        }
        return node;
    }
}





//1 对象.addEventListener("事件类型",事件处理函数,false);--谷歌和火狐支持,IE8不支持
//2 对象.attachEvent("有on的事件类型",事件处理函数)--谷歌不支持,火狐不支持,IE8支持
//为任意的元素，绑定任意的事件。 参数：任意的元素,任意的类型,任意的函数
function addEventListener(element,type,fn){
    //判断浏览器是佛支持这个方法
    if(element.addEventListener){
        element.addEventListener(type,fn,false)
    }else if(element.attachEvent){
        element.attachEvent("on"+type,fn)
    }else{
        element["on"+type]=fn;
    }
}





//addEventListener 谷歌,火狐,IE11支持,IE8不支持
//attachEvent 谷歌火狐不支持,IE11不支持,IE8支持
//removeEventListener 谷歌,火狐,IE11支持,IE8不支持
//detachEvent 谷歌火狐不支持,IE11不支持,IE8支持

//绑定兼容代码
function addEventListener(element,type,fn){
    if(element.addEventListener){
        element.addEventListener(type,fn,false);
    }else if(element.attachEvent){
        element.attachEvent("on"+type,fn);
    }else{
        element["on"+type]=fn;
    }
}

//解绑兼容代码
function removeEventListener(element,type,fn){
    if(element.removeEventListener){
        element.removeEventListener(type,fn,false);
    }else if(element.detachEvent){
        element.detachEvent("on"+type,fn);
    }else{
        element["on"+type]=null;
    }
}





//获取浏览器页面向上或者向左卷曲出去的距离的值
function getScroll() {
    return {
        left: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft||0,
        top: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
    }
}





//谷歌和火狐中都有这个事件参数对象,IE8中没有
//事件参数对象:e----在IE8中用window.event来代替
//window.event和事件参数对象e的兼容
//clientX和clientY单独的使用的兼容代码
//scrollLeft和scrollTop的兼容代码
//pageX,pageY和clientX+scrollLeft 和clientY+scrollTop

//把代码封装在一个函数

//把代码放在一个对象中
var evt= {
    //window.event和事件参数对象e的兼容
    getEvent: function (evt) {
        return window.event || evt;
    },
    //可视区域的横坐标的兼容代码
    getClientX: function (evt) {
        return this.getEvent(evt).clientX;
    },
    //可视区域的纵坐标的兼容代码
    getClientY: function (evt) {
        return this.getEvent(evt).clientY;
    },
    //页面向左卷曲出去的横坐标
    getScrollLeft: function () {
        return window.pageXOffset || document.body.scrollLeft || document.documentElement.scrollLeft || 0;
    },
    //页面向上卷曲出去的纵坐标
    getScrollTop: function () {
        return window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop || 0;
    },
    //相对于页面的横坐标(pageX或者是clientX+scrollLeft)
    getPageX: function (evt) {
        return this.getEvent(evt).pageX ? this.getEvent(evt).pageX : this.getClientX(evt) + this.getScrollLeft();
    },
    //相对于页面的纵坐标(pageY或者是clientY+scrollTop)
    getPageY: function (evt) {
        return this.getEvent(evt).pageY ? this.getEvent(evt).pageY : this.getClientY(evt) + this.getScrollTop();
    }
}







