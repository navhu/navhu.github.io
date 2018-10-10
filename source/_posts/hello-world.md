---
title: 随笔杂谈（各种笔记）
date: 2016-07-03
updated: 2017-09-11
---

最近有点沉迷这首歌
<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=330 height=86 src="//music.163.com/outchain/player?type=2&id=2919622&auto=0&height=66"></iframe>

<!-- more -->

<br>


需要设置固定宽度又需要自适应，可以设置max-width

重置样式，可以使用reset.css或者normalize.css。reset.css重置所有样式，normalize.css重置部分样式。如，reset.css吧h1重置成和p一样的大小了。

如果调整margin和padding都处理不掉边框，可能是font-size的问题（div的font-size），可以设置font-size为零试试。

Navigator platform 返回运行浏览器的硬件平台



webpack的配置项中，**css-loader和style-loader顺序千万千万别写反了**，必须style-loader在前！！！如下：
css-loader 是处理css文件中的`@import` 和 `url(...)`等
style-loader 将css插入到页面的style标签
```
{
    test: /\.css$/,
    use: [
        {loader: 'style-loader'},
        {loader: 'css-loader'}
    ]
}
```




##### 封装一个将伪数组转换成数组的方法：
```
var toArray = function(s){
  try{
    return Array.prototype.slice.call(s);
  } catch(err){
      var arr = [];
      for(var i = 0,len = s.length; i < len; i++){
        //arr.push(s[i]);
        arr[i] = s[i]; //据说这样比push快
      }
       return arr;
  }
}
```













#### HTTP协议

**http协议的主要特点：**

* 简单快速
* 灵活
  请求头部分有个数据类型，完成不同数据类型之间的传输
* 无连接
  连接一次就会断开，不会保持
* 无状态
  客户端与服务端建立连接传输完数据后，会断开，下次客户端再请求连接的时候，服务端无法区分是不是通过一个身份

**http报文的组成部分**

+ 请求报文
    - 请求行：http方法、页面地址、http协议/版本。（GET / HTTP/1.1）
    - 请求头：key、value值
    - 空行：分隔请求头和请求体
    - 请求体
+ 响应报文
    - 状态行（HTTP/1.1 200 OK）
    - 响应头
    - 空行
    - 响应体

**http方法：GET-获取资源、POST-传输资源、PUT-更新资源、DELETE-删除资源、HEAD-获得报文首部**








#### DOM事件级别
准确的说就是DOM标准定义的级别
DOM1标准制定的时候没有设计跟事件相关的东西。可忽略。

>DOM0：element.onclick = funtion(){}
>html里的写法是内联里写onclick='function(){}'

>DOM2：element.addEventListener('click', function(){}, false)
>IE的规则是element.attachEvent('onclick',function(){})

>DOM3：element.addEventListener('keyup', function(){}, false)
>增加了更多的事件而已

Event对象常见应用:
event.preventDefault()   阻止事件的默认行为
event.stopPropagation()  阻止事件向上冒泡
event.target             返回当前是哪个DOM元素触发的事件
event.currentTarget      返回当前绑定事件的那个父级元素


#### 自定义事件
+ new Event()
```
var dom = document.getElementById('btn');
var eve = new Event('custome');  //可以把eve理解成平常说的click
dom.addEventListener('custome',function(){   //给dom元素绑定自定义事件名称
    console.log('custome');
});
dom.onclick = function () {
    dom.dispatchEvent(eve);
    //用这个API来触发自定义事件。填的是eve这个事件对象，不是事件名custome
};
```

+ new CustomEvent()
用法和Event一样。唯一的缺点就是：指定了事件名后，可以带个obj参数
```
var eve = new CustomEvent('custome',{
    bubbles: 'true',   //是否会冒泡
    cancelable: 'true',  //是否可以被取消
    detail: '哈哈'  //当事件初始化时传递的数据
});
dom.addEventListener('custome',function(haha){
    console.log(haha.bubbles);
    console.log(haha.cancelable);
    console.log(haha.detail);
});
```




##### BFC：块级格式化上下文
原理(渲染规则)：
1. <del>在BFC这个元素的垂直方向的边距会发生重叠</del>
2. BFC的区域不会与外界浮动元素的区域重叠。
3. BFC里的元素不受外界的影响。互不影响。
4. 计算BFC元素高度的时候，里面的浮动元素也会参与计算。一般用来清除浮动。

**如何创建BFC：**
1. overflow: hidden;
2. 浮动
3. position不为static和relative
4. display设table之类



W3C盒模型：`box-sizing: content-box;`
IE盒模型：`box-sizing: border-box;`

**JS获取盒模型的宽高：**
1.dom.style.width/height  //只能获取内联样式，带单位
2. dom.currentStyle.width/height  //渲染完成后的真实宽高。只支持IE
3. window.getComputedStyle(dom).width/height  //都支持
4. dom.getBoundingClientRect().width/height  //获取相对于视窗的位置集合(上右下左)
![getBoundingClientRect()](http://ww4.sinaimg.cn/large/0060lm7Tly1fjbgglyh87j306o06mq3n.jpg)


网格布局
```
.box {
        display: grid;
        width: 100%;
        grid-template-rows: 100px;  //行高
        grid-template-columns: 300px auto 300px;  //分成三列
    }
```



> 浮动要注意先后顺序。
> 浮动的元素会占据文档流的位置。(文字环绕图片)


webstorm破解地址http://idea.iteblog.com/key.php

查看全局安装的npm包：`npm list -g --depth 0`

###### 切图保存格式：
1. 有动画,gif
2. 颜色比较少，需要透明，gif,png8
3. 颜色比较多，需要透明，png24
4. 颜色比较多，不需要透明，jpeg



```
<!-- [if lte IE 8] >
IE8要用空格隔开
<![endif] -->
```

公告不换行：
```
.notice {
    text-overflow: ellipsis; 用省略号代替超出的
    overflow: hidden; 隐藏滚动条
    white-space: nowrap; 强制不换行
}
```

width:  calc(33.3333333% - 3rem);

letter-spacing可以调整字体之间的间距。8888888数字之间的空隙letter-spacing: 3px;

css里的注释是/*...*/ 不能用//，less可以

100%是16px，要让1rem = 10px 的话，就是（10/16）*100%= 62.5%

`::selection` 设置鼠标选中复制的文本:颜色之类的样式

**选择器用 li + li 的小技巧加竖线分隔边框**

###### li标签inline-block之后会有点间隙，是因为li标签换行导致的。解决：
1. 加上margin-left: -3px(有副作用，并不是每个浏览器都3px);
2. 改变一下书写样式，把末尾的`</li>`放到下一行的开头。`</li><li>哈哈哈</li>`
3. 不写li的闭合标签，html会自动帮我们加上.
4. 给li的父元素ul设置`font-size: 0;`然后单独给li设置font-size；（空白字符其实受font-size的影响，设置成0就OK了）

>左边的元素浮动后，右边的ul没必要浮动，就让它撑开父盒子。

**谷歌中文版会有最小字体大小限制，为12px。 所以3rem应该要设置为36px。**


##### 清除文本基线方法：
1. 设置为块级元素。
2. 将文本大小设置为0。
3. vertical-aglin:bottom。


>百度地图秘钥ZuSbFihUuxRyEfO7ZqL8rGXKPRVuDmQ8

##### 标签属性href，使其指向空或不返回任何内容。如：
`<a href="javascript:void(0);" >点此无反应javascript:void(0)</a>`

`<a href="javascript:;" >点此无反应javascript:</a>`

##### 标签事件onclick，阻止其默认行为。如：
`<a href="" onclick="return false;">return false;</a>`

`<a href="#" onclick="return false;">return false;</a>`



正则表达式： 小尖头在中括号里表示非，在斜杠里表示限制开头

**一句话总结: 标准中规定的属性怎么用都行,但是自定义属性在标签中写,对象中拿不到,在对象中写,标签中也看不到,互不映射。**
getAttribute(); 获取标签上的属性
setAttribute(); 设置标签上的属性
removeAttribute(); 删除标签上的属性


人和狗那里1是比较字符串的长度，2是比较字符。在js中不全等就是比较内容。

switch穿透现象可以用在素质教育100分等级那里。

##### 给对象追加的两种方式：
```
方便//    obj.age = 18;
```

```
灵活//      obj["age"] = 18;
          obj["n" + i] = i;
```


引入ICO图标代码：  `<link rel="shortcut icon" href="favicon.ico"  type="image/x-icon"/>`


>伪类补充：
`input:focus{color:white;background:blue;}` /*输入框里的颜色变为白色，框框变为蓝色*/


权重公式里的第一个0应该是行内样式的个数！


子代选择器也可以多层： div>p>span{}
一个标签可以有多个类名：
`<p class="colorRed size20">哈哈</p>`

color:rgba(0,0,0,1)"1代表透明度，0到1取值"
**opacity也可以设置透明度，但是它会影响背景，rgba只会影响内容。**

英雄联盟案例里的大背景图片要设置min-width。

**text-aglin: center;对浮动的元素无效。**

无序列表前面的点去掉用list-style:none;


> base是标签，放在head之中title之下。用来统一管理页面上所有的a标签。target属性是设置跳转方式。href属性：a标签必须设置路径，如果没有设置，那么base来统一跳转到同一个目标页面； 有路径的a标签还是会有效的。

男女单选框要让它们彼此认识才不会出bug，加个name属性。默认选中是加个checked=checked；
重置，submit等按钮必须放在form标签里才能起作用！

> 连写
> font-style：normal/italic   font-weight粗细   font-size大小  (/行高)  font-family系列：雅黑；
> `font:italic bold 12px/30px '雅黑';`
> 前两个是可选


**！important》行内样式》id选择器》类选择器》标签选择器》通配符》继承**

> background-color
> background-image:url(路径)
> background-repeat
> background-position
>
> 连写形式：  background：颜色 图片 平铺 位置；background: red url(1.gif) no-repeat center top;

**border连写：  粗细 虚实 颜色；**

table中清除单元格之间的间隙 `border-collapse:collapse；`

**padding特殊情况：当一个大盒子套一个小盒子时，都是块级元素，小盒子没有设置宽度，是继承大盒子的，那么设置小盒子的padding-left不会改变小盒子的大小。**

**计算盒子宽高的时候不用计算margin！**

> 特殊：
> **margin的合并现象**:如果两个div上下排序，给上面的div设置margin-bottom，给下面的div设置margin-top，那么两个margin会发生合并现象，合并以后的值取较大的那个。

> **塌陷现象**：如果一个大盒子中包含一个小盒子，给小盒子设置margin-top，大盒子会一起向下平移。
>
> 解决1：给大盒子设置边框。2：给大盒子设置overflow：hidden；

标准流：就是浏览器默认摆放盒子的标准。

浮动注意：在同一个结构中才会浮动找浮动（就是说要挨在一起）。

#### 清除浮动方法：
1. 额外标签法（不建议使用，因为会增加页面的标签数量）：又分为内部和外部。
2. overflow方法：在浮动盒子的父元素中加个overflow:hidden。 （这个方法一般也不建议使用）
3. 使用伪元素。(给浮动元素的父盒子添加！)
```
.clearfix:after{
    content:"";
    height:0;
    line-height:0;
    display:block;
    clear:both;
    visibility:hidden;/*将元素隐藏起来*/
}
```
 **最好配个兼容IE6  `.clearfix{zoom:1;}`**
 这段代码的意思： 给clearfix加个伪元素，并且设置成空的块级元素，然后将它进行清除浮动。

4. 双伪元素法(IE8以下不支持双冒号)：
```
.clearfix::after,.clearfix::before{
    content:"";
    display:table;
    clear:both;
}
 .clearfix{zoom:1;}
```


#### 定位：

分为静态定位（static,表现出来就是标准流），相对定位和绝对定位：

position:relative;相对定位：相对与盒子本来的位置进行移动。(不过在原来的位置依然占位，就是说没有脱离标准流)

position:absolute;绝对定位：
1. 如果这个元素没有父元素，那么trbl是相对于body来定位的。
2. 如果这个元素有父元素，但是父元素没有定位，那么trbl依然是相对于body来定位的。
3. 如果有父元素并且父元素有设置定位（非static），那么trbl是相对于父元素来定位。
4. 绝对定位以后的元素在页面上不占位。

position:fixed;固定定位：
1. 不管页面有多大，trbl永远是相对于浏览器的边框进行定位。
2. 固定定位在页面上也不占位。

**补充：1.如果定位的盒子没有宽高，那么默认为0；2.如果给子盒子设置宽度为100%那么其宽度与父盒子一样宽。**

`vertical-align：middle；` 设置文字底线与图片中线对齐。(要给图片设，不能给文字设)

overflow:溢出。
取值：hidden； scroll:给容器加上滚动条；auto：视情况自动判断要不要加滚动条。

> 元素的隐藏：
> overflow: hidden；（超出的剪掉）  visibility:hidden;（占位）display:none；（在页面上不占位）
> display:none 和display:block是一对反义词。

透明度设置：`opacity:0.5;`（取值是0-1的小数，包含0和1,0为全透明，1为完全不透明）

IE6不兼容设置透明度，加一句 `filter:Alpha(opacity=50)；`

> 三角的做法：
> 先来一个span，转换成行内块级元素，（或者直接搞个div）然后宽高都设置为0，设置border-width，border-color，border-style，其余的颜色设置透明transparent，最后子绝父相进行定位。


行内元素只能包含行内元素。
块级元素可以包含所有的行内元素和部分块级元素。（比如p标签也是块级元素，可是不能包含div）
p标签h标签都不能包含块级元素。

计算行高上面的margin-top：行高减font-size，然后除以2。

**Z-index 仅能在定位元素上奏效（例如 position:absolute;）！**

margin为负数的应用（4个div并列显示的广告）：设置margin为负数让他们的边框重叠，然后position:relative;就搞定。因为定位的元素层级高些。

#### js改变css样式的几种方法

共用代码：
```
<div id="div">
    this is a div
</div>
var div=document.getElementById('div');
```

#####  第一种：用cssText
div.style.cssText='width:250px;height:250px;border:1px red solid;';
#####  第二种：用setProperty()
div.style.setProperty('width','250px');
div.style.setProperty('height','250px');
div.style.setProperty('border','1px red solid');
#####  第三种：使用css属性对应的style属性
div.style.width = "250px";
div.style.height = "250px";
div.style.border = "1px solid red";


>网线排序:橙白、橙、绿白、蓝、蓝白、绿、棕白、棕
