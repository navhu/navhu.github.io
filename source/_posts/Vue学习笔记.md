---
title: Vue学习笔记
date: 2018-10-09 19:56:14
updated: 2018-10-09 19:56:14
categories:
tags: Vue
---

>听闻Vue要出3.0了，算起来都快一年没使用Vue写项目了，再不敲敲就要忘光咯~
>于是对着官网文档重新再回顾一遍...

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
