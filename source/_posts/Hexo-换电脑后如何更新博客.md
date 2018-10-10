---
title: 'Hexo教程：换电脑后如何更新博客'
date: 2018-09-26 18:37:29
updated: 2018-09-27 19:42:15
categories:
tags: Hexo
---

>前天收到域名续费邮件，才想起博客好久没更新了。。。
>有时候工作的时候想记点笔记，碍于博客搭建环境是在家里那台笔记本上，在其它电脑上无法维护更新，就这样慢慢的荒废了。
>经过一番折腾之后，现已迁移完成。将期间遇到的问题记录下来。

<!-- more -->

#### 在新电脑上更新博客的方法
>首先默认你的博客已经搭建好并且能正常访问

以下操作全部都在当初搭建博客时使用的那台电脑上操作。那时的存放路径是`D:\navhu`这个文件夹中。
git工具我用的是 GitHub Desktop。电脑已设置好 *显示隐藏的文件夹* 和 *显示文件后缀名* 。

##### 具体步骤
1. 先将已搭建好的博客从GitHub上拉下来，放在一个新的地方。（比如我放在了D盘根目录 `D:\`）
![pic-01](https://wx3.sinaimg.cn/mw690/0060lm7Tly1fvndgm9ljqj30sd0fo409.jpg)
![pic-02](https://wx4.sinaimg.cn/mw690/0060lm7Tly1fvndhedwcbj30cg09k0sv.jpg)

2. 新建分支，取名为'hexo'。并切换到hexo分支。并将其设置为默认分支。
![pic-03](https://wx4.sinaimg.cn/mw690/0060lm7Tly1fvndhee78hj30aq067aa5.jpg)
![pic-04](https://wx1.sinaimg.cn/mw690/0060lm7Tly1fvndhedon2j30az07baa3.jpg)
![pic-05](https://wx1.sinaimg.cn/mw690/0060lm7Tly1fvndheeglcj30e202ymx4.jpg)
![pic-06](https://wx2.sinaimg.cn/mw690/0060lm7Tly1fvndtk1hopj30mb08kjs1.jpg)

3. 确认当前是处于hexo分支（此时hexo分支里的文件和master分支里的一模一样）。然后去`D:\navhu.github.io`将除了`.git`文件夹之外的其它文件全部删掉。
![pic-07](https://wx3.sinaimg.cn/mw690/0060lm7Tly1fvne26xulhj306f09e3yp.jpg)

4. 再将原先博客环境（`D:\navhu\navhu.github.io`文件夹里的全部文件，除了`.git`，`.deploy_git`，`node_modules`，`public`，`db.json`，`debug.log`）全部复制到`D:\navhu.github.io`文件夹里。
![pic-08](https://wx4.sinaimg.cn/mw690/0060lm7Tly1fvnegiv54aj307j0bst90.jpg)
```
`.git`: 不需要。
`.deploy_git`: hexo-deployer-git 这个插件生成的。不需要。
`node_modules`: 不需要。
`public`: hexo生成好的静态网站文件。不需要。
`db.json`: hexo生成的缓存文件。不需要。
`debug.log`: hexo的日志文件。不需要。
```

5. 然后push到hexo分支。(点击第2步后，Changes区域应该会是空的，如果还有文件存在，先不要点第3步push了，检查下为什么这个文件没commit进去。[详见此处](#jump))
![pic-09](https://wx1.sinaimg.cn/mw690/0060lm7Tly1fvnf8d08bwj30qo0ie0to.jpg)

6. 大功告成！此时GitHub上你的项目有了两个分支：`master`和`hexo`。`master`分支用来存放hexo编译生成的静态网站文件（通过`hexo deploy`传上来的）。`hexo`分支存放的是你的博客发布环境。以后无论在哪台电脑上，想要更新博客，直接将`hexo`分支内容拉下来，然后`npm install`一下，整体环境就OK了，开始写作吧。(旧环境`D:\navhu`可以删掉了)

##### 踩坑之路
+ **<span id='jump'>`next`主题文件夹无法commit</span>**
是因为这个`next`文件夹中有一个`.git`文件夹，把它删掉就行了。

+ **页面404了**
如果你push的时候没注意分支，不小心push到master分支去了，又或者是其它骚操作，导致访问博客404了。不要慌，![表情包](https://ws1.sinaimg.cn/large/e97784a1gy1fvo4somqrbj205i05cdfo.jpg)回滚下就好了。
先切到master分支，然后在项目文件夹中Git Bash Here，输入
    ```
    git log                             //查看所有commit记录，找个能正常访问的版本
    git reset --hard e33aa44bb22dd11cc  //回滚到指定的这个版本
    git push -f origin master           //强制提交
    ```
    搞定！

+ **压缩文件时报错**
如果你和我一样`hexo deploy`之前，想使用Gulp来压缩一下静态文件，可能会遇到报错。![图片](https://ws1.sinaimg.cn/large/e97784a1gy1fvo63dq31tj20bn04kgll.jpg)这是因为压缩js代码的时候遇到了es6的语法，需要用babel转一下。
```
npm install gulp-babel@^7.0.1 babel-preset-env babel-core --save-dev
//之所以给gulp-babel指定版本是因为默认情况下安装的是8.0以上，
//而它需要对等的babel-core版本为7.0以上。然而babel-core没有7.0以上的正式版，目前最新的是6.26.3。
//所以给gulp-babel指定个低版本避免后面编译报错。
//babel-preset-es2015已被废弃，用babel-preset-env取代它。
//babel-core必须装，不然也会报错。
```
    然后修改一下`gulp.js`文件
```
// 压缩 public/js 目录里的 js

var babel = require('gulp-babel');

gulp.task('minify-js', function () {
    return gulp.src('./public/**/*.js')
        .pipe(babel({
            presets: ['env']     //此处如果不写也会报错
        }))
        .pipe(uglify())
        .pipe(gulp.dest('./public'));
});
```

***The End***