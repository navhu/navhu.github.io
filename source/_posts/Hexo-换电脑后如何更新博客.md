---
title: 'Hexo: 换电脑后如何更新博客'
date: 2018-09-26 18:37:29
updated: 2018-09-26 18:37:29
categories: 
tags: Hexo
---

前天收到域名续费邮件，才想起博客好久没更新了。。。

有时候工作的时候想记点笔记，碍于博客搭建环境是在家里那台笔记本上，在其它电脑上无法维护更新，就这样慢慢的荒废了。

经过一番折腾之后，现已迁移完成。将期间遇到的问题记录下来。

#### 在新电脑上更新博客的方法
>首先默认你的博客已经搭建好并且能正常访问

以下操作全部都在当初搭建博客时使用的那台电脑上操作。那时的存放路径是`D:\navhu`。
git工具我用的是 GitHub Desktop。

1. 先将已搭建好的博客从GitHub上拉下来，放在一个新的地方。（比如我放在了D盘根目录）
![pic-01](http://wx3.sinaimg.cn/mw690/0060lm7Tly1fvndgm9ljqj30sd0fo409.jpg)
![pic-02](http://wx4.sinaimg.cn/mw690/0060lm7Tly1fvndhedwcbj30cg09k0sv.jpg)

2. 新建分支，取名为'hexo'。并切换到hexo分支。并将其设置为默认分支。
![pic-03](http://wx4.sinaimg.cn/mw690/0060lm7Tly1fvndhee78hj30aq067aa5.jpg)
![pic-04](http://wx1.sinaimg.cn/mw690/0060lm7Tly1fvndhedon2j30az07baa3.jpg)
![pic-05](http://wx1.sinaimg.cn/mw690/0060lm7Tly1fvndheeglcj30e202ymx4.jpg)
![pic-06](http://wx2.sinaimg.cn/mw690/0060lm7Tly1fvndtk1hopj30mb08kjs1.jpg)

3. 确认当前是处于hexo分支（此时hexo分支里的文件和master分支里的一模一样）。然后去`D:\navhu.github.io`将除了`.git`文件夹之外的其它文件全部删掉。
![pic-07](http://wx3.sinaimg.cn/mw690/0060lm7Tly1fvne26xulhj306f09e3yp.jpg)

4. 再将原先博客环境（`D:\navhu\navhu.github.io`文件夹里的全部文件，除了`.git`，`.deploy_git`，`node_modules`，`public`，`db.json`，`debug.log`）全部复制到`D:\navhu.github.io`文件夹里。
![pic-08](http://wx4.sinaimg.cn/mw690/0060lm7Tly1fvnegiv54aj307j0bst90.jpg)
```
`.git`: 不需要。
`.deploy_git`: hexo-deployer-git 这个插件生成的。不需要。
`node_modules`: 不需要。
`public`: hexo生成好的静态网站文件。不需要。
`db.json`: 不知道做什么用的，每次hexo操作后都会自动生成。不需要。
`debug.log`: hexo的日志文件。不需要。
```

5. 然后push到hexo分支。(点击第2步后，Changes区域应该会是空的，如果还有文件存在，先不要点第3步push了，好好检查下为什么这个文件没commit进去)
![pic-09](http://wx1.sinaimg.cn/mw690/0060lm7Tly1fvnf8d08bwj30qo0ie0to.jpg)

6. 大功告成！此时GitHub上你的项目有了两个分支：master和hexo。master用来存放hexo编译生成的静态网站文件。hexo分支存放的是你的博客发布环境。以后无论在哪台电脑上，想要更新博客，直接将hexo分支拉下来，然后`npm install`一下，就行了。