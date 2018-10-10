---
title: 原生js一句代码给网页所有元素加随机颜色边框
date: 2016-07-27
updated: 2017-05-13
tags:
---


> 5.13更新

<!-- more -->

代码如下：
```
[].slice.call(document.getElementsByTagName('*')).forEach
((ele) => {ele.style.setProperty('border', '1px solid #' + Math.random().toString(16).slice(2, 8));})
```

<button id="btn">点击预览效果</button><br>

<script>
document.getElementById('btn').onclick = function() {
    [].slice.call(document.getElementsByTagName('*')).forEach((ele) => {
        ele.style.setProperty('border', '1px solid #' + Math.random().toString(16).slice(2, 8));
    })
}
</script>
其它效果：

```
[].slice.call(document.getElementsByTagName('*')).forEach((ele) => {ele.style.setProperty('animation', 'interesting 2s infinite')});
document.body.innerHTML += "<style>@keyframes interesting{from{transform:rotate(-2deg)}to{transform: rotate(2deg);}}</style>";
```
<button id="btn2">走你!</button>
<script>
document.getElementById('btn2').onclick = function() {
[].slice.call(document.getElementsByTagName('*')).forEach((ele) => {ele.style.setProperty('animation', 'interesting 2s infinite')});
document.body.innerHTML += "<style>@keyframes interesting{from{transform:rotate(-2deg)}to{transform: rotate(2deg);}}</style>";
}
</script>
