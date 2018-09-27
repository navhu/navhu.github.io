"use strict";$(document).ready(function(){NexT.motion={};var t={lines:[],push:function(i){this.lines.push(i)},init:function(){this.lines.forEach(function(i){i.init()})},arrow:function(){this.lines.forEach(function(i){i.arrow()})},close:function(){this.lines.forEach(function(i){i.close()})}};function i(i){this.el=$(i.el),this.status=$.extend({},{init:{width:"100%",opacity:1,left:0,rotateZ:0,top:0}},i.status)}i.prototype.init=function(){this.transform("init")},i.prototype.arrow=function(){this.transform("arrow")},i.prototype.close=function(){this.transform("close")},i.prototype.transform=function(i){this.el.velocity("stop").velocity(this.status[i])};var e=new i({el:".sidebar-toggle-line-first",status:{arrow:{width:"50%",rotateZ:"-45deg",top:"2px"},close:{width:"100%",rotateZ:"-45deg",top:"5px"}}}),o=new i({el:".sidebar-toggle-line-middle",status:{arrow:{width:"90%"},close:{opacity:0}}}),n=new i({el:".sidebar-toggle-line-last",status:{arrow:{width:"50%",rotateZ:"45deg",top:"-2px"},close:{width:"100%",rotateZ:"45deg",top:"-5px"}}});t.push(e),t.push(o),t.push(n);var s,r,a="320px";({toggleEl:$(".sidebar-toggle"),dimmerEl:$("#sidebar-dimmer"),sidebarEl:$(".sidebar"),isSidebarVisible:!1,init:function(){this.toggleEl.on("click",this.clickHandler.bind(this)),this.dimmerEl.on("click",this.clickHandler.bind(this)),this.toggleEl.on("mouseenter",this.mouseEnterHandler.bind(this)),this.toggleEl.on("mouseleave",this.mouseLeaveHandler.bind(this)),this.sidebarEl.on("touchstart",this.touchstartHandler.bind(this)),this.sidebarEl.on("touchend",this.touchendHandler.bind(this)),this.sidebarEl.on("touchmove",function(i){i.preventDefault()}),$(document).on("sidebar.isShowing",function(){NexT.utils.isDesktop()&&$("body").velocity("stop").velocity({paddingRight:a},200)}).on("sidebar.isHiding",function(){})},clickHandler:function(){this.isSidebarVisible?this.hideSidebar():this.showSidebar(),this.isSidebarVisible=!this.isSidebarVisible},mouseEnterHandler:function(){this.isSidebarVisible||t.arrow()},mouseLeaveHandler:function(){this.isSidebarVisible||t.init()},touchstartHandler:function(i){s=i.originalEvent.touches[0].clientX,r=i.originalEvent.touches[0].clientY},touchendHandler:function(i){var t=i.originalEvent.changedTouches[0].clientX,e=i.originalEvent.changedTouches[0].clientY;30<t-s&&Math.abs(e-r)<20&&this.clickHandler()},showSidebar:function(){var i=this;t.close(),this.sidebarEl.velocity("stop").velocity({width:a},{display:"block",duration:200,begin:function(){$(".sidebar .motion-element").velocity("transition.slideRightIn",{stagger:50,drag:!0,complete:function(){i.sidebarEl.trigger("sidebar.motion.complete")}})},complete:function(){i.sidebarEl.addClass("sidebar-active"),i.sidebarEl.trigger("sidebar.didShow")}}),this.sidebarEl.trigger("sidebar.isShowing")},hideSidebar:function(){NexT.utils.isDesktop()&&$("body").velocity("stop").velocity({paddingRight:0}),this.sidebarEl.find(".motion-element").velocity("stop").css("display","none"),this.sidebarEl.velocity("stop").velocity({width:0},{display:"none"}),t.init(),this.sidebarEl.removeClass("sidebar-active"),this.sidebarEl.trigger("sidebar.isHiding"),$(".post-toc-wrap")&&"block"===$(".site-overview").css("display")&&$(".post-toc-wrap").removeClass("motion-element")}}).init(),NexT.motion.integrator={queue:[],cursor:-1,add:function(i){return this.queue.push(i),this},next:function(){this.cursor++;var i=this.queue[this.cursor];$.isFunction(i)&&i(NexT.motion.integrator)},bootstrap:function(){this.next()}},NexT.motion.middleWares={logo:function(i){var t=[],e=$(".brand"),o=$(".site-title"),n=$(".site-subtitle"),s=$(".logo-line-before i"),r=$(".logo-line-after i");function a(i,t){return{e:$(i),p:{translateX:t},o:{duration:500,sequenceQueue:!1}}}function l(i){return(i=Array.isArray(i)?i:[i]).every(function(i){return $.isFunction(i.size)&&0<i.size()})}0<e.size()&&t.push({e:e,p:{opacity:1},o:{duration:200}}),NexT.utils.isMist()&&l([s,r])&&t.push(a(s,"100%"),a(r,"-100%")),l(o)&&t.push({e:o,p:{opacity:1,top:0},o:{duration:200}}),l(n)&&t.push({e:n,p:{opacity:1,top:0},o:{duration:200}}),CONFIG.motion.async&&i.next(),0<t.length?(t[t.length-1].o.complete=function(){i.next()},$.Velocity.RunSequence(t)):i.next()},menu:function(i){CONFIG.motion.async&&i.next(),$(".menu-item").velocity("transition.slideDownIn",{display:null,duration:200,complete:function(){i.next()}})},postList:function(t){var e=$(".post-block"),o=CONFIG.motion.transition.post_block,n=$(".post-header"),s=CONFIG.motion.transition.post_header,r=$(".post-body"),a=CONFIG.motion.transition.post_body,l=$(".collection-title, .archive-year"),c=CONFIG.motion.transition.coll_header;0<e.size()?function(){var i=window.postMotionOptions||{stagger:100,drag:!0};i.complete=function(){t.next()},CONFIG.motion.transition.post_block&&e.velocity("transition."+o,i);CONFIG.motion.transition.post_header&&n.velocity("transition."+s,i);CONFIG.motion.transition.post_body&&r.velocity("transition."+a,i);CONFIG.motion.transition.coll_header&&l.velocity("transition."+c,i)}():t.next(),CONFIG.motion.async&&t.next()},sidebar:function(i){"always"===CONFIG.sidebar.display&&NexT.utils.displaySidebar(),i.next()}}});