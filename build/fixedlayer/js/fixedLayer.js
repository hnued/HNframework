(function($){
	$.fn.fixedLayer=function(location){
		var defaultLocation={
			offsetX:10,  //对象初始位置相对顶部的距离
			offsetY:10  //对象初始位置相对于左侧的距离
		}

		//把参数对象和默认的对象进行合并
		var location=$.extend(defaultLocation,location);

		this.each(function(){

			var obj=$(this),
				top=0,
				left=0,
				scrollTop=0,
				winHeight=$(window).height(),
				winWidth=$(window).width(),
				objHeight=obj.outerHeight(true),
				objWidth=obj.outerWidth(true);

			//调用计算left和top值的方法
			offsetValue();

			//调用样式设置函数
			setObjCss();

			//窗口变化时重新加载
			$(window).resize(function(){
				winHeight=$(window).height();
				winWidth=$(window).width();
				objHeight=obj.outerHeight(true);
				objWidth=obj.outerWidth(true);

				//调用计算left和top值的方法
				offsetValue();

				//调用样式设置函数
				setObjCss();

			});

			

			//判断浏览器给对象设置样式值
			function setObjCss(){
				//判断是否是IE6浏览器
				if(!($.browser.msie) && !($.browser.version=="6.0")){

					obj.css({"position":"fixed","left":left,"top":top});

				}else{

					$("html").css("overflow","hidden");

					$("body").css({margin:"0px",padding:"0px","padding-right":"17px",border:"0px",height:"100%","overflow-x":"hidden","overflow-y":"auto"});

					$(window).scroll(function(){

						scrollTop=$(this).scrollTop();

						obj.css({"position":"absolute","left":left,"top":top+scrollTop});

					});

					obj.css({"position":"absolute","left":left,"top":top+scrollTop});
				}
			}

			//计算不同情况对象的top和left值
			function offsetValue(){

				if(location.offsetX && typeof(location.offsetX)=="number"){

					if(location.offsetX<0 || location.offsetX>winWidth-objWidth){

						return false;
					}else{

						left=location.offsetX;

					}

				}else if(location.offsetX && typeof(location.offsetX)=="string"){

					if(location.offsetX=="left"){

						left=0;

					}else if(location.offsetX=="center"){

						left=(winWidth-objWidth)/2;

					}else if(location.offsetX=="right"){

						left=winWidth-objWidth;

					}else{

						left=0;
					}
				}else{

					left=0;
				}

				if(location.offsetY && typeof(location.offsetY)=="number"){

					if(location.offsetY<0 || location.offsetY>winHeight-objHeight){

						return false;
					}else{

						top=location.offsetY;	
					}

				}else if(location.offsetY && typeof(location.offsetY)=="string"){

					if(location.offsetY=="top"){

						top=0;

					}else if(location.offsetY=="center"){

						top=(winHeight-objHeight)/2;

					}else if(location.offsetY=="bottom"){

						top=winHeight-objHeight;

					}else{

						top=0;
					}
				}else{

					top=0;
				}
			}
			
		});

		return this;
	}
})(jQuery);