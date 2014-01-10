/**
 *TDialog  by zhangjiaxin
 *用于提示信息组件之：前台对话框组件
 */

function TDialog(resetpos,title,content, options)//增加参数resetpos：“1”表示居中展示，“2”表示右下角展示 by zhangjiaxin
{
    var defaults = { // 默认值。 
        title:'标题',       // 标题文本，若不想显示title请通过CSS设置其display为none 
        showTitle:true,     // 是否显示标题栏。
        closeText:'[关闭]', // 关闭按钮文字，若不想显示关闭按钮请通过CSS设置其display为none 
        draggable:true,     // 是否移动 
        modal:true,         // 是否是模态对话框 
        center:true,        // 是否居中。 
        fixed:true,         // 是否跟随页面滚动。
        time:0,             // 自动关闭时间，为0表示不会自动关闭。 
        id:false            // 对话框的id，若为false，则由系统自动产生一个唯一id。 
    };
    var options = $.extend(defaults, options);
    options.id = options.id ? options.id : 'dialog-' + TDialog.__count; // 唯一ID
    var overlayId = options.id + '-overlay'; // 遮罩层ID
    var timeId = null;  // 自动关闭计时器 
    var isShow = false;
    var isIe = $.browser.msie;
    var isIe6 = $.browser.msie && ('6.0' == $.browser.version || '7.0' == $.browser.version || '8.0' == $.browser.version || '9.0' == $.browser.version);

    var barHtml = '<div class="tck_top"><div class="tck_l">'+title +'</div><div class="tck_r"><ul class="nav_content"><li class="current"><a href="#"></a></li></ul></div></div>';
    var dialog = $('<div class="" style="position:relative; z-index:10000; top:0;">	<iframe style="position:absolute; z-index:-1; top:0; left:0; width:400px; height:400px;"></iframe><div "' + options.id + '" class="tck"  style="width:400px; ">'+barHtml+'<div class="tck_main"></div></div></div>');
   $('body').append(dialog);

    /**
     * 重置对话框的位置。
     *
     * 主要是在需要居中的时候，每次加载完内容，都要重新定位
     *
     * @return void
     */
    var resetPos = function(resetpos)//增加参数resetpos：“1”表示居中展示，“2”表示右下角展示 by zhangjiaxin
    {
        /* 是否需要居中定位，必需在已经知道了dialog元素大小的情况下，才能正确居中，也就是要先设置dialog的内容。 */
        if(options.center)
        {
        	var left = 0;
        	var top = 0;
        	if(resetpos == "1"){//增加参数resetpos：“1”表示居中展示，“2”表示右下角展示 by zhangjiaxin
        		left = document.documentElement.scrollLeft+event.clientX+500;
        		top = document.documentElement.scrollTop+event.clientY+120;
        	}else if(resetpos == "2"){
        		left = ($(window).width() - dialog.width());
        		top = ($(window).height() - dialog.height());
        	}
            if(!isIe6 && options.fixed)
            {   dialog.css({top:top,left:left});   }
            else
            {   dialog.css({top:top+$(document).scrollTop(),left:left+$(document).scrollLeft()});   }
        }
    }

    /**
     * 初始化位置及一些事件函数。
     *
     * 其中的this表示Dialog对象而不是init函数。
     */
    var init = function()
    {
        /* 是否需要初始化背景遮罩层 */
        if(options.modal)
        {
            $('body').append('<div id="' + overlayId + '" class="dialog-overlay"></div>');
            $('#' + overlayId).css({'left':0, 'top':0,
                    /*'width':$(document).width(),*/
                    'width':'100%',
                    /*'height':'100%',*/
                    'height':$(document).height(),
                    'z-index':++TDialog.__zindex,
                    'position':'absolute'})
                .hide();
        }

        dialog.css({'z-index':++TDialog.__zindex, 'position':options.fixed ? 'fixed' : 'absolute'});

		/*  IE6 兼容fixed代码 */
        if(isIe6 && options.fixed)
        {
            dialog.css('position','absolute');
            resetPos(resetpos);//增加参数resetpos：“1”表示居中展示，“2”表示右下角展示 by zhangjiaxin
            var top = parseInt(dialog.css('top')) - $(document).scrollTop();
            var left = parseInt(dialog.css('left')) - $(document).scrollLeft();
            $(window).scroll(function(){
                dialog.css({'top':$(document).scrollTop() + top,'left':$(document).scrollLeft() + left});
            });
        }

        /* 以下代码处理框体是否可以移动 */
        var mouse={x:0,y:0};
        function moveDialog(event)
        {
            var e = window.event || event;
            var top = parseInt(dialog.css('top')) + (e.clientY - mouse.y);
            var left = parseInt(dialog.css('left')) + (e.clientX - mouse.x);
            dialog.css({top:top,left:left});
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };
        dialog.find('.tck_top').mousedown(function(event){
            if(!options.draggable){  return; }

            var e = window.event || event;
            mouse.x = e.clientX;
            mouse.y = e.clientY;
            $(document).bind('mousemove',moveDialog);
        });
        $(document).mouseup(function(event){
            $(document).unbind('mousemove', moveDialog);
        });

        /* 绑定一些相关事件。 */
        dialog.find('.tck_r').bind('click', this.close);
        dialog.bind('mousedown', function(){  dialog.css('z-index', ++TDialog.__zindex); });

        // 自动关闭 
        if(0 != options.time){  timeId = setTimeout(this.close, options.time);    }
    }


    /**
     * 设置对话框的内容。 
     *
     * @param string c 可以是HTML文本。
     * @return void
     */
    this.setContent = function(c)
    {
        var div = dialog.find('.tck_main');//将原来的content修改为tck_main
        if('object' == typeof(c))
        {
            switch(c.type.toLowerCase())
            {
            case 'id': // 将ID的内容复制过来，原来的还在。
                div.html($('#' + c.value).html());
                break;
            case 'img':
                div.html('加载中...');
                $('<img alt="" />').load(function(){div.empty().append($(this));resetPos(resetpos);})//增加参数resetpos：“1”表示居中展示，“2”表示右下角展示 by zhangjiaxin
                    .attr('src',c.value);
                break;
            case 'url':
                div.html('加载中...');
                $.ajax({url:c.value,
                        success:function(html){div.html(html);resetPos(resetpos);},//增加参数resetpos：“1”表示居中展示，“2”表示右下角展示 by zhangjiaxin
                        error:function(xml,textStatus,error){div.html('出错啦')}
                });
                break;
            case 'iframe':
                div.append($('<iframe src="' + c.value + '" />'));
                break;
            case 'text':
            default:
                div.html(c.value);
                break;
            }
        }
        else
        {   div.html(c); }
    }
    /**
     * 显示对话框
     */
    this.show = function()
    {
        if(undefined != options.beforeShow && !options.beforeShow())
        {   return;  }

        /**
         * 获得某一元素的透明度。IE从滤境中获得。
         *
         * @return float
         */
        var getOpacity = function(id)
        {
            if(!isIe)
            {   return $('#' + id).css('opacity');    }

            var el = document.getElementById(id);
            return (undefined != el
                    && undefined != el.filters
                    && undefined != el.filters.alpha
                    && undefined != el.filters.alpha.opacity)
                ? el.filters.alpha.opacity / 100 : 1;
        }
        /* 是否显示背景遮罩层 */
        if(options.modal)
        dialog.fadeTo('slow', getOpacity(options.id), function(){
            if(undefined != options.afterShow){   options.afterShow(); }
            isShow = false;
        });
        // 自动关闭 
        if(0 != options.time){  timeId = setTimeout(this.close, options.time);    }
		
        resetPos(resetpos);//增加参数resetpos：“1”表示居中展示，“2”表示右下角展示 by zhangjiaxin
	}

    /**
     * 隐藏对话框。但并不取消窗口内容。
     */
    this.hide = function()
    {
        if(!isShow){ return; }

        if(undefined != options.beforeHide && !options.beforeHide())
        {   return;  }

        dialog.fadeOut('slow',function(){
            if(undefined != options.afterHide){   options.afterHide(); }
        });
        if(options.modal)
        {   $('#' + overlayId).fadeOut('slow');   }

        isShow = false;
    }

    /**
     * 关闭对话框 
     *
     * @return void
     */
    this.close = function()
    {
    	tipShowDialog = null;//将组件对象释放
        if(undefined != options.beforeClose && !options.beforeClose())
        {   return;  }

        dialog.fadeOut('slow', function(){
            $(this).remove();
            isShow = false;
            if(undefined != options.afterClose){   options.afterClose(); }
        });
        if(options.modal)
        {   $('#'+overlayId).fadeOut('slow', function(){$(this).remove();}); }
        clearTimeout(timeId);
    }
    
    init.call(this);
    this.setContent(content);
    
    TDialog.__count++;
    TDialog.__zindex++;
}
TDialog.__zindex = 500;
TDialog.__count = 1;
TDialog.version = '1.0 beta';

function dialog(content, options)
{
	var dlg = new TDialog(content, options);
	dlg.show();
	return dlg;
}