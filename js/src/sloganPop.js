jQuery(function($){var sloganIdx=0;var sloganArray=['富强','民主','文明','和谐','自由','平等','公正','法治','爱国','敬业','诚信','友善'];$('body').click(function(e){var $span=$("<span/>").text(sloganArray[sloganIdx]);var x=e.pageX,y=e.pageY;sloganIdx=(sloganIdx+1)%sloganArray.length;$span.css({'position':'absolute','z-index':999999,'top':y-20,'left':x,'font-weight':'bold','color':'rgb('+~~(255*Math.random())+','+~~(255*Math.random())+','+~~(255*Math.random())+')'});$('body').append($span);$span.animate({'top':y-180,'opacity':0},1500,function(){$span.remove()})})});