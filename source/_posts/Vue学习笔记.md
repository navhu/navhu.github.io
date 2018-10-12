---
title: Vue学习笔记
date: 2018-10-09 19:56:14
updated: 2018-10-09 19:56:14
categories:
tags: Vue
---

>听闻Vue要出3.0了，算起来都快一年没使用Vue写项目了，再不敲敲就要忘光咯~
>于是对着官网文档重新再回顾一遍...

<!-- more -->

## 介绍

### new Vue

```html
<div id="app">
    {{ message }}
</div>
```

```javascript
var app = new Vue({
    el: '#app',
    data: {
        message: 'hello vue!!!'
    }
})
```





### v-bind 动态绑定

```html
<div id="app2">
    <p v-bind:title='pop'>鼠标悬停可见</p>
</div>
```

```javascript
var app2 = new Vue({
    el: '#app2',
    data: {
        pop: '我是悬浮的文字'
    }
})
```




### v-if 条件渲染

```html
<div id="app3">
    <p v-if='isRight'>你能看见</p>
</div>
```

```javascript
var app3 = new Vue({
    el: '#app3',
    data: {
        isRight: true
    }
})
```



### v-for 列表渲染

```html
<div id="app4">
    <p>我喜欢：</p>
    <ul>
        <li v-for='item in likeList'> {{ item.name }} </li>
    </ul>
</div>
```

```javascript
var app4 = new Vue({
    el: '#app4',
    data: {
        likeList: [
            { name: '吃饭' },
            { name: '睡觉' },
            { name: '打豆豆' }
        ]
    }
})
```




### v-on 事件监听
``` html
<div id="app5">
    {{ message }}
</div>

<button v-on:click='reverseMessage()'>反转文字</button>
```

```javascript
var app5 = new Vue({
    el: '#app5',
    data: {
        message: '我的顺序是这样的！'
    },
    methods: {
        reverseMessage: function(){
            this.message = this.message.split('').reverse().join('');
        }
    }
})
```




### v-model 双向绑定

```html
<div id="app">
    {{ message }}
    <input type="text" v-model='message'>
    }
</div>
```

```javascript
var app = new Vue({
    el: '#app',
    data: {
        message: 'I am admin'
    }
})
```




### Vue.component 组件

_组件名不要用驼峰_

```html
<div id="app">
    <ol>
        <todo-cpt v-for='item in todoList' :todo='item' :key='item.id'></todo-cpt>
    </ol>
</div>
```

```javascript
Vue.component('todo-cpt', {
    props: ['todo'],
    template: '<li> {{ todo.name }} </li>'
})

new Vue({
    el: '#app',
    data: {
        todoList: [
            { id: 0, name: '吃饭' },
            { id: 1, name: '睡觉' },
            { id: 2, name: '打豆豆' },
        ]
    }
})
```




## 创建实例

```javascript
var vm = new Vue({
    // 选项
    el: '#app',
    data: {
        id: '', // 给个初始值
        name: '',
        age: ''
    },
    created: function(){
        console.log('name is: ' + this.name);
    }
})

vm.$el === document.getElementById('app'); // => true

vm.$watch('name', function(newValue, oldValue){
    console.log('这个回调在name的值发生改变后调用');
})

```

所有的Vue组件都是Vue实例，并且接受相同的选项（一些根实例特有的选项除外）。

只有当实例被创建时 `data` 中存在的属性才是**响应式**的。如果有需要，你得在创建实例的时候给个初始值。

生命周期钩子函数的 `this` 上下文指向调用它的Vue实例。

**不要**在选项属性和回调函数上使用箭头函数，因为箭头函数的 `this` 可能并不是你所预期的Vue实例。




## 模板语法

```html
<p>{{ message }}</p>

<p v-once>这个将不会改变: {{ message }}</p>

<p v-html='message'></p>

<button v-bind:disabled='isOk'>发送</button>

<form v-on:submit.prevent="onSubmit">...</form>
```

用了 `v-once` 指令处的插值内容不会随着数据改变而更新。并且它会影响到该节点上的其它数据绑定。

为避免XSS攻击，请只对可信内容使用 `v-html` ，**绝不要**对用户提供的内容使用插值。

插值语法不能用在HTML属性上，应改用 `v-bind` 。

插值中的流控制语句不会生效，请使用三元表达式。

修饰符 `.prevent` 表示调用 `event.preventDefault()` 。

简写形式 `:` 和 `@`。




## 计算属性和侦听器

```html
<div id="app">
    <p>orgin is: {{ message }}</p>
    <p>rebverse is: {{ reverseMessage }}</p>
</div>
```

```javascript
var vm = new Vue({
    el: '#app',
    data: {
        message: '123456789'
    },
    computed: {
        reverseMessage: function(){
            return this.message.split('').reverse().join('');
        }
    }
})
```

`computed` 是**计算属性**、**属性**、**属性**！使用的时候就像 `data` 里的数据属性一样用，不要当成函数调用了！

模板内的逻辑要简洁，复杂的逻辑计算请使用计算属性 `computed` 。

**`computed`  VS `methods`** ：计算属性会基于依赖关系进行**缓存**，只有当相关的依赖发生改变时才会重新求值。

**`computed`  VS `watch`** ：当有一些数据需要随着其它数据变动而变动时，可使用**侦听属性** `watch` ，但不要滥用，`computed` 或许更优。比如说下面这个例子：

```html
<div id="demo"> {{ fullName }} </div>
```

```javascript
var app = new Vue({
    el: '#demo',
    data: {
        firstName: 'Foo',
        lastName: 'Bar',
        fullName: 'Foo Bar'
    },
    watch: {
        firstName: function(val){
            this.fullName = val + ' ' + this.lastName;
        },
        lastName: function(val){
            this.fullName = this.firstName + ' ' + val;
        }
    }
})

// 改用计算属性会更好：
var app = new Vue({
    el: '#demo',
    data: {
        firstName: 'Foo',
        lastName: 'Bar'
    },
    computed: {
        fullName: function(){
            return this.firstName + ' ' + this.lastName;
        }
    }
})

```

> **计算属性默认只有 `getter` ，如果需要 `setter` ，你也可自行提供一个：**

```javascript
...
computed: {
    fullName: {
        get: function(){
            return this.firstName + ' ' + this.lastName;
        },
        set: function(newVal){
            var names = newVal.split(' ');
            this.firstName = names[0];
            this.lastName = names[names.length -1];
        }
    }
}
...

app.fullName = 'Zhang San'; // setter 会被调用，相应的值也会被更新。

```

> **当需要在数据变化时执行 _异步_ 或者 _开销较大_ 的操作时，`watch` 更适合。**

**它俩的具体区别可看下这篇文章：**[谈Vue的依赖追踪系统 ——搞懂methods watch和compute的区别和联系](https://www.cnblogs.com/penghuwan/p/7194133.html)




## class 与 style 的绑定

### class类名

> **对象语法**

```html
<div class="class1" v-bind:class="{ class2: isTrue2, class3: isTrue3 }"> 文字 </div>

<!-- 或者简单点 -->
<div class="class1" v-bind:class="classObj"> 文字 </div>
```

```javascript
data: {
    isTrue2: true,
    isTrue3: false
}

// 或者简单点
data: {
    classObj: {
        class2: true,
        class3: false
    }
}

// 或者搞个计算属性
data: {
    class2: true,
    class3: false
},
computed: {
    classObj: funciton(){
        return {
            class2: this.isTrue2 && !this.isTrue3
        }
    }
}

```

```html
<!-- 最终渲染结果 -->
<div class="class1 class2"> 文字 </div>
```

> **数组语法**

```html
<div v-bind:class="[classOne, classTwo]"> 文字 </div>

<div v-bind:class="[isTrue ? classOne : '', classTwo]"> 文字 </div>

<div v-bind:class="[{ classOne: isTrue }, classTwo]"> 文字 </div>
```

```javascript
data: {
    classOne: 'haha',
    classTwo: 'wawa'
}
```

```html
<!-- 渲染为： -->
<div class="haha wawa"> 文字 </div>

```

> **用在组件上**

```javascript
Vue.component('my-cpt', {
    template: '<p class="foo bar">Hello</p>'
})
```

```html
<my-cpt v-bind:class="{ class1: isTrue }"></my-cpt>
```

```html
<!-- 渲染为： -->
<p class="foo bar class1">Hello</p>
```

### style内联样式

```html
<div v-bind:style="{ color: myColor, fontSize: mySize + 'px' }"> 对象语法 </div>

<div v-bind:style="[styleObj1, styleObj2]"> 数组语法 </div>

<div v-bind:style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"> 还可提供多个值 </div>
```

```javascript
data: {
    myColor: 'red',
    mySize: '18'
}


```

Vue.js会自动添加相应的-webkit-前缀。




## 条件渲染

### v-if

**避免 `v-if` 和 `v-for` 一起使用。**

```html
<div v-if=" type === 'A' ">
    A
</div>
<div v-else-if=" type === 'B' ">
    B
</div>
<div v-else>
    C
</div>
<!-- 必须紧跟在 v-if 之后，否则不会被识别 -->
```

用 `key` 避免元素被复用

```html
<template v-if=" loginType === 'username' ">
    <label>Username</label>
    <input placeholder="Enter Your Username" key="username">
</template>
<template v-else>
    <label>Email</label>
    <input placeholder="Enter Your Email" key="email">
</template>
```

### v-show

```html
<div v-show="isTrue">HELLO</div>
```

`v-show` 只是简单地切换元素的CSS属性 `display`。

`v-show` VS `v-if` ：如果需要非常频繁的切换，用 `v-show` 比较好。




## 列表渲染

> **数组**

```html
<ul id="example">
    <li v-for="item in list"> {{ item.name }} </li>
</ul>

<ul id="example2">
    <li v-for="(item, index) in list">{{ item.name }} - {{ index }}</li>
</ul>

```

```javascript
new Vue({
    el: '#example',
    data: {
        list: [
            { name: 'zhang san' },
            { name: 'li si' }
        ]
    }
})
```

> **对象**

```html
<ul id="example">
    <li v-for="(val, key, index) in obj">{{ val }} - {{ key }} - {{ index }}</li>
</ul>
```

```javascript
new Vue({
    el: '#example',
    data: {
        obj: {
            firstName: 'Foo',
            lastName: 'Bar',
            age: '30'
        }
    }
})
```

```
<!-- 渲染结果 -->
Foo - firstName - 0
Bar - lastName - 1
301 - age - 2
```

**尽可能在使用v-for的时候提供一个key避免复用**

```html
<div v-for="item in list" v-bind:key="item.id"> 文字 </div>
```

**在组件中使用 v-for 的话 key 是必须的！**

**数组和对象的更新检测**（[去官网阅读吧](https://cn.vuejs.org/v2/guide/list.html#%E6%95%B0%E7%BB%84%E6%9B%B4%E6%96%B0%E6%A3%80%E6%B5%8B)）




## 事件处理

> **v-on**

```html
<p>the button has been clicked {{ count }} times.</p>

<button v-on:click="add">Add 1</button>

<button v-on:click="warn('使用$event变量访问原生事件对象', $event)"> $event变量 </button>
```

```javascript
var app = new Vue({
    el: '#app',
    data: {
        count: 0
    },
    methods: {
        add: function(){
            this.count += 1;
        },
        warn: function(msg, event){
            if (event) {
                event.preventDefault();
            }
            alert(msg);
            alert(event.target.tagName);
        }
    }
})
```

### 事件修饰符

`.stop`、`.prevent`、`.capture`、`.self`、`.once`、`.passive`

**使用时一定要注意顺序！** ，比如：

`v-on:click.prevent.self=""`  会阻止所有的点击。
`v-on:click.self.prevent=""`  只会阻止对元素自身的点击。


### 按键修饰符

常用别名有：`.enter`、`.tab`、`.delete`、`.esc`、`.space`、`.up`、`.down`、`.left`、`.right`

可在 `config.keyCodes` 自定义别名：

```javascript
Vue.config.keyCodes.f1 = 112;  // v-on:keyup.f1
```


### 系统修饰键

`.ctrl`、`.alt`、`.shift`、`.meta`(徽标键)、`.exact`(精确控制)

```html
<!-- Alt + C -->
<input v-on:keyup.alt.67="doSomething">

<!-- 有且只有Ctrl被按下的时候才会触发 -->
<button @click.ctrl.exact="add">OK</button>

<!-- 就算Alt或者Shift不小心被一同按下也会触发 -->
<button @click.ctrl="add">OK</button>

<!-- 没有任何 *系统修饰符* 被按下的时候才触发 -->
<button @click.exact="add">OK</button>

```




## 表单输入绑定

> **v-model**

**基本用法**

```html
<input type="text" v-model="txt">
<p>{{ txt }}</p>

<textarea v-model="taa"></textarea>
<p style="white-space: pre-line">{{ taa }}</p> <!-- 保留换行符 -->

<input type="checkbox" v-model="chk">
<p>{{ chk }}</p>

<input type="radio" value="男" v-model="rdo">
<input type="radio" value="女" v-model="rdo">
<p>{{ rdo }}</p>

<select v-model="slt">
    <option value="" disabled>请选择</option> <!-- 推荐这样写 -->
    <option value="A">A</option>
    <option value="B">B</option>
    <option value="C">C</option>
</select>
<p>{{ slt }}</p>

<!-- 使用 v-for 渲染 -->
<p>我喜欢：{{ like }}</p>
<select v-model="like">
    <option v-for="item in list" v-bind:value="item.val">{{ item.txt }}</option> <!-- 别忘了要用v-bind绑定一下 -->
</select>

```

```javascript
var app = new Vue({
    el: '#app',
    data: {
        txt: '占位',
        taa: '占位',
        chk: '占位',
        rdo: '占位',
        slt: '占位',
        like:'啥呢？',
        list: [
            { txt: 'A-吃饭', val: '吃饭'},
            { txt: 'B-睡觉', val: '睡觉'},
            { txt: 'C-打豆豆', val: '打豆豆'}
        ]
    }
})
```

上面的例子是将表单控件的value值与data中的数据绑定。


**值绑定**

```html
<input type="checkbox" v-model="what" true-value="yes" false-value="no">

<!--
正常情况下 vm.what 的值应该是：true 或 false
而现在就变成了：'yes' 或 'no'
 -->

```


**修饰符**

`.lazy` - 从实时同步改为用“change”事件同步

`.number` - 自动将用户输入的值转为数字类型

`.trim` - 自动过滤用户输入的首尾空白字符





## 组件

> ***组件是可复用的Vue实例！！！***

所以，它与 `new Vue` 接收相同的选项，比如`data`、`computed`、`watch`、`methods`、生命周期钩子等。除了一些根实例特有的选项比如`el`等。

```javascript
// 定义一个名为“my-cpt”的组件
Vue.component('my-cpt', {
    data: function(){   // 组件的data必须是函数
        return {
            count: 0
        }
    },
    template: '<button v-on:click="count++">Click Me {{ count }} Times</button>'

})
```

组件可进行任意次数的复用，每复用一次就相当于创建一个新的实例。

**data选项必须是一个函数**


### 注册组件

#### 全局注册

```javascript
Vue.component('component-name', {
    options...
})
```

全局注册的组件，注册后可以用在任何通过`new Vue`新创建的实例中，也包括其组件树中的所有子组件的模板中。

#### 局部注册

```javascript
new Vue({
    el: '#app',
    data: {
        ...
    },
    components: {
        component-a: {
            data: function(){
                return {
                    name: 'xxx'
                }
            },
            template: '...'
        },
        component-b: {
            data: function(){
                return {
                    name: 'yyy'
                }
            },
            template: '...'
        }
    }
})
```


### 组件传值

#### 父向子传值

> **通过Prop特性传递**

Prop是在组件上注册的一些自定义特性，放在 `props` 选项（props是数组或对象）里传过去，可任意数量，可任何类型，传过去后就成了子组件实例的一个属性，就像`data`中的值一样。

```html
<!-- 别忘了前面有说过，在组件上使用v-for时key是必须的 -->

<!-- props是数组形式 -->
<son v-for="item in books" v-bind:key="item.id" v-bind:title="item.name"></son>

<!-- props是对象形式 -->
<son v-for="item in books" v-bind:key="item.id" v-bind:title="item"></son>
```

```javascript
// props是数组形式
Vue.component('son', {
    props: ['title'],
    template: '<h3>{{ title }}</h3>'
})

new Vue({
    el: '#app',
    data: {
        books: [
            { id: 11, name: '语文'},
            { id: 12, name: '数学'},
            { id: 13, name: '英语'}
        ]
    }
})


// props是对象形式
Vue.component('son', {
    props:{ title: Object }, // Prop特性是'title'
    template: '<h3>{{ title.name }}</h3>'
})

new Vue({
    el: '#app',
    data: {
        books: [
            { id: 11, name: '语文'},
            { id: 12, name: '数学'},
            { id: 13, name: '英语'}
        ]
    }
})


```




#### 子向父传值

> **利用`$emit`通过事件传递**

```html
<body>
    <div id="app">

        <p>{{ count }}</p>

        <son v-for="book in books" v-bind:key="book.id" v-bind:item="book" v-on:add="fuck"></son>

    </div>

    <template id="tpl">
        <div>
            <h3>{{ item.name }}</h3>
            <button v-on:click="$emit('add', item.num)">加1</button>
        </div>
    </template>
</body>
```

```javascript
Vue.component('son', {
    props:['item'],
    template: '#tpl'
})

new Vue({
    el: '#app',
    data: {
        count: 0,
        books: [
            { id: 11, name: '语文', num: 1},
            { id: 12, name: '数学', num: 2},
            { id: 13, name: '英语', num: 3}
        ]
    },
    methods: {
        haha: function(num){
            this.count += num;
        }
    }
})
```
