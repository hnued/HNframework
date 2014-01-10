(function($){
    $.fn.toolTips=function(config){
        var defaultConfig={
            mouseX:10, //鼠标的默认X轴位置
            mouseY:10, //鼠标的默认Y轴位置
            objwidth:200
        }
        var config=$.extend(defaultConfig,config);  //对象合并
        
        //遍历每个加载插件的节点
        this.each(function(){
            var obj=$(this);
            obj.mouseover(function(e){
                this.myTitle=this.title;
                this.title="";
                var myTitle=this.myTitle?this.myTitle:$(this).html();
                var div=$('<div id="toolTips"><div class="toolTipsTriangle"></div><div class="toolTipsContent">'+myTitle+'</div></div>');
                div.css({"left":e.pageX+config.mouseX+"px","top":e.pageY+config.mouseY+"px","width":config.objwidth+"px","height":"auto"});
				$("#test").val(e.pageX); 
                div.fadeIn("normal");
                div.appendTo("body");
            }).mouseout(function(){
                this.title=this.myTitle;
                $("#toolTips").remove();
            }).mousemove(function(e){
                $("#toolTips").css({"left":e.pageX+config.mouseX+"px","top":e.pageY+config.mouseY+"px"});
            });
        });
        return this;
    }
})(jQuery);